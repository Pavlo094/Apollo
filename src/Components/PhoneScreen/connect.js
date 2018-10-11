import { connect } from 'react-redux';
import {
  upsertTile,
  deleteTile,
  draftTileActionCreators,
  selectTile,
  upsertPost,
  deleteSelectedPost,
  uiActionCreators,
} from 'AppRedux';

const actionCreators = {
  upsertTile,
  deleteTile,
  selectTile,
  upsertPost,
  deleteSelectedPost,
  ...draftTileActionCreators,
  ...uiActionCreators,
}

function mapStateToProps({ ui, forumColonies, profileColonies, tidbitColonies }) {
  return {
    activeModal: ui.activeModal,
    colonies: {
      ...forumColonies,
      ...profileColonies,
      ...tidbitColonies,
    }
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
