import React, { Component } from 'react';
import { get, isNil } from 'lodash';
import { Button, ColonyHex } from 'AppComponents';
import { stylesheet } from './stylesheet';

export class Colony extends Component {

  constructor(props, context) {
    super(props, context);

    const postColonyUUID = get(props.postColonies, '[0]', []);

    this.state = {
      isSelected: postColonyUUID === props.data.uuid,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isNil(this.props.postColonies)) {
      return;
    }
    const { data: colony } = this.props;
    const colonyIsSelected = nextProps.postColonies.findIndex(postColonyUUID => postColonyUUID === colony.uuid) !== -1;
    if (colonyIsSelected === this.state.isSelected) {
      return;
    }
    this.setState({
      isSelected: colonyIsSelected,
    })
  }

  handleTouchColony = () => {
    const { data: colony, onTouchColony } = this.props;
    onTouchColony(colony, this.state.isSelected);
  }

  render() {
    const { postColonies, data: colony } = this.props;
    const fullImageURL = colony.thumbnailImagePath;
    const containerStyle = this.state.isSelected ? stylesheet.colonyContainer : null;
    if (colony.isEmpty) {
      return (
        <div id='colony-container'></div>
      )
    }
    return (
      <div
        id='colony-container'
        style={containerStyle}
      >
        <div id='colony-button-container'>
          <Button
            id='colony-thumbnail-button'
            onClick={this.handleTouchColony}
          >
            <ColonyHex
              width={140}
              height={140}
              src={fullImageURL}
            />
          </Button>
        </div>
        <div id='colony-name-container'>
          <p id='colony-forum-text'>{colony.name}</p>
        </div>
      </div>
    )
  }
}
