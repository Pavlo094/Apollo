import { uiActionCreators } from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...uiActionCreators,
}

export default function(component) {
  return connect(
    null,
    actionCreators,
  )(component);
}
