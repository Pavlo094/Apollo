import { map, forOwn, reduce } from 'lodash';
import { Network } from 'AppServices';
import { Cognito } from 'AppAuth';
import { orderPostsByDate, transformPostsTo } from 'AppUtils';
import { find } from 'lodash';
import { postActionCreators } from '../posts';
import { setOwnUserPosts } from '../sharedActions';
const { setPosts } = postActionCreators;

export function getPosts() {
  return (dispatch, getState) => {
    const ownUserId = Cognito.getUserId();
    const ownUserColony = getState().profileColonies[ownUserId];
    return Network.service['posts'].get({
      query: {
        profile_colony_uuids: ownUserId,
        // meta: true,
      }
    })
      .then(result => {
        const initPosts = result.colony_types.profile[0].post_details;
        const posts = transformPostsTo('client', initPosts, false);
        const unorderedPostList = map(posts, post => post);
        const orderedPosts = orderPostsByDate(unorderedPostList);
        const orderedIds = orderedPosts.map(post => `${post.postColonies[0]}_${post.resource}`);
        dispatch(setOwnUserPosts({
          posts: posts,
          profileColony: {
            ...ownUserColony,
            postList: orderedIds,
          },
          ownUserPostsLoaded: true,
        }))
      })
  }
}
