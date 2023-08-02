/** @see https://nodejs.org/api/util.html#utiltypesisregexpvalue */
export = function isRegExp(x: any): x is RegExp {
  try {
    Reflect.get(RegExp.prototype, "global", x);
  } catch {
    return false;
  }
  return true;
};
