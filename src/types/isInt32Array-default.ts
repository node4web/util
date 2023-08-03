/** @see https://nodejs.org/api/util.html#utiltypesisint32arrayvalue */
export = function isInt32Array(x: any): x is Int32Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Int32Array"
  );
};
