import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Network } from 'AppServices';
import { PostList, Route, EditPost, Modal, Loading } from 'AppComponents';
import { Post } from 'AppScenes';
import { isNil, isEmpty, map, get } from 'lodash';
import connect from './connect';

class EditPosts extends Component {
  constructor(props, context) {
    super(props, context);
  }

  routeToPost = (id) => {
    this.props.setSelectedPost({
      isDraft: false,
      id,
    })
    this.props.history.push('/home/post/edit');
  }

  displayModal = (modal) => {
    this.setState({
      currentModal: modal,
    })
  }

  render() {
    if (isNil(this.props.postsData)) {
      return (
        <Loading />
      )
    }
    return (
      <PostList
        postsData={this.props.postsData}
        onTouchPost={this.routeToPost}
      />
    )
  }
}

export default withRouter(connect(EditPosts));
