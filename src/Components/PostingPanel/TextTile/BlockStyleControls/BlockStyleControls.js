import React, { Component } from 'react';
import './styles.css';
import { BlockStyleButton } from './BlockStyleButton';

export function BlockStyleControls (props) {

  const { editorState } = props;

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="toolbar-block-button-group">
      {props.items.map((type) =>
        <BlockStyleButton
          key={type.label}
          active={type.fn === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          fn={type.fn}
        />
      )}
    </div>
  );
}
