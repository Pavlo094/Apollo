import { createAction } from 'AppUtils';

export const SET_EDITOR_STATE = 'textEditor/SET_EDITOR_STATE';

export const textEditorActionCreators = {
  setEditorState: createAction(SET_EDITOR_STATE),
}
