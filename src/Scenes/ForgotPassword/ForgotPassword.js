import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cognito } from 'AppAuth';
import { Button } from 'AppComponents';
import { connectAuth } from 'AppRedux';
import './styles.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
    }
  }

  onTextChange = (e, fieldName) => {
    const text = e.target.value;
    this.setState({
      [fieldName]: text,
    })
  }

  onEmailChange = (e) => {
    this.onTextChange(e, 'emailText');
  }

  submitEmail = () => {
    const { setAuthDetails, history } = this.props;
    const { emailText } = this.state;
    Cognito.resetPassword(emailText)
      .then(() => {
        setAuthDetails({
          username: emailText,
        });
        this.props.history.push('/confirmpassword');
      })
      .catch(err => {
        console.log('err from cognito password reset', err);
        alert('there was an issue resetting your password');
      })
  }

  render() {
    const { emailText } = this.state;
    return (
      <div className="flex-container">
        <div className="content-container">
          <h1>Forgot Password</h1>
          <p id="no-wrap">Enter the email address you used to sign up for an account:</p>
          <div className="input-container">
            <input
              type='text'
              className='small-margin'
              onChange={this.onEmailChange}
              value={emailText}
              placeholder='Email'
            />
            <i className="fas fa-envelope"></i>
          </div>
          <Button
            className="primary submit-button"
            type='button'
            onClick={this.submitEmail}
            >Submit</Button>
          <div className="sign-up-link-container">
            <p>I just remembered!</p>
            <a href="#/login">Sign In!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connectAuth(ForgotPassword));
