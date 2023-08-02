/** @see https://nodejs.org/api/util.html#utiltypesisstringobjectvalue */
export = function isStringObject(x: any): x is String {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    String.prototype.valueOf.call(x);
  } catch {
    return false;
  }
  return true;
};
