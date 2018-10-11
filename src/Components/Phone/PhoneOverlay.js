import React, { Component } from 'react';
import { isNil } from 'lodash';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  left: 0;
  top: 0;
  z-index: 5;
  pointer-events: none;
`;

const CanvasContainer = styled.div`
  flex: 1;
  display: flex;
`;

export class PhoneOverlay extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      topImgWidth: void(0),
      bottomImgWidth: void(0),
      middleImgLoaded: false,
    };
  }

  componentDidMount() {
    this.preloadMiddleImg();
  }

  componentDidUpdate(prevProps) {
    const { middleImgLoaded, topImgWidth, bottomImgWidth } = this.state;
    if (middleImgLoaded && topImgWidth && bottomImgWidth) {
      this.drawPatternImg();
    }
  }

  preloadMiddleImg = () => {
    this.middleImg = new Image();
    this.middleImg.onload = this.onMiddleImgLoaded;
    this.middleImg.src = this.props.phoneData.middleImg;
  }

  drawPatternImg = () => {
    if (isNil(this.scaledImgCanvas)) {
      this.createScaledImgCanvas();
      this.props.onFinishedRender();
    }
    this.canvas.height = this.canvasContainer.offsetHeight;
    this.canvas.width = this.canvasContainer.offsetWidth;
    const ctx = this.canvas.getContext('2d');
    const pattern = ctx.createPattern(this.scaledImgCanvas, 'repeat-y');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createScaledImgCanvas = () => {
    const { sizeChange } = this.props;
    this.scaledImgCanvas = document.createElement('canvas');
    const ctx = this.scaledImgCanvas.getContext('2d');
    const scaledWidth = this.middleImg.naturalWidth * sizeChange;
    const scaledHeight = this.middleImg.naturalHeight * sizeChange;
    this.scaledImgCanvas.height = scaledHeight;
    this.scaledImgCanvas.width = scaledWidth;
    ctx.drawImage(this.middleImg, 0, 0, scaledWidth, scaledHeight);
  }

  onMiddleImgLoaded = () => {
    this.setState({
      middleImgLoaded: true,
    })
  }

  onImgLoaded = (e, imgType) => {
    const img = e.target;
    this.setState({
      [`${imgType}ImgWidth`]: img.naturalWidth * this.props.sizeChange,
    })
  }

  onTopImgLoaded = (e) => {
    this.onImgLoaded(e, 'top');
  }

  onBottomImgLoaded = (e) => {
    this.onImgLoaded(e, 'bottom');
  }

  render() {
    const { imgOffset } = this.props;
    return (
      <Container>
        <img
          src={this.props.phoneData.topImg}
          onLoad={this.onTopImgLoaded}
          width={this.state.topImgWidth}
          ></img>
          <CanvasContainer
            innerRef={ref => this.canvasContainer = ref}
          >
            <canvas
              ref={ref => this.canvas = ref}
            ></canvas>
          </CanvasContainer>
          <img
            src={this.props.phoneData.bottomImg}
            onLoad={this.onBottomImgLoaded}
            width={this.state.bottomImgWidth}
          ></img>
      </Container>
    );
  }
}
