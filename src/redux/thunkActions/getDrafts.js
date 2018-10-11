import { reduce, isNil, isEmpty, forEach } from 'lodash';
import { Network } from 'AppServices';
import { transformPostsTo } from 'AppUtils';
import { draftActionCreators } from '../drafts';
const { setDrafts } = draftActionCreators;

export function getDrafts() {
 return (dispatch, getState) => {
   const { profileColonies, ownUser } = getState();
   const ownUserColony = profileColonies[ownUser.uuid];
   return Network.service['drafts'].get()
     .then(response => {
       const draftDetails = response.draft_details;
       const stdDrafts = draftDetails.filter(draft => draft.type === 'standard');
       if (stdDrafts.length < 1) {
         return Network.service['drafts'].post({
           data: {
             tile_details: [],
             type: 'standard',
           }
         })
           .then(justCreatedDraft => {
             return [justCreatedDraft];
           })
       }
       return draftDetails;
     })
     .then(draftsData => {
       const clientDrafts = transformPostsTo('client', draftsData, true);
       dispatch(setDrafts(clientDrafts));
     })
 }
}
