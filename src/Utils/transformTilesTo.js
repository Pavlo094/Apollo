import { reduce } from 'lodash';

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
    'editorState': true,
  }
}

export function transformTilesTo(version, tiles) {
  return reduce(tiles, (acc, tile, index) => {
    const transformedTile = reduce(tile, (result, value, prop) => {
      if (BLACKLIST[version][prop] || value === '') {
        return result;
      }
      result[prop] = value;
      return result;
    }, {});
    acc.push(transformedTile);
    return acc;
  }, []);
}
