"use strict";
const isArrayBuffer = require("./isArrayBuffer.js");
const isSharedArrayBuffer = require("./isSharedArrayBuffer.js");

/**
 * @param {any} x
 * @returns {x is ArrayBuffer | SharedArrayBuffer}
 * @see https://nodejs.org/api/util.html#utiltypesisanyarraybuffervalue
 */
module.exports = function isAnyArrayBuffer(x) {
  return isArrayBuffer(x) || isSharedArrayBuffer(x);
};
