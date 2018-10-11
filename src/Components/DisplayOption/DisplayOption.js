import React from 'react';

function DisplayOption(ReactComponent) {
  return ({ noDisplay, ...props }) => {
    if (noDisplay) {
      return null
    }
    return (
      <ReactComponent
        {...props}
      />
    )
  }
}

export { DisplayOption };
