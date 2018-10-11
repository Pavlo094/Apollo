import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { HideOptionWrapper } from 'AppComponents';
import { EditOverlay } from '../EditOverlay';

import styled from 'styled-components';

const TileContainer = styled.div`
  width: 100%;
  background-color: pink;
  position: relative;
  border: solid black 1px;
`;

const Img = styled.img`
  width: 100%;
  vertical-align: middle;
`;

class ImageTileComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.EditOverlay = HideOptionWrapper(EditOverlay);
  }

  render() {
    const { data, onSelectTile, selectedTileID, buttons, buttonFuncMap, selectedButton } = this.props;
    const { EditOverlay,  } = this;
    return (
      <TileContainer
        className='tile-flag'
        onClick={onSelectTile}
        data-uuid={data.uuid}
      >
          <EditOverlay
            isHidden={selectedTileID !== data.uuid}
            tileData={data}
            buttons={buttons.edit}
            buttonFuncMap={buttonFuncMap}
            selectedButton={selectedButton}
          />
        <Img
          src={data.content[0]}
          // className='phone-image'
        ></Img>
      </TileContainer>
    );
  }
}

export const ImageTile = SortableElement(ImageTileComponent);
