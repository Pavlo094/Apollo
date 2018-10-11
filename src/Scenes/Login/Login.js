import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { Cognito } from 'AppAuth';
import { Button } from 'AppComponents'
import { connectAuth } from 'AppRedux';
import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameText: '',
      passwordText: ''
    }

  }

  onTextChange = (e, fieldName) => {
    const text = e.target.value;
    this.setState({
      [fieldName]: text,
    })
  }

  onNameChange = (e) => {
    this.onTextChange(e, 'usernameText');
  }

  onPassChange = (e) => {
    this.onTextChange(e, 'passwordText');
  }

  submitLoginData = (e) => {
    e.preventDefault();
    const { usernameText, passwordText } = this.state;
    const { history } = this.props;
    Cognito.signIn(usernameText, passwordText)
      .then(() => {
        this.props.setAuthStatus({
          isAuthenticated: true,
        })
        history.push('/home/dashboard');
      })
      .catch(err => {
        if (err.code === 'UserNotConfirmedException') {
          Cognito.resendCode();
          alert('you have not confirmed your account, a new verification code has been sent');
          history.push('/confirm');
          return;
        }
        if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
          alert('incorrect login information');
          return;
        }
        console.log('uncaught error during sign in', err);
        alert('something went wrong during sign in');
      })
  }

  onTouchSignUp = () => {
    this.props.history.push('/signUp');
  }

  onTouchForgotPassword = () => {
    this.props.history.push('/forgotpassword');
  }

  render() {
    const { usernameText, passwordText } = this.state;
    return (
      <div id="flex-container">
        <div id="login-container">
          <form className="auth-form" onSubmit={this.submitLoginData}>
            <h1>Sign In</h1>
            <div className="email-input input-container">
              <i className="fas fa-user"></i>
              <input
                type='text'
                className='small-margin'
                onChange={this.onNameChange}
                value={usernameText}
                placeholder='Email'
              />
            </div>
            <div className="input-container">
              <i className="fas fa-unlock"></i>
              <input
                type='password'
                className='small-margin'
                onChange={this.onPassChange}
                value={passwordText}
                placeholder='Password'
              />
            </div>
            <div className='forget-password-container'>
              <Button
                className='link link-small'
                onClick={this.onTouchForgotPassword}
              >Forgot Password</Button>
            </div>
            <button
            className="primary submit-button"
            type='submit'
            >Sign In <i className="fas fa-caret-right"></i></button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(connectAuth(Login));
