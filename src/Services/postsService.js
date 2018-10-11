import { isEmpty } from 'lodash';
import { Cognito } from 'AppAuth';
import { destructGuard } from 'AppUtils';
import { request } from './request';

function mapTiles(tilesOrder, tileData) {
  return tilesOrder.map((tileId) => tileData[tileId]);
}

const post = ({ query, data, params }) => {
    const paramsWithMethod = {
      ...params,
      method: 'POST',
      body: JSON.stringify({
        ...data,
      })
    };
    return request('posts', paramsWithMethod, query ,data);
}

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('posts', paramsWithMethod, query ,data);
}

const patch = ({ query, params, data, id }) => {
  const paramsWithMethod = {
    ...params,
    method: 'PATCH',
    body: JSON.stringify({
      ...data,
    })
  }
  return request('posts', paramsWithMethod, query, data, id);
}

const deleteMethod = ({ query, params, id }) => {
  const paramsWithMethod = {
    ...params,
    method: 'DELETE',
  };
  return request('posts', paramsWithMethod, query, void(0), id);
}

const posts = {
  post,
  get: destructGuard(get),
  patch,
  delete: deleteMethod,
}

export { posts };
