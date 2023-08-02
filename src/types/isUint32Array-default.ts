/** @see https://nodejs.org/api/util.html#utiltypesisuint32arrayvalue */
export = function isUint32Array(x: any): x is Uint32Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x
    ) === "Uint32Array"
  );
};
