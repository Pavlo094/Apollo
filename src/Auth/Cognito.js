import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { isNil, map, get } from 'lodash';

const poolData = {
  UserPoolId: 'us-west-2_nS0Wf3ymS',
  ClientId: '7o4ifeur4oih19647usvhi46jr',
};

const userPool = new CognitoUserPool(poolData);

let cognitoUser;
let userData;

function getUserId() {
  return userData.id;
}

function getUser() {
  return {
    ...userData,
  }
}

function transformToAWSAttributes(attributes) {
  return map(attributes, (value, key) => {
    return {
      Name: key,
      Value: value,
    }
  })
}

function transformFromAWSAttributes(attributes) {
  return attributes.reduce((result, attribute) => {
    result[attribute.Name] = attribute.Value;
    return result;
  }, {})
}

function getUserAttributes() {
  return new Promise((resolve, reject) => {
    cognitoUser.getUserAttributes((err, attributes) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(attributes);
    })
  })
}

function setUserData(session) {
  return getUserAttributes()
    .then(attributes => {
      userData = transformFromAWSAttributes(attributes);
      userData.id = session.accessToken.payload.username;
      const permissions = get(session, 'accessToken.payload.cognito:groups[0]');
      if (permissions) {
        userData.permissions = permissions;
      }
    })
}

function getSession() {
  return new Promise((resolve, reject) => {
    cognitoUser = userPool.getCurrentUser();
    if (cognitoUser !== null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }
        if (session.isValid()) {
          if (isNil(userData)) {
            setUserData(session)
              .then(() => {
                resolve(session);
              })
              .catch((error) => {
                reject(error);
              })
            return;
          }
          resolve(session);
          return;
        }
        reject('expired or invalid session');
      })
      return;
    }
    reject('no session present');
    cognitoUser = undefined;
  })
}

function signIn(emailOrPhone, password) {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: emailOrPhone,
      Password: password,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: emailOrPhone,
      Pool: userPool,
    };

    cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve(session);
      },
      onFailure: (err) => {
        reject(err);
      }
    })
  })
  .then(session => setUserData(session))
}

function signUp(emailOrPhone, password, userAttributes) {
  const userProperties = transformToAWSAttributes(userAttributes);
  return new Promise((resolve, reject) => {
    userPool.signUp(emailOrPhone, password, userProperties, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      cognitoUser = result.user;
      resolve(result);
    })
  })
}

function confirmWithCode(code) {
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        rejejct(err);
        return;
      }
      resolve(result);
    })
  })
}

function resendCode() {
  return new Promise((resolve, reject) => {
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}

function resetPassword(emailOrPhone) {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: emailOrPhone,
      Pool: userPool,
    };

    cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (err) => {
        reject(err);
      }
    })
  })
}

function confirmNewPassword(emailOrPhone, verifyCode, newPassword) {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: emailOrPhone,
      Pool: userPool,
    };

    cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmPassword(verifyCode, newPassword, {
      onSuccess: () => {
        resolve('SUCCESS');
      },
      onFailure: (err) => {
        reject(err);
      }
    })
  })
}

function signOut() {
  cognitoUser.signOut();
  cognitoUser = void(0);
  userData = void(0);
}

const Cognito = {
  signIn,
  signOut,
  signUp,
  confirmWithCode,
  resendCode,
  getUserAttributes,
  getSession,
  getUserId,
  getUser,
  resetPassword,
  confirmNewPassword,
};

export { Cognito };
