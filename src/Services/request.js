import { Cognito } from 'AppAuth';
import { reduce, isEmpty } from 'lodash';
import { serviceUrls } from './serviceUrls';

function addQueryToUrl(query, url) {
  let hasQueryParams = url.indexOf('?') !== -1;
  return reduce(query, (result, value, key) => {
    let queryValues = Array.isArray(value) ? value.join(',') : value;
    let updatedResult = `${result}${hasQueryParams ? '&' : '?'}${key}=${queryValues}`;
    if (!hasQueryParams) {
      hasQueryParams = true;
    }
    return updatedResult;
  }, url);
}

export function request(service, params, query, data, id) {
  const urlPrefix = serviceUrls[service].urlPrefix;
  let url = urlPrefix;
  if (id) {
    url = `${url}/${id}`;
  }
  const apiData = {
    ...params,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if (!isEmpty(query)) {
    url = addQueryToUrl(query, url);
  }
  return Cognito.getSession()
    .then(tokens => {
      const jwt = tokens.accessToken.jwtToken;
      apiData.headers.Authorization = `Bearer ${encodeURI(jwt)}`;
      // console.log('finalUrl', url);
      // console.log('apiData', apiData);
      // console.log('apiData string', JSON.stringify(apiData));
      return fetch(url, apiData);
    })
    .catch(error => {
      if (error === 'no session present') {
        // console.log('finalUrl',url);
        // console.log('apiData', apiData);
        return fetch(url, apiData);
      }
      return Promise.reject(error);
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.text());
    })
}
