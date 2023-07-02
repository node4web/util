"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Float32Array}
 * @see https://nodejs.org/api/util.html#utiltypesisfloat32arrayvalue
 */
module.exports = function isFloat32Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Float32Array";
};
