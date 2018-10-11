import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageTileEdit } from 'AppComponents';
import { Network } from 'AppServices';
import generateUUID from 'uuid/v4';
import connect from './connect';
import './styles.css';

class ImageTileModal extends Component {
  static propTypes = {

  }

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  handleClosePress = () => {
    this.props.setModal({
      activeModal: void(0),
    })
  }

  addOrUpdateTile = (tile, fileData) => {
    this.props.setModal({
      activeModal: void(0),
    });
    this.props.upsertTile({
      tile,
      imgFiles: fileData,
    })
      .catch(err => {
        console.log('error when adding or updating', err);
        alert('there was an error adding/updating your tile');
      })
  }

  render() {
    const { selectedTile } = this.props;
    return (
      <div id='modal-bg'>
        <div id='image-tile-container'>
            <ImageTileEdit
              onClosePress={this.handleClosePress}
              selectedTile={selectedTile}
              addOrUpdateTile={this.addOrUpdateTile}
            />
        </div>
      </div>
    );
  }
}

export default connect(ImageTileModal);
