import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';

export class ParentSizeTracker extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      resizeTarget: void(0),
    };
  }

  componentDidMount() {
    this.resizeElement.data = 'about:blank';
  }

  componentWillUnmount() {
    const { resizeTarget } = this.state;

    const isListener = resizeTarget && typeof(resizeTarget.removeEventListener) === 'function';

    if (isListener) {
      resizeTarget.removeEventListener('resize', this.handleResize);
    }
  }

  handleLoaded = (e) => {
    const resizeTarget = e.target.contentDocument.defaultView;
    resizeTarget.addEventListener('resize', this.handleResize);
    this.setState({
      resizeTarget,
    })
    this.props.onResize();
  }

  // handleResize = () => {
  //   const height = this.container.offsetHeight;
  //   const width = this.container.offsetWidth;
  //   this.props.onResize({
  //     height,
  //     width,
  //   })
  // }

  render() {
    return createElement('object', {
    type: 'text/html',
    style: {
      display: 'block',
      visibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1,
    },
    ref: ref => this.resizeElement = ref,
    onLoad: this.handleLoaded,
    'aria-hidden': true,
    tabIndex: -1,
  })
}
}
