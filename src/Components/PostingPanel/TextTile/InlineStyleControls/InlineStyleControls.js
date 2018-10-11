import React, { Component } from 'react';
import './styles.css';
import { InlineStyleButton } from './InlineStyleButton';

export function InlineStyleControls (props) {

  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="toolbar-inline-button-group">
      {props.items.map(type =>
        <InlineStyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
}
