export function getBoundedPositions(bounds, positionX, positionY) {
  const positions = {};
  if (positionX > bounds.right) {
    positions.x = bounds.right;
  }
  else if (positionX < bounds.left) {
    positions.x = bounds.left;
  }
  else {
    positions.x = positionX;
  }
  if (positionY > bounds.bottom) {
    positions.y = bounds.bottom;
  }
  else if (positionY < bounds.top) {
    positions.y = bounds.top
  }
  else {
    positions.y = positionY
  }
  return positions;
}
