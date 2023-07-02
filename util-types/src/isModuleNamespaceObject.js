"use strict";
const ObjectGetPrototypeOf = require("@nodefill/primordials/ObjectGetPrototypeOf.js");
const SymbolToStringTag = require("@nodefill/primordials/SymbolToStringTag.js");

/**
 * @param {any} x
 * @returns {x is object}
 * @see https://nodejs.org/api/util.html#utiltypesismodulenamespaceobjectvalue
 */
module.exports = function isModuleNamespaceObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  return ObjectGetPrototypeOf(x) == null && x[SymbolToStringTag] === "Module";
};
