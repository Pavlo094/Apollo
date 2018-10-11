import { createAction } from 'AppUtils';

export const SET_MODAL = 'ui/SET_MODAL';
export const SET_SELECTED_POST = 'ui/SET_SELECTED_POST';
export const SET_MODAL_AND_TILE_UUID = 'ui/SET_MODAL_AND_TILE_UUID';
export const SET_MODAL_AND_COLONY_UUID = 'ui/SET_MODAL_AND_COLONY_UUID';
export const SET_LOADING_STATUS = 'ui/SET_LOADING_STATUS';
export const SET_PROFILE_TAB_TYPE = 'ui/SET_PROFILE_TAB_TYPE';
export const SET_SELECTED_TILE = 'ui/SET_SELECTED_TILE';

export const uiActionCreators = {
  setModal: createAction(SET_MODAL),
  setSelectedPost: createAction(SET_SELECTED_POST),
  setModalAndTile: createAction(SET_MODAL_AND_TILE_UUID),
  setModalAndColony: createAction(SET_MODAL_AND_COLONY_UUID),
  setLoadingStatus: createAction(SET_LOADING_STATUS),
  setProfileTabType: createAction(SET_PROFILE_TAB_TYPE),
  setSelectedTile: createAction(SET_SELECTED_TILE),
}
