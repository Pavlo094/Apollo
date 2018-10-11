export function getInitToolSize(imgData, toolRatio) {
  if (!toolRatio) {
    return {
      height: imgData.height * 0.5,
      width: imgData.width * 0.5,
    }
  }
  const imgRatio = imgData.width / imgData.height;
  if (imgRatio > toolRatio) {
    return {
      height: imgData.height,
      width: Math.round(imgData.height * toolRatio),
    }
  }
  else {
    return {
      width: imgData.width,
      height: imgData.width / toolRatio,
    }
  }
}
