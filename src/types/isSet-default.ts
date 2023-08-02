/** @see https://nodejs.org/api/util.html#utiltypesissetvalue */
export = function isSet(x: any): x is Set<any> {
  try {
    Reflect.get(Set.prototype, "size", x);
  } catch {
    return false;
  }
  return true;
};
