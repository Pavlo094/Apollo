import { createAction } from 'AppUtils';

export const SET_DRAFTS = 'drafts/SET_DRAFTS';
export const SET_DRAFT = 'drafts/SET_DRAFT';
export const DELETE_DRAFT = 'drafts/DELETE_DRAFT';

export const draftActionCreators = {
  setDrafts: createAction(SET_DRAFTS),
  setDraft: createAction(SET_DRAFT),
  deleteDraft: createAction(DELETE_DRAFT),
}
