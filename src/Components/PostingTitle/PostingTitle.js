import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function PostingTitle ({ title, number }) {
  return (
    <div id='post-create-title'>
      <div id='posting-title-left'>
        <h1 id='number'>{number}</h1>
      </div>
      <div id='posting-title-middle'>
        <p id='text'>{title}</p>
      </div>
      <div id='posting-title-right'></div>
    </div>
  )
}
