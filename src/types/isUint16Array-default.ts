/** @see https://nodejs.org/api/util.html#utiltypesisuint16arrayvalue */
export = function isUint16Array(x: any): x is Uint16Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Uint16Array"
  );
};
