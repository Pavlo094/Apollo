import moment from 'moment';

export function orderPostsByDate(postList, oldestFirst) {
  const sortedList = [...postList].sort((a, b) => {
    const aDate = a.resource.split('_')[0];
    const aMilliseconds = moment(aDate).valueOf();
    const bDate = b.resource.split('_')[0];
    const bMilliseconds = moment(bDate).valueOf();
    if (aMilliseconds < bMilliseconds) {
      return oldestFirst ? -1 : 1;
    }
    if (aMilliseconds > bMilliseconds) {
      return oldestFirst ? 1 : -1;
    }
    return 0;
  });
  return sortedList;
}
