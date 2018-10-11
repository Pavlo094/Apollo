import { uiActionCreators } from '../ui';
const { setModalAndTile } = uiActionCreators;

export function editTileInteraction({ selectedTileID }) {
  return (dispatch, getState) => {
    return dispatch(setModalAndTile({
      activeModal: 'InteractionType',
      selectedTileID: selectedTileID,
    }))
  }
}
