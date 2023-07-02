"use strict";
const DatePrototypeValueOf = require("@nodefill/primordials/DatePrototypeValueOf.js");

/**
 * @param {any} x
 * @returns {x is Date}
 * @see https://nodejs.org/api/util.html#utiltypesisdatevalue
 */
module.exports = function isDate(x) {
  try {
    DatePrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
};
