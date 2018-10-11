import React from 'react';
import { isNil } from 'lodash';
import './styles.css';

export function Button({ ...props }) {
  if (props.isHidden) {
    return null;
  }
  delete props.isHidden;
  let divClass = 'default-button-style';
  if (!isNil(props.className)) {
    divClass = `${props.className} default-button-style`;
    delete props.className;
  }
  return (
    <div
      className={divClass}
      {...props}
    ></div>
  )
}
