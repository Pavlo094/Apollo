import { uiActionCreators } from 'AppRedux';
import { connect } from 'react-redux';

function mapStateToProps({ ownUser, drafts }) {
  return {
    ownUser,
    drafts,
  }
}

const actionCreators = {
  ...uiActionCreators,
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
