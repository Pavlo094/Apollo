import React from 'react';

export function Text({ isHidden, ...props }) {
  if (isHidden) {
    return null;
  }
  return (
    <p {...props} />
  )
}
