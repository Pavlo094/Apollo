import React, { Component } from 'react';
import './styles.css';

export class StyleButton extends Component {

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'toolbar-button';
    if (this.props.active) {
      className += ' toolbar-button-active';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
