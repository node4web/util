"use strict";
const RegExpPrototypeGetGlobal = require("@nodefill/primordials/RegExpPrototypeGetGlobal.js");

/**
 * @param {any} x
 * @returns {x is RegExp}
 * @see https://nodejs.org/api/util.html#utiltypesisregexpvalue
 */
module.exports = function isRegExp(x) {
  try {
    RegExpPrototypeGetGlobal(x);
  } catch {
    return false;
  }
  return true;
};
