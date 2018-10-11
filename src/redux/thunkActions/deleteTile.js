import { findIndex } from 'lodash';
import { upsertPost } from './upsertPost';
import { draftTileActionCreators } from '../draftTiles';
const { clearDraftTiles } = draftTileActionCreators;

export function deleteTile() {
  return (dispatch, getState) => {
    const { ui, drafts, posts } = getState();
    const { selectedPostID, isDraftSelected, selectedTileID } = ui;
    const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    const isDraftTile = findIndex(selectedPost.postTiles, { uuid: selectedTileID }) === -1;
    if (isDraftTile) {
      return dispatch(clearDraftTiles());
    }
    const updatedPostTiles = selectedPost.postTiles.filter(tile => tile.uuid !== selectedTileID);
    return dispatch(upsertPost({
      ...selectedPost,
      postTiles: updatedPostTiles,
    }))
  }
}
