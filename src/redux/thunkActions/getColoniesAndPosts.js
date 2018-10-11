import { Network } from 'AppServices';
import {
  filterForProdEnv,
  transformColoniesTo,
  transformPostsTo,
} from 'AppUtils';
import { map, reduce, keyBy } from 'lodash';
import { setColonies, setTidbitData } from '../sharedActions';


// the following function just removes any forum colonies with development flag set to true
function scrubColonies(colonies) {
  const filteredColonies = filterForProdEnv(colonies);
  return transformColoniesTo('client', filteredColonies);
}

export function getColoniesAndPosts() {
  return (dispatch, getState) => {

    return Network.service['colonies'].get({
      query: {
        types: ['forum','tidbit'],
      }
    })
      .then(result => {
        const forumColonies = keyBy(result.types.forum, colony => colony.uuid);
        const tidbitColonies = keyBy(result.types.tidbit, colony => colony.uuid);
        return dispatch(setColonies({
          forum: scrubColonies(forumColonies),
          tidbit: scrubColonies(tidbitColonies),
          coloniesLoaded: true,
        }))
      })
      .then(() => {
        const { tidbitColonies } = getState();
        const updatedTidbitColonies = {}
        return Network.service['liveTidbits'].get()
          .then(liveTidbitsResponse => {
            liveTidbitsResponse.forEach((tidbit) => {
              const tidbitID = tidbit.colony_uuid;
              updatedTidbitColonies[tidbitID] = {
                ...tidbitColonies[tidbitID],
                livePost: {
                  expires_at: tidbit.expires_at,
                  postID: `${tidbitID}_${tidbit.resource}`,
                },
                allPosts: {},
              }
            });
            return updatedTidbitColonies;
          })
      })
      .then(tidbitColonies => {
        const tidbitUUIDs = map(tidbitColonies, (colony) => colony.uuid);
        const getTitbitQueue = Network.service['tidbitQueue'].get();
        const getTidbitPosts = Network.service['posts'].get({
          query: {
            forum_colony_uuids: tidbitUUIDs,
            meta: true,
          },
        })
        return Promise.all([getTitbitQueue, getTidbitPosts])
          .then(response => {
            const tidbitQueues = response[0];
            const tidbitPostsData = response[1].colony_types.forum;
            const tidbitsWithPostList = tidbitQueues.reduce((result, tidbitQueue) => {
              const { colony_uuid, sequence } = tidbitQueue;
              const tidbitColonyWithPostList = {
                ...tidbitColonies[colony_uuid],
                postList: sequence.map(postResource => `${colony_uuid}_${postResource}`),
              };
              result[tidbitQueue.colony_uuid] = tidbitColonyWithPostList;
              return result;
            }, {});
            const updatedTidbits = {
              ...tidbitColonies,
              ...tidbitsWithPostList,
            };
            const tidbitPosts = {};
            tidbitPostsData.forEach(tidbit => {
              tidbit.post_details.forEach(tidbitPost => {
                const { colony_uuid, resource } = tidbitPost;
                const postID = `${colony_uuid}_${resource}`;
                const transformedPosts = transformPostsTo('client', [tidbitPost], false);
                const transformedPost = transformedPosts[postID];
                tidbitPosts[postID] = transformedPost;
                updatedTidbits[colony_uuid].allPosts[postID] = true;
              })
            })
            const tidbitsWithUnusedPosts = reduce(updatedTidbits, (acc, tidbit, tidbitID) => {
              const unusedPosts = {
                ...tidbit.allPosts,
              };
              delete unusedPosts[tidbit.livePost.postID];
              tidbit.postList.forEach(postID => {
                delete unusedPosts[postID];
              });
              const unusedPostList = map(unusedPosts, (value, postID) => postID);
              acc[tidbitID] = {
                backgroundImagePath: tidbit.backgroundImagePath,
                development: tidbit.development,
                icons: tidbit.icons,
                livePost: tidbit.livePost,
                name: tidbit.name,
                postList: tidbit.postList,
                thumbnailImagePath: tidbit.thumbnailImagePath,
                type: tidbit.type,
                uuid: tidbit.uuid,
                unassignedPostList: unusedPostList,
              };
              return acc;
            }, {});
            return dispatch(setTidbitData({
              tidbitColonies: tidbitsWithUnusedPosts,
              posts: tidbitPosts,
              tidbitsLoaded: true,
            }))
          })
      })

  }
}
