import { find, isNil, get } from 'lodash';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { setTileAndEditor } from '../sharedActions';

export function selectTile({ id }) {
  return (dispatch, getState) => {
    const { posts, ui, drafts, draftTiles, textEditor } = getState();
    const { isDraftSelected, selectedPostID, selectedTileID } = ui;
    const selectedPost = isDraftSelected ? drafts[selectedPostID] : posts[selectedPostID];
    const foundTile = find(selectedPost.postTiles, { uuid: id });
    const textDraftTile = get(draftTiles.text, 'uuid');
    let tileEditorState = textEditor.state;
    if (!isNil(foundTile) && foundTile.type === 'text') {
      const tileContent = foundTile.content[0][0];
      const htmlState = convertFromHTML(tileContent);
      const processedContent = ContentState.createFromBlockArray(
        htmlState.contentBlocks,
        htmlState.entityMap
      );
      tileEditorState = EditorState.createWithContent(processedContent);
    }
    dispatch(setTileAndEditor({
      editorState: tileEditorState,
      selectedTileID: id,
    }))
  }
}
