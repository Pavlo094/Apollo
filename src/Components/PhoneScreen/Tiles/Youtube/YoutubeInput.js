import React from 'react';
import { HideOptionWrapper } from 'AppComponents';

function YoutubeInputComponent({ isHidden, value, onChange, onBlur }) {
  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      style={{ width: '100%', backgroundColor: 'orange', padding: 0 }}
    ></input>
  )
}

export const YoutubeInput = HideOptionWrapper(YoutubeInputComponent);
