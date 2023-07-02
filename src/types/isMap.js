"use strict";
const MapPrototypeGetSize = require("@nodefill/primordials/MapPrototypeGetSize.js");

/**
 * @param {any} x
 * @returns {x is Map<any, any>}
 * @see https://nodejs.org/api/util.html#utiltypesismapvalue
 */
module.exports = function isMap(x) {
  try {
    MapPrototypeGetSize(x);
  } catch {
    return false;
  }
  return true;
};
