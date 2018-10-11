import { uiActionCreators, deleteSelectedPost } from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...uiActionCreators,
  deleteSelectedPost,
}

const mapStateToProps = ({ ui }) => {
  return {
    isDraftSelected: ui.isDraftSelected,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
