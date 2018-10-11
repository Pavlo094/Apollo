import React, { Component } from 'react';
import DropzoneRaw from 'react-dropzone';
import { get, isNil } from 'lodash';
import { Button, PostingTileHeader, ImageCrop, ColonyHex, NoDragImage, HideOptionWrapper } from 'AppComponents';
import { Network } from 'AppServices';
import { Cognito } from 'AppAuth';
import { transformToDataURL } from 'AppUtils';
import { EditButtons } from './EditButtons';
import hexImg from 'AppImgs/hexOutline.png';
import connect from './connect';
import './styles.css';

const Dropzone = HideOptionWrapper(DropzoneRaw);
const defaultImage = 'https://res.cloudinary.com/oblaka/image/upload/v1515267426/d3unfd94gyzvrptkshjk.png';


class ColonyModal extends Component {
  constructor(props, context) {
    super(props, context);

    const colony = props.selectedColony;
    const colonyBackgroundImage = get(colony, 'backgroundImagePath');
    const colonyThumbnailImage = get(colony, 'thumbnailImagePath');

    this.state = {
      colonyTitleText: get(colony, 'name', ''),
      backgroundImagePath: colonyBackgroundImage || defaultImage,
      thumbnailImagePath: colonyThumbnailImage || defaultImage,
      isDisplayingConfirmDelete: false,
      backgroundUpdated: false,
      thumbnailUpdated: false,
    };

    this.ownUserUUID = Cognito.getUserId();
  }

  cropImages = () => {
    const { backgroundUpdated, thumbnailUpdated } = this.state;
    const promises = [];
    if (backgroundUpdated) {
      promises.push(this.bgImageCrop.crop());
    }
    else {
      promises.push(Promise.resolve());
    }
    if (thumbnailUpdated) {
      promises.push(this.thumbImageCrop.crop());
    }
    else {
      promises.push(Promise.resolve());
    }
    return Promise.all(promises);
  }

  saveColony = () => {
    const {
      colonyTitleText: colonyName,
    } = this.state;
    if (isNil(colonyName) || colonyName === '') {
      alert('colony must have a title');
      return;
    }
    const updatedColony = {
      ...this.props.selectedColony,
      name: colonyName,
    };
    // if the modal is open to create a new colony then we assume it is a forum colony
    // since profile colonies are automaticlly created when a user is created
    if (isNil(this.props.selectedColony)) {
      updatedColony.type = 'forum';
      updatedColony.icons = [];
    }
    this.cropImages()
      .then((crops) => {
        const bgCrop = crops[0];
        const thumbCrop = crops[1];
        let imgData = {
          background: void(0),
          thumbnail: void(0),
        };
        if (!isNil(bgCrop)) {
          imgData.background = [bgCrop];
        }
        if (!isNil(thumbCrop)) {
          imgData.thumbnail = [thumbCrop];
        }
        this.props.upsertColony({
          colony: updatedColony,
          imgFiles: imgData,
        });
      })
      .catch(err => {
        console.log('err in save colony', err);
        alert('there was an issue updating/adding your colony');
      })
  }

  changeColonyTitleText = (event) => {
    this.setState({
      colonyTitleText: event.target.value,
    })
  }

  onDropThumbnail = (files) => {
    let file = files[0];
    this.thumbnailDataFiles = files;
    transformToDataURL(file)
      .then(imgDataURL => {
        this.setState({
          thumbnailImagePath: imgDataURL,
          thumbnailUpdated: true,
        })
      })
      .catch(error => {
        console.log('errror', error);
      })
  }

  onDropBackground = (files) => {
    let file = files[0];
    this.backgroundDataFiles = files;
    transformToDataURL(file)
      .then(imgDataURL => {
        this.setState({
          backgroundImagePath: imgDataURL,
          backgroundUpdated: true,
        })
      })
      .catch(error => {
        console.log('errror', error);
      })
  }

  onDropRejected = () => {
    alert('only the following file types are accepted:\n.jpeg\n.jpg\n.png');
  }

  onClosePress = () => {
    this.props.setModal({
      activeModal: void(0),
    })
  }

  removeColony = () => {
    this.props.deleteColony({
      uuid: this.props.selectedColony.uuid,
    })
      .catch(error => {
        console.log('error in delete colony', error);
        alert('there was an issue deleting your colony');
      })
  }

  toggleConfirmDisplay = () => {
    this.setState({
      isDisplayingConfirmDelete: !this.state.isDisplayingConfirmDelete,
    });
  }

  renderDropzoneChildren = ({ isDragActive, isDragReject }) => {
    if (isDragActive) {
      return <p>Drop Image to Add</p>
    }
    return null
  }

  render() {
    const { selectedColony } = this.props;
    const { ownUserUUID } = this;
    const { thumbnailUpdated, backgroundUpdated } = this.state;

    const isCreateColony = isNil(selectedColony);
    let titleText = isCreateColony ? 'CREATE FORUM COLONY' : 'EDIT FORUM COLONY';
    titleText = window.location.href.includes('dashboard') ? 'EDIT PROFILE COLONY' : titleText;
    const buttonText = isCreateColony ? 'CREATE COLONY' : 'SAVE COLONY';
    const hideDeleteButton = isCreateColony
      || selectedColony.uuid === ownUserUUID;

    const hexRatio = 1 / (2 / Math.sqrt(3));

    return (
      <div id='modal-bg'>
        <div id='colony-modal-container'>
          <div id='background-overlay'>
            <PostingTileHeader
              title={titleText}
              onClosePress={this.onClosePress}
            />
            <div id='colony-title-input'>
              <input
                type='text'
                id='colony-modal-input'
                value={this.state.colonyTitleText}
                onChange={this.changeColonyTitleText}
              ></input>
            </div>
            <div id='colony-thumbnail-container'>
              <ImageCrop
                src={this.state.thumbnailImagePath}
                height={200}
                width={200}
                style={{ position: 'absolute' }}
                toolAspectRatio={hexRatio}
                toolBorderWidth={2}
                showTool={thumbnailUpdated}
                ref={ref => this.thumbImageCrop = ref}
              >
                <NoDragImage src={hexImg} style={{ height: '100%', width: '100%' }}></NoDragImage>
              </ImageCrop>
              <Dropzone
                className='colony-dropzone'
                activeClassName='active-colony-dropzone'
                multiple={false}
                accept='.jpg, .png, .jpeg'
                onDropAccepted={this.onDropThumbnail}
                onDropRejected={this.onDropRejected}
                isHidden={thumbnailUpdated}
              >
                {this.renderDropzoneChildren}
              </Dropzone>
            </div>
            <div id='colony-background-container'>
              <ImageCrop
                src={this.state.backgroundImagePath}
                height={400}
                width={400}
                style={{ position: 'absolute' }}
                toolAspectRatio={0.46182266}
                toolBorderWidth={2}
                showTool={backgroundUpdated}
                ref={ref => this.bgImageCrop = ref}
              />
              <Dropzone
                className='colony-dropzone'
                activeClassName='active-colony-dropzone'
                multiple={false}
                accept='.jpg, .png, .jpeg'
                onDropAccepted={this.onDropBackground}
                onDropRejected={this.onDropRejected}
                isHidden={backgroundUpdated}
              >
                {this.renderChildren}
              </Dropzone>
            </div>
            <EditButtons
              buttonText={buttonText}
              saveColony={this.saveColony}
              toggleConfirmDisplay={this.toggleConfirmDisplay}
              isDisplayingConfirmDelete={this.state.isDisplayingConfirmDelete}
              hideDeleteButton={hideDeleteButton}
              removeColony={this.removeColony}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(ColonyModal);
