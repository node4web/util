"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Uint8Array}
 * @see https://nodejs.org/api/util.html#utiltypesisuint8arrayvalue
 */
module.exports = function isUint8Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Uint8Array";
};
