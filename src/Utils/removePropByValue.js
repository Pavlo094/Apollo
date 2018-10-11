import { isPlainObject } from 'lodash';

export function removePropByValue(collection, value) {
  if (!isPlainObject(collection)) {
    return new Error('first argument must be a plain object');
  }
  const updatedObject = {};
  for (let prop in collection) {
    if (collection[prop] !== value) {
      updatedObject[prop] = collection[prop];
    }
  }
  return updatedObject;
}
