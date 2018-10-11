import React from 'react';
import { Button } from 'AppComponents';

export function EditButtons({
  saveColony,
  toggleConfirmDisplay,
  hideDeleteButton,
  buttonText,
  isDisplayingConfirmDelete,
  removeColony
}) {
  if (isDisplayingConfirmDelete) {
    return (
      <div id='colony-modal-confirm-delete-container'>
        <div id='colony-modal-confirm-delete-text'>
          Are you sure you want to delete this forum colony?
        </div>
        <div id='colony-modal-button-container'>
          <Button
            className='primary-inverse'
            id='deny-delete-colony-button'
            onClick={toggleConfirmDisplay}
          >NO</Button>
          <Button
            className='primary-inverse'
            id='confirm-delete-colony-button'
            onClick={removeColony}
          >YES</Button>
        </div>
      </div>
    )
  }
  return (
    <div id='colony-modal-button-container'>
      <Button
        className='primary-inverse'
        id='delete-edit-colony-button'
        onClick={toggleConfirmDisplay}
        isHidden={hideDeleteButton}
      >DELETE</Button>
      <Button
        className='primary-inverse'
        id='create-edit-colony-button'
        onClick={saveColony}
      >
        {buttonText}
      </Button>
    </div>
  )
}
