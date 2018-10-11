import React, { Component} from 'react';
import { interactionTypes } from 'AppConstants';
import { Button, PostingTileHeader } from 'AppComponents';
import { map, forEach } from 'lodash';
import connect from './connect';
import './styles.css'

class InteractionTypeModal extends Component {

  constructor(props, context) {
    super(props, context);

    forEach(interactionTypes, (value, key) => {
      this[`change_interaction_to_${value}`] = () => {
        const updatedTile = { ...props.selectedTile };
        updatedTile.interaction_type = value;
        props.upsertTile({
          tile: updatedTile,
        })
          .catch(err => {
            console.log('error in changeInteraction', err);
            alert('there was an error updating your tile');
          })
      }
    })
  }

  mapInteractionTypes = () => {
    return map(interactionTypes, (value, key) => {
      return (
        <Button
          id='interaction-type-tile'
          key={key}
          onClick={this[`change_interaction_to_${value}`]}
        >
          {value}
        </Button>
      )
    })
  }

  dismissModal = () => {
    this.props.setModal({
      activeModal: void(0),
    })
  }

  render() {
    return (
      <div id='modal-bg'>
        <div id='interaction-type-container'>
          <PostingTileHeader
            title={'EDIT INTERACTION TYPE'}
            onClosePress={this.dismissModal}
          />
          {this.mapInteractionTypes()}
        </div>
      </div>
    )
  }
}

export default connect(InteractionTypeModal);
