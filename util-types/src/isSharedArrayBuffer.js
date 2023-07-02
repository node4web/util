"use strict";
const uncurryThis = require("@nodefill/primordials/uncurryThis.js");
const ObjectGetOwnPropertyDescriptor = require("@nodefill/primordials/ObjectGetOwnPropertyDescriptor.js");
const globalThis = require("@nodefill/primordials/globalThis.js");

const SharedArrayBuffer = globalThis.SharedArrayBuffer;
const SharedArrayBufferPrototype = SharedArrayBuffer?.prototype;
const SharedArrayBufferPrototypeGetByteLength =
  SharedArrayBufferPrototype &&
  uncurryThis(
    ObjectGetOwnPropertyDescriptor(SharedArrayBufferPrototype, "byteLength")
      ?.get
  );

/**
 * @param {any} x
 * @returns {x is SharedArrayBuffer}
 * @see https://nodejs.org/api/util.html#utiltypesissharedarraybuffervalue
 */
module.exports = function isSharedArrayBuffer(x) {
  try {
    SharedArrayBufferPrototypeGetByteLength(x);
  } catch {
    return false;
  }
  return true;
};
