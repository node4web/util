/** @see https://nodejs.org/api/util.html#utiltypesissharedarraybuffervalue */
export = function isSharedArrayBuffer(x: any): x is SharedArrayBuffer {
  try {
    Reflect.get(SharedArrayBuffer.prototype, "byteLength", x);
  } catch {
    return false;
  }
  return true;
};
