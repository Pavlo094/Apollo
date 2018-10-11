import React, { Component } from 'react';
import DropzoneRaw from 'react-dropzone';
import { EditOverlay } from '../EditOverlay';
import generateUUID from 'uuid/v4';
import { HideOptionWrapper } from 'AppComponents';
import styled from 'styled-components';

const TileContainer = styled.div`
  height: 300px;
  width: 100%;
  background-color: green;
  position: relative;
  border: solid black 1px;
`;

const Dropzone = styled(DropzoneRaw)`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: orange;
`;

export class DraftImageTile extends Component {
  constructor(props, context) {
    super(props, context);

    this.EditOverlay = HideOptionWrapper(EditOverlay);
  }

  handleCreateImageTile = (fileData) => {
    const { data } = this.props;
    const tile = {
      ...data,
    }
    this.props.upsertTile({
      tile,
      imgFiles: fileData
    });
  }

  handleRejectedDropFile = () => {
    alert('only the following file types are accepted:\n.jpeg\n.jpg\n.png');
  }

  render() {
    const {
      data,
      onSelectTile,
      selectedTileID,
      buttons,
      buttonFuncMap,
      selectedButton,
    } = this.props;

    const isHidden = selectedTileID !== this.props.data.uuid;
    const { EditOverlay } = this;
    return (
      <TileContainer
        className='tile-flag'
        data-uuid={data.uuid}
        onClick={onSelectTile}
      >
        <EditOverlay
          isHidden={isHidden}
          tileData={data}
          buttons={buttons.create}
          buttonFuncMap={buttonFuncMap}
          selectedButton={selectedButton}
          noCenterOverlay={true}
        />
        <Dropzone
          multiple={false}
          accept='.jpg, .png, .jpeg'
          onDropAccepted={this.handleCreateImageTile}
          onDropRejected={this.handleRejectedDropFile}
          disabled={isHidden}
        >Drag and Drop Image</Dropzone>
      </TileContainer>
    );
  }
}
