import React, { Component } from 'react';
import { Button } from 'AppComponents';

export class DialogueBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const { onClick, data, topOffset, leftOffset } = this.props;
    return (
      <div
        className="dialogue-box-container"
        style={{
        top: topOffset,
        left: leftOffset,
      }}>
      <div className="dialogue-box-container__content">
          <div className="dialogue-box-container__dialogue-text">
            <p>{data.dialogueBox.text}</p>
          </div>
          <Button
            onClick={onClick}
            className="dialogue-box-container__confirm-button"
          >{data.dialogueBox.buttonText}</Button>
        </div>
      </div>
    );
  }
}
