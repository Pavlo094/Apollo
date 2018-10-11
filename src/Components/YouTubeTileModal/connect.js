import { uiActionCreators, upsertTile } from 'AppRedux';
import { connect } from 'react-redux';
import { find } from 'lodash';

function mapStateToProps({ drafts, ui }) {
  const { selectedTileID, selectedPostID, isDraftSelected } = ui;
  let selectedTile;
  if (isDraftSelected) {
    selectedTile = find(drafts[selectedPostID].postTiles, { uuid: selectedTileID })
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
