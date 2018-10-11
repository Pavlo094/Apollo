import React from 'react';
import { isNil } from 'lodash';
import { defaultImage } from 'AppConstants';
import './styles.css';

function handleTouch(uuid, routeToPost) {
  return () => {
    routeToPost(uuid);
  }
}

export function Post({ data, onTouchPost }) {
  const colonyUUID = data.postColonies[0];
  const postUUID = `${colonyUUID}_${data.resource}`;
  let postImg = data.thumbnailImagePath;
  if (data.thumbnailImagePath === '' || isNil(data.thumbnailImagePath)) {
    postImg = defaultImage
  }
  return (
    <div
      style={{ height: 300, width: 250, backgroundColor: 'lightgreen', margin: 25 }}
      onClick={handleTouch(postUUID, onTouchPost)}
    >
      <div id='post-test' style={{ height: 250, width: '100%' }}>
        <img src={postImg} style={{ height: '100%', width: '100%', objectFit: 'contain'}}></img>
      </div>
      <div id='post-title'>
        <p id='post-text'>{data.postTitle}</p>
      </div>
    </div>
  )
}
