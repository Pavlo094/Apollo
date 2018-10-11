import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneRaw from 'react-dropzone';
import { isNil, get, cloneDeep } from 'lodash';
import generateUUID from 'uuid/v4';
import { Cognito } from 'AppAuth';
import './styles.css';
import { PostingTileHeader, Button, ImageCrop, HideOptionWrapper } from 'AppComponents'
import { transformToDataURL } from 'AppUtils';
import { defaultImage } from 'AppConstants';


const Dropzone = HideOptionWrapper(DropzoneRaw);

// See Minerva README: https://github.com/doubleqliq/minerva
//
// Tile types: ["single-image", "single-video", "multi-image", "text", "reaction"]
// Intercation types: ["heatmap", "multi-image", "reaction", "none"]
//
// Tile schema:
// {
//   "type": "multi-image"
//   "interaction_type": "multi-image",
//   "content": [[image_url_one, image_url_two], [image_url_three, image_url_four]],
// }


class ImageTileEdit extends Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context);
    this.origImgContent = get(props.selectedTile, 'content[0][0]', defaultImage);
    this.origLinkText = get(props.selectedTile, 'link', '');
    this.origCaptionText = get(props.selectedTile, 'caption', '');
    this.state = {
      uploadedImageUrls: [[this.origImgContent]],
      isCropping: false,
      linkText: this.origLinkText,
      captionText: this.origCaptionText,
    };
    this.fileData;
  }

  handleDropImage = (files) => {
    this.fileData = files;
    let file = files[0];
    transformToDataURL(file)
      .then(result => {
        this.setState({
          uploadedImageUrls: [[result]],
          isNewDroppedImage: true,
        })
      })
      .catch(error => {
        console.log('errror', error);
      })
  }

  handleDropRejected = () => {
    alert('only the following file types are accepted:\n.jpeg\n.jpg\n.png')
  }

  renderText = () => {
    if (this.state.uploadedImageUrls[0][0] === defaultImage) {
      return (
        <p id='image-edit-text'>Drop an image or click <br/> to select a file to upload.</p>
      )
    }
    return null;
  }

  displayCrop = () => {
    this.setState({
      isCropping: true,
    })
  }

  cancelCrop = () => {
    this.setState({
      isCropping: false,
    })
  }

  checkForHidden = () => {
    const { selectedTile } = this.props;
    const { linkText, captionText, uploadedImageUrls } = this.state;
    const image = uploadedImageUrls[0][0];
    if (image === defaultImage) {
      return true;
    }
    if (image === this.origImgContent
      && linkText === this.origLinkText
      && captionText === this.origCaptionText) {
      return true;
    }
    return false;
  }

  handleUpdateOrAdd = () => {
    const { isCropping, linkText, captionText } = this.state;
    const { selectedTile } = this.props;
    const imagePromise = isCropping
      ? this.thumbImageCrop.crop().then(croppedImage => [croppedImage])
      : Promise.resolve(this.fileData);
    imagePromise
      .then(fileData => {
        let tile;
        if (isNil(selectedTile)) {
          tile = {
            type: 'single-image',
            interaction_type: 'heatmap',
            uuid: generateUUID(),
          }
        } else {
          tile = {
            ...selectedTile,
          }
        }
        this.props.addOrUpdateTile(tile, fileData);
      })
  }

  getButtonData = () => {
    const uploadedImage = this.state.uploadedImageUrls[0][0];
    const isHidden = this.checkForHidden();
    if (this.state.isCropping) {
      return {
        isHidden,
        left: {
          text: 'CANCEL',
          onClick: this.cancelCrop
        },
        right: {
          text: 'CROP & SAVE',
          onClick: this.handleUpdateOrAdd,
        }
      }
    }

    if (this.origImgContent !== defaultImage) {
      return {
        isHidden,
        left: {
          text: 'CROP',
          onClick: this.displayCrop
        },
        right: {
          text: 'SAVE',
          onClick: this.handleUpdateOrAdd
        }
      }
    }
    return {
      isHidden,
      left: {
        text: 'CROP',
        onClick: this.displayCrop,
      },
      right: {
        text: 'CREATE',
        onClick: this.handleUpdateOrAdd,
      }
    }
  }

  renderDropzoneChildren = ({ isDragActive, isDragReject }) => {
    if (isDragActive) {
      return <p>Drop Image to Add</p>
    }
    return null
  }

  render() {
    const { selectedTile } = this.props;
    const buttonData = this.getButtonData();

    return (
      <div id="dropzone-container">
        <PostingTileHeader
          title={selectedTile ? "EDIT AN IMAGE TILE" : "CREATE AN IMAGE TILE"}
          onClosePress={this.props.onClosePress}
        />
        <div id='image-dropzone-container'>
          <ImageCrop
            src={this.state.uploadedImageUrls[0][0]}
            height={400}
            width={400}
            style={{ position: 'absolute' }}
            showTool={this.state.isCropping}
            toolBorderWidth={2}
            ref={ref => this.thumbImageCrop = ref}
          />
          <Dropzone
            className='dropzone'
            activeClassName='active-dropzone'
            multiple={false}
            accept='.jpg, .png, .jpeg'
            onDropAccepted={this.handleDropImage}
            onDropRejected={this.handleDropRejected}
            isHidden={this.state.isCropping}
          >
            {this.renderDropzoneChildren}
          </Dropzone>
        </div>
        <div id='modify-image-text'>{this.state.isCropping ? 'use crop tool to edit image' : ''}</div>
        <div id="button-container">
          <Button
            id='submit-tile-button'
            isHidden={buttonData.isHidden}
            onClick={buttonData.left.onClick}
          >
            {buttonData.left.text}
          </Button>
          <Button
            id='submit-tile-button'
            onClick={buttonData.right.onClick}
            isHidden={buttonData.isHidden}
          >
            {buttonData.right.text}
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageTileEdit;
