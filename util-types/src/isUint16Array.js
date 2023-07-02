"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Uint16Array}
 * @see https://nodejs.org/api/util.html#utiltypesisuint16arrayvalue
 */
module.exports = function isUint16Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Uint16Array";
};
