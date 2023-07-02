"use strict";
const ObjectGetPrototypeOf = require("@nodefill/primordials/ObjectGetPrototypeOf.js");
const Set = require("@nodefill/primordials/Set.js");
const SetPrototypeEntries = require("@nodefill/primordials/SetPrototypeEntries.js");

const SetIteratorPrototype = ObjectGetPrototypeOf(
  SetPrototypeEntries(new Set())
);

/**
 * @param {any} x
 * @returns {x is Iterator<any, any>}
 * @see https://nodejs.org/api/util.html#utiltypesissetiteratorvalue
 */
module.exports = function isSetIterator(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  return ObjectGetPrototypeOf(x) === SetIteratorPrototype;
};
