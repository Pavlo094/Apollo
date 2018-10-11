import { uiActionCreators, deleteSelectedPost } from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...uiActionCreators,
}

const mapStateToProps = ({ drafts, posts, ui }) => {
  return {
    drafts,
    posts,
    ui,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
