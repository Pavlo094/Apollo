import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { isNil } from 'lodash';
import { HideOptionWrapper } from 'AppComponents';
import { Youtube } from './Youtube';
import { EditOverlay } from '../EditOverlay';

const BlockingOverlay = () => {
  return (
    <div className='blocking-overlay' style={{ height: 350, width: '100%', position: 'absolute'}}></div>
  )
}

class YoutubeTileComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.EditOverlay = HideOptionWrapper(EditOverlay);
    this.BlockingOverlay = HideOptionWrapper(BlockingOverlay);

  }

  handleUpdateTile = (updatedUrl) => {
    const { data, upsertTile } = this.props;
    const tile = {
      ...data,
      content: updatedUrl,
    };
    upsertTile({
      tile,
    })
      .then(() => {
        this.props.clearDraftTiles();
      })
  }

  render() {
    const { data, onSelectTile, selectedTileID, buttons, buttonFuncMap, selectedButton } = this.props;
    const { EditOverlay, BlockingOverlay } = this;
    const isEditHidden = selectedTileID !== data.uuid || selectedButton !== 'edit';
    const isBlocking = selectedTileID !== data.uuid || (!isNil(selectedButton) && selectedButton !== 'edit');

    return (
      <div
        className='phone-youtube-container tile-flag'
        onClick={onSelectTile}
        data-uuid={data.uuid}
      >
        <Youtube
          url={data.content}
          isEditHidden={isEditHidden}
          onSubmitUrl={this.handleUpdateTile}
        />
        <BlockingOverlay
          isHidden={!isBlocking}
        />
        <EditOverlay
          isHidden={selectedTileID !== data.uuid}
          tileData={data}
          buttons={buttons.edit}
          buttonFuncMap={buttonFuncMap}
          selectedButton={selectedButton}
          noCenterOverlay={true}
        />
      </div>
    );
  }
}

export const YoutubeTile = SortableElement(YoutubeTileComponent);
