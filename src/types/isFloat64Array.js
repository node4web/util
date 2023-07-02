"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Float64Array}
 * @see https://nodejs.org/api/util.html#utiltypesisfloat64arrayvalue
 */
module.exports = function isFloat64Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Float64Array";
};
