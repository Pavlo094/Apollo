import { connect } from 'react-redux';
import { find } from 'lodash';
import { uiActionCreators, upsertTile } from 'AppRedux';

function mapStateToProps({ drafts, ui, posts }) {
  const { selectedTileID, selectedPostID, isDraftSelected } = ui;
  let selectedTile;
  if (isDraftSelected) {
    selectedTile = find(drafts[selectedPostID].postTiles, { uuid: selectedTileID })
  }
  else {
    selectedTile = find(posts[selectedPostID].postTiles, { uuid: selectedTileID });
  }
  return {
    selectedTile,
  }
}

const actionCreators = {
  ...uiActionCreators,
  upsertTile,
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
