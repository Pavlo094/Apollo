export function update(collection, comparison, updatedElement) {
  let comparisonFunc;
  let comparisonProp;
  let comparisonValue;
  const typeOfComparison = typeof comparison;
  if (typeOfComparison !== 'function' && typeOfComparison !== 'object') {
    throw new Error('comparison argument must be a function or an object with 1 property');
  }
  if (typeOfComparison === 'function') {
    comparisonFunc = comparison;
  }
  if (typeOfComparison === 'object') {
    let numOfProps = 0;
    for (let prop in comparison) {
      comparisonProp = prop;
      comparisonValue = comparison[comparisonProp];
      numOfProps += 1;
    }
    if (numOfProps > 1) {
      throw new Error('comparison object can only have one comparison property');
    }
  }
  if (Array.isArray(collection)) {
    if (collection.length > 0 && updatedElement !== undefined && typeof collection[0] !== typeof updatedElement) {
      throw new Error('updated element does not match element type of collection');
    }

    return collection.reduce((result, element) => {
      if (comparisonFunc) {
        if (comparisonFunc(element, updatedElement)) {
          if (updatedElement === undefined) {
            return result;
          }
          result.push(upatedElement);
          return result;
        }
        result.push(element);
        return result;
      }
      if (element[comparisonProp] && element[comparisonProp] === comparisonValue) {
        if (updatedElement === undefined) {
          return result;
        }
        result.push(updatedElement)
        return result;
      }
      result.push(element);
      return result;
    }, [])
  }

  let mappedObject = {};
  for (let collectionProp in collection) {
    if (updatedElement !== undefined && typeof collection[collectionProp] !== typeof updatedElement) {
      throw new Error('updated element does not match element type of collection');
    }
    if (comparisonFunc) {
      if (comparisonFunc(collection[collectionProp], updatedElement)) {
        if (updatedElement === undefined) {
          delete mappedObject[collectionProp];
          continue;
        }
        mappedObject[collectionProp] = updatedElement;
        continue;
      }
      mappedObject[collectionProp] = collection[collectionProp];
      continue;
    }
    if (collection[collectionProp][comparisonProp] && collection[collectionProp][comparisonProp] === comparisonValue) {
      if (updatedElement === undefined) {
        delete mappedObject[collectionProp];
        continue;
      }
      mappedObject[collectionProp] = comparisonValue;
      continue;
    }
    mappedObject[collectionProp] = collection[collectionProp];
  }
  return mappedObject;
}
