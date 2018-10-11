import { map } from 'lodash';
import { Network } from 'AppServices';
import { upsertColony } from './upsertColony';
import { setColonies } from '../sharedActions';

export function updateTidBit({ uuid, postList}) {
  return (dispatch, getState) => {
    const { tidbitColonies } = getState();
    const selectedTidBit = tidbitColonies[uuid];
    const postListServerVersion = postList.map(postID => {
      const postIDArray = postID.split('_');
      return `${postIDArray[1]}_${postIDArray[2]}`;
    })
    dispatch(setColonies({
      tidbit: {
        [uuid]: {
          ...selectedTidBit,
          postList,
          unassignedPostList: [],
        },
      }
    }))
    return Network.service['tidbitQueue'].update({
      id: uuid,
      data: {
        sequence: postListServerVersion,
      }
    })
  }
}
