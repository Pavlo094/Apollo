export function cssConvert(cssData) {
  if (typeof cssData === 'number') {
    return `${cssData}px`;
  }
  return cssData;
}
