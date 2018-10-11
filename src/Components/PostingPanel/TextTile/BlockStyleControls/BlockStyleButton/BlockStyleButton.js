import React, { Component } from 'react';
import './styles.css';

export class BlockStyleButton extends Component {

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.fn);
    };
  }

  renderIcons() {
    if (this.props.style.includes('header')) {
      return this.props.label
    } else {
      return <i className={"fas fa-" + this.props.style}></i>;
    }
  }

  render() {
    let labelClass = `toolbar-block-button-${this.props.label.toLowerCase()}`;
    let className = `toolbar-block-button ${labelClass}`;

    if (this.props.active) {
      className += ' toolbar-block-button-active';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.renderIcons()}
      </span>
    );
  }
}
