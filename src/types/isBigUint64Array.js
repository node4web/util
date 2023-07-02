"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is BigUint64Array}
 * @see https://nodejs.org/api/util.html#utiltypesisbiguint64arrayvalue
 */
module.exports = function isBigUint64Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "BigUint64Array";
};
