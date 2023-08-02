/** @see https://nodejs.org/api/util.html#utiltypesisweakmapvalue */
export = function isWeakMap(x: any): x is WeakMap<any, any> {
  try {
    WeakMap.prototype.has.call(x);
  } catch {
    return false;
  }
  return true;
};
