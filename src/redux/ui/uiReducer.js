import { isNil, get } from 'lodash';

import {
  SET_MODAL,
  SET_SELECTED_POST,
  SET_MODAL_AND_TILE_UUID,
  SET_MODAL_AND_COLONY_UUID,
  SET_LOADING_STATUS,
  SET_PROFILE_TAB_TYPE,
  SET_SELECTED_TILE
} from './actions';

import {
  SET_TIDBIT_DATA,
  SET_OWN_USER_POSTS,
  SET_COLONIES,
  SET_TAB_DRAFT,
  CREATE_TILE,
  CLEAR_SELECTED_DRAFT_TILE,
  SET_TILE_AND_EDITOR,
  SET_AND_SELECT_DRAFT_TILE,
  CLEAR_SELECTED_POST,
  SIGN_OUT,
}  from '../sharedActions';

const DEFAULT = {
  activeModal: void(0),
  onModalCloseFN: void(0),
  selectedTileID: void(0),
  selectedColonyID: void(0),
  selectedPostID: void(0),
  isDraftSelected: void(0),
  selectedProfileTabType: void(0),
  ownUserPostsLoaded: false,
  ownUserDraftLoaded: false,
  tidbitsLoaded: false,
  coloniesLoaded: false,
}

export default function uiReducer(state = DEFAULT, action) {
  const { type, payload } = action;
  switch(type) {
    case SET_MODAL:
      return {
        ...state,
        activeModal: payload.activeModal,
        selectedColonyID: isNil(payload.activeModal) ? void(0) : state.selectedColonyID,
        onModalCloseFN: payload.onModalCloseFN,
      }
    case SET_SELECTED_POST:
    case SET_TAB_DRAFT:
      return {
        ...state,
        selectedPostID: payload.id,
        isDraftSelected: payload.isDraft,
      }
    case CLEAR_SELECTED_POST:
      return {
        ...state,
        selectedPostID: void(0),
        isDraftSelected: void(0),
      }
    case SET_SELECTED_TILE:
    case SET_TILE_AND_EDITOR:
    case SET_AND_SELECT_DRAFT_TILE:
      return {
        ...state,
        selectedTileID: payload.selectedTileID,
      }
    case CREATE_TILE:
      return {
        ...state,
        selectedTileID: payload.uuid,
      }
    case CLEAR_SELECTED_DRAFT_TILE:
      return {
        ...state,
        selectedTileID: void(0),
      }
    case SET_MODAL_AND_TILE_UUID:
      return {
        ...state,
        selectedTileID: payload.selectedTileID,
        activeModal: payload.activeModal,
        onModalCloseFN: void(0),
      }
    case SET_MODAL_AND_COLONY_UUID:
      return {
        ...state,
        selectedColonyID: payload.selectedColonyID,
        activeModal: payload.activeModal,
        onModalCloseFN: void(0),
      }
    case SET_LOADING_STATUS:
      return {
        ...state,
        ownUserDraftLoaded: get(payload, 'ownUserDraftLoaded', false),
        ownUserPostsLoaded: get(paylod, 'ownUserPostsLoaded', false),
        tidbitsLoaded: get(payload, 'tidbitsLoaded', false),
      }
    case SET_TIDBIT_DATA:
      return {
        ...state,
        tidbitsLoaded: payload.tidbitsLoaded,
      }
    case SET_OWN_USER_POSTS:
      return {
        ...state,
        ownUserPostsLoaded: payload.ownUserPostsLoaded,
      }
    case SET_COLONIES:
      return {
        ...state,
        coloniesLoaded: get(payload, 'coloniesLoaded', state.coloniesLoaded),
      }
    case SET_PROFILE_TAB_TYPE:
      return {
        ...state,
        selectedProfileTabType: payload.type,
      }
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
