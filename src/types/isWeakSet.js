"use strict";
const WeakSetPrototypeHas = require("@nodefill/primordials/WeakSetPrototypeHas.js");

/**
 * @param {any} x
 * @returns {x is WeakMapMap<any, any>}
 * @see https://nodejs.org/api/util.html#utiltypesisweakmapvalue
 */
module.exports = function isWeakMap(x) {
  try {
    WeakSetPrototypeHas(x);
  } catch {
    return false;
  }
  return true;
};
