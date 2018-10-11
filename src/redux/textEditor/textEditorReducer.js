import { isNil } from 'lodash';

import { SET_EDITOR_STATE } from './actions';
import {
  SET_TILE_AND_EDITOR,
  SET_AND_SELECT_DRAFT_TILE,
  SET_DRAFT_EDITOR_STATE,
  CLEAR_SELECTED_DRAFT_TILE,
  CLEAR_SELECTED_POST,
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {
  state: void(0),
}

export default function textEditorReducer(state = DEFAULT, action) {
  const { type, payload } = action;
  switch(type) {
    case SET_EDITOR_STATE:
    case SET_DRAFT_EDITOR_STATE:
      return {
        ...payload,
      }
    case SET_TILE_AND_EDITOR:
    case SET_AND_SELECT_DRAFT_TILE:
      return {
        state: payload.editorState,
      }
    case CLEAR_SELECTED_DRAFT_TILE:
      return {
        state: void(0),
      }
    case CLEAR_SELECTED_POST:
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
