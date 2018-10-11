import { isEmpty, find } from 'lodash';
import { Cognito } from 'AppAuth';
import { destructGuard } from 'AppUtils';
import { request } from './request';

const post = ({ query, data, params }) => {
    const paramsWithMethod = {
      ...params,
      method: 'POST',
      body: JSON.stringify({
        ...data,
      })
    };
    return request('drafts', paramsWithMethod, query ,data)
}

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('drafts', paramsWithMethod, query ,data)
}

const drafts = {
  post,
  get: destructGuard(get),
}

export { drafts };
