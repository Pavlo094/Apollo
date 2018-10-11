import { get, isNil } from 'lodash';
import { Network } from 'AppServices';
import { transformPostsTo } from 'AppUtils';
import { draftActionCreators } from '../drafts';
import { uiActionCreators } from '../ui';
const { setDrafts, deleteDraft } = draftActionCreators;
const { setSelectedPost } = uiActionCreators;

export function submitPost() {
  return (dispatch, getState) => {
    const { drafts, ui, ownUser, posts, forumColonies, tidbitColonies, profileColonies } = getState();
    const colonies = {
      ...forumColonies,
      ...tidbitColonies,
      ...profileColonies,
    };
    const { isDraftSelected, selectedPostID } = ui;
    if (isDraftSelected) {
      const selectedPost = drafts[selectedPostID];
      const colonyID = get(selectedPost, 'postColonies[0]');
      const colonyType = isNil(colonyID) ? void(0) : colonies[colonyID].type;
      const postWithColonyType = {
        ...selectedPost,
        colonyType,
      };
      const transformedPosts = transformPostsTo('server', [postWithColonyType], selectedPost.isDraft);
      const transformedPost = transformedPosts[selectedPostID];
      const requestParams = {
        data: transformedPost,
      };
      const isNonStdPost = transformedPost.type !== 'standard';
      if (isNonStdPost) {
        requestParams.query = {
          type: 'icon',
        };
      }
      return Network.service['posts'].post(requestParams)
        .then(post => {
          console.log('👉 Posted post:', post);
          if (!isNonStdPost) {
            // create a new draft skeleton
            return Network.service['drafts'].post({
              data: {
                tile_details: [],
                type: 'standard',
              }
            })
            .then(newlyCreatedDraft => {
              const drafts = transformPostsTo('client', [newlyCreatedDraft], true);
              dispatch(setDrafts(drafts));
              // since only one draft was transformed we grab its ID
              const draftID = Object.keys(drafts)[0];
              dispatch(deleteDraft({
                id: selectedPostID,
              }));
            })
          }
        })
    }
    const selectedPost = posts[selectedPostID]
    const transformedPosts = transformPostsTo('server', [selectedPost], false);
    const transformedPost = transformedPosts[ui.selectedPostID];
    const requestParams = {
      id: ui.selectedPostID,
      data: transformedPost,
    };
    if (transformedPost.type !== 'standard') {
      requestParams.query = {
        type: 'icon',
      };
    }
    return Network.service['posts'].patch(requestParams);
  }
}
