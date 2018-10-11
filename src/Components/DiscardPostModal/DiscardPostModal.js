import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, get, cloneDeep } from 'lodash';
import { PostingTileHeader, Button } from 'AppComponents';
import { withRouter } from 'react-router-dom';
import connect from './connect';
import './styles.css';

class DiscardPostModal extends Component {
  static propTypes = {

  }

  constructor(props, context) {
    super(props, context);
  }

  handleClosePress = () => {
    this.props.setModal({
      activeModal: void(0),
    })
  }

  postEmptyDraft = () => {
    this.props.deleteSelectedPost()
      .then(() => {
        const currentScene = this.props.history.location.pathname;
        this.props.setSelectedPost({
          id: void(0),
          isDraft: void(0),
        })
        if (currentScene === '/home/editPost') {
          this.props.history.push('/home/editPosts');
          return;
        }
        if (currentScene === '/home/editTidBit') {
          this.props.history.push('/home/tidbits');
          return;
        }
        this.props.history.push('/home/dashboard');
      })
      .catch(err => {
        console.log('err attempting post delete', err);
        alert('there was an issue deleting your post');
      })
  }

  render() {
    const { isDraftSelected } = this.props;
    const modalTitle = isDraftSelected ? 'DISCARD DRAFT' : 'DISCARD POST';
    return (
      <div id='modal-bg'>
        <div id="discard-draft-modal-container">
          <div id="background-overlay">
            <PostingTileHeader
              title={modalTitle}
              onClosePress={this.handleClosePress}
            />
            <h3 id="discard-draft-text">Are you sure?</h3>
            <div id='discard-draft-buttons-container'>
              <Button id="submit-tile-button"
                onClick={this.handleClosePress}>No</Button>
              <Button id="invert-submit-tile-button"
                onClick={this.postEmptyDraft}>Yes</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(DiscardPostModal));
