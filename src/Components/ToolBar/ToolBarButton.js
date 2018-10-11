import React, { Component } from 'react';
import { Button } from 'AppComponents';

export class ToolBarButton extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick = (e) => {
    e.preventDefault();
    const { onClick, data } = this.props;
    onClick(data.editorLabel);
  }

  render() {
    const { data } = this.props;
    if (data.icon) {
      return (
        <Button
          className='toolbar-button'
          onMouseDown={this.handleClick}
          >
            <i className={data.icon}></i>
          </Button>
      );
    }
    return (
      <Button
        className='toolbar-button'
        onMouseDown={this.handleClick}
      >
        {data.text}
      </Button>
    )
  }
}
