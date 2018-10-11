import { createProfileTabDraft } from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  createProfileTabDraft,
}

function mapStateToProps({ ui }) {
  return {
    tabType: ui.selectedProfileTabType,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
