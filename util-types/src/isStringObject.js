"use strict";
const StringPrototypeValueOf = require("@nodefill/primordials/StringPrototypeValueOf.js");

/**
 * @param {any} x
 * @returns {x is String}
 * @see https://nodejs.org/api/util.html#utiltypesisstringobjectvalue
 */
module.exports = function isStringObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    StringPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
};
