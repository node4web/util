/** @see https://nodejs.org/api/util.html#utiltypesisint8arrayvalue */
export = function isInt8Array(x: any): x is Int8Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Int8Array"
  );
};
