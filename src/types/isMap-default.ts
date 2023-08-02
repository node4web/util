/** @see https://nodejs.org/api/util.html#utiltypesismapvalue */
export = function isMap(x: any): x is Map<any, any> {
  try {
    Reflect.get(Map.prototype, "size", x);
  } catch {
    return false;
  }
  return true;
};
