export function resize({ updatedWidth, updatedHeight, bottomBound, rightBound }) {
  const updatedSize = {
    height: updatedHeight,
    width: updatedWidth,
  };
  if (updatedWidth > rightBound) {
    updatedSize.width = rightBound;
  }
  if (updatedHeight > bottomBound) {
    updatedSize.height = bottomBound;
  }
  return updatedSize;
}
