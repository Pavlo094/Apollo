import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function PostingTileHeader ({ title, onClosePress }) {
  return (
    <div id='title'>
      <div id='modal-close' onClick={onClosePress}>
        <i className="far fa-times-circle" id='close-icon'></i>
      </div>
      {title}
    </div>
  )
}
