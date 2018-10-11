import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generateUUID from 'uuid/v4';
import { PostingTileHeader, TextTileEditor, Button } from 'AppComponents';
import connect from './connect';
import './styles.css';


class TextTileModal extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  createOrUpdateTile = (event) => {
    const { selectedTile } = this.props;
    const tileContent = this.textEditor.getInnerHtml();
    let tile;
    if (selectedTile) {
      tile = {
        ...selectedTile,
        content: [[tileContent]],
      }
    } else {
      tile = {
        type: 'text',
        interaction_type: 'none',
        content: [[tileContent]],
        uuid: generateUUID(),
      }
    }
    this.props.upsertTile({
      tile,
    })
      .catch(err => {
        console.log('err form upsert Tile in text modal', err);
        alert('there was an issue adding/updating your post tile');
      })
  }

  handleClosePress = (event) => {
    this.props.setModal({
      activeModal: void(0),
    })
  };

  render() {
    const { selectedTile } = this.props;
    const isEditModal = selectedTile !== null;

    const modalTitle = isEditModal ? 'EDIT A TEXT TILE' : 'CREATE A TEXT OR LINK TILE';
    const buttonTitle = isEditModal ? 'EDIT TILE' : 'CREATE TILE';

    const htmlContent = selectedTile ? selectedTile.content[0][0] : null;

    return (
      <div id='modal-bg'>
        <div id="text-tile-container">
          <div id="background-overlay">
            <PostingTileHeader
            title={modalTitle}
            onClosePress={this.handleClosePress}
            />
            <div id='add-tile-container'>
              <TextTileEditor
                ref={ref => this.textEditor = ref}
                htmlContent={htmlContent}
              />
            </div>
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

export default connect(TextTileModal);
