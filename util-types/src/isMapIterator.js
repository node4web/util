"use strict";
const ObjectGetPrototypeOf = require("@nodefill/primordials/ObjectGetPrototypeOf.js");
const Map = require("@nodefill/primordials/Map.js");
const MapPrototypeEntries = require("@nodefill/primordials/MapPrototypeEntries.js");

const MapIteratorPrototype = ObjectGetPrototypeOf(
  MapPrototypeEntries(new Map())
);

/**
 * @param {any} x
 * @returns {x is Iterator<any, any>}
 * @see https://nodejs.org/api/util.html#utiltypesismapiteratorvalue
 */
module.exports = function isMapIterator(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  return ObjectGetPrototypeOf(x) === MapIteratorPrototype;
};
