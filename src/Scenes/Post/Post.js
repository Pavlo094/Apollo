import React from 'react';
import {
  Route,
} from 'AppComponents';
import {
  PostCreate,
  EditPost,
  EditTidBit,
  EditTabPost,
} from 'AppScenes';

export function Post(args) {

  const sharedProps = {
    ownUserColony: args.ownUserColony,
    onEditTile: args.onEditTile,
    onEditTileInteraction: args.onEditTileInteraction,
    onDeleteTile: args.onDeleteTile,
    onChangeTileOrder: args.onChangeTileOrder,
    postData: args.postData,
    updatePost: args.updatePost,
    submitPost: args.submitPost,
    selectedTileID: args.selectedTileID,
    draftTiles: args.draftTiles,
  }

  return (
    <div>
      <Route
        path='/home/post/create'
        component={PostCreate}
        tidbitColonies={args.tidbitColonies}
        forumColonies={args.forumColonies}
        profileColonies={args.profileColonies}
        {...sharedProps}
      />
      <Route
        path='/home/post/edit'
        component={EditPost}
        {...sharedProps}
      />
      <Route
        path='/home/post/editTidBit'
        component={EditTidBit}
        {...sharedProps}
      />
      <Route
        path='/home/post/editTab'
        component={EditTabPost}
        {...sharedProps}
      />
    </div>
  )
}
