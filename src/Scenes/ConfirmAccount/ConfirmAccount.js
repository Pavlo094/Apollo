import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cognito } from 'AppAuth';
import { Button } from 'AppComponents';
import { connectAuth } from 'AppRedux';

class ConfirmAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmCodeText: '',
    }

  }

  onTextChange = (e, fieldName) => {
    const text = e.target.value;
    this.setState({
      [fieldName]: text,
    })
  }

  onCodeChange = (e) => {
    this.onTextChange(e, 'confirmCodeText');
  }

  submitConfirmationCode = () => {
    const { confirmCodeText } = this.state;
    const { history, setAuthStatus } = this.props;
    const { username, password } = this.props.auth;
    Cognito.confirmWithCode(confirmCodeText)
      .then(() => {
        return Cognito.signIn(username, password);
      })
      .then(() => {
        setAuthStatus({
          isAuthenticated: true,
        })
        history.push('/home/dashboard');
      })
      .catch(err => {
        console.log('err when submitting confirmation code', err);
        alert('there was an error sumbitting your code')
      })
  }

  onTouchLogin = () => {
    this.props.history.push('/login');
  }

  render() {
    const { confirmCodeText } = this.state;
    return (
      <div id="flex-container">
        <div id="login-container">
          <h1>Verify Your Account</h1>
          <div className="input-container">
            <input
              type='text'
              className='small-margin'
              onChange={this.onCodeChange}
              value={confirmCodeText}
              placeholder='Verification Code'
            />
            <i className="fas fa-lock"></i>
          </div>
          <Button
            className="primary submit-button"
            type='button'
            onClick={this.submitConfirmationCode}
            >Submit</Button>
          <div className="sign-up-link-container">
            <Button onClick={this.onTouchLogin}>Back to Login</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connectAuth(ConfirmAccount));
