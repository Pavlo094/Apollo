import { uiActionCreators, imageActionCreators, upsertPost } from 'AppRedux';
import { connect } from 'react-redux';
import { Cognito } from 'AppAuth';

const actionCreators = {
  ...uiActionCreators,
  ...imageActionCreators,
  upsertPost
}

function mapStateToProps({
  drafts,
  ui,
  colonies,
  posts,
  forumColonies,
  tidbitColonies,
  profileColonies,
}) {
  const selectedPost = ui.isDraftSelected ? drafts[ui.selectedPostID] : posts[ui.selectedPostID];
  const ownUserId = Cognito.getUserId();

  return {
    drafts,
    ui,
    forumColonies,
    tidbitColonies,
    profileColonies,
    activePost: selectedPost,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
