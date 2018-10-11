export const TILE_OVERLAY_BUTTON_DATA = {
  text: {
    edit: {
      left: [
        {
          backgroundColor: 'red',
          icon: 'fa-trash',
          label: 'trash',
          dialogueBox: {
            text: 'are you you want to delete this tile'
          },
        },
      ],
      right: [
        {
          backgroundColor: 'purple',
          icon: 'fa-magic',
          label: 'interaction',
          dialogueBox: {
            text: 'add interaction type feature coming soon'
          }
        },
      ],
      center: {},
    },
    create: {
      left: [
        {
          backgroundColor: 'red',
          icon: 'fa-trash',
          label: 'trash',
          dialogueBox: {
            text: 'PLEASE CONFIRM',
            buttonText: 'DELETE TILE'
          },
        },
      ],
      right: [],
      center: {},
    }
  },
  singleImage: {
    edit: {
      left: [
        {
          backgroundColor: 'lightblue',
          icon: 'fa-edit',
          label: 'edit',
        },
        {
          backgroundColor: 'red',
          icon: 'fa-trash',
          label: 'trash',
          dialogueBox: {
            text: 'are you you want to delete this tile'
          },
        }
      ],
      right: [
        {
          backgroundColor: 'lightgreen',
          icon: 'fa-comment-dots',
          label: 'caption',
          inputBox: {
            placeHolder: 'Add a caption...',
          }
        },
        {
          backgroundColor: 'purple',
          icon: 'fa-magic',
          label: 'interaction',
          dialogueBox: {
            text: 'add interaction type feature coming soon'
          }
        }
      ],
      center: {
        icon: 'fa-link',
        label: 'link',
        inputBox: {
          placeHolder: 'Add a link...'
        }
      },
    },
    create: {
      left: [
        {
          backgroundColor: 'red',
          icon: 'fa-trash',
          label: 'trash',
          dialogueBox: {
            text: 'PLEASE CONFIRM',
            buttonText: 'DELETE TILE'
          },
        },
      ],
      right: [],
      center: {},
    }
  },
  youtube: {
    edit: {
      left: [
        {
          backgroundColor: 'lightblue',
          icon: 'fa-edit',
          label: 'edit',
        },
        {
          backgroundColor: 'red',
          icon: 'fa-trash',
          label: 'trash',
          dialogueBox: {
            text: 'are you you want to delete this tile'
          },
        }
      ],
      right: [
        {
          backgroundColor: 'lightgreen',
          icon: 'fa-comment-dots',
          label: 'caption',
          inputBox: {
            placeHolder: 'Add a caption...',
          }
        },
        {
          backgroundColor: 'purple',
          icon: 'fa-magic',
          label: 'interaction',
          dialogueBox: {
            text: 'add interaction type feature coming soon'
          }
        }
      ],
      center: {},
    },
    create: {
      left: [
        {
          backgroundColor: 'red',
          icon: 'fa-trash',
          label: 'trash',
          dialogueBox: {
            text: 'PLEASE CONFIRM',
            buttonText: 'DELETE TILE'
          },
        },
      ],
      right: [],
      center: {},
    }
  }
}
