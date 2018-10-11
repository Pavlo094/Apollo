import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import { isNil } from 'lodash';
import { Button } from 'AppComponents';
import { TOOLBAR_BUTTON_GROUPS } from './ToolBarButtons';
import { ToolBarButton } from './ToolBarButton';
import connect from './connect';
import './styles.css';

class ToolBarComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  toggleInlineStyle = (inlineStyle) => {
    const { textEditor, setEditorState, selectedTile } = this.props;
    if (!isNil(selectedTile)) {
      const updatedEditorState = RichUtils.toggleInlineStyle(textEditor.state, inlineStyle);
      setEditorState({
        state: updatedEditorState,
      })
    }
  }

  toggleBlockType = (blockType) => {
    const { textEditor, setEditorState, selectedTile } = this.props;
    if (!isNil(selectedTile)) {
      const updatedEditorState = RichUtils.toggleBlockType(textEditor.state, blockType);
      setEditorState({
        state: updatedEditorState,
      })
    }
  }

  render() {
    return (
      <div className='toolbar-container'>
      {TOOLBAR_BUTTON_GROUPS.map(btnGroup => {
        return (
          <div style={{
            width: btnGroup.width,
            backgroundColor: btnGroup.style.backgroundColor,
          }}
          className='toolbar-button-group-container'
          key={btnGroup.groupName}
        >
            {btnGroup.buttons.map(button => {
              return (
                <ToolBarButton
                  data={button}
                  onClick={this[button.fn]}
                  key={button.editorLabel}
                />
              )
            })}
          </div>
        )
      })}
      </div>
    );
  }
}

export const ToolBar = connect(ToolBarComponent);
