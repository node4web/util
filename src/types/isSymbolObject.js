"use strict";
const SymbolPrototypeGetDescription = require("@nodefill/primordials/SymbolPrototypeGetDescription.js");

module.exports = function isSymbolObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    SymbolPrototypeGetDescription(x);
  } catch {
    return false;
  }
  return true;
};
