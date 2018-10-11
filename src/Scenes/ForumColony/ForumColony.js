import React, { Component } from 'react';
import { ColoniesList, Button } from 'AppComponents';
import { getAllForumColonies } from 'AppServices';
import { reduce } from 'lodash';
import connect from './connect';
import './styles.css';

class ForumColony extends Component {

  constructor(props, context) {
    super(props, context);
  }

  displayCreateColonyModal = () => {
    this.props.setModal({
      activeModal: 'Colony',
    })
  }

  createColoniesList(colonies) {
    return reduce(colonies, (result, value, key) => {
      result.push(value);
      return result;
    }, []);
  }

  render() {
    let { forumColonies } = this.props;
    if (!Array.isArray(forumColonies)) {
      forumColonies = this.createColoniesList(forumColonies)
    }
    return (
      <div id='bg-forum-colony'>
        <div id='forum-colony-message-container'>
          <p>Select a colony to edit or</p>
          <Button
            className='dashboard-button'
            id='forum-colony-create-button'
            onClick={this.displayCreateColonyModal}
          >
            Create a New One
          </Button>
        </div>
        <div id="forum-colony-select-container">
          <ColoniesList
            colonies={forumColonies}
            onTouchColony={this.props.onTouchColony}
          />
        </div>
      </div>
    );
  }
}

export default connect(ForumColony);
