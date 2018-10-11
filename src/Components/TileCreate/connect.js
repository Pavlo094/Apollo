import {
  uiActionCreators,
  draftTileActionCreators,
  createDraftTile,
} from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...uiActionCreators,
  ...draftTileActionCreators,
  createDraftTile,
}

function mapStateToProps({ draftTiles }) {
  return {
    draftTiles,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
