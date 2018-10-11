import { connect } from 'react-redux';
import { authActionCreators } from './actions';
import { signOut } from '../sharedActions';

function mapStateToProps({ auth }) {
  return { auth }
}

const actionCreators = {
  ...authActionCreators,
  signOut,
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
