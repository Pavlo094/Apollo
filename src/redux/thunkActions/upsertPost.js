import { isNil, get } from 'lodash';
import { Network } from 'AppServices';
import { constructPost, transformPostsTo } from 'AppUtils';
import { draftActionCreators } from '../drafts';
import { postActionCreators } from '../posts';
const { setDraft } = draftActionCreators;
const { setPost } = postActionCreators;

export function upsertPost(argsObj) {
  return (dispatch, getState) => {
    if (isNil(argsObj.id)) {
      return Promise.reject('post to add or update must have an id');
    }
    if (argsObj.isDraft) {
      const prevDraftState = getState().drafts[argsObj.id];
      dispatch(setDraft(argsObj));
      const { drafts, ownUser, forumColonies, tidbitColonies, profileColonies } = getState();
      const colonies = {
        ...forumColonies,
        ...tidbitColonies,
        ...profileColonies,
      };
      const selectedDraft = drafts[argsObj.id];
      const colonyID = get(selectedDraft, 'postColonies[0]');
      const colonyType = isNil(colonyID) ? null : colonies[colonyID].type;
      // the logic in the first then is wrapped in a promise for error handling
      return Promise.resolve()
        .then(() => {
          const updatedPost = {
            ...selectedDraft,
            colonyType,
          };
          const transformedPosts = transformPostsTo('server', [updatedPost], argsObj.isDraft)
          const transformedPost = transformedPosts[argsObj.id];
          return Network.service['drafts'].post({
            data: transformedPost,
          })
        })
        .catch(err => {
          dispatch(setDraft(prevDraftState));
          return Promise.reject(err);
        })
    }
    else {
      return Promise.resolve()
        .then(() => {
          return dispatch(setPost({
            ...argsObj,
          }));
        })
    }
    // all posts currently should be drafts -- however adding ability if post is not a draft
  }
}
