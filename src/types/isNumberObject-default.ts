/** @see https://nodejs.org/api/util.html#utiltypesisnumberobjectvalue */
export = function isNumberObject(x: any): x is number {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    Number.prototype.valueOf.call(x);
  } catch {
    return false;
  }
  return true;
};
