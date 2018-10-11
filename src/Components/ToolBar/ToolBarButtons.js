const INLINE_STYLING = [
  { editorLabel: 'UNDERLINE', icon: 'fas fa-underline', fn: 'toggleInlineStyle' },
  { editorLabel: 'ITALIC', icon: 'fas fa-italic', fn: 'toggleInlineStyle' },
  { editorLabel: 'BOLD', icon: 'fas fa-bold', fn: 'toggleInlineStyle' },
];

const FONT_SIZE = [
  { editorLabel: 'paragraph', text: 'Body', fn: 'toggleBlockType' },
  { editorLabel: 'header-one', text: 'Heading 1', fn: 'toggleBlockType' },
  { editorLabel: 'header-two', text: 'Heading 2', fn: 'toggleBlockType' },
  { editorLabel: 'header-three', text: 'Heading 3', fn: 'toggleBlockType' },
];

const FORMATTING = [
  {
    icon: 'fas fa-list-ul', editorLabel: 'unordered-list-item', fn: 'toggleBlockType'},
  {
    icon: 'fas fa-list-ol', editorLabel: 'ordered-list-item', fn: 'toggleBlockType' },
  // { label: 'alignLeft', icon: 'fas fa-align-left' },
  // { label: 'alignCenter', icon: 'fas fa-align-center' },
  // { label: 'alignRight', icon: 'fas fa-align-right' },
  // { label: 'alignJustify', icon: 'fas fa-align-justify'},
  { editorLabel: 'quote-left', icon: 'fas fa-quote-left', editorLabel: 'blockquote', fn: 'toggleBlockType' },
];

export const TOOLBAR_BUTTON_GROUPS = [
  {
    groupName: 'font_size',
    width: '36%',
    buttons: FONT_SIZE,
    style: {
      backgroundColor: 'darkgray',
    }
  },
  {
    groupName: 'formatting',
    width: '38%',
    buttons: FORMATTING,
    style: {
      backgroundColor: 'darkgray',
    }
  },
  {
    groupName: 'inline-styling',
    width: '16%',
    buttons: INLINE_STYLING,
    style: {
      backgroundColor: 'darkgray',
    }
  },
  {
    groupName: 'empty',
    width: '10%',
    buttons: [{ editorLabel: '1' }, { editorLabel: '2' }],
    style: {
      backgroundColor: 'darkgray',
    }
  }
]
