"use strict";
const TypedArrayPrototypeGetSymbolToStringTag = require("@nodefill/primordials/TypedArrayPrototypeGetSymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is Int8Array}
 * @see https://nodejs.org/api/util.html#utiltypesisint8arrayvalue
 */
module.exports = function isInt8Array(x) {
  return TypedArrayPrototypeGetSymbolToStringTag(x) === "Int8Array";
};
