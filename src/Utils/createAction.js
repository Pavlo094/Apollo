export function createAction(type) {
  return (argsObj) => ({
    type,
    payload: argsObj,
  })
}
