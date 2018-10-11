import { reduce } from 'lodash';
import { transformColonyIconsTo } from 'AppUtils';

const TRANSFORM_MAP = {
  client: {
      'background_image_path': 'backgroundImagePath',
      'thumbnail_image_path': 'thumbnailImagePath',
  },
  server: {
      'backgroundImagePath': 'background_image_path',
      'thumbnailImagePath': 'thumbnail_image_path',
  }
}

const BLACKLIST = {
  client: {
    'aws:rep:updateregion': true,
    'aws:rep:updatetime': true,
    'aws:rep:deleting': true,
  },
  server: {
    'aws:rep:updateregion': true,
    'aws:rep:updatetime': true,
    'aws:rep:deleting': true,
    'postList': true,
    'payload': true,
    'uuid': true,
    'livePost': true,
    'unassignedPostList': true,
  }
}

export function transformColoniesTo(version, colonies) {
  const accumulator = Array.isArray(colonies) ? [] : {};
  return reduce(colonies, (acc, colony, colonyKey) => {
    const updatedColony = reduce(colony, (result, value, key) => {
      if(BLACKLIST[version][key]) {
        return result;
      }

      if (TRANSFORM_MAP[version][key]) {
        const transformedProperty = TRANSFORM_MAP[version][key];
        result[transformedProperty] = value;
        return result;
      }
      if (key === 'icons' && colony.type === 'profile') {
        result.icons = transformColonyIconsTo(version, value);
        return result;
      }
      result[key] = value;
      return result;
    }, {});
    acc[colonyKey] = updatedColony;
    return acc;
  }, accumulator)
}
