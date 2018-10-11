import { CLEAR_DRAFT_TILES, SET_DRAFT_TILE } from './actions';
import {
  CREATE_TILE,
  CLEAR_SELECTED_DRAFT_TILE,
  SET_AND_SELECT_DRAFT_TILE,
  SET_DRAFT_EDITOR_STATE,
  CLEAR_SELECTED_POST,
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {
  text: {},
  youtube: {},
  singleImage: {},
};

export default function draftTiles(state = DEFAULT, action) {
  const { payload, type } = action;
  switch(type) {
    case SET_DRAFT_TILE:
    case CREATE_TILE:
    case SET_AND_SELECT_DRAFT_TILE:
      return {
        ...DEFAULT,
        ...payload.tile,
      }
    case SET_DRAFT_EDITOR_STATE:
      return {
        ...state,
        text: {
          ...state.text,
          editorState: payload.state,
        }
      }
    case CLEAR_DRAFT_TILES:
    case CLEAR_SELECTED_DRAFT_TILE:
    case CLEAR_SELECTED_POST:
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
