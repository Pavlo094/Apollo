import {
  SET_COLONIES,
  SET_OWN_USER_DATA,
  SET_OWN_USER_POSTS,
  DELETE_POST,
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {};

export default function profileColoniesReducer(state = DEFAULT, action) {
  const { type, payload } = action;
  switch(type) {
    case SET_COLONIES:
      return {
        ...state,
        ...payload.profile,
      }
    case SET_OWN_USER_DATA:
      return {
        ...state,
        [payload.uuid]: payload,
      }
    case SET_OWN_USER_POSTS:
      return {
        ...state,
        [payload.profileColony.uuid]: payload.profileColony,
      }
    case DELETE_POST:
      const { ownUserID } = payload;
      return {
        ...state,
        [payload.ownUserID]: {
          ...state[ownUserID],
          postList: state[ownUserID].postList.filter(postID => postID !== payload.id)
        }
      }
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
