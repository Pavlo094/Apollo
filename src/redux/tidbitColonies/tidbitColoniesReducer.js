import {
  SET_COLONIES,
  SET_TIDBIT_DATA,
  SIGN_OUT,
} from '../sharedActions';

const DEFAULT = {};

export default function tidbitColoniesReducer(state = DEFAULT, action) {
  switch(action.type) {
    case SET_COLONIES:
      return {
        ...state,
        ...action.payload.tidbit,
      }
    case SET_TIDBIT_DATA:
      return {
        ...state,
        ...action.payload.tidbitColonies,
      }
    case SIGN_OUT:
      return DEFAULT;
    default:
      return state;
  }
}
