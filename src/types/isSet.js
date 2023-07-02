"use strict";
const SetPrototypeGetSize = require("@nodefill/primordials/SetPrototypeGetSize.js");

/**
 * @param {any} x
 * @returns {x is Set<any>}
 * @see https://nodejs.org/api/util.html#utiltypesissetvalue
 */
module.exports = function isSet(x) {
  try {
    SetPrototypeGetSize(x);
  } catch {
    return false;
  }
  return true;
};
