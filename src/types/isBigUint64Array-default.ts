/** @see https://nodejs.org/api/util.html#utiltypesisbiguint64arrayvalue */
export = function isBigUint64Array(x: any): x is BigUint64Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x
    ) === "BigUint64Array"
  );
};
