import { Network } from 'AppServices';
import { transformToDataURL, transformTilesTo } from 'AppUtils';
import { upsertPost } from './upsertPost';
import { uiActionCreators } from '../ui';
import { postActionCreators } from '../posts';
import { draftActionCreators } from '../drafts';
import { draftTileActionCreators } from '../draftTiles';
import { clearSelectedDraftTile } from '../sharedActions';
import { findIndex, isNil } from 'lodash';
const { setModalAndTile, setSelectedTile } = uiActionCreators;
const { setPost } = postActionCreators;
const { setDraft } = draftActionCreators;
const { clearDraftTiles } = draftTileActionCreators;

function handleTileUpsert(arr, updatedElement, elementIndex) {
  let updatedArr;
  if (elementIndex !== -1) {
    updatedArr = [...arr];
    updatedArr[elementIndex] = updatedElement
    return updatedArr;
  }
  return [...arr, updatedElement];
}

export function upsertTile(tileData) {
  return (dispatch, getState) => {
    const { ui, drafts, posts } = getState();
    const { isDraftSelected, selectedPostID, selectedTileID } = ui;
    const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    const prevStatePostTiles = selectedPost.postTiles;
    const indexToUpdate = findIndex(selectedPost.postTiles, { uuid: selectedTileID });
    let eagerTile = {
      ...tileData.tile,
    };
    const { isDraftTile } = eagerTile;
    delete eagerTile.isDraftTile;
    let tileContent = eagerTile.content;
    let tilePromise = Promise.resolve(tileContent);
    if (!isNil(tileData.imgFiles)) {
      tilePromise = transformToDataURL(tileData.imgFiles[0])
        .then(dataURL => [[dataURL]]);
    }
    return tilePromise
      .then(tileContent => {
        eagerTile = {
          ...eagerTile,
          content: tileContent,
        };
        const eagerTiles = handleTileUpsert(selectedPost.postTiles, eagerTile, indexToUpdate);
        const eagerUpdatedPost = {
          ...selectedPost,
          postTile: eagerTiles,
        };
        const setSelectedPost = isDraftSelected ? setDraft : setPost;
        return dispatch(setSelectedPost({
          ...selectedPost,
          postTiles: eagerTiles
        }))
      })
      .then(() => {
        if (isDraftTile) {
          dispatch(clearSelectedDraftTile());
        }
        else {
          dispatch(setSelectedTile({
            selectedTileID: void(0),
          }))
        }
        // if there is imgData then we need to upload the img before updating the tile
        // if there is no imgData we just pass the updated tile through a successful promise
        let uploadPromise;
        if (isNil(tileData.imgFiles)) {
          uploadPromise = Promise.resolve(eagerTile);
        }
        else {
          uploadPromise = Network.service['images'].post({
            data: tileData.imgFiles[0],
          })
          .then(imgURL => {
            const addedTile = {
              ...eagerTile,
              content: [[imgURL]],
            };
            return addedTile;
          })
        }
        // TODO: Implement a recovery system for draft content on errors
        return uploadPromise
      })
      .then(updatedTile => {
        const updatedTiles = handleTileUpsert(selectedPost.postTiles, updatedTile, indexToUpdate);
        return dispatch(upsertPost({
          ...selectedPost,
          postTiles: transformTilesTo('server', updatedTiles),
        }))
      })
      .catch(err => {
        dispatch(setPost({
          ...selectedPost,
          postTiles: prevStatePostTiles,
        }))
        return Promise.reject(err);
      })
  }
}
