import React from 'react';
import './styles.css';

export function SingleImage({ url }) {
  return (
    <img src={url} className="single-image"></img>
  )
}
