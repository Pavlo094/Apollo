import { Cognito } from 'AppAuth';
import { request } from './request';

const post = ({ query, data, params }) => {
    const paramsWithMethod = {
      ...params,
      method: 'POST',
      body: data,
    };
    return request('images', paramsWithMethod, query ,data)
      .then(imageId => {
        let urlPrefix = 'https://static.justhive.com/u/'
        let userId = Cognito.getUserId();
        let imageUrl = urlPrefix + userId + '/' + imageId;
        return imageUrl;
      })
}

const images = {
  post,
}

export { images };
