import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import './styles.css';

class PostButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isPostingDisabled, submitPost } = this.props;
    const postButtonStyle = isPostingDisabled ? 'post-button-disabled' : 'post-button';
    return(
      <div
        id="post-button-container"
        style={{
          top: this.props.topOffset
        }}>
        <button
          className="finish-button"
          id={postButtonStyle}
          onClick={submitPost}
          disabled={isPostingDisabled}
        >FINISH</button>
        {/* <p id="colony-select-reminder">Select At Least 1 Colony To Post To</p> */}
      </div>
    )
  }
}

export default PostButton;
