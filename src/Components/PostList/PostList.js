import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { Post } from './Post';
import './styles.css';

export default class PostList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    if (isEmpty(this.props.postsData)) {
      return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          YOU HAVE NO POSTS
        </div>
      )
    }
    return (
      <div className='post-list-container'>
        <div className='post-items-container'
        >
          {this.props.postsData.map(post => (
            <Post
              data={post}
              onTouchPost={this.props.onTouchPost}
              key={post.id}
            />
          ))}
        </div>
      </div>
    )
  }
}
