import { connect } from 'react-redux';
import { find } from 'lodash';
import { uiActionCreators, upsertTile } from 'AppRedux';

const actionCreators = {
  ...uiActionCreators,
}

export default function(component) {
  return connect(
    null,
    actionCreators,
  )(component);
}
