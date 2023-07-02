"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is BigInt64Array}
 * @see https://nodejs.org/api/util.html#utiltypesisbigint64arrayvalue
 */
module.exports = function isBigInt64Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "BigInt64Array";
};
