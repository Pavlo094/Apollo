import React, { Component } from 'react';
import { get } from 'lodash';
import { ColonyHex, HideOptionWrapper, Button } from 'AppComponents';
import { CustomBox } from './CustomBox';

const DRAFT_POST_TRASH = {
  dialogueBox: {
    text: 'PLEASE CONFIRM',
    buttonText: 'DELETE DRAFT',
  }
}

const POST_TRASH = {
  dialogueBox: {
    text: 'PLEASE CONFIRM',
    buttonText: 'DELETE POST',
  }
}

export class PhoneHeader extends Component {
  constructor(props, context) {
    super(props, context);

  }

  onClickTrash = (e, passedClickedButton) => {
    const clickedButton = passedClickedButton || 'postDelete';
    e.stopPropagation();
    this.props.onClickPostTrash({
      event: e,
      overlayButton: 'postDelete',
      clickedButton,
    });
  }

  onClickConfirmTrash = (e) => {
    this.onClickTrash(e, 'customBox');
  }

  onClickColony = () => {
    this.props.setModal({
      activeModal: 'ColonySelect',
    });
  }

  renderColonyHex = () => {
    const { selectedColony, post } = this.props;
    const colonyImage = selectedColony ? selectedColony.thumbnailImagePath : void(0);
    if (post.type === 'standard' && post.isDraft) {
      return (
        <Button onClick={this.onClickColony}>
          <ColonyHex
            height={50}
            width={50}
            src={colonyImage}
          />
        </Button>
      )
    }
    return (
      <ColonyHex
        height={50}
        width={50}
        src={colonyImage}
      />
    )
  }

  render() {
    const { ownUserColony, post, selectedButton, selectedColony } = this.props;
    const thumbImage = get(ownUserColony, 'thumbnailImagePath', '');
    const { DialogueBox } = this;
    const dialogueBoxData = post.isDraft ? DRAFT_POST_TRASH : POST_TRASH;
    return (
      <div className='phone-header-container'>
        <div className='phone-header-hex-container'>
          <div className='phone-prime-hex-container'>
            {this.renderColonyHex()}
            {selectedColony ? null : <p><i className="fas fa-caret-left"></i> SELECT COLONY</p>}
          </div>
          <div className='phone-secondary-hex-container'>
            <ColonyHex
              height={50}
              width={50}
              src={thumbImage}
            />
            <p>hello</p>
          </div>
        </div>
        <div className='phone-trash-container button-type-postDelete' onClick={this.onClickTrash}
        >
          <i className='fas fa-trash fa-2x' ></i>
          <CustomBox
            isHidden={selectedButton !== 'postDelete'}
            topOffset={80}
            leftOffset={-25}
            onClick={this.onClickConfirmTrash}
            data={dialogueBoxData}
          />
        </div>
      </div>
    )
  }
}
