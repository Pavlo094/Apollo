import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { isNil, isEmpty } from 'lodash';
import generateUUID from 'uuid/v4';
import {
  PostButton,
  PostingTitle,
  PostingTileHeader,
  TextTileEditor,
  ImageTileEdit,
} from 'AppComponents';
import connect from './connect';

class TileCreate extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleCreateTile = (tileType) => {
    const { draftTiles } = this.props;
    if (tileType === 'text' && !isEmpty(draftTiles.text)) {
      this.props.setSelectedTile({
        selectedTileID: draftTiles.text.uuid,
      });
      return;
    }
    const createdTile = {
      type: tileType === 'singleImage' ? 'single-image' : tileType,
      interaction_type: 'none',
      isDraftTile: true,
      uuid: generateUUID(),
    };
    this.props.createDraftTile({
      tile: createdTile,
    })
  }

  onClickText = () => {
    this.handleCreateTile('text');
  }

  onClickYoutube = () => {
    this.handleCreateTile('youtube');
  }

  onClickImage = () => {
    this.handleCreateTile('singleImage');
  }

  render() {
    const {
      submitPost,
      isPostingDisabled,
    } = this.props;

    return (
      <div id='post-create-container'>
        <div
          id='create-buttons-container'
          style={{
            top: this.props.topOffset
          }}
        >
          <div id="add-tile-label">ADD TILES:</div>
          <div id='button-group-container'>
            <button id='create-tile-button'
            onClick={this.onClickText}>
              <i className="fas fa-font"></i>
              <i className="fas fa-plus-circle"></i>
            </button>
            <div className='left-text-container'>
              <h4 id='left-text'>Text tile</h4>
            </div>
          </div>
          <div id='button-group-container'>
            <button id='create-tile-button' onClick={this.onClickYoutube}>
              <i className="fab fa-youtube"></i>
              <i className="fas fa-plus-circle"></i>
            </button>
            <div className='left-text-container'>
              <h4 id='left-text'>YouTube tile</h4>
            </div>
          </div>
          <div id='button-group-container'>
            <button id='create-tile-button' onClick={this.onClickImage}>
              <i className="fas fa-image"></i>
              <i className="fas fa-plus-circle"></i>
            </button>
            <div className='left-text-container'>
              <h4 id='left-text'>Image tile</h4>
            </div>
          </div>
        </div>
        <PostButton
          submitPost={submitPost}
          isPostingDisabled={isPostingDisabled}
          topOffset={this.props.topOffset}
          />
      </div>
    );
  }
}

export default withRouter(connect(TileCreate));
