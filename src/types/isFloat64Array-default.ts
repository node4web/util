/** @see https://nodejs.org/api/util.html#utiltypesisfloat64arrayvalue */
export = function isFloat64Array(x: any): x is Float64Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Float64Array"
  );
};
