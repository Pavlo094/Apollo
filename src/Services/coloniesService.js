import { Cognito } from 'AppAuth';
import { request } from './request';

const post = ({ query, data, params }) => {
    const paramsWithMethod = {
      ...params,
      method: 'POST',
      body: JSON.stringify(data)
    };
    return request('colonies', paramsWithMethod, query ,data)
}

const patch = ({ query, data, params, id }) => {
  const paramsWithMethod = {
    ...params,
    method: 'PATCH',
    body: JSON.stringify(data)
  };
  return request('colonies', paramsWithMethod, query, data, id)
}

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('colonies', paramsWithMethod, query ,data)
    .then(response => {
      return response;
    })
}

const deleteMethod = ({ id, params }) => {
  const paramsWithMethod = {
    ...params,
    method: 'DELETE',
  };
  return request('colonies', paramsWithMethod, void(0), void(0), id);
}

const colonies = {
  get,
  post,
  patch,
  delete: deleteMethod,
}

export { colonies };
