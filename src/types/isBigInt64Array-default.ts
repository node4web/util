/** @see https://nodejs.org/api/util.html#utiltypesisbigint64arrayvalue */
export = function isBigInt64Array(x: any): x is BigInt64Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x
    ) === "BigInt64Array"
  );
};
