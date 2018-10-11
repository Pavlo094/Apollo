import { reduce } from 'lodash';
import { SET_POSTS, SET_POST } from './actions';
import {
  SET_OWN_USER_POSTS,
  SET_TIDBIT_DATA,
  DELETE_POST,
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {};

export default function postsReducer(state = DEFAULT, action) {
  switch(action.type) {
    case SET_OWN_USER_POSTS :
      return {
        ...state,
        ...action.payload.posts,
      }
    case SET_POST:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    case SET_POSTS:
      return {
        ...state,
        ...action.payload.posts,
      }
    case SET_TIDBIT_DATA:
      return {
        ...state,
        ...action.payload.posts,
      }
    case DELETE_POST:
      return reduce(state, (result, value, key) => {
        if (key === action.payload.id) {
          return result;
        }
        result[key] = value;
        return result;
      }, {})
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
