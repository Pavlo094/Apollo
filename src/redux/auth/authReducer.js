import {
  SET_AUTH_STATUS,
  SET_AUTH_DETAILS,
} from './actions';

import {
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {
  isAuthenticated: false,
  username: void(0),
  password: void(0),
}

export default function authReducer(state = DEFAULT, action) {
  switch(action.type) {
    case SET_AUTH_STATUS:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        username: void(0),
        password: void(0),
      }
    case SET_AUTH_DETAILS:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      }
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
