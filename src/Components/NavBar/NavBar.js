import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'AppComponents';
import { Cognito } from 'AppAuth';
import { NAV_BAR_HEIGHT } from 'AppConstants';
import connect from './connect';
import './styles.css';

class NavBar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleLogout = () => {
    const { history, signOut } = this.props;
    Cognito.signOut();
    signOut();
  }

  routeToDashboard = () => {
    const currentScene = this.props.history.location.pathname;
    if (currentScene === '/home/dashboard') {
      return;
    }
    this.props.clearSelectedPost();
    if (currentScene === '/home/post/edit') {
      this.props.history.push('/home/editPosts');
      return;
    }
    if (currentScene === '/home/post/editTidBit') {
      this.props.history.push('/home/tidbits');
      return;
    }
    if (currentScene === '/home/post/editTab') {
      this.props.history.push('/home/profileTabs');
      return;
    }
    this.props.history.push('/home/dashboard');
  }

  displayTitle = () => {
    const currentScene = this.props.history.location.pathname;
    if (currentScene === '/home/dashboard') {
      return 'DASHBOARD'
    }
    if (currentScene === '/home/post/create') {
      return 'CREATE POST'
    }
    if (currentScene === '/home/editPosts') {
      return 'EDIT POSTS'
    }
    if (currentScene === '/home/post/editPost') {
      return 'EDIT POST'
    }
  }

  renderNavButton() {
    const currentScene = this.props.history.location.pathname;
    if (currentScene === '/home/dashboard') {
      return <img id="justhive-logo" src=""></img>
    }
    else if (currentScene === '/home/post/edit' || currentScene === '/home/post/editTab' || currentScene === '/home/post/editTidBit') {
      return <p id='nav-button-text'>BACK</p>
    }
    else {
      return <p id='nav-button-text'>HOME</p>
    }
  }

  render() {
    return (
        <div
          id='nav-fixed'
          style={{
            height: NAV_BAR_HEIGHT,
          }}
        >
          <div id='nav-left'>
            <Button
              onClick={this.routeToDashboard}
              id='nav-button-container'
            >
                {this.renderNavButton()}
            </Button>
          </div>
          <div id='nav-center'>
            <p id='nav-title-text'>{this.displayTitle()}</p>
          </div>
          <div id='nav-right'>
            <p id='nav-logout' onClick={this.handleLogout}>LOG OUT</p>
          </div>
        </div>
    );
  }
}

export default withRouter(connect(NavBar));
