import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import connect from './connect';
import generateUUID from 'uuid/v4';
import { Button, HideOptionWrapper } from 'AppComponents';
import { stateToHTML } from 'draft-js-export-html';
import { EditOverlay } from '../EditOverlay';
import styled from 'styled-components';

const TextEditorContainer = styled.div`
  position: relative;
  border: solid black 1px;
`;

const EditorContainer = styled.div`
  height: 200px;
  background-color: white;
  overflow: scroll;
`;

const StaticTileContainer = styled.div`
  word-wrap: break-word;
  border: solid black 1px;
  background-color: lightgray;
  min-height: 50px;
`;

class DraftTextTileComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      htmlContent: void(0),
    };

    this.EditOverlay = HideOptionWrapper(EditOverlay);
  }

  componentDidMount() {
    this.editor.focus();
  }

  componentWillReceiveProps(nextProps) {
    const { textEditor, selectedTileID, data } = this.props;
    const tileIsSelected = selectedTileID === data.uuid;
    const tileWillBeSelected = nextProps.selectedTileID === nextProps.data.uuid;
    if (tileIsSelected && !tileWillBeSelected) {
      const currentContent = textEditor.state.getCurrentContent();
      this.setState({
        htmlContent: stateToHTML(currentContent),
      })
    }
  }

  onChange = (editorState) => {
    this.props.setDraftEditorState({
      state: editorState,
    })
  }

  componentDidUpdate = (prevProps) => {
    const { selectedTileID, data, textEditor } = this.props;
    const tileIsSelected = selectedTileID === data.uuid;
    const tileWasSelected = prevProps.selectedTileID === prevProps.data.uuid;
    if (tileIsSelected && !tileWasSelected) {
      this.props.setEditorState({
        state: EditorState.moveFocusToEnd(textEditor.state),
      })
    }
  }

  handleCreateTextTile = () => {
    const { textEditor, upsertTile, setEditorState, data } = this.props;
    const currentContent = textEditor.state.getCurrentContent();
    const html = stateToHTML(currentContent);
    const tile = {
      ...data,
      content: [[html]],
    };
    upsertTile({
      tile,
    })
    .catch(err => {
      alert('there was an error adding your tile');
      console.log('err', err);
    })
  }

  onClickDraftText = (e) => {
    const { selectedTileID, data, selectTile } = this.props;
    if (selectedTileID === data.uuid) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    selectTile({
      id: data.uuid,
    })
  }

  render() {
    const {
      textEditor,
      data,
      onSelectTile,
      selectedTileID,
      buttons,
      buttonFuncMap,
      selectedButton,
    } = this.props;
    const {
      htmlContent,
    } = this.state;
    const { EditOverlay } = this;
    if (selectedTileID === data.uuid) {
      return (
        <TextEditorContainer
          className='tile-flag'
          data-uuid={data.uuid}
          onClick={this.onClickDraftText}
        >
          <EditorContainer>
            <Editor
              editorState={textEditor.state}
              onChange={this.onChange}
              ref={ref => this.editor = ref}
            />
          </EditorContainer>
          <Button
            onClick={this.handleCreateTextTile}
          >
            Press Me
          </Button>
          <EditOverlay
            isHidden={data.uuid !== selectedTileID}
            tileData={data}
            buttons={buttons.create}
            buttonFuncMap={buttonFuncMap}
            selectedButton={selectedButton}
            noCenterOverlay={true}
          />
        </TextEditorContainer>
        )
    }
    const readOnlyContent = htmlContent.replace(/contenteditable="true"/g, 'contenteditable="false"');
    return (
      <StaticTileContainer
        className='tile-flag'
        onClick={onSelectTile}
        data-uuid={data.uuid}
        // style={{ backgroundColor: 'lightgray', minHeight: 50 }}
        dangerouslySetInnerHTML={{ __html: readOnlyContent }}
      >
      </StaticTileContainer>
    )
  }
}

export const DraftTextTile = connect(DraftTextTileComponent);
