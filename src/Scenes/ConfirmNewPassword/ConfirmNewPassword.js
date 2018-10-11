import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cognito } from 'AppAuth';
import { Button } from 'AppComponents'
import { connectAuth } from 'AppRedux';

class ConfirmNewPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codeText: '',
      passwordText: '',
      retypePasswordText: '',
      passErrorMsgText: '',
    }

  }

  onTextChange = (e, fieldName) => {
    this.setState({
      [fieldName]: e.target.value,
    })
  }

  onCodeChange = (e) => {
    this.onTextChange(e, 'codeText');
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
        passErrorMsgText: 'password must contain a uppercase letter',
      })
      return false;
    }
    const regexLowerCase = /[a-z]/;
    const hasLowerCase = regexLowerCase.test(passwordText);
    if (!hasLowerCase) {
      this.setState({
        passErrorMsgText: 'password must contain a lowercase letter',
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

  submitPasswordData = () => {
    const { passwordText, codeText } = this.state;
    const { history, setAuthDetails } = this.props;
    const { username } = this.props.auth;

    const passwordsValidated = this.validatePassword();
    if (!passwordsValidated) {
      return;
    }

    Cognito.confirmNewPassword(username, codeText, passwordText)
      .then(() => {
        setAuthDetails({
          username: void(0),
          password: void(0),
        });
        history.push('/successfulreset');
      })
      .catch(err => {
        console.log('error while signing up', err);
        alert('there was an error confirming your new password');
      })
  }

  onTouchSignIn = () => {
    this.props.history.push('/login');
  }

  render() {
    const {
      codeText,
      passwordText,
      retypePasswordText,
      passErrorMsgText,
    } = this.state;

    return (
      <div id="flex-container">
        <div id="sign-up-container">
          <h1>Confirm Your New Password</h1>
          <div className="input-container">
            <input
              type='text'
              className='small-margin'
              onChange={this.onCodeChange}
              value={codeText}
              placeholder='Verification Code'
            />
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="input-container">
            <input
              type='password'
              className='small-margin'
              onChange={this.onPassChange}
              value={passwordText}
              placeholder='Password'
            />
            <i className="fas fa-lock"></i>
          </div>
          <div>{passErrorMsgText}</div>
          <div className="input-container">
            <input
              type='password'
              className='small-margin'
              onChange={this.onRetypePassChange}
              value={retypePasswordText}
              placeholder='Retype Password'
            />
            <i className="fas fa-lock"></i>
          </div>
          <Button
            className="primary submit-button"
            type='button'
            onClick={this.submitPasswordData}
            >Submit</Button>
          <div className="sign-up-link-container">
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connectAuth(ConfirmNewPassword));
