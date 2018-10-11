import { textEditorActionCreators } from 'AppRedux';
import { find, get, isNil } from 'lodash';
import { connect } from 'react-redux';

const actionCreators = {
  ...textEditorActionCreators,
}

function mapStateToProps({ textEditor, ui, posts, drafts, draftTiles }) {
  const { isDraftSelected, selectedPostID, selectedTileID } = ui;
  const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
  if (selectedTileID) {
    let selectedTile = find(selectedPost.postTiles, { uuid: selectedTileID });
    if (isNil(selectedTile)) {
      const textDraftTileID = get(draftTiles.text, 'uuid');
      if (textDraftTileID === selectedTileID) {
        selectedTile = draftTiles.text;
      }
    }
    const selectedTileType = get(selectedTile, 'type');
    if (selectedTileType === 'text') {
      return {
        textEditor,
        selectedTile,
      }
    }
  }
  return {
    textEditor,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
