import { createAction } from 'AppUtils';

export const SET_AUTH_STATUS = 'auth/SET_STATUS';
export const SET_AUTH_DETAILS = 'auth/SET_DETAILS'

export const authActionCreators = {
  setAuthStatus: createAction(SET_AUTH_STATUS),
  setAuthDetails: createAction(SET_AUTH_DETAILS),
}
