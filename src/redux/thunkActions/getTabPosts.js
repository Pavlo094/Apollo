import { Network } from 'AppServices';
import { transformPostsTo } from 'AppUtils';
import { postActionCreators } from '../posts';
const { setPosts } = postActionCreators;

export function getTabPosts() {
  return (dispatch, getState) => {
    const { ownUser } = getState();
    Network.service['posts'].get({
      query: {
        type: 'icon',
        profile_colony_uuids: ownUser.uuid,
      }
    })
      .then(tabPostData => {
        const tabPosts = tabPostData.colony_types.profile[0].post_details;
        const clientTabPosts = transformPostsTo('client', tabPosts, false);
        return dispatch(setPosts({
          posts: clientTabPosts,
        }))
      })
  }
}
