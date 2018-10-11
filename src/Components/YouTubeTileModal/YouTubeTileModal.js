import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, get, cloneDeep } from 'lodash';
import generateUUID from 'uuid/v4';

import { PostingTileHeader, Button } from 'AppComponents';
import connect from './connect';
import './styles.css';

const YT_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

class YouTubeTileModal extends Component {
  static propTypes = {

  }

  constructor(props, context) {
    super(props, context);
    const youtubeUrl = get(props.selectedTile, 'content');
    const validUrl = youtubeUrl && this.validYoutubeLink(youtubeUrl)
    this.state = {
      youtubeUrl: youtubeUrl || "",
      validUrl: validUrl || false
    };

    this.isEditing = !isNil(youtubeUrl)
  }

  handleClosePress = () => {
    this.props.setModal({
      activeModal: void(0),
    })
  }

  handleUrlChange = (e) => {
    this.setState({
      youtubeUrl: e.target.value,
      validUrl: this.validYoutubeLink(e.target.value)
    });
  }

  createOrUpdateTile = (e) => {
    const { selectedTile } = this.props;
    if (!this.state.validUrl) {
      alert('not a valid youtube url');
      return;
    }
    const shortYouTubeId = this.state.youtubeUrl.match(YT_REGEX)[2];
    const shortUrl = `https://youtu.be/${shortYouTubeId}`;
    let tile;
    if (isNil(selectedTile)) {
      tile = {
        type: 'youtube',
        interaction_type: 'none',
        content: shortUrl,
        uuid: generateUUID(),
      };
    } else {
      tile = {
        ...selectedTile,
        content: shortUrl,
      }
    }
    this.props.upsertTile({
      tile,
    })
      .catch(err => {
        console.log('err form upsert Tile in you tube modal', err);
        alert('there was an issue adding/updating your tile');
      })
  }

  validYoutubeLink = (url) => {
    const match = url.match(YT_REGEX);
    return match && match[2].length === 11; // returns true if valid link format
  }

  renderYoutubePlaceholder = () => {
    return (
      <div className='play-button-container'>
        <img
          className='play-button'
          src='http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c500.png'
        />
      </div>
    )
  }

  renderYoutubePreview = () => {
    if (this.state.validUrl) {
      const { youtubeUrl } = this.state;
      const youtubeId = youtubeUrl.match(YT_REGEX)[2];

      return(
        <iframe
          width="100%"
          height="60%"
          src={'https://www.youtube.com/embed/' + youtubeId + '?autoplay=0&enablejsapi=1'}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen>
        </iframe>
      )
    } else {
      return this.renderYoutubePlaceholder();
    }
  }

  render() {
    const { dismissModal } = this.props;
    const { isEditing } = this;
    const modalTitle = `${ isEditing ? 'EDIT' : 'CREATE' } A YOUTUBE TILE`;
    const buttonTitle = isEditing ? 'SAVE CHANGES' : 'CREATE TILE';

    return (
      <div id='modal-bg'>
        <div id="text-tile-container">
          <div id="background-overlay">
            <PostingTileHeader
              title={modalTitle}
              onClosePress={this.handleClosePress}
            />
            <div className='preview-container'>
              { this.renderYoutubePreview() }
            </div>
            <input
              className='url-input'
              placeholder='Enter YouTube URL'
              onChange={this.handleUrlChange}
              value={this.state.youtubeUrl}
            />
            <div id='button-container'>
              <Button id="submit-tile-button"
                onClick={this.createOrUpdateTile}>{buttonTitle}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(YouTubeTileModal);
