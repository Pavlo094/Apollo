import { createAction } from 'AppUtils';

export const SET_POSTS = 'posts/SET_POSTS';
export const SET_POST = 'posts/SET_POST';

export const postActionCreators = {
  setPosts: createAction(SET_POSTS),
  setPost: createAction(SET_POST),
}
