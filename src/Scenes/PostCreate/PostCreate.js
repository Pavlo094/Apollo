import React, { Component } from 'react';
import {
  TileCreate,
  Tiles,
  PhoneScreen,
  Phone,
  ToolBar,
} from 'AppComponents';
import { NAV_BAR_HEIGHT, TOOLBAR_HEIGHT } from 'AppConstants';
import { cssConvert } from 'AppUtils';
import { isNil, isEmpty } from 'lodash';
import styled from 'styled-components';
import { divAStyles, phoneDivStyles } from 'AppStyles';
import connect from './connect';
import './styles.css';

const Container = styled.div`${divAStyles}`;
const PhoneContainer = styled.div`${phoneDivStyles}`;

class PostCreate extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toolBarHeight: TOOLBAR_HEIGHT,
    };
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
      forumColonies,
      tidbitColonies,
      profileColonies,
      ownUserColony,
      updatePost,
      submitPost,
      updateThumbnail,
      onEditTile,
      onEditTileInteraction,
      onDeleteTile,
      onChangeTileOrder,
      selectedTileID,
      // setSelectedTile,
      draftTiles,
    } = this.props;

    const { toolBarHeight } = this.state;

    let post = postData

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
            topOffset={NAV_BAR_HEIGHT + toolBarHeight}
            submitPost={submitPost}
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

export default connect(PostCreate);
