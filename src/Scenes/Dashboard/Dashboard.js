import React, { Component } from 'react';
import { NavBar, Button } from 'AppComponents';
import { Network } from 'AppServices';
import { Cognito } from 'AppAuth';
import { isEmpty, get, isNil, filter } from 'lodash';
import connect from './connect';
import './styles.css';

export class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  routeToPost = () => {
    const { drafts } = this.props;
    const stdPostDrafts = filter(drafts, (value, key) => {
      return value.type === 'standard';
    });
    if (stdPostDrafts.length > 1) {
      console.warn('Client Post Drafts length was more then the expected single amount');
    }
    const postDraft = stdPostDrafts[0];
    this.props.setSelectedPost({
      id: postDraft.id,
      isDraft: true,
    })
    this.props.history.push('/home/post/create');
  }

  displayEditColonyModal = () => {
    const { ownUser, setModalAndColony } = this.props;
    setModalAndColony({
      activeModal: 'Colony',
      selectedColonyID: ownUser.uuid,
    })
  }

  routeToForumColony = () => {
    this.props.history.push('/home/forumColony');
  }

  routeToEditPosts = () => {
    this.props.history.push('/home/editPosts');
  }

  routeToTidbits = () => {
    this.props.history.push('/home/tidbits');
  }

  routeToProfileTabs = () => {
    this.props.history.push('/home/profileTabs');
  }

  render() {
    const { permissions } = Cognito.getUser();
    return (
      <div id='dashboard'>
        <div id='dashboard-container'>
          <div className='dashboard-buttons-container'>
            <Button
              className='dashboard-button'
              onClick={this.routeToPost}
            >Create Post</Button>
            <Button
              className='dashboard-button'
              onClick={this.routeToEditPosts}
            >
              Edit Posts
            </Button>
            <Button
              className='dashboard-button'
              onClick={this.displayEditColonyModal}
            >Edit Your Profile Colony</Button>
            <Button
              className='dashboard-button'
              onClick={this.routeToProfileTabs}
            >
              Create/Edit Profile Tabs
            </Button>
            <Button
              className='dashboard-button'
              onClick={this.routeToForumColony}
            >Create/Edit Forum Colonies</Button>
            <Button
              className='dashboard-button'
              onClick={this.routeToTidbits}
              isHidden={permissions !== 'staff'}
            >
              Tidbits
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(Dashboard);
