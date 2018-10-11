import { reduce, isNil } from 'lodash';
import { transformPostsTo, transformColoniesTo} from 'AppUtils';
import { Network } from 'AppServices';
import { setTabDraft } from '../sharedActions';
import { upsertColony } from './upsertColony';

export function createProfileTabDraft(tabType) {
  return (dispatch, getState) => {
    let tabDrafts;
    let draftID;
    const { ownUser, profileColonies } = getState();
    const ownUserID = ownUser.uuid;
    const ownUserColony = profileColonies[ownUserID];

    return Network.service['drafts'].post({
      data: {
        tile_details: [],
        type: tabType,
      }
    })
      .then(tabDraftData => {
        tabDrafts = transformPostsTo('client', [tabDraftData], true);
        draftID = Object.keys(tabDrafts)[0];
        const updatedColony = {
          ...ownUserColony,
          icons: {
            ...ownUserColony.icons,
            [tabType]: draftID,
          },
        };
        return dispatch(upsertColony({
          colony: updatedColony,
        }))
      })
      .then(() => {
        const tabDraft = tabDrafts[draftID];
        return dispatch(setTabDraft(tabDraft));
      })
  }
}
