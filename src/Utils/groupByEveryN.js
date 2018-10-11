export function groupByEveryN(num) {
  const n = num;
  return (arrayArg) => {
    const array = [...arrayArg];
    const result = [];
    while (array.length > 0) {
      const groupByNumber = array.length >= n ? n : array.length;
      result.push(array.splice(0, groupByNumber));
    }
    return result;
  };
}
