import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { isEmpty, reduce } from 'lodash';
import { Tile } from './Tile';
import styled from 'styled-components';

const TilesContainer = styled.div`
  width: 100%;
`;

class PhoneTilesComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  addDraftTiles = (postTiles, draftTiles) => {
    const draftTilesArray = reduce(draftTiles, (result, tile) => {
      if (!isEmpty(tile)) {
        result.push(tile);
      }
      return result;
    }, []);
    return [...postTiles, ...draftTilesArray];
  }

  render() {
    const { data, onSelectTile, selectedTileID, buttons, draftTiles, upsertTile, clearDraftTiles, selectedButton } = this.props;
    const tiles = this.addDraftTiles(data, draftTiles);
    return (
      <TilesContainer>
        {tiles.map((tile, index) => {
          const tileButtons = tile.type === 'single-image' ? buttons.singleImage : buttons[tile.type];
          return (<Tile
            key={tile.uuid}
            data={tile}
            index={index}
            onSelectTile={onSelectTile}
            selectedTileID={selectedTileID}
            buttons={tileButtons}
            buttonFuncMap={buttons.onClick}
            upsertTile={upsertTile}
            clearDraftTiles={clearDraftTiles}
            disabled={tile.uuid === selectedTileID}
            selectedButton={selectedButton}
          />)
        })}
      </TilesContainer>
    );
  }
}

export const PhoneTiles = SortableContainer(PhoneTilesComponent);
