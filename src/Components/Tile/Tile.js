import React from 'react';
import { Button, TileContent } from 'AppComponents';
import './styles.css';

export function Tile({
  style,
  handleArrowUp,
  handleArrowDown,
  beginTileEdit,
  tileData: tile,
  beginTileInteractionEdit,
  deleteTile
}) {
  let tileClassName = style;
  let tileCenterClassName = 'tile-center';

  if (tile.type === 'text') {
    tileClassName += ' auto-grow';
    tileCenterClassName += ' auto-grow';
  }

  return (
    <div className={tileClassName} data-tile-uuid={tile.uuid}>
      <div className="tile-buttons-container">
        <div className="edit-tile-buttons-container">
          <Button
          className="modify-tile-button delete-tile-button"
          onClick={deleteTile}
          >
          <i className="fas fa-trash"></i>
          </Button>
          <Button
            className="modify-tile-button edit-tile-button"
            onClick={beginTileEdit}
          >
            <i className="fas fa-edit"></i>
          </Button>
        </div>
      </div>
      <Button
        className="tile-button arrow-button up-arrow"
        onClick={handleArrowUp}
      >
        <i className="fa fa-arrow-circle-up"></i>
      </Button>
      <Button
        className="tile-button arrow-button down-arrow"
        onClick={handleArrowDown}
      >
        <i className="fa fa-arrow-circle-down"></i>
      </Button>
      <div className={tileCenterClassName}>
        <TileContent
          tileData={tile}
        />
      </div>
    </div>
  )
}
