import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isNil, isEmpty } from 'lodash';
import {
  TileCreate,
  Phone,
  ToolBar,
  Loading,
} from 'AppComponents';
import { Network } from 'AppServices';
import { divAStyles, phoneDivStyles } from 'AppStyles';
import { NAV_BAR_HEIGHT, TOOLBAR_HEIGHT } from 'AppConstants';
import styled from 'styled-components';
import connect from './connect';

const Container = styled.div`${divAStyles}`;
const PhoneContainer = styled.div`${phoneDivStyles}`;

class EditTabPost extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toolBarHeight: TOOLBAR_HEIGHT,
    };
  }

  componentWillMount() {
    const { postData, tabType } = this.props;
    if (isNil(postData) && !isNil(tabType)) {
      this.props.createProfileTabDraft(tabType)
        .catch(err => {
          console.log('error in createProfileTabDraft', err);
          alert('there was an issue loading your profile tab');
        })
    }
  }

  disableCheck = (post) => {
    if (post.postTiles.length === 0) {
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
      ownUserColony,
      selectedTileID,
      draftTiles,
    } = this.props;

    let post = postData
    const { toolBarHeight } = this.state;

    if (isNil(postData)) {
      return (
        <Loading />
      )
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

export default connect(withRouter(EditTabPost));
