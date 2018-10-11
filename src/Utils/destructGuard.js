import { isPlainObject } from 'lodash';

// destructing arguments in a function requires that an object be passed in as an arguments
// this utility function automatically adds an empty object as an argument for destructing
// if the argument was not an object initially

export function destructGuard(fn) {
  return (arg) => {
    if (!isPlainObject(arg)) {
      if (arg !== undefined) {
        console.warn('a function you are calling expects a plain object as an argument');
      }
      return fn({});
    }
    return fn(arg);
  }
}
