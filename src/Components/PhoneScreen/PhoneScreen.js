import React, { Component, createElement } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { withRouter } from 'react-router-dom';
import { reduce, find, isNil, get } from 'lodash';
import { cssConvert } from 'AppUtils';
import { PhoneHeader } from './PhoneHeader';
import { PhoneTitle } from './PhoneTitle';
import { PhoneTiles } from './PhoneTiles';
import { TILE_OVERLAY_BUTTON_DATA } from './TileButtons';
// import { ParentSizeTracker } from './ParentSizeTracker';
import connect from './connect';
import './styles.css';
import styled from 'styled-components';

const PhoneScreenContainer = styled.div`
  width: ${props => cssConvert(props.width)};
  min-height: ${props => cssConvert(props.minHeight)};
  background-color: darkgray;
  text-transform: none;
  position: relative;
`;

class PhoneScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedButton: void(0),
      scrollContainer: document.getElementById('scroll-container'),
    };
  }

  componentWillMount() {
    this.overlayButtons = {
      ...TILE_OVERLAY_BUTTON_DATA,
      onClick: {
        trash: this.onClickTrash,
        interaction: this.onClickInteraction,
        edit: this.onClickEdit,
        link: this.onClickLink,
        caption: this.onClickCaption
      },
    }

    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getScrollElement = () => {
    return this.state.scrollContainer;
  }

  handleClickOutside = (e) => {
    const { selectedButton } = this.state;
    const { selectedTileID, activeModal } = this.props;
    if (isNil(selectedButton) && isNil(selectedTileID)) {
      return;
    }
    const tileElement = e.target.closest('.tile-flag');
    if (!isNil(selectedButton)) {
      const buttonElement = e.target.closest(`.button-type-${selectedButton}`);
      const didClickOnSelectedTile = !isNil(tileElement) && (tileElement.dataset.uuid === selectedTileID);
      if (isNil(buttonElement)) {
        this.setState({
          selectedButton: void(0),
        });
        return;
      }
    }
    const whiteListedElement = e.target.closest('.toolbar-container, #image-tile-container, #button-group-container');
    if (isNil(tileElement) && isNil(whiteListedElement)) {
      this.props.selectTile({
        id: void(0),
      })
    }
  }

  onClickEdit = ({
    event,
    overlayButton,
    clickedButton,
    tileData,
  }) => {
    const { selectedButton } = this.state;
    if (tileData.type === 'single-image') {
      this.props.setModal({
        activeModal: 'ImageTile',
      });
      return;
    }
    if (selectedButton === overlayButton && clickedButton === 'customBox') {
      this.setState({
        selectedButton: void(0),
      });
      return;
    }
    this.setState({
      selectedButton: overlayButton,
    })
  }

  onClickPostTrash = ({
    event,
    overlayButton,
    clickedButton,
  }) => {
    const { selectedButton } = this.state;
    const { post } = this.props;
    if (selectedButton === overlayButton && clickedButton === 'customBox') {
      this.props.deleteSelectedPost();
      if (post.isDraft) {
        this.setState({
          selectedButton: void(0),
        });
        return;
      }
      this.props.history.goBack();
    }
    this.setState({
      selectedButton: overlayButton,
    })
  }

  onClickTrash = ({
    event,
    overlayButton,
    clickedButton,
    tileData,
   }) => {
    const { selectedButton } = this.state;
    if (selectedButton === overlayButton && clickedButton === 'customBox') {
      this.props.deleteTile();
      this.setState({
        selectedButton: void(0),
      });
      return;
    }
    this.setState({
      selectedButton: overlayButton,
    })
  }

  onClickLink = ({
    event,
    overlayButton,
    clickedButton,
    tileData,
    customBoxData,
  }) => {
    const { selectedButton } = this.state;
    if (selectedButton === overlayButton && clickedButton === 'customBox') {
      const updatedTile = {
        ...tileData,
        link: customBoxData.inputText,
      };
      this.props.upsertTile({
        tile: updatedTile,
      })
      this.setState({
        selectedButton: void(0),
      });
      return;
    }
    this.setState({
      selectedButton: overlayButton,
    })
  }

  onClickCaption = ({
    event,
    overlayButton,
    clickedButton,
    tileData,
    customBoxData,
  }) => {
    const { selectedButton } = this.state;
    if (selectedButton === overlayButton && clickedButton === 'customBox') {
      this.setState({
        selectedButton: void(0),
      });
      const updatedTile = {
        ...tileData,
        caption: customBoxData.inputText,
      };
      this.props.upsertTile({
        tile: updatedTile,
      })
      return;
    }
    this.setState({
      selectedButton: overlayButton,
    })
  }

  onClickInteraction = ({
    event,
    overlayButton,
    clickedButton,
    tileData,
  }) => {
    const { selectedButton } = this.state;
    if (selectedButton === overlayButton && clickedButton === 'customBox') {
      this.setState({
        selectedButton: void(0),
      });
      return;
    }
    this.setState({
      selectedButton: overlayButton,
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { post } = this.props;
    const updatedPost = {
      ...post,
      postTiles: arrayMove(post.postTiles, oldIndex, newIndex),
    };
    this.props.updatePost(updatedPost);
  }

  onSelectTile = (e) => {
    const currentSelectedTileID = this.props.selectedTileID;
    const selectedTileID = e.target.closest('.tile-flag').dataset.uuid;
    this.props.selectTile({
      id: selectedTileID,
    })
  }

  updateTitle = (updatedTitle) => {
    const { post } = this.props;
    const updatedPost = {
      ...post,
      postTitle: updatedTitle,
    };
    this.props.upsertPost(updatedPost);
  }

  render() {
    const { post, ownUserColony, selectedTileID, draftTiles, upsertTile, clearDraftTiles, colonies, setModal } = this.props;
    const colonyIdToPostIn = get(post, 'postColonies[0]');
    const selectedColony = !isNil(colonyIdToPostIn) ? colonies[colonyIdToPostIn] : void(0);
    const { selectedButton } = this.state;
    // if (isNil(this.state.scrollContainer)) {
    //   return null;
    // }

    return (
      <PhoneScreenContainer
        innerRef={ref => this.container = ref}
        width={this.props.scaledScreenWidth}
        minHeight={this.props.minHeight}
      >
        {/*
          this component was built to detect any changes in parent height for phone overlay
          rendering currently seems to be working without need to track and reset state
          keeping the component in case bugs arise without explicitly setting state after a
          height change

          <ParentSizeTracker
          onResize={this.props.onResize}
        /> */}
        <PhoneHeader
          post={post}
          ownUserColony={ownUserColony}
          selectedButton={selectedButton}
          onClickPostTrash={this.onClickPostTrash}
          selectedColony={selectedColony}
          setModal={setModal}
        />
        <PhoneTitle
          data={post}
          updateTitle={this.updateTitle}
        />
        <PhoneTiles
          data={post.postTiles}
          onSortEnd={this.onSortEnd}
          distance={3}
          onSelectTile={this.onSelectTile}
          selectedTileID={selectedTileID}
          buttons={this.overlayButtons}
          draftTiles={draftTiles}
          upsertTile={upsertTile}
          clearDraftTiles={clearDraftTiles}
          selectedButton={selectedButton}
          getContainer={this.getScrollElement}
        />
      </PhoneScreenContainer>
    );
  }
}

export default withRouter(connect(PhoneScreen));
