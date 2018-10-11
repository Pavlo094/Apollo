import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cognito } from 'AppAuth';
import { Button, ReCaptcha } from 'AppComponents'
import { connectAuth } from 'AppRedux';
import './styles.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullnameText: '',
      emailText: '',
      passwordText: '',
      retypePasswordText: '',
      passErrorMsgText: '',
      reCaptchaSuccess: false,
    }

  }

  onTextChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    })
  }

  onNameChange = (e) => {
    this.onTextChange(e, 'fullnameText');
  }

  onEmailChange = (e) => {
    this.onTextChange(e, 'emailText');
  }

  onPassChange = (e) => {
    this.onTextChange(e, 'passwordText');
  }

  onRetypePassChange = (e) => {
    this.onTextChange(e, 'retypePasswordText');
  }

  validatePassword = () => {
    const { passwordText, retypePasswordText, passErrorMsgText } = this.state;
    if (passwordText !== retypePasswordText) {
      this.setState({
        passErrorMsgText: 'password fields do not match',
      })
      return false;
    }
    const regexCase = /[A-Z]/;
    const hasUpperCase = regexCase.test(passwordText);
    if (!hasUpperCase) {
      this.setState({
        passErrorMsgText: 'password must contain an uppercase',
      })
      return false;
    }
    const regexNum = /[0-9]/;
    const hasNum = regexNum.test(passwordText);
    if (!hasNum) {
      this.setState({
        passErrorMsgText: 'password must contain a number',
      })
      return false;
    }
    if (passwordText.length < 8) {
      this.setState({
        passErrorMsgText: 'password must contain 8 characters',
      })
      return false;
    }
    return true;
  }

  submitSignUpData = (e) => {
    e.preventDefault();
    const { usernameText, passwordText, emailText, fullnameText, reCaptchaSuccess } = this.state;
    const { history, setAuthDetails } = this.props;

    const passwordsValidated = this.validatePassword();
    if (!passwordsValidated) {
      return;
    }

    if (!reCaptchaSuccess) {
      alert('you must complete and pass a reCaptcha test before creating an account');
      return;
    }

    const userData = {
      name: fullnameText,
    };

    Cognito.signUp(emailText, passwordText, userData)
      .then(() => {
        setAuthDetails({
          username: emailText,
          password: passwordText,
        })
      })
      .then(() => {
        history.push('/confirm');
      })
      .catch(err => {
        if (err.code === 'UsernameExistsException') {
          alert('username provided already exists, please try another username');
          return;
        }
        console.log('error while signing up', err);
        alert('an error occurred during sign up');
      })
  }

  onTouchSignIn = () => {
    this.props.history.push('/login');
  }

  onReCaptchaResponse = (err, response) => {
    if (err) {
      console.log('error from ReCaptcha response', err);
      alert('something went wrong confirming your recaptcha');
      return;
    }
    if (response && response.success) {
      this.setState({
        reCaptchaSuccess: true,
      })
      return;
    }
    alert('you failed reCaptcha test');
    return;
  }

  render() {
    const {
      fullnameText,
      emailText,
      passwordText,
      retypePasswordText,
      passErrorMsgText,
    } = this.state;

    return (
      <div id="flex-container">
        <div id="sign-up-container">
          <form className="auth-form" onSubmit={this.submitSignUpData}>
            <h1>Create profile</h1>
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input
                type='text'
                className='small-margin'
                onChange={this.onNameChange}
                value={fullnameText}
                placeholder='Full Name'
              />
            </div>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type='text'
                className='small-margin'
                onChange={this.onEmailChange}
                value={emailText}
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
            <div className='error-message'>{passErrorMsgText}</div>
            <div className="input-container">
              <i className="fas fa-unlock"></i>
              <input
                type='password'
                className='small-margin'
                onChange={this.onRetypePassChange}
                value={retypePasswordText}
                placeholder='Retype Password'
              />
            </div>
            <ReCaptcha
              onResponse={this.onReCaptchaResponse}
            />
            <button
              className="primary submit-button"
              type='submit'
            >Sign Up<i className="fas fa-caret-right"></i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(connectAuth(SignUp));
