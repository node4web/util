/** @see https://nodejs.org/api/util.html#utiltypesisarraybuffervalue */
export = function isArrayBuffer(x: any): x is ArrayBuffer {
  try {
    Reflect.get(ArrayBuffer.prototype, "byteLength", x);
  } catch {
    return false;
  }
  return true;
};
