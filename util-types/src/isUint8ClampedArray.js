"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Uint8ClampedArray}
 * @see https://nodejs.org/api/util.html#utiltypesisuint8clampedarrayvalue
 */
module.exports = function isUint8ClampedArray(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "isUint8ClampedArray";
};
