import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Editor, EditorState, RichUtils, convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import { isNil } from 'lodash';
import {
  BlockStyleControls,
  InlineStyleControls,
  ColorControls
} from 'AppComponents';
import { SketchPicker } from 'react-color';
import createStyles from 'draft-js-custom-styles';
import { stateToHTML } from 'draft-js-export-html';

const INLINE_STYLE_TYPES = [
  { label: 'U', style: 'UNDERLINE' },
  { label: 'I', style: 'ITALIC' },
  { label: 'B', style: 'BOLD' }
];

const HEADING_TYPES = [
  { label: 'SML', style: 'header-five', fn: 'header-five' },
  { label: 'MED', style: 'header-four', fn: 'header-four' },
  { label: 'LRG', style: 'header-three', fn: 'header-three' },
  { label: 'XL', style: 'header-two', fn: 'header-two' },
  { label: 'XXL', style: 'header-one', fn: 'header-one' }
];

const BLOCK_TYPES = [
  { label: 'OL', style: 'list-ol', fn: 'ordered-list-item' },
  { label: 'UL', style: 'list-ul', fn: 'unordered-list-item' },
  { label: 'BQ', style: 'quote-right', fn: 'blockquote' },
  { label: 'CB', style: 'code', fn: 'code-block' },
];

let styleMap = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  }
};

const { styles, customStyleFn, exporter } = createStyles(
  [
    'font-size',
    'color',
    'text-transform',
    'background-color'
  ],
  'CUSTOM_', styleMap
);

export class TextTileEditor extends Component {

  constructor(props) {
    super(props);

    let savedTextContent;
    if (props.htmlContent) {
      const htmlState = convertFromHTML(props.htmlContent);
      const processedContent = ContentState.createFromBlockArray(
        htmlState.contentBlocks,
        htmlState.entityMap
      )
      savedTextContent = EditorState.createWithContent(processedContent);
    }

    this.state = {
      editorState: !isNil(savedTextContent) ? savedTextContent : EditorState.createEmpty(),
      isColorDialogOpened: false,
      isBackColorDialogOpened: false,
      styleMap,
      selectedColor: '#FFF'
    };
  }

  componentDidMount() {
    this.focus();
  }

  getInnerHtml = () => {
    const inlineStyles = exporter(this.state.editorState);
    const blockStyleFn = (block) => {
      if (block.getType() === 'blockquote') {
        return {
          style: {
            borderLeft: '5px solid #eee',
            color: '#666',
            fontFamily: '"Hoefler Text", "Georgia", serif',
            fontStyle: 'italic',
            marginTop: 16,
            marginBottom: 16,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10
          }
        }
      } else if (block.getType() === 'code-block') {
        return {
          style: {
            backgroundColor: '#eee',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 20
          }
        };
      } else {
        return null;
      }
    };

    const html = stateToHTML(
      this.state.editorState.getCurrentContent(),
      { inlineStyles, blockStyleFn }
    );

    return html;
  };

  focus = () => this._editor.focus();

  onChange = (editorState) => this.setState({ editorState });

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onTab = (e) => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
    this.focus();
  };

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
    this.focus();
  };

  openColorDialog = () => {
    this.setState({
      isColorDialogOpened: !this.state.isColorDialogOpened,
      isBackColorDialogOpened: false
    });
  };

  openBackgroundColorDialog = () => {
    this.setState({
      isBackColorDialogOpened: !this.state.isBackColorDialogOpened,
      isColorDialogOpened: false
    });
  };

  toggleColor = (color) => {
    const newEditorState = styles.color.toggle(this.state.editorState, color.hex);

    this.setState({ selectedColor: color });
    this.onChange(newEditorState);
  };

  toggleBackgroundColor = (color) => {
    const newEditorState = styles.backgroundColor.toggle(this.state.editorState, color.hex);

    this.setState({ selectedColor: color });
    this.onChange(newEditorState);
  };

  render() {
    const { editorState, isColorDialogOpened, isBackColorDialogOpened } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className='RichEditor-container'>
        <div className="RichEditor-root">
          <div className="inline-style-group">
            <InlineStyleControls
              items={INLINE_STYLE_TYPES}
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <BlockStyleControls
              items={HEADING_TYPES}
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
          </div>
          <div className="font-style-group">
            <BlockStyleControls
            items={BLOCK_TYPES}
            editorState={editorState}
            onToggle={this.toggleBlockType}
            />
            <ColorControls
            label={'BACKGROUND COLOR'}
            editorState={editorState}
            onToggle={this.openBackgroundColorDialog}
            isOpened={isBackColorDialogOpened}
            />
            <ColorControls
            label={'TEXT COLOR'}
            editorState={editorState}
            onToggle={this.openColorDialog}
            isOpened={isColorDialogOpened}
            />
          </div>
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            ref={ref => this._editor = ref}
            customStyleFn={customStyleFn}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            spellCheck={true}
          />
        </div>
        {(isColorDialogOpened || isBackColorDialogOpened) &&
          <div className="colorPicker">
            <SketchPicker
              color={this.state.selectedColor}
              onChangeComplete={color => isColorDialogOpened
                ? this.toggleColor(color)
                : this.toggleBackgroundColor(color)
              }
            />
          </div>
        }
      </div>
    );
  }
}
