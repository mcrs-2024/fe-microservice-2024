const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
const isObject = (object: any) => {
  return object != null && typeof object === 'object';
};

const isDeepEqual = (object1: any, object2: any) => {
  if (!object1 || !object2) return false;
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if (
      (isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};
export { isDeepEqual, randomId };
