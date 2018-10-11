import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, get, cloneDeep } from 'lodash';
import DropzoneRaw from 'react-dropzone';
import { transformToDataURL } from 'AppUtils';
import { PostingTileHeader, Button, ImageCrop, DisplayOption } from 'AppComponents';
import { defaultImage } from 'AppConstants';
import connect from './connect';
import './styles.css';

const Dropzone = DisplayOption(DropzoneRaw);

class PostThumbnailModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      thumbnailUrl: props.selectedPost.thumbnailImagePath || defaultImage,
      isCropping: false,
    };

    this.currentSavedThumbnail = props.selectedPost.thumbnailImagePath;
  }

  handleClosePress = () => {
    if (this.props.onModalCloseFN) {
      this.props.onModalCloseFN();
    }
    this.props.setModal({
      activeModal: void(0),
    })
  }

  handleDropImage = (files) => {
    const file = files[0];
    transformToDataURL(file)
      .then(result => {
        this.setState({
          thumbnailUrl: result,
          isCropping: true,
        })
      })
      .catch(error => {
        console.log('errror', error);
      })
  }

  handleDropRejected = () => {
    alert('only the following file types are accepted:\n.jpeg\n.jpg\n.png');
  }

  handleThumbnailUpdate = () => {
    const { thumbnailUrl } = this.state;
    if (thumbnailUrl === defaultImage) {
      alert('must submit a post thumbnail');
      return;
    }
    if (isNil(thumbnailUrl) || thumbnailUrl === this.currentSavedThumbnail) {
      this.props.onModalCloseFN(true);
      this.props.setModal({
        activeModal: void(0),
      })
      return;
    }

    this.thumbImageCrop.crop()
      .then(croppedImage => {
        return this.props.updatePostThumbnail({
          img: croppedImage,
        })
      })
      .then(() => {
        if (this.props.onModalCloseFN) {
          this.props.onModalCloseFN(true);
          this.props.setModal({
            activeModal: void(0),
          })
        }
      })
      .catch(err => {
        console.log('err in update post thumbnail', err);
        alert('there was an error updating your post thumbnail');
      })
  }

  renderDropzoneChildren = ({ isDragActive, isDragReject }) => {
    if (isDragActive) {
      return <p>Drop Image to Add</p>
    }
    return null
  }

  render() {
    const { isEditing } = this;
    const { thumbnailUrl } = this.state;
    const titleModifier = this.props.selectedPost.isDraft ? 'CREATE' : 'UPDATE';
    const modalTitle = `DROP IMAGE TO ${titleModifier} YOUR POST THUMBNAIL`;
    const buttonTitle = 'POST!';

    return (
      <div id='modal-bg'>
        <div id="text-tile-container">
          <div id="background-overlay">
            <PostingTileHeader
              title={modalTitle}
              onClosePress={this.handleClosePress}
            />
            <div id='postthumbnail-dropzone-container'>
              <ImageCrop
                src={this.state.thumbnailUrl}
                height={400}
                width={400}
                style={{ position: 'absolute' }}
                showTool={this.state.isCropping}
                toolBorderWidth={2}
                toolAspectRatio={1}
                ref={ref => this.thumbImageCrop = ref}
              />
              <Dropzone
                className='dropzone'
                activeClassName='active-dropzone'
                multiple={false}
                accept='.jpg, .png, .jpeg'
                onDropAccepted={this.handleDropImage}
                onDropRejected={this.handleDropRejected}
                noDisplay={this.state.isCropping}
              >
                {this.renderDropzoneChildren}
              </Dropzone>
            </div>
            <div id='button-container'>
              <Button id="submit-tile-button"
                onClick={this.handleThumbnailUpdate}>{buttonTitle}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(PostThumbnailModal);
