import { find } from 'lodash';
import { transformTilesTo } from 'AppUtils';

export function mapPostTiles(uuidList, tiles) {
  const postTiles = uuidList.map(uuid => {
    const tile = find(tiles, { uuid });
    delete tile.container_uuid;
    return tile;
  })
  return transformTilesTo('client', postTiles);
}
