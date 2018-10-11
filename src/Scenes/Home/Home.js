import React, { Component } from 'react';
import {
  isNil,
  get,
  isEmpty,
} from 'lodash';
import {
  Post,
  Dashboard,
  ForumColony,
  ProfileColony,
  EditPosts,
  EditPost,
  TidBits,
  EditTidBit,
  ProfileTabs,
  EditTabPost,
} from 'AppScenes';
import {
  Modal,
  NavBar,
  Route,
} from 'AppComponents';
import {
  Network,
} from 'AppServices';
import { Cognito } from 'AppAuth';
import { NAV_BAR_HEIGHT } from 'AppConstants';
import connect from './connect';
import './styles.css';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.handleGetOwnUserData();
    // this.handleGetDraft();
    this.props.getDrafts()
      .catch(err => {
        console.log('err in get drafts', err);
        alert('there was an error attempting to retrieve post draft data');
      })
    this.props.getColoniesAndPosts()
      .catch(err => {
        console.log('err in getColoniesAndPosts', err);
        alert('there was an error attempting to retrieve colonies data');
      })
  }

  handleGetOwnUserData() {
    // This method fulfills a temporary contract we have with the backend -
    // Before using a user's uuid as a colony uuid we must make a GET request
    // for that colony. If it doesn't exist (i.e. new user) then one will be created

    const ownUserId = Cognito.getUserId();
    this.props.getOwnUserData()
      .then(() => {
        const promises = [];
        promises.push(this.props.getPosts());
        promises.push(this.props.getTabPosts());
        return Promise.all(promises);
      })
      .catch(err => {
        console.log('error retreiving user data', err);
        alert('there was an error attempting to retrieve user data');
      })
  }

  onFinishPost = () => {
    const { selectedPost } = this.props;
    if (selectedPost.type === 'standard' || selectedPost.type === void(0)) {
      this.props.setModal({
        activeModal: 'PostThumbnail',
        onModalCloseFN: (isPostFinished) => {
          if (isPostFinished) {
            this.submitPost();
          }
        }
      })
      return;
    }
    this.submitPost();
  }

  submitPost = () => {
    this.props.submitPost()
      .catch(err => {
        console.log('err in submitPost', err);
        alert('there was an error attempting to create your post');
      })
      .then(() => {
        this.props.clearSelectedPost();
        this.props.history.goBack();
      })
  }

  onEditTile = (tileUUID) => {
    this.props.editTile({
      selectedTileID: tileUUID,
    })
  }

  onEditTileInteraction = (tileUUID) => {
    this.props.editTileInteraction({
      selectedTileID: tileUUID,
    })
  }

  onDeleteTile = (tileUUID) => {
    this.props.deleteTile({
      selectedTileID: tileUUID,
    })
  }

  onChangeTileOrder = (tileUUID, changeInstruction) => {
    this.props.changeTileOrder({
      selectedTileID: tileUUID,
      changeInstruction,
    })
  }

  updatePost = (updatedPost) => {
    this.props.upsertPost(updatedPost)
      .catch(err => {
        console.log('error in updatePost', err);
        alert('there was an error updating/adding your post');
      })
  }

  onSelectForumColony = (selectedColony) => {
    this.props.setModalAndColony({
      activeModal: 'Colony',
      selectedColonyID: selectedColony.uuid,
    })
  }

  render() {
    const {
      drafts,
      ui,
      tidbitColonies,
      forumColonies,
      profileColonies,
      ownUserColony,
      draftTiles,
    } = this.props;

    return (
      <div id='home-container'>
          <NavBar />
          <div
            style={{
              marginTop: NAV_BAR_HEIGHT,
            }}
            id='scene-container'
          >
            <Route
              path='/home/post'
              component={Post}
              tidbitColonies={tidbitColonies}
              forumColonies={forumColonies}
              profileColonies={profileColonies}
              ownUserColony={ownUserColony}
              onEditTile={this.onEditTile}
              onEditTileInteraction={this.onEditTileInteraction}
              onDeleteTile={this.onDeleteTile}
              onChangeTileOrder={this.onChangeTileOrder}
              postData={this.props.selectedPost}
              updatePost={this.updatePost}
              submitPost={this.onFinishPost}
              selectedTileID={this.props.ui.selectedTileID}
              draftTiles={draftTiles}
            />
            <Route
              path='/home/dashboard'
              component={Dashboard}
            />
            <Route
              path='/home/profileColony'
              component={ProfileColony}
            />
            <Route
              path='/home/forumColony'
              component={ForumColony}
              forumColonies={forumColonies}
              onTouchColony={this.onSelectForumColony}
            />
            <Route
              path='/home/editPosts'
              component={EditPosts}
              postsData={this.props.posts}
            />
            <Route
              path='/home/tidbits'
              component={TidBits}
            />
            <Route
              path='/home/profileTabs'
              component={ProfileTabs}
              ownUserColony={ownUserColony}
            />
          </div>
        <div id='fixed-background'>
        </div>
        <Modal
          shouldRender={!isNil(this.props.ui.activeModal)}
          activeModal={this.props.ui.activeModal}
        />
      </div>
    );
  }
}

export default connect(Home);
