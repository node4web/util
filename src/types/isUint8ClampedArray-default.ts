/** @see https://nodejs.org/api/util.html#utiltypesisuint8clampedarrayvalue */
export = function isUint8ClampedArray(x: any): x is Uint8ClampedArray {
  return (
    Reflect.get(
      Object.getPrototypeOf(Uint8Array).prototype,
      Symbol.toStringTag,
      x,
    ) === "Uint8ClampedArray"
  );
};
