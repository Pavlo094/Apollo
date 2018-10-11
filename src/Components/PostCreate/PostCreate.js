import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { isNil } from 'lodash';
import {
  PostingTitle,
  PostingTileHeader,
  TextTileEditor,
  ImageTileEdit,
} from 'AppComponents';
import connect from './connect';
import './styles.css';

class PostCreate extends Component {
  static propTypes = {

  };

  handleCreateTile = () => {
    console.log('tileContent = ', this.textEditor.getInnerHtml());
  };

  displayModal = (modalType) => {
    const { setModal, activePost } = this.props;
    if (isNil(activePost.uuid)) {
      alert('no active post/draft data, cannot create tile');
      return;
    }
    setModal({
      activeModal: modalType,
    })
  }

  displayTextTileModal = () => {
    this.displayModal('TextTile');
  };

  displayImageTileModal = () => {
    this.displayModal('ImageTile');
  };

  displayYouTubeTileModal = () => {
    this.displayModal('YouTubeTile');
  };

  displayDiscardDraftModal = () => {
    this.displayModal('DiscardPost');
  }

  render() {
    const discardText = this.props.activePost.isDraft ? 'Discard Draft' : 'Discard Post';
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
            onClick={this.displayTextTileModal}>
              <i className="fas fa-font"></i>
              <i className="fas fa-plus-circle"></i>
            </button>
            <div className='left-text-container'>
              <h4 id='left-text'>Text tile</h4>
            </div>
          </div>
          <div id='button-group-container'>
            <button id='create-tile-button' onClick={this.displayYouTubeTileModal}>
              <i className="fab fa-youtube"></i>
              <i className="fas fa-plus-circle"></i>
            </button>
            <div className='left-text-container'>
              <h4 id='left-text'>YouTube tile</h4>
            </div>
          </div>
          <div id='button-group-container'>
            <button id='create-tile-button' onClick={this.displayImageTileModal}>
              <i className="fas fa-image"></i>
              <i className="fas fa-plus-circle"></i>
            </button>
            <div className='left-text-container'>
              <h4 id='left-text'>Image tile</h4>
            </div>
          </div>
        </div>
        <div id='discard-draft-button-container'>
          <div id='discard-button-container'>
            <button id='discard-draft-button'
            onClick={this.displayDiscardDraftModal}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <div className='right-text-container'>
              <h4 id='right-text'>{discardText}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(PostCreate));
