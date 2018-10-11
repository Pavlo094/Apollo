import { removePropByValue } from './removePropByValue';

export function constructPost(post, ownUserId, colonyType) {
  const updatedPost = {
    "thumbnail_image_path": post.thumbnailImagePath,
    "title": post.postTitle,
    "tile_details": post.postTiles,
    "draft_timestamp": post.draftTimestamp,
    "colony_type": colonyType,
  }
  if (post.postColonies.length === 1) {
    updatedPost.colony_uuid = post.postColonies[0];
  }
  const postWithoutEmptyStrings = removePropByValue(updatedPost, '');
  return postWithoutEmptyStrings;
}
