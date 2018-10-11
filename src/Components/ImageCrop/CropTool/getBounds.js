export function getBounds(element, borderWidth) {
  const parentWidth = element.parentNode.clientWidth;
  const parentHeight = element.parentNode.clientHeight;
  const elemWidth = element.clientWidth;
  const elemHeight = element.clientHeight;
  const { offsetLeft, offsetTop } = element;
  const bounds = {};
  bounds.left = -offsetLeft - borderWidth;
  bounds.top = -offsetTop - borderWidth;
  bounds.right = parentWidth - borderWidth - offsetLeft - elemWidth;
  bounds.bottom = parentHeight - borderWidth - offsetTop - elemHeight;
  bounds.resizeRight = parentWidth - offsetLeft;
  bounds.resizeBottom = parentHeight - offsetTop;
  return bounds;
}
