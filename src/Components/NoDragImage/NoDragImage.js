import React, { Component } from 'react';

export class NoDragImage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.image.onmousedown = (e) => {
      e.preventDefault();
    }
  }

  render() {
    return (
      <img
        ref={ref => this.image = ref}
        {...this.props}
      ></img>
    )
  }
}
