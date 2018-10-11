import { reduce, isNil, get } from 'lodash';
import { mapPostTiles } from './mapPostTiles';

const BLACKLIST = {
  client: {
    'aws:rep:updateregion': true,
    'aws:rep:updatetime': true,
    'aws:rep:deleting': true,
    'tile_details': true,
    'colony_uuid': true,
    'tile_uuids': true,
  },
  server: {
    'aws:rep:updateregion': true,
    'aws:rep:updatetime': true,
    'aws:rep:deleting': true,
    'isDraft': true,
    'id': true,
    'postColonies': true,
  }
}

const TRANSFORM_MAP = {
  client: {
      'thumbnail_image_path': 'thumbnailImagePath',
      'draft_timestamp': 'draftTimestamp',
      'title': 'postTitle',
      'colony_type': 'colonyType',
  },
  server: {
      'thumbnailImagePath': 'thumbnail_image_path',
      'postTitle': 'title',
      'postTiles': 'tile_details',
      'draftTimestamp': 'draft_timestamp',
      'colonyType': 'colony_type',
  }
}

export function transformPostsTo(version, posts, isDraft) {
  if (version === 'client') {
    return reduce(posts, (result, post) => {
      let id;
      if (isDraft) {
        id = `${post.author}_${post.draft_timestamp}`;
      }
      else {
        id = `${post.colony_uuid}_${post.resource}`;
      }
      const clonedPost = {
        ...post,
        isDraft: isDraft === true,
        postColonies: isNil(post.colony_uuid) ? [] : [post.colony_uuid],
        id,
        postTiles: post.tile_details ? mapPostTiles(post.tile_uuids, post.tile_details) : [],
      };
      if (isDraft) {
        clonedPost.type = isNil(post.type) ? 'standard' : post.type;
      }
      const transformedPost = reduce(clonedPost, (acc, postValue, postProp) => {
        if (BLACKLIST[version][postProp]) {
          return acc;
        }
        if (TRANSFORM_MAP[version][postProp]) {
          const transformedProperty = TRANSFORM_MAP[version][postProp];
          acc[transformedProperty] = postValue;
          return acc;
        }
        acc[postProp] = postValue;
        return acc;
      }, {});
      result[id] = transformedPost;
      return result;
    }, {})
  }
  if (version === 'server') {
    return reduce(posts, (result, post) => {
      const postWithColonyUUID = {
        ...post,
        colony_uuid: get(post, 'postColonies[0]', null),
        type: isNil(post.type) ? 'standard' : post.type,
      };
      const transformedPost = reduce(postWithColonyUUID, (acc, postValue, postProp) => {
        if (BLACKLIST[version][postProp]) {
          return acc;
        }
        if (TRANSFORM_MAP[version][postProp]) {
          const transformedProperty = TRANSFORM_MAP[version][postProp];
          acc[transformedProperty] = postValue === '' ? null : postValue;
          return acc;
        }
        acc[postProp] = postValue === '' ? null : postValue;
        return acc;
      }, {})
      result[post.id] = transformedPost;
      return result;
    }, {})
  }
}
