"use strict";
const isNumberObject = require("./isNumberObject.js");
const isStringObject = require("./isStringObject.js");
const isBooleanObject = require("./isBooleanObject.js");
const isBigIntObject = require("./isBigIntObject.js");
const isSymbolObject = require("./isSymbolObject.js");

/** @typedef {Number | String | Boolean | BigInt | Symbol} BoxedPrimitive */

/**
 * @param {any} x
 * @returns {x is BoxedPrimitive}
 * @see https://nodejs.org/api/util.html#utiltypesisboxedprimitivevalue
 */
module.exports = function isBoxedPrimitive(x) {
  return (
    isNumberObject(x) ||
    isStringObject(x) ||
    isBooleanObject(x) ||
    isBigIntObject(x) ||
    isSymbolObject(x)
  );
};
