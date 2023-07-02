"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Int16Array}
 * @see https://nodejs.org/api/util.html#utiltypesisint16arrayvalue
 */
module.exports = function isInt16Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Int16Array";
};
