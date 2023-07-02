"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @typedef {| Int8Array
 *   | Uint8Array
 *   | Uint8ClampedArray
 *   | Int16Array
 *   | Uint16Array
 *   | Int32Array
 *   | Uint32Array
 *   | Float32Array
 *   | Float64Array
 *   | BigInt64Array
 *   | BigUint64Array} TypedArray
 */

/**
 * @param {any} x
 * @returns {x is TypedArray}
 * @see https://nodejs.org/api/util.html#utiltypesistypedarrayvalue
 */
module.exports = function isBigInt64Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) != null;
};
