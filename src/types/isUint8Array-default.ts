/** @see https://nodejs.org/api/util.html#utiltypesisuint8arrayvalue */
export = function isUint8Array(x: any): x is Uint8Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Uint8Array"
  );
};
