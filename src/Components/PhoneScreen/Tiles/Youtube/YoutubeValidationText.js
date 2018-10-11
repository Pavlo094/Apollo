import React from 'react';
import { HideOptionWrapper } from 'AppComponents';

export function YoutubeValidationText({ validationErrorText }) {
  if (validationErrorText === '') {
    return null;
  }
  return (
    <p>{validationErrorText}</p>
  )
}
