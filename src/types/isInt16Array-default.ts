/** @see https://nodejs.org/api/util.html#utiltypesisint16arrayvalue */
export = function isInt16Array(x: any): x is Int16Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Int16Array"
  );
};
