import { createAction } from 'AppUtils';

export const SET_OWN_USER_ID = 'ownUser/SET_ID';

export const ownUserActionCreators = {
  setOwnUserId: createAction(SET_OWN_USER_ID),
}
