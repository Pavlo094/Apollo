import { SET_OWN_USER_ID } from './actions';
import { SET_OWN_USER_DATA, SIGN_OUT } from '../sharedActions';

const DEFAULT = {
  uuid: void(0),
}

export default function ownUserReducer(state = DEFAULT, action) {
  switch(action.type) {
    case SET_OWN_USER_ID:
    case SET_OWN_USER_DATA:
      return {
        uuid: action.payload.uuid,
      }
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
