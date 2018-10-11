import { destructGuard } from 'AppUtils';
import { request } from './request';

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('tidbitQueue', paramsWithMethod, query ,data)
}

const update = ({ id, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'PUT',
    body: JSON.stringify({
      ...data,
    })
  };
  return request('tidbitQueue', paramsWithMethod, void(0), data, id);
}

const tidbitQueue = {
  get: destructGuard(get),
  update,
}

export { tidbitQueue };
