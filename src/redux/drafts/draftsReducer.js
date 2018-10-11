import { reduce } from 'lodash';

import {
  SET_DRAFT,
  SET_DRAFTS,
  DELETE_DRAFT,
} from './actions';
import {
  SET_TAB_DRAFT,
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {}

export default function draftsReducer(state = DEFAULT, action) {
  switch(action.type) {
    case SET_DRAFT:
    case SET_TAB_DRAFT:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
        }
      }
    case SET_DRAFTS:
      return {
        ...state,
        ...action.payload,
      }
    case DELETE_DRAFT:
      return reduce(state, (result, draft, draftID) => {
        if (draftID === action.payload.id) {
          return result;
        }
        result[draftID] = draft;
        return result;
      }, {})
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
