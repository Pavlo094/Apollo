import { forOwn } from 'lodash';
import { Network } from 'AppServices';
import { setOwnUserData } from '../sharedActions';
import { transformColoniesTo } from 'AppUtils';
import { Cognito } from 'AppAuth';

export function getOwnUserData() {
  return (dispatch, getState) => {
    return Network.service['profileColony'].get()
      .then(result => {
        // should only return an object with one key -- which is the userId
        const ownUserId = Object.keys(result.colony_detail)[0];
        const ownUserColonyData = result.colony_detail[ownUserId];
        const transformedColony = transformColoniesTo('client', [ownUserColonyData])[0];
        dispatch(setOwnUserData(transformedColony));
      })
  }
}
