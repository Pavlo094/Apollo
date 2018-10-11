import { draftActionCreators, uiActionCreators } from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...draftActionCreators,
  ...uiActionCreators,
}

function mapStateToProps({ drafts, ui }) {
  return {
    drafts,
    ui,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
