import React, { Component } from 'react';
import { Loading, PhoneScreen } from 'AppComponents';
import { SIMULATED_PHONES } from 'AppConstants';
import { cssConvert } from 'AppUtils';
import styled from 'styled-components';
import { PhoneOverlay } from './PhoneOverlay';

const Container = styled.div`
  padding-left: ${props => cssConvert(props.paddingLeft)};
  padding-top: ${props => cssConvert(props.paddingTop)};
  padding-right: ${props => cssConvert(props.paddingRight)};
  padding-bottom: ${props => cssConvert(props.paddingBottom)};
  position: relative;
  height: fit-content;
  visibility: ${props => cssConvert(props.visibility)};
`;


export class Phone extends Component {
  constructor(props, context) {
    super(props, context);

    const phoneState = this.getScaledState(SIMULATED_PHONES[props.phoneType], props.scaledScreenWidth);
    this.state = {
      ...phoneState,
      visibility: 'hidden',
      tilesContainerHeight: void(0),
    };
  }


  // this function relates to the ParentSizeTracker Component but is currently not being used

  // onResize = () => {
  //   if (this.container) {
  //     const height = this.container.offsetHeight;
  //     const width = this.container.offsetWidth;
  //     this.setState({
  //       tilesContainerHeight: height,
  //     })
  //   }
  // }

  onFinishedRender = () => {
    this.setState({
      visibility: 'visible',
    })
  }

  getScaledState = (phoneData, scaledScreenWidth) => {
    const {
      naturalScreenWidth,
      screenFromTop,
      screenFromRight,
      screenFromLeft,
      screenFromBottom,
    } = phoneData.imgMetaData;
    const sizeChange = scaledScreenWidth / naturalScreenWidth;
    const top = screenFromTop * sizeChange;
    const left = screenFromLeft * sizeChange;
    const right = screenFromRight * sizeChange;
    const bottom = screenFromBottom * sizeChange;
    return {
      padding: {
        top,
        left,
        right,
        bottom,
      },
      sizeChange,
    }
  }

  render() {
    const { top, left, right, bottom } = this.state.padding;
    const {
      phoneType,
      post,
      ownUserColony,
      selectedTileID,
      draftTiles,
      upsertTile,
      updatePost,
      onEditTile,
      setSelectedTile,
    } = this.props;
    return (
      <Container
         paddingLeft={left}
         paddingTop={top}
         paddingRight={right}
         paddingBottom={bottom}
         visibility={this.state.visibility}
      >
        <PhoneOverlay
          phoneData={SIMULATED_PHONES[phoneType]}
          sizeChange={this.state.sizeChange}
          tilesContainerHeight={this.state.tilesContainerHeight}
          scaledScreenWidth={this.props.scaledScreenWidth}
          onFinishedRender={this.onFinishedRender}
        />
        <PhoneScreen
          post={post}
          ownUserColony={ownUserColony}
          updatePost={updatePost}
          onEditTile={onEditTile}
          selectedTileID={selectedTileID}
          setSelectedTile={setSelectedTile}
          draftTiles={draftTiles}
          scaledScreenWidth={this.props.scaledScreenWidth}
          onResize={this.onResize}
          minHeight={SIMULATED_PHONES[phoneType].screenRatio * this.props.scaledScreenWidth}
        />
      </Container>
    );
  }
}
