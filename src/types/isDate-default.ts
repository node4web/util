/** @see https://nodejs.org/api/util.html#utiltypesisdatevalue */
export = function isDate(x: any): x is Date {
  try {
    Date.prototype.valueOf.call(x);
  } catch {
    return false;
  }
  return true;
};
