import React, { Component } from 'react';
import './styles.css';
import { ColorButton } from './ColorButton';

const FONT_LABEL = {
  "BACKGROUND COLOR": "background-color",
  "TEXT COLOR": "text-color",
  "Font": "font-style"
}

export function ColorControls (props) {

  return (
    <div className="toolbar-button-group" id={FONT_LABEL[props.label]}>
      <ColorButton
        key={'color-button'}
        active={props.isOpened}
        label={props.label}
        onToggle={() => props.onToggle()}
      />
    </div>
  );
}
