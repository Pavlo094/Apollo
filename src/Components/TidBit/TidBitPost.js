import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';

const handleOnClick = (post, onTouchPost) => {
  return () => {
    const postID = `${post.postColonies[0]}_${post.resource}`;
    onTouchPost(postID);
  }
}
//marker
const TidBitPost = ({ post, isUnassigned, onTouchPost }) => {
  const defaultImgContainerStyle = 'tidbitpost-img-container';
  const imgContainerStyle = isUnassigned ? defaultImgContainerStyle + ' unqueued' : defaultImgContainerStyle;
  return (
    <div className='tidbitpost-container' 
    onClick={handleOnClick(post, onTouchPost)}>
      <div className={imgContainerStyle}>
        <img className='tidbitpost-img' src={post.thumbnailImagePath}></img>
      </div>
      <div className='tidbitpost-txt-container'>
        <p className='tidbitpost-txt'>{post.postTitle}</p>
      </div>
    </div>
  )
}

export default SortableElement(TidBitPost);
