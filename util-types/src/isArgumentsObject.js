"use strict";
const SymbolToStringTag = require("@nodefill/primordials/SymbolToStringTag.js");
const ObjectPrototypeToString = require("@nodefill/primordials/ObjectPrototypeToString.js");

/**
 * @param {any} x
 * @returns {x is IArguments}
 * @see https://nodejs.org/api/util.html#utiltypesisargumentsobjectvalue
 */
module.exports = function isArgumentsObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  return (
    !(SymbolToStringTag in x) &&
    ObjectPrototypeToString(x) === "[object Arguments]"
  );
};
