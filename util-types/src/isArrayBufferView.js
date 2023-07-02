"use strict";
const ArrayBufferIsView = require("@nodefill/primordials/ArrayBufferIsView.js");

/**
 * @type {(x: any) => x is ArrayBufferView}
 * @see https://nodejs.org/api/util.html#utiltypesisarraybufferviewvalue
 */
const isArrayBufferView = ArrayBufferIsView;
module.exports = isArrayBufferView;
