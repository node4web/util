"use strict";
const BooleanPrototypeValueOf = require("@nodefill/primordials/BooleanPrototypeValueOf.js");

/**
 * @param {any} x
 * @returns {x is Boolean}
 * @see https://nodejs.org/api/util.html#utiltypesisbooleanobjectvalue
 */
module.exports = function isBooleanObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    BooleanPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
};
