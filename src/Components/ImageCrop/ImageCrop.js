import React, { Component } from 'react';
import { BackgroundImage } from './BackgroundImage';
import { CropTool } from './CropTool';
import { isEmpty } from 'lodash';
import { base64ToBlob } from 'AppUtils';

const defaultState = {
  xScale: void(0),
  yScale: void(0),
  imgHeight: void(0),
  imgWidth: void(0),
  bgImageLoaded: false,
}


export class ImageCrop extends Component {
  static propTypes = {

  }

  constructor(props, context) {
    super(props, context);

    this.state = defaultState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState(defaultState);
    }
  }

  getImgData = ({ xScale, yScale, imgHeight, imgWidth }) => {
    if (!this.state.bgImageLoaded) {
      this.setState({
        xScale,
        yScale,
        imgHeight,
        imgWidth,
        bgImageLoaded: true,
      })
    }
  }

  getCropData = (xPosition, yPosition, width, height) => {
    this.cropData = {
      x: xPosition,
      y: yPosition,
      width,
      height,
    }
  }

  getToolData = () => {
    const { imgHeight, imgWidth } = this.state;
    const imgRatio = imgWidth / imgHeight;
    let tool = {};
    if (imgRatio > this.props.toolRatio) {
      return {
        y: imgHeight
      }
    }
    return {
      x: imgWidth
    }
  }

  crop = () => {
    return new Promise((resolve, reject) => {
      const { xScale, yScale } = this.state;
      const xPosition = this.cropData.x / xScale;
      const yPosition = this.cropData.y / yScale;
      const cropWidth = this.cropData.width / xScale;
      const cropHeight = this.cropData.height / yScale;

      let ctx = this.canvas.getContext('2d');
      this.canvas.height = cropHeight;
      this.canvas.width = cropWidth;
      let img = new Image();
      img.onload = () => {
        ctx.drawImage(img, xPosition, yPosition, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        const dataURL = this.canvas.toDataURL('image/jpeg');
        const base64Image = dataURL.split(',')[1];
        const blob = base64ToBlob(base64Image, 'image/jpeg');
        resolve(blob);
      }
      img.src = this.props.src;
    })
  }

  render() {

    const toolData = this.getToolData();
    const { imgHeight, imgWidth } = this.state;

    return (
      <BackgroundImage
        src={this.props.src}
        height={this.props.height}
        width={this.props.width}
        imgData={this.getImgData}
        toolBorderWidth={this.props.toolBorderWidth}
        showTool={this.props.showTool}
        style={this.props.style}
      >
        <CropTool
          isHidden={!this.state.bgImageLoaded}
          imgData={{ height: imgHeight, width: imgWidth }}
          toolAspectRatio={this.props.toolAspectRatio}
          cropData={this.getCropData}
          toolBorderWidth={this.props.toolBorderWidth}
        >
          {this.props.children}
        </CropTool>
        <canvas
          height={0}
          width={0}
          style={{ display: 'none' }}
          ref={ref => this.canvas = ref}
        ></canvas>
      </BackgroundImage>
    );
  }
}
