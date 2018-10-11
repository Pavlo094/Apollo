import { destructGuard } from 'AppUtils';
import { request } from './request';

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('liveTidbits', paramsWithMethod, query ,data)
    .then(response => {
      return response;
    })
}

const liveTidbits = {
  get: destructGuard(get),
}

export { liveTidbits };
