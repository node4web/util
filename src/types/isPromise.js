"use strict";
const PromisePrototypeThen = require("@nodefill/primordials/PromisePrototypeThen.js");

/**
 * @param {any} x
 * @returns {x is Promise<any>}
 * @see https://nodejs.org/api/util.html#utiltypesispromisevalue
 */
module.exports = function isPromise(x) {
  try {
    PromisePrototypeThen(x);
  } catch {
    return false;
  }
  return true;
};
