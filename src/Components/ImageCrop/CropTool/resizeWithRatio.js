export function resizeWithRatio({ ratio, updatedWidth, updatedHeight, bottomBound, rightBound }) {
  const rightBoundHeight = Math.round(rightBound / ratio);
  const bottomBoundWidth = Math.round(bottomBound * ratio);

  const sizedByWidthBounds = {
    width: rightBound,
    height: rightBoundHeight,
  }

  const sizedByHeightBounds = {
    width: bottomBoundWidth,
    height: bottomBound,
  }
  if (updatedWidth >= rightBound) {
    if (rightBoundHeight > bottomBound) {
      return sizedByHeightBounds;
    }
    return sizedByWidthBounds;
    // return {
    //   width: rightBound,
    //   height: Math.round(rightBound / ratio),
    // }
  }
  if (updatedHeight >= bottomBound) {
    if (bottomBoundWidth > rightBound) {
      return sizedByWidthBounds;
    }
    return sizedByHeightBounds;
    // return {
    //   height: bottomBound,
    //   width: Math.floor(bottomBound * ratio),
    // }
  }
  return {
    width: updatedWidth,
    height: Math.round(updatedWidth / ratio),
  }

}
