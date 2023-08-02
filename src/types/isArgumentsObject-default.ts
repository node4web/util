/** @see https://nodejs.org/api/util.html#utiltypesisargumentsobjectvalue */
export = function isArgumentsObject(x: any): x is IArguments {
  if (!x || typeof x !== "object") {
    return false;
  }
  return (
    !(Symbol.toStringTag in x) &&
    Object.prototype.toString.call(x) === "[object Arguments]"
  );
};
