/** @see https://nodejs.org/api/util.html#utiltypesispromisevalue */
export = function isPromise(x) {
  return Object.prototype.toString.call(x) === "[object Promise]";
};
