import { Network } from 'AppServices';
import { transformColoniesTo } from 'AppUtils';
import { forOwn, isNil } from 'lodash';
import { setColonies } from '../sharedActions';
import { uiActionCreators } from '../ui';
const { setModal } = uiActionCreators;

function uploadImage(files) {
  const file = files[0];
  return Network.service['images'].post({
    data: file,
  })
}

function uploadColonyImages(imgFiles) {
  const imgUploads = [];
  if (!isNil(imgFiles.thumbnail)) {
    imgUploads.push(uploadImage(imgFiles.thumbnail));
  }
  else {
    imgUploads.push(null)
  }
  if (!isNil(imgFiles.background)) {
    imgUploads.push(uploadImage(imgFiles.background));
  }
  else {
    imgUploads.push(null);
  }
  return Promise.all(imgUploads);
}


export function upsertColony(colonyData) {
  return (dispatch, getState) => {
    dispatch(setModal({
      activeModal: void(0),
    }))
    let uploadPromise;
    let updatedColony;
    const { colony, imgFiles } = colonyData;
    if (isNil(colonyData.imgFiles)) {
      uploadPromise = Promise.resolve(colony);
    }
    else {
      uploadPromise = uploadColonyImages(imgFiles)
        .then(results => {
          const thumbnailURL = results[0];
          const backgroundURL = results[1];
          const colonyToUpdate = {
            ...colony,
            development: colony.type === 'forum' && process.env.NODE_ENV === 'development',
          };
          if (!isNil(thumbnailURL)) {
            colonyToUpdate.thumbnailImagePath = thumbnailURL;
          }
          if (!isNil(backgroundURL)) {
            colonyToUpdate.backgroundImagePath = backgroundURL;
          }
          return colonyToUpdate;
        })
    }
    uploadPromise
      .then(colonyWithNewImages => {
        updatedColony = colonyWithNewImages;
        const colonyServerVersion = transformColoniesTo('server', [updatedColony])[0];
        if (isNil(updatedColony.uuid)) {
          return Network.service['colonies'].post({
            data: colonyServerVersion,
          })
        }
        return Network.service['colonies'].patch({
          id: updatedColony.uuid,
          data: colonyServerVersion,
        })
      })
      .then(result => {
        const resultColonyDetails = transformColoniesTo('client', [result])[0];
        const { type, uuid } = resultColonyDetails;
        dispatch(setColonies({
          [type]: {
            [uuid]: resultColonyDetails
          },
        }));
      })
  }
}
