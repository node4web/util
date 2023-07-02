"use strict";
const ObjectPrototypeToString = require("@nodefill/primordials/ObjectPrototypeToString.js");

/**
 * 🛑 This is a **loose** check. It uses `Object.prototype.toString()`.
 *
 * @param {any} x
 * @returns {x is import("node:crypto").KeyObject}
 */
module.exports = function isKeyObject(x) {
  return ObjectPrototypeToString(x) === "[object KeyObject]";
};
