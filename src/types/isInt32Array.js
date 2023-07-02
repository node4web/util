"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Int32Array}
 * @see https://nodejs.org/api/util.html#utiltypesisint32arrayvalue
 */
module.exports = function isInt32Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Int32Array";
};
