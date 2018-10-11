import { Cognito } from 'AppAuth';
import { request } from './request';
import { destructGuard } from 'AppUtils';

// const post = ({ query, data, params }) => {
//     const paramsWithMethod = {
//       ...params,
//       method: 'POST',
//       body: JSON.stringify({
//         payload: data,
//       })
//     };
//     return request('profileColony', paramsWithMethod, query ,data)
// }
//
// const patch = ({ query, data, params }) => {
//   const paramsWithMethod = {
//     ...params,
//     method: 'PATCH',
//     body: JSON.stringify({
//       payload: data,
//     })
//   };
//   return request('profileColony', paramsWithMethod, query, data)
// }

const get = ({ query, params, data }) => {
  const paramsWithMethod = {
    ...params,
    method: 'GET',
  };
  return request('profileColony', paramsWithMethod, query ,data)
    .then(response => {
      return response;
    })
}

const profileColony = {
  get: destructGuard(get),
  // post,
  // patch,
}

export { profileColony };
