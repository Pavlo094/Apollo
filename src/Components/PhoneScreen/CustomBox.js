import React from 'react';
import { isNil } from 'lodash';
import { DialogueBox } from './DialogueBox';
import { InputBox } from './InputBox';

export function CustomBox(props) {
  if (props.isHidden) {
    return null;
  }
  if (!isNil(props.data.dialogueBox)) {
    return (<DialogueBox {...props} />)
  }
  if (!isNil(props.data.inputBox)) {
    return (<InputBox {...props} />)
  }
  return null;
}
