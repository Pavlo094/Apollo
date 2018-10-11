import React, { Component } from 'react';
import { Editor, EditorState, convertFromHTML, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { SortableElement } from 'react-sortable-hoc';
import { Button, HideOptionWrapper } from 'AppComponents';
import { EditOverlay } from '../EditOverlay';
import { OverlayButton } from '../OverlayButton';
import connect from './connect';


class TextTileComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.EditOverlay = HideOptionWrapper(EditOverlay);
  }

  onChange = (updatedEditorState) => {
    this.props.setEditorState({
      state: updatedEditorState,
    })
  }

  onSaveChanges = () => {
    const { textEditor, data, upsertTile, setEditorState } = this.props;
    const currentContent = textEditor.state.getCurrentContent();
    const html = stateToHTML(currentContent);
    const tile = {
      ...data,
      content: [[html]],
    };
    upsertTile({
      tile,
    })
      .then(() => {
        setEditorState({
          state: EditorState.createEmpty(),
        })
      })

  }

  componentDidUpdate(prevProps, prevState) {
    const { data, selectedTileID, setEditorState, textEditor } = this.props;
    if (prevProps.selectedTileID !== this.props.selectedTileID && selectedTileID === data.uuid) {
      this.props.setEditorState({
        state: EditorState.moveFocusToEnd(textEditor.state),
      })
    }
  }

  preventEvents = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const { selectedTileID, data, buttons, buttonFuncMap, onSelectTile, textEditor, selectedButton } = this.props;
    const { EditOverlay } = this;
    if (selectedTileID === data.uuid) {
      return (
        <div
          className='tile-flag'
          onClick={onSelectTile}
          data-uuid={data.uuid}
          style={{ position: 'relative', minHeight: 50, border: 'solid black 1px' }}
          onClick={this.preventEvents}
        >
          <div style={{ width: '100%' }}>
            <div style={{ backgroundColor: 'white' }}>
              <Editor
                editorState={textEditor.state}
                onChange={this.onChange}
                ref={ref => this.editor = ref}
              />
            </div>
            <Button
              onMouseDown={this.preventEvents}
              onClick={this.onSaveChanges}
              style={{ height: 20 }}
              >Save Changes</Button>
          </div>
          <EditOverlay
            isHidden={selectedTileID !== data.uuid}
            tileData={data}
            buttons={buttons.create}
            buttonFuncMap={buttonFuncMap}
            selectedButton={selectedButton}
            noCenterOverlay={true}
          />
        </div>
      )
    }
    const readOnlyContent = data.content[0][0].replace(/contenteditable="true"/g, 'contenteditable="false"');
    return (
      <div
        className='tile-flag textTile-container'
        onClick={onSelectTile}
        data-uuid={data.uuid}
        style={{ backgroundColor: 'lightgray', minHeight: 50 }}
        dangerouslySetInnerHTML={{ __html: readOnlyContent }}
      >
      </div>
    )
  }
}

export const TextTile = SortableElement(connect(TextTileComponent));
