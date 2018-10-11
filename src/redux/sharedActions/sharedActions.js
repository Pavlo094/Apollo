import { createAction } from 'AppUtils';

export const SET_OWN_USER_DATA = 'sharedActions/SET_OWN_USER_DATA';
export const SET_OWN_USER_POSTS = 'sharedActions/SET_OWN_USER_POSTS';
export const SET_TIDBIT_DATA = 'sharedActions/SET_TIDBIT_DATA';
export const SET_COLONIES = 'sharedActions/SET_COLONIES';
export const DELETE_POST = 'sharedActions/DELETE_POST';
export const SET_TAB_DRAFT = 'sharedActions/SET_TAB_DRAFT';
export const CREATE_TILE = 'sharedActions/CREATE_TILE';
export const CLEAR_SELECTED_DRAFT_TILE = 'sharedActions/CLEAR_SELECTED_DRAFT_TILE';
export const SET_TILE_AND_EDITOR = 'sharedActions/SET_TILE_AND_EDITOR';
export const SET_AND_SELECT_DRAFT_TILE = 'sharedActions/SET_AND_SELECT_DRAFT_TILE';
export const SET_DRAFT_EDITOR_STATE = 'sharedActions/SET_DRAFT_EDITOR_STATE';
export const CLEAR_SELECTED_POST = 'sharedActions/CLEAR_SELECTED_POST';
export const SIGN_OUT = 'sharedActions/SIGN_OUT';

export const setOwnUserData = createAction(SET_OWN_USER_DATA);
export const setOwnUserPosts = createAction(SET_OWN_USER_POSTS);
export const setColonies = createAction(SET_COLONIES);
export const setTidbitData = createAction(SET_TIDBIT_DATA)
export const deletePost = createAction(DELETE_POST);
export const setTabDraft = createAction(SET_TAB_DRAFT);
export const createTile = createAction(CREATE_TILE);
export const clearSelectedDraftTile = createAction(CLEAR_SELECTED_DRAFT_TILE);
export const setTileAndEditor = createAction(SET_TILE_AND_EDITOR);
export const setAndSelectDraftTile = createAction(SET_AND_SELECT_DRAFT_TILE);
export const setDraftEditorState = createAction(SET_DRAFT_EDITOR_STATE);
export const clearSelectedPost = createAction(CLEAR_SELECTED_POST);
export const signOut = createAction(SIGN_OUT);
