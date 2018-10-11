import { Cognito } from 'AppAuth';
import { request } from './request';

const post = ({ query, data, params }) => {
    const paramsWithMethod = {
      ...params,
      method: 'POST',
      body: JSON.stringify({
        payload: data,
      })
    };
    return request('colony', paramsWithMethod, query ,data)
}

const patch = ({ query, data, params }) => {
  const paramsWithMethod = {
    ...params,
    method: 'PATCH',
    body: JSON.stringify({
      payload: data,
    })
  };
  return request('colony', paramsWithMethod, query, data)
}

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('colony', paramsWithMethod, query ,data)
    .then(response => {
      return response;
    })
}

const deleteMethod = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'DELETE',
  };
  return request('colony', paramsWithMethod, query, data);
}

const colony = {
  get,
  post,
  patch,
  delete: deleteMethod,
}

export { colony };
