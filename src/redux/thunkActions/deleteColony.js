import { Network } from 'AppServices';
import { colonyActionCreators } from '../forumColonies';
import { uiActionCreators } from '../ui';
const { omitColony } = colonyActionCreators;
const { setModal } = uiActionCreators;

export function deleteColony({ uuid }) {
  return (dispatch, getState) => {
    dispatch(setModal({
      activeModal: void(0),
    }))
    return Network.service['colonies'].delete({
      id: uuid,
    })
      .then(response => {
        dispatch(omitColony({
          uuid,
        }))
      })
  }
}
