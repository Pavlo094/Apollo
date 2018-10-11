import React, { Component } from 'react';
import './styles.css';

export class InlineStyleButton extends Component {

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  renderInlineStyleSelector() {
    return <i className={"fas fa-" + this.props.style.toLowerCase()}></i>;
  }

  render() {
    let className = 'toolbar-inline-button';

    if (this.props.active) {
      className += ' toolbar-inline-button-active';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.renderInlineStyleSelector()}
      </span>
    );
  }
}
