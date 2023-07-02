"use strict";
const NumberPrototypeValueOf = require("@nodefill/primordials/NumberPrototypeValueOf.js");

/**
 * @param {any} x
 * @returns {x is Number}
 * @see https://nodejs.org/api/util.html#utiltypesisnumberobjectvalue
 */
module.exports = function isNumberObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    NumberPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
};
