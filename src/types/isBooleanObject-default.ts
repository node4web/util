/** @see https://nodejs.org/api/util.html#utiltypesisbooleanobjectvalue */
export = function isBooleanObject(x: any): x is boolean {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    Boolean.prototype.valueOf.call(x);
  } catch {
    return false;
  }
  return true;
};
