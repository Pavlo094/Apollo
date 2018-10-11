import { forOwn } from 'lodash';

export function filterForProdEnv(forumColonies) {
  if (process.env.NODE_ENV === 'development') {
    return forumColonies;
  }
  if (Array.isArray(forumColonies)) {
    return forumColonies.filter(colony => !colony.development);
  }
  let coloniesObj = {};
  forOwn(forumColonies, (colonyData, colonyUUID) => {
    if (colonyData.development !== true) {
      coloniesObj[colonyUUID] = colonyData;
    }
    return;
  })
  return coloniesObj;
}
