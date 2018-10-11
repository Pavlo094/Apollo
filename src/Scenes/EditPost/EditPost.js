import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tiles, ToolBar, Phone, TileCreate } from 'AppComponents';
import { NAV_BAR_HEIGHT, TOOLBAR_HEIGHT } from 'AppConstants';
import styled from 'styled-components';
import { divAStyles, phoneDivStyles } from 'AppStyles';
import { isNil, isEmpty } from 'lodash';

const Container = styled.div`${divAStyles}`;
const PhoneContainer = styled.div`${phoneDivStyles}`;

class EditPost extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toolBarHeight: TOOLBAR_HEIGHT,
    };
  }

  onPostUpdate = () => {
    this.props.submitPost()
      .then(() => {
        this.props.history.push('/home/editPosts')
      })
  }

  disableCheck = (post) => {
    if (post.postTiles.length === 0) {
      return true;
    }
    if (post.isDraft && isEmpty(post.postColonies)) {
      return true;
    }
    const inputTitle = post.postTitle;
    if (isNil(inputTitle) || inputTitle === '') {
      return true;
    }
    return false;
  }

  render() {
    const {
      postData,
      colonies,
      updatePost,
      submitPost,
      updateThumbnail,
      onEditTile,
      onEditTileInteraction,
      onDeleteTile,
      onChangeTileOrder,
      selectedTileID,
      draftTiles,
      ownUserColony,
    } = this.props;

    let post = postData;
    const { toolBarHeight } = this.state;

    if (isNil(postData)) {
      post = {
        postTiles: [],
        thumbnailImagePath: '',
        postTitle: '',
        uuid: void(0),
        postColonies: [],
      }
    }

    const isPostingDisabled = this.disableCheck(post);

    return (
        <Container>
          <ToolBar />
          <TileCreate
            submitPost={submitPost}
            topOffset={NAV_BAR_HEIGHT + toolBarHeight}
            isPostingDisabled={isPostingDisabled}
          />
          <PhoneContainer
            marginTop={NAV_BAR_HEIGHT}
          >
            <Phone
              post={post}
              phoneType={'iPhoneX'}
              ownUserColony={ownUserColony}
              updatePost={updatePost}
              onEditTile={onEditTile}
              selectedTileID={selectedTileID}
              // setSelectedTile={setSelectedTile}
              draftTiles={draftTiles}
              scaledScreenWidth={500}
            />
          </PhoneContainer>
        </Container>
    );
  }
}

export default withRouter(EditPost);
