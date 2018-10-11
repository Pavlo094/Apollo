import React from 'react';

function HideOptionWrapper(ReactComponent) {
  return ({ isHidden, ...props }) => {
    if (isHidden) {
      return null
    }
    return (
      <ReactComponent
        {...props}
      />
    )
  }
}

export { HideOptionWrapper };
