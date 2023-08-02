/** @see https://nodejs.org/api/util.html#utiltypesisweakmapvalue */
export = function isWeakSet(x: any): x is WeakSet<any> {
  try {
    WeakSet.prototype.has.call(x);
  } catch {
    return false;
  }
  return true;
};
