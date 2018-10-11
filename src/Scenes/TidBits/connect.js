import {
  updateTidBit,
  setSelectedTidbit
} from 'AppRedux';
import { connect } from 'react-redux';
import { forOwn, compact } from 'lodash';

const actionCreators = {
  updateTidBit,
  setSelectedTidbit,
}

function mapStateToProps({ tidbitColonies, posts, ui }) {
  if (!ui.tidbitsLoaded) {
    return {};
  }
  const tidbits = {};
  forOwn(tidbitColonies, (colony) => {
    const { postList, unassignedPostList } = colony;
    const fullposts = compact(colony.postList.map(postID => posts[postID]));
    const unassignedPosts = compact(colony.unassignedPostList.map(postID => posts[postID]));
    tidbits[colony.uuid] = {
      ...colony,
      posts: fullposts,
      unassignedPosts,
      livePost: {
        ...colony.livePost,
        postData: posts[colony.livePost.postID],
      }
    }
  })
  return {
    tidbits,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
