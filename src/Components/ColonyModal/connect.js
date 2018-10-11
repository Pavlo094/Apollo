import { uiActionCreators, upsertColony, deleteColony } from 'AppRedux';
import { connect } from 'react-redux';

function mapStateToProps({ forumColonies, profileColonies, tidbitColonies, ui }) {
  const colonies = {
    ...forumColonies,
    ...profileColonies,
    ...tidbitColonies,
  }
  const { selectedColonyID } = ui;
  let selectedColony;
  selectedColony = colonies[selectedColonyID];
  return {
    selectedColony,
  }
}

const actionCreators = {
  ...uiActionCreators,
  upsertColony,
  deleteColony,
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
