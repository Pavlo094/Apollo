import React from 'react';
import {
  TextTile,
  ImageTile,
  YoutubeTile,
  DraftTextTile,
  DraftYoutubeTile,
  DraftImageTile
} from './Tiles';

const componentMap = {
  text: {
    draft: DraftTextTile,
    tile: TextTile,
  },
  youtube: {
    draft: DraftYoutubeTile,
    tile: YoutubeTile,
  },
  singleImage: {
    draft: DraftImageTile,
    tile: ImageTile,
  }
}

export function Tile(props) {
  const tileType = props.data.type === 'single-image' ? 'singleImage' : props.data.type;
  const tileState = props.data.isDraftTile ? 'draft' : 'tile';
  const SelectedComponent = componentMap[tileType][tileState];
  return <SelectedComponent {...props} />
}
