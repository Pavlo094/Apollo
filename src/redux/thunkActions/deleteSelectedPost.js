import { get } from 'lodash';
import { Network } from 'AppServices';
import { upsertPost } from './upsertPost';
import { uiActionCreators } from '../ui';
import { deletePost } from '../sharedActions';
const { setModal } = uiActionCreators;

export function deleteSelectedPost() {
  return (dispatch, getState) => {
    const { ui, drafts, posts } = getState();
    const { selectedPostID, isDraftSelected } = ui;
    const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    dispatch(setModal({
      activeModal: void(0),
    }))
    if (isDraftSelected) {
      let clearedDraft = {
        postTiles: [],
        draftTimestamp: selectedPost.draftTimestamp,
        isDraft: true,
        thumbnailImagePath: null,
        postTitle: null,
        type: get(selectedPost, 'type', 'standard'),
        colonyType: null,
        postColonies: [null],
        id: selectedPostID,
      }
      return dispatch(upsertPost(clearedDraft));
    }
    return Network.service['posts'].delete({
      id: selectedPostID,
    })
      .then(() => {
        dispatch(deletePost({
          id: selectedPostID,
          ownUserID: selectedPost.author,
        }))
      })
  }
}
