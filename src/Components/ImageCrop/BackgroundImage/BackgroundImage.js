import React, { Component } from 'react';
import { isNil } from 'lodash';
import { defaultToolBorderWidth } from '../constants';

const defaultState = {
  imgLoaded: false,
  naturalHeight: void(0),
  naturalWidth: void(0),
  imgHeight: void(0),
  imgWidth: void(0),
}

export class BackgroundImage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...defaultState,
      height: this.props.height,
      width: this.props.width,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.imgLoaded && this.state.imgLoaded) {
      const imgHeight = this.img.height;
      const imgWidth = this.img.width;
      this.setImgData(imgHeight, imgWidth);
      this.setState({
        imgHeight,
        imgWidth,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        ...this.state,
        ...defaultState
      })
    }
  }

  setImgData = (imgHeight, imgWidth) => {
    const { naturalWidth, naturalHeight } = this.state;
    const heightScale = imgHeight / naturalHeight;
    const widthScale = imgWidth / naturalWidth;
    this.props.imgData({
      xScale: widthScale,
      yScale: heightScale,
      imgHeight,
      imgWidth,
    })
  }

  onImgLoaded = (e) => {
    const loadedImg = e.target;
    const { naturalWidth, naturalHeight } = loadedImg;
    this.setState({
      naturalWidth,
      naturalHeight,
      naturalRatio: naturalWidth / naturalHeight,
      imgLoaded: true,
    })
  }

  getImgStyle = () => {
    const { naturalRatio } = this.state;
    if (!naturalRatio) {
      return {
        display: 'none',
      }
    }
    if (naturalRatio > 1) {
      return {
        width: '100%',
        position: 'absolute',
      }
    }
    return {
      height: '100%',
      position: 'absolute',
    }
  }

  getImgContainerStyle = () => {
    const { imgHeight, imgWidth, naturalHeight, naturalWidth } = this.state;
    if (imgHeight) {
      return {
        height: imgHeight,
        width: imgWidth,
        position: 'relative',
      }
    }
    return {};
  }

  renderChildren = () => {
    if (this.state.imgHeight && this.props.showTool) {
      return this.props.children;
    }
    return void(0);
  }

  getContainerStyle = (borderWidth) => {
    const borderOffset = 2 * borderWidth;
    const style = {
      height: this.props.height - borderOffset,
      width: this.props.width - borderOffset,
      padding: borderWidth || defaultToolBorderWidth,
    }
    if (this.props.style && this.props.style.position) {
      style.position = this.props.style.position;
    }
    return style;
  }

  render() {
    const { naturalHeight, naturalWidth, naturalRatio } = this.state;
    const { toolBorderWidth } = this.props;
    const borderOffset = toolBorderWidth * 2;

    return (
      <div
        style={this.getContainerStyle(toolBorderWidth)}
      >
        <div
          style={{
            height: this.props.height - borderOffset,
            width: this.props.width - borderOffset,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={this.getImgContainerStyle()}
          >
            <img
              style={this.getImgStyle()}
              src={this.props.src}
              onLoad={this.onImgLoaded}
              ref={ref => this.img = ref}
            ></img>
            {this.renderChildren()}
          </div>
        </div>
      </div>
    )
  }
}
