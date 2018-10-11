import { connect } from 'react-redux';
import { authActionCreators, clearSelectedPost, signOut } from 'AppRedux';

const actionCreators = {
  ...authActionCreators,
  clearSelectedPost,
  signOut,
}

export default function(component) {
  return connect(
    null,
    actionCreators,
  )(component);
}
