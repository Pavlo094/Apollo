import { get, isNil, find } from 'lodash';
import {
  draftActionCreators,
  uiActionCreators,
  ownUserActionCreators,
  getOwnUserData,
  editTile,
  editTileInteraction,
  deleteTile,
  changeTileOrder,
  upsertPost,
  submitPost,
  getPosts,
  getColoniesAndPosts,
  getDrafts,
  getTabPosts,
  clearSelectedPost,
} from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...draftActionCreators,
  ...uiActionCreators,
  ...ownUserActionCreators,
  getOwnUserData,
  editTile,
  editTileInteraction,
  deleteTile,
  changeTileOrder,
  upsertPost,
  submitPost,
  getPosts,
  getColoniesAndPosts,
  getDrafts,
  getTabPosts,
  clearSelectedPost,
}

function mapStateToProps({ drafts, ui, ownUser, profileColonies, posts, tidbitColonies, forumColonies, draftTiles }) {
  const mappedProps = {
    ui,
    ownUser,
    drafts,
    draftTiles,
  };

  // const { selectedTileID, isDraftSelected, selectedPostID } = ui;
  // if (!isNil(selectedTileID)) {
  //   let selectedTile;
  //   if (isDraftSelected) {
  //     selectedTile = find(drafts[selectedPostID].postTiles, { uuid: selectedTileID });
  //   }
  //   else {
  //     selectedTile = find(posts[selectedPostID].postTiles, { uuid: selectedTileID });
  //   }
  //   mappedProps.selectedTile = selectedTile;
  // }
  if (ui.coloniesLoaded) {
    mappedProps.forumColonies = forumColonies;
    mappedProps.tidbitColonies = tidbitColonies;
  }
  if (ui.ownUserPostsLoaded) {
    const postList = get(profileColonies, `[${ownUser.uuid}].postList`, []);
    const orderedPosts = postList.map(postId => {
      return posts[postId];
    });
    mappedProps.posts = orderedPosts;
  }
  if (ui.selectedPostID) {
    const selectedPost = ui.isDraftSelected ? drafts[ui.selectedPostID] : posts[ui.selectedPostID];
    mappedProps.selectedPost = selectedPost;
  }
  mappedProps.ownUserColony = profileColonies[ownUser.uuid];
  mappedProps.profileColonies = profileColonies;
  return mappedProps;
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
