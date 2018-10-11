import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { drafts } from './drafts'
import { posts } from './posts';
import { auth } from './auth';
import { ui } from './ui';
import { ownUser } from './ownUser';
import { forumColonies } from './forumColonies';
import { profileColonies } from './profileColonies';
import { tidbitColonies } from './tidbitColonies';
import { draftTiles } from './draftTiles';
import { textEditor } from './textEditor';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(combineReducers({
  drafts,
  auth,
  posts,
  ui,
  ownUser,
  forumColonies,
  profileColonies,
  tidbitColonies,
  draftTiles,
  textEditor,
}), applyMiddleware(...middlewares));

export { store };
