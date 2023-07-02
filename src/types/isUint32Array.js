"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Uint32Array}
 * @see https://nodejs.org/api/util.html#utiltypesisuint32arrayvalue
 */
module.exports = function isUint32Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Uint32Array";
};
