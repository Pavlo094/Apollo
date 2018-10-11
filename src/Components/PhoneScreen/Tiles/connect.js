import { textEditorActionCreators, selectTile, setDraftEditorState } from 'AppRedux';
import { connect } from 'react-redux';

const actionCreators = {
  ...textEditorActionCreators,
  setDraftEditorState,
  selectTile,
}

function mapStateToProps({ textEditor }) {
  return {
    textEditor,
  }
}

export default function(component) {
  return connect(
    mapStateToProps,
    actionCreators,
  )(component);
}
