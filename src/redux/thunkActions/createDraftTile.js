import { Editor, EditorState } from 'draft-js';
import { setAndSelectDraftTile } from '../sharedActions';

export function createDraftTile({ tile }) {
  return (dispatch, getState) => {
    let editorState;
    if (tile.type === 'text') {
      editorState = EditorState.createEmpty();
    }
    dispatch(setAndSelectDraftTile({
      tile: {
        [tile.type]: tile,
      },
      selectedTileID: tile.uuid,
      editorState: editorState,
    }));
  }
}
