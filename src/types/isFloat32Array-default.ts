/** @see https://nodejs.org/api/util.html#utiltypesisfloat32arrayvalue */
export = function isFloat32Array(x: any): x is Float32Array {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Float32Array"
  );
};
