/** @see https://nodejs.org/api/util.html#utiltypesisnativeerrorvalue */
export = function isNativeError(x: any): x is Error {
  if (!x || typeof x !== "object") {
    return false;
  }
  const p = Object.getPrototypeOf(x);
  return (
    p === Error.prototype ||
    p === AggregateError.prototype ||
    p === EvalError.prototype ||
    p === RangeError.prototype ||
    p === ReferenceError.prototype ||
    p === SyntaxError.prototype ||
    p === TypeError.prototype ||
    p === URIError.prototype
  );
};
