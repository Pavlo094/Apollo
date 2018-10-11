import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import { ColonyHex, HideOptionWrapper } from 'AppComponents';
import { getBounds } from './getBounds';
import { resizeWithRatio } from './resizeWithRatio';
import { getBoundedPositions } from './getBoundedPositions';
import { getInitToolSize } from './getInitToolSize';
import { resize } from './resize';
import './styles.css';

class CropTool extends Component {
  constructor(props) {
    super();

    const { imgData } = props;
    let toolRatio = props.toolAspectRatio;
    const toolSize = getInitToolSize(imgData, toolRatio);
    this.state = {
      x: -props.toolBorderWidth,
      y: -props.toolBorderWidth,
      isResizing: false,
      isMoving: false,
      height: toolSize.height,
      width: toolSize.width,
      ratio: toolRatio,
    }
  }

  handleResizing = (e, data) => {
    const { deltaY, deltaX } = data;
    const bottomBound = this.bounds.resizeBottom - this.state.y - this.props.toolBorderWidth;
    const rightBound = this.bounds.resizeRight - this.state.x - this.props.toolBorderWidth;

    let updatedWidth = this.state.width + deltaX;
    let updatedHeight = this.state.height + deltaY;
    if (this.props.toolAspectRatio) {
      updatedHeight = Math.floor(updatedWidth / this.state.ratio);
      return resizeWithRatio({
        updatedWidth,
        updatedHeight,
        ratio: this.state.ratio,
        bottomBound,
        rightBound,
      });
    }

    return resize({
      updatedWidth,
      updatedHeight,
      bottomBound,
      rightBound,
    });
  }


  onStart = (e, data) => {
    const isResizing = e.target.classList.contains('resize-handle');
    let isMoving = false;
    if (isResizing) {
      this.bounds = getBounds(e.target.parentNode, this.props.toolBorderWidth);
      document.body.style.cursor = 'nwse-resize';
    }
    else {
      const target = e.target;
      const elem = e.target.closest('#cropTool');
      this.bounds = getBounds(elem, this.props.toolBorderWidth);
      document.body.style.cursor = 'move';
      isMoving = true;
    }
    this.setState({
      isResizing,
      isMoving,
    })
  }

  onDrag = (e, data) => {
    if (this.state.isResizing) {
      const resize = this.handleResizing(e, data);
      this.setState({
        height: resize.height,
        width: resize.width,
      })
      return;
    }
    const { deltaY, deltaX } = data;
    const positionX = this.state.x + deltaX;
    const positionY = this.state.y + deltaY;
    const { x, y } = getBoundedPositions(this.bounds, positionX, positionY);
    this.setState({
      x,
      y
    });
  }

  onStop = (e) => {
    const { isResizing } = this.state;
    const elem = isResizing ? e.target.parentNode : e.target;
    const { offsetTop, offsetLeft } = elem.parentNode;
    const xPosition = -this.bounds.left + this.state.x;
    const yPosition = -this.bounds.top + this.state.y;
    const { height, width } = this.state;
    document.body.style.cursor = '';
    this.props.cropData(xPosition, yPosition, width, height);
    this.setState({
      isResizing: false,
      isMoving: false,
    })
  }

  componentDidMount() {
    this.props.cropData(0, 0, this.state.width, this.state.height);
  }

  render() {
    const { x, y } = this.state;
    const cursor = this.state.isMoving ? '' : 'nwse-resize';
    return (
      <DraggableCore
        onStop={this.onStop}
        onStart={this.onStart}
        onDrag={this.onDrag}
      >
        <div
          id='cropTool'
          style={{
            height: this.state.height,
            width: this.state.width,
            transform: `translate(${x}px, ${y}px)`,
            border: `${this.props.toolBorderWidth}px solid black`,
            position: 'relative',
            cursor: this.state.isResizing ? '' : 'move',
          }}
        >
          {this.props.children}
          <span className='resize-handle' style={{ cursor }}></span>
        </div>
      </DraggableCore>
    )
  }
}

export default HideOptionWrapper(CropTool);
