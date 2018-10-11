import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isNil } from 'lodash';
import { Route, Loading, Phone } from 'AppComponents';
import {
  Login,
  Post,
  Home,
  SignUp,
  FinalStep,
  SuccessUnderReview,
  PurchaseTokens,
  ConfirmAccount,
  ForgotPassword,
  ConfirmNewPassword,
  SuccessfulReset,
  RootLogin,
} from 'AppScenes';
import { Cognito } from 'AppAuth';
import { connectAuth } from 'AppRedux';
import './styles.css';
// need to fix by updating styling for local styling
import './Components/PostConfirm/styles.css';
// For Styled Components here is the template for importing from another file
// import { divStyles } from './poop';
// const MyDiv = styled.div`${divStyles}`;

window.cbReCaptcha = () => {};

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    const { history, setAuthStatus } = this.props;
    Cognito.getSession()
      .then((result) => {
        const user = Cognito.getUser();
        this.setState({
          isLoading: false,
        }, () => {
          setAuthStatus({
            isAuthenticated: true,
          })
          if (history.location.pathname !== '/home/dashboard') {
            history.push('/home/dashboard');
          }
        })
      })
      .catch((err) => {
        if (history.location.pathname !== '/login') {
          history.push('/login');
        }
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const { isLoading } = this.state;
    const { isAuthenticated } = this.props.auth;
    if (isLoading) {
      return (
        <Loading />
      )
    }
    return (
      <div className="container" id="scroll-container">
        <Route
          exact={true}
          path="/login"
          component={RootLogin}
        />
        <Route
          path="/home"
          component={Home}
          redirectTo={!isAuthenticated ? '/login' : void(0)}
        />
        <Route
          path='/confirm'
          component={ConfirmAccount}
        />
        <Route
          path='/forgotpassword'
          component={ForgotPassword}
        />
        <Route
          path='/confirmpassword'
          component={ConfirmNewPassword}
        />
        <Route
          path='/successfulreset'
          component={SuccessfulReset}
        />
      </div>
    )
  }
}

export default withRouter(connectAuth(App));
