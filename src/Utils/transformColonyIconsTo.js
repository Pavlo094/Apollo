import { map } from 'lodash';

export function transformColonyIconsTo(version, icons) {
  if (version === 'client') {
    return icons.reduce((result, icon) => {
      const iconName = Object.keys(icon)[0];
      result[iconName] = icon[iconName];
      return result;
    }, {})
  }
  if (version === 'server') {
    return map(icons, (value, key) => {
      return {
        [key]: value,
      }
    })
  }
}
