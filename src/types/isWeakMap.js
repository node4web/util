"use strict";
const WeakMapPrototypeHas = require("@nodefill/primordials/WeakMapPrototypeHas.js");

/**
 * @param {any} x
 * @returns {x is WeakMapMap<any, any>}
 * @see https://nodejs.org/api/util.html#utiltypesisweakmapvalue
 */
module.exports = function isWeakMap(x) {
  try {
    WeakMapPrototypeHas(x);
  } catch {
    return false;
  }
  return true;
};
