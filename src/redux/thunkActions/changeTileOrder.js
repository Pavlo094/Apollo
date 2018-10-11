import { findIndex, isNil } from 'lodash';
import { updateIndex } from 'AppUtils';
import { upsertPost } from './upsertPost';

export function changeTileOrder({ selectedTileID, changeInstruction}) {
  return (dispatch, getState) => {
    const { ui, drafts, posts } = getState();
    const selectedPostID = ui.selectedPostID;
    const selectedPost = ui.isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    const { postTiles } = selectedPost;

    const tileIndex = findIndex(postTiles, { uuid: selectedTileID })
    let updatedTiles;
    let updatedIndex;
    // switch function handles updating tile order
    // if a tile is already the first tile
    // and issued an 'up' command the updated tiles array is set to undefined
    // same for last tile and 'down' command
    switch(changeInstruction) {
      case 'up':
        updatedIndex = tileIndex - 1;
        if (tileIndex === 0) {
          updatedTiles = void(0);
          break;
        }
        updatedTiles = updateIndex(postTiles, tileIndex, updatedIndex);
        break;
      case 'down':
        if (tileIndex === postTiles.length - 1) {
          updatedTiles = void(0);
          break;
        }
        updatedIndex = tileIndex + 1;
        updatedTiles = updateIndex(postTiles, tileIndex, updatedIndex);
        break;
      default:
        throw new Error('changeTileOrder function was provided illegal second argument option');
    }
    // this is guard to prevent api calls to update tiles if tiles are not changed
    // ie:
    if (isNil(updatedTiles)) {
      return Promise.resolve();
    }
    if (ui.isDraftSelected) {
      return dispatch(upsertPost({
        ...selectedPost,
        postTiles: updatedTiles,
      }));
    }
    else {
      return dispatch(upsertPost({
        ...selectedPost,
        postTiles: updatedTiles,
      }))
    }
  }
}
