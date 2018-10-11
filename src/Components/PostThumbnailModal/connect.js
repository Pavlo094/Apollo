import {
  uiActionCreators,
  updatePostThumbnail
} from 'AppRedux';
import { connect } from 'react-redux';

function mapStateToProps({ ui, drafts, posts, images }) {
  const { isDraftSelected, selectedPostID, onModalCloseFN } = ui;
  const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
  return {
    selectedPost,
    onModalCloseFN,
  };
}

const actionCreators = {
  ...uiActionCreators,
  updatePostThumbnail,
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
