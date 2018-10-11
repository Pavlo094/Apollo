import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cognito } from 'AppAuth';
import { ColonyHex } from 'AppComponents'
import { connectAuth } from 'AppRedux';
import { SignUp, Login } from 'AppScenes';
import './styles.css';

class RootLogin extends Component {
  constructor(props) {
    super(props);
    this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  toggleSignUpModal() {
    let modal = document.getElementById('signup-modal-container');
    this.toggleModal(modal);
  }

  toggleSignInModal() {
    let modal = document.getElementById('signin-modal-container');
    this.toggleModal(modal);
  }

  toggleModal(modal) {
    let isActive = modal.classList.contains('active');
    this.disableModals();
    if(isActive) { return }
    modal.classList.toggle('active');
  }

  disableModals() {
    let modals = document.getElementsByClassName('auth-modal-container');
    for(let modal of modals) {
      modal.classList.remove('active')
    }
  }

  render() {
    return (
      <div className='root-container' id="flex-container">
        <div className='auth-container'>
          <div className='auth-subcontainer'>
            <div
              className='signup-hex-container'
              onClick={this.toggleSignUpModal}
            >
              <ColonyHex
                style={{
                  position: 'relative',
                  overflow: 'visible',
                }}
                width={100}
                height={100}
                gradient={true}
                color1={'#4ea2af'}
                color2={'#70db94'}
              />
              <p className='icon-text'>Sign Up</p>
              <i className="fas fa-user-plus"></i>
            </div>
            <div id='signup-modal-container' className='auth-modal-container'>
              <SignUp />
            </div>
          </div>
          <div className='auth-subcontainer'>
            <div
              className='signin-hex-container'
              onClick={this.toggleSignInModal}
            >
              <ColonyHex
                style={{
                  position: 'relative',
                  overflow: 'visible',
                }}
                width={100}
                height={100}
                gradient={true}
                color1={'#5d74df'}
                color2={'#654894'}
              />
              <p className='icon-text'>Sign In</p>
              <i className="fas fa-sign-in-alt"></i>
            </div>
            <div id='signin-modal-container' className='auth-modal-container'>
              <Login />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connectAuth(RootLogin));
