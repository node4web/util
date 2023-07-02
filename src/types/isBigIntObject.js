"use strict";
const BigIntPrototypeValueOf = require("@nodefill/primordials/BigIntPrototypeValueOf.js");

/**
 * @param {any} x
 * @returns {x is BigInt}
 * @see https://nodejs.org/api/util.html#utiltypesisbigintobjectvalue
 */
module.exports = function isBigIntObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    BigIntPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
};
