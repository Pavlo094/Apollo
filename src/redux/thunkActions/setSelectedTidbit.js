import { Network } from 'AppServices';
import { get } from 'lodash';
import { transformPostsTo } from 'AppUtils';
import { uiActionCreators } from '../ui';
import { postActionCreators } from '../posts';
const { setSelectedPost } = uiActionCreators;
const { setPost } = postActionCreators;

export function setSelectedTidbit({ id }) {
  return (dispatch, getState) => {
    dispatch(setSelectedPost({
      idDraft: false,
      id,
    }));
    const { posts } = getState();
    return Network.service['posts'].get({
      query: {
        post_ids: [id],
      }
    })
      .then(response => {
        const postWithTiles = get(response, 'post_details[0]');
        const transformedPosts = transformPostsTo('client', [postWithTiles]);
        const transformedPost = transformedPosts[id];
        dispatch(setPost(transformedPost));
      })
  }
}
