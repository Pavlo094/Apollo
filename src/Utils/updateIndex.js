export function updateIndex(orgArray, orgIndex, newIndex) {
  if (orgIndex === newIndex) {
    return orgArray;
  }
  let array = [...orgArray];
  const pulledElement = array[orgIndex];
  const startArr = array.slice(0, orgIndex);
  const endArr = array.slice(orgIndex + 1);
  const recombinedArr = [...startArr, ...endArr];
  recombinedArr.splice(newIndex, 0, pulledElement);
  return recombinedArr;
}
