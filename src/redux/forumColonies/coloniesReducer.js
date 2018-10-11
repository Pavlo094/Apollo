import {
  OMIT_COLONY
} from './actions';
import {
  SET_OWN_USER_DATA,
  SET_OWN_USER_POSTS,
  SET_TIDBIT_POSTS,
  SET_COLONIES,
  SET_COLONY,
  SIGN_OUT,
} from '../sharedActions';
import { reduce } from 'lodash';

const DEFAULT = {}

export default function forumColoniesReducer(state = DEFAULT, action) {
  switch(action.type) {
    case SET_COLONIES:
      return {
        ...state,
        ...action.payload.forum,
      }
    case OMIT_COLONY:
      return reduce(state, (result, colonyData, colonyID) => {
        if (colonyID !== action.payload.uuid) {
          result[colonyID] = colonyData;
        }
        return result;
      }, {})
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
