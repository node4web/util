type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

/** @see https://nodejs.org/api/util.html#utiltypesistypedarrayvalue */
function isTypedArray(x: any): x is TypedArray {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x
    ) != null
  );
}

export = isTypedArray;
