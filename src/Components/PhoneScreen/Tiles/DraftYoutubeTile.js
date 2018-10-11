import React, { Component } from 'react';
import { Button, HideOptionWrapper } from 'AppComponents';
import { isNil } from 'lodash';
import generateUUID from 'uuid/v4';
import { EditOverlay } from '../EditOverlay';
import { Youtube } from './Youtube';
import styled from 'styled-components';

const BlockingOverlay = styled.div`
  height: 450px;
  width: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const TileContainer = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
  border: solid black 1px;
`;

export class DraftYoutubeTile extends Component {
  constructor(props, context) {
    super(props, context);

    this.EditOverlay = HideOptionWrapper(EditOverlay);
    this.BlockingOverlay = HideOptionWrapper(BlockingOverlay);
  }

  handleCreateYoutube = (url) => {
    const { data, upsertTile } = this.props;
    const tile = {
      ...data,
      content: url,
    };
    upsertTile({
      tile,
    })
      .then(() => {
        this.props.clearDraftTiles();
      })
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

    const isHidden = this.props.selectedTileID !== this.props.data.uuid;
    const { EditOverlay, BlockingOverlay } = this;

    return (
      <TileContainer
        className='tile-flag'
        data-uuid={data.uuid}
        onClick={onSelectTile}
      >
        <Youtube
          url={data.content}
          isEditHidden={false}
          onSubmitUrl={this.handleCreateYoutube}
        />
        <BlockingOverlay
          isHidden={!isHidden}
        />
        <EditOverlay
          isHidden={isHidden}
          tileData={data}
          buttons={buttons.create}
          buttonFuncMap={buttonFuncMap}
          selectedButton={selectedButton}
          noCenterOverlay={true}
        />
      </TileContainer>
    )
  }
}
