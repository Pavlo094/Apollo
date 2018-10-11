import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, isEmpty, reduce } from 'lodash';
import generateUUID from 'uuid/v4';
import { Cognito } from 'AppAuth';
import connect from './connect';

import { Button, ColoniesList, PostingTileHeader } from 'AppComponents';

import './styles.css';

const underlinedStyle = {
  textDecoration: 'underline',
}

class ColonySelectModal extends Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context);
    this.state = {
      displayedColonyType: 'forum',
    };
  }

  handleClosePress = () => {
    this.props.setModal({
      activeModal: void(0),
    })
  }

  selectForumColonies = () => {
    this.setState({
      displayedColonyType: 'forum',
    })
  }

  selectedTidbitColonies = () => {
    this.setState({
      displayedColonyType: 'tidbit'
    })
  }

  updatePostColonies = (updatedPostColony, isCurrentlySelected) => {
    const { activePost } = this.props;
    let updatedPostColonies;
    if (isCurrentlySelected) {
      updatedPostColonies = [];
    }
    else {
      updatedPostColonies = [updatedPostColony.uuid];
    }

    this.props.upsertPost({
      ...activePost,
      postColonies: updatedPostColonies
    })
  }

  createColoniesList(colonies) {
    const { displayedColonyType } = this.state;
    return reduce(colonies, (result, value, key) => {
      if (value.type === displayedColonyType) {
        result.push(value);
      }
      return result;
    }, []);
  }

  render() {
    const { displayedColonyType } = this.state;
    const { tidbitColonies, forumColonies, profileColonies } = this.props;
    const { postColonies } = this.props.activePost;
    const { permissions, id } = Cognito.getUser();
    let colonies = displayedColonyType === 'forum' ? forumColonies : tidbitColonies;
    if (!Array.isArray(colonies)) {
      colonies = this.createColoniesList(colonies)
    }
    const ownUserColony = profileColonies[id];
    if (displayedColonyType === 'forum') {
      colonies = [...colonies, ownUserColony];
    }
    return (
      <div id='modal-bg'>
        <div id='colony-select-modal-container'>
          <PostingTileHeader
            title={'SELECT A COLONY'}
            onClosePress={this.handleClosePress}
          />
          <div id='colony-filter-container'>
            <Button
              className='colony-filter-button'
              style={displayedColonyType === 'forum' ? underlinedStyle : null}
              onClick={this.selectForumColonies}
            >Forum Colonies
            </Button>
            <Button
              className='colony-filter-button'
              style={displayedColonyType === 'tidbit' ? underlinedStyle : null}
              onClick={this.selectedTidbitColonies}
              isHidden={permissions !== 'staff'}
            >Tidbit Colonies</Button>
          </div>
          <div id="colony-select-container">
            <ColoniesList
              colonies={colonies}
              postColonies={postColonies}
              onTouchColony={this.updatePostColonies}
            />
          </div>
          <div id='button-container'>
            <Button id="submit-tile-button"
              onClick={this.handleClosePress}>SELECT COLONY</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(ColonySelectModal);
