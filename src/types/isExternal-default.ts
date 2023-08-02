/** @see https://nodejs.org/api/util.html#utiltypesisexternalvalue */
export = function isExternal(x: any): x is object {
  return false;
};
