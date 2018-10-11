import { find } from 'lodash';
import { uiActionCreators } from '../ui';
const { setModalAndTile } = uiActionCreators;

const modalMap = {
  'youtube': 'YouTubeTile',
  'single-image': 'ImageTile',
  'text': 'TextTile',
}

export function editTile({ selectedTileID }) {
  return (dispatch, getState) => {
    const { ui, drafts, posts } = getState();
    const { selectedPostID, isDraftSelected } = ui
    const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    const selectedTileData = find(selectedPost.postTiles, { uuid: selectedTileID });
    return dispatch(setModalAndTile({
      activeModal: modalMap[selectedTileData.type],
      selectedTileID: selectedTileID,
    }))
  }
}
