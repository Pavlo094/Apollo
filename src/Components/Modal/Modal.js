import React from 'react';
import {
  ImageTileModal,
  TextTileModal,
  PostThumbnailModal,
  YouTubeTileModal,
  DiscardPostModal,
  InteractionTypeModal,
  ColonyModal,
  ColonySelectModal,
  DraftImageTileModal,
} from 'AppComponents';

const modalsMap = {
  ImageTile: ImageTileModal,
  TextTile: TextTileModal,
  PostThumbnail: PostThumbnailModal,
  YouTubeTile: YouTubeTileModal,
  DiscardPost: DiscardPostModal,
  InteractionType: InteractionTypeModal,
  Colony: ColonyModal,
  DraftImageTile: DraftImageTileModal,
  ColonySelect: ColonySelectModal
}

export function Modal({ activeModal, shouldRender, ...otherArgs }) {
  const ModalComponent = modalsMap[activeModal];
  if (shouldRender) {
    return (
      <ModalComponent
        {...otherArgs}
      />
    );
  }
  return null;
}
