import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PostingTitle, Button, Tile, InteractionTypeModal } from 'AppComponents';
import { bubbleSearchDomByAttribute } from 'AppUtils';
import { isNil } from 'lodash';
import connect from './connect';
import './styles.css';

class Tiles extends Component {
  static propTypes = {

  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      inputTitle: props.activePost.postTitle || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isNil(nextProps.activePost.uuid) && isNil(this.props.activePost.uuid)) {
      this.setState({
        inputTitle: nextProps.activePost.postTitle,
      })
    }
  }

  onTitleChange = (event) => {
    this.setState({
      inputTitle: event.target.value,
    })
  }

  onBlur = (event) => {
    const { activePost, updatePost } = this.props;
    this.props.updatePost({
      ...activePost,
      postTitle: this.state.inputTitle,
    })
  }

  handleContinuePress = () => {
    this.props.history.push('/post/confirm');
  }

  getTileUUID = (domElement) => {
    const selectedButton = bubbleSearchDomByAttribute('data-tile-uuid', domElement);
    const tileUUID = selectedButton.attributes['data-tile-uuid'].value;
    return tileUUID;
  }

  handleArrowUp = (event) => {
    const { changeTileOrder } = this.props;
    const tileUUID = this.getTileUUID(event.target);
    this.props.onChangeTileOrder(tileUUID, 'up');
  }

  handleArrowDown = (event) => {
    const { changeTileOrder } = this.props;
    const tileUUID = this.getTileUUID(event.target);
    this.props.onChangeTileOrder(tileUUID, 'down');
  }

  deleteTile = (event) => {
    const { deletePostTile } = this.props;
    const tileUUID = this.getTileUUID(event.target);
    this.props.onDeleteTile(tileUUID);
  }

  addMargin = (tileIndex, postTileArr) => {
    let classNameString = 'tile';
    if (tileIndex === 0) {
      classNameString += ' tile-top-margin';
    }
    if (tileIndex === postTileArr.length - 1) {
      classNameString += ' tile-bottom-margin';
    }
    return classNameString;
  }

  beginTileEdit = (event) => {
    const tileUUID = this.getTileUUID(event.target);
    this.props.onEditTile(tileUUID);
  }

  beginTileInteractionEdit = (event) => {
    const tileUUID = this.getTileUUID(event.target);
    this.props.onEditTileInteraction(tileUUID);
  }

  mapTiles() {
    const { postTiles, changeTileOrder } = this.props;
    if (postTiles.length === 0) {
      return (
        <div id="empty-msg-container">
          A post is a collection of<br/>videos, images, links, and text<br/><br/>We call them 'tiles'.
          <br/><br/>Create your tiles<br/>using the tools on the left.
        </div>
      )
    }
    return postTiles.map((tile, index) => {
      const tileStyles = this.addMargin(index, postTiles);
      return (
        <Tile
          tileData={tile}
          handleArrowDown={this.handleArrowDown}
          handleArrowUp={this.handleArrowUp}
          deleteTile={this.deleteTile}
          beginTileInteractionEdit={this.beginTileInteractionEdit}
          beginTileEdit={this.beginTileEdit}
          style={tileStyles}
          key={tile.uuid}
        />
      )
    })
  }

  renderTitle() {
    const { titleOverride } = this.props;
    if (isNil(titleOverride)) {
      return (
        <div id="post-text-input">
          <input
            placeholder="ENTER TITLE..."
            id="title-input"
            value={this.state.inputTitle}
            onChange={this.onTitleChange}
            onBlur={this.onBlur}
            >
            </input>
          </div>
      )
    }
    return (
      <h2>{titleOverride}</h2>
    )
  }

  render() {
    return (
      <div id='post-edit-container'>
        {this.renderTitle()}
        {this.mapTiles()}
      </div>
    );
  }
}

export default withRouter(connect(Tiles));
