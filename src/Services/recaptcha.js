import { request } from './request';

const post = ({ query, data, params }) => {
    const paramsWithMethod = {
      ...params,
      method: 'POST',
      body: JSON.stringify({
        recaptchaResult: data,
      })
    };
    return request('recaptcha', paramsWithMethod, query ,data);
}

const recaptcha = {
  post,
}

export { recaptcha };
