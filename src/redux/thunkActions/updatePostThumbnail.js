import { Network } from 'AppServices';
import { upsertPost } from './upsertPost';
import { uiActionCreators } from '../ui';
const { setModal } = uiActionCreators;

export function updatePostThumbnail({ img }) {
  return (dispatch, getState) => {
    const { drafts, ui, posts } = getState();
    const { isDraftSelected, selectedPostID } = ui;
    const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    return Network.service['images'].post({
      data: img,
    })
      .then(imgURL => {
        return dispatch(upsertPost({
          ...selectedPost,
          thumbnailImagePath: imgURL,
        }))
      })
  }
}
