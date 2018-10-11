import React, { Component } from 'react';
import './styles.css';

export class ColorButton extends Component {

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'toolbar-color-button';
    if (this.props.active) {
      className += ' toolbar-color-button-active';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
