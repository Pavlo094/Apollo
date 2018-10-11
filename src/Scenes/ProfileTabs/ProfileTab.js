import React, { Component } from 'react';
import { get } from 'lodash';
import { Button } from 'AppComponents';

export const ProfileTab = ({ data, ownUserIcons, onHover, onLeave, onSelect, hasTabPost }) => {
  const ownUserHasProfilePost = get(ownUserIcons[data.type], 'isDraft', true) === false;
  const tabColor = hasTabPost ? 'blue' : 'lightgray';
  return (
    <Button style={{
      margin: '0px 20px',
      height: 150,
      width: 150,
      backgroundColor: tabColor,
      display: 'flex',
      justifyContent: 'center',
      'alignItems': 'center',
    }}
    onClick={onSelect}
    onMouseOver={(e) => {
      onHover(e, hasTabPost);
    }}
    onMouseLeave={onLeave}
    data-icon={data.type}
    className='profile-tab-container'
    >
      <i className={`fa ${data.icon} fa-4x`}></i>
    </Button>
  )
}
