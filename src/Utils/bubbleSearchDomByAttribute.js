import { isNil } from 'lodash';

export function bubbleSearchDomByAttribute(searchedAttr, domElement) {
  if(domElement.attributes[searchedAttr]) {
    return domElement;
  }
  if (!isNil(domElement.parentNode)) {
    return bubbleSearchDomByAttribute(searchedAttr, domElement.parentNode);
  }
  throw new Error(`Could not locate DOM element with attribute ${searchedAttr}`);
}
