import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import TidBitPost from './TidBitPost';

function renderPostLists(posts, unassignedPosts, onTouchPost) {
  const postsLength = posts.length;
  const postElements = posts.map((post, index) => {
    return (
      <TidBitPost
        key={post.uuid}
        index={index}
        post={post}
        onTouchPost={onTouchPost}
      />
    )
  })
  const unassignedPostElements = unassignedPosts.map((post, index) => {
    return (
      <TidBitPost
        key={post.uuid}
        index={postsLength + index}
        post={post}
        isUnassigned={true}
        onTouchPost={onTouchPost}
      />
    )
  })
  return [...postElements, ...unassignedPostElements];
}

const TidBitList = ({ posts, unassignedPosts, onTouchPost }) => {
  return (
    <div className='tidbitlist-container'>
      {renderPostLists(posts, unassignedPosts, onTouchPost)}
    </div>
  )
}

export default SortableContainer(TidBitList);
