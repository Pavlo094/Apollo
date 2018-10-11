import { createAction } from 'AppUtils';

export const SET_DRAFT_TILE = 'draftTiles/SET_DRAFT_TILE';
export const CLEAR_DRAFT_TILES = 'draftTiles/CLEAR_DRAFT_TILES';

export const draftTileActionCreators = {
  setDraftTile: createAction(SET_DRAFT_TILE),
  clearDraftTiles: createAction(CLEAR_DRAFT_TILES),
}
