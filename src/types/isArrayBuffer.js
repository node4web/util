"use strict";
const ArrayBufferPrototypeGetByteLength = require("@nodefill/primordials/ArrayBufferPrototypeGetByteLength.js");

/**
 * @param {any} x
 * @returns {x is ArrayBuffer}
 * @see https://nodejs.org/api/util.html#utiltypesisarraybuffervalue
 */
module.exports = function isArrayBuffer(x) {
  try {
    ArrayBufferPrototypeGetByteLength(x);
  } catch {
    return false;
  }
  return true;
};
