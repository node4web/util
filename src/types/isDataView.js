"use strict";
const DataViewPrototypeGetByteLength = require("@nodefill/primordials/DataViewPrototypeGetByteLength.js");

/**
 * @param {any} x
 * @returns {x is DataView}
 * @see https://nodejs.org/api/util.html#utiltypesisdataviewvalue
 */
module.exports = function isDataView(x) {
  try {
    DataViewPrototypeGetByteLength(x);
  } catch {
    return false;
  }
  return true;
};
