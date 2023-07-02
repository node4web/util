"use strict";
const uncurryThis = require("@nodefill/primordials/uncurryThis.js");
const ObjectGetOwnPropertyDescriptor = require("@nodefill/primordials/ObjectGetOwnPropertyDescriptor.js");
const globalThis = require("@nodefill/primordials/globalThis.js");

const CryptoKey = globalThis.CryptoKey;
const CryptoKeyPrototype = CryptoKey?.prototype;
const CryptoKeyPrototypeGetType =
  CryptoKeyPrototype &&
  uncurryThis(ObjectGetOwnPropertyDescriptor(CryptoKeyPrototype, "type").get);

/**
 * @param {any} x
 * @returns {x is CryptoKey}
 * @see https://nodejs.org/api/util.html#utiltypesiscryptokeyvalue
 */
module.exports = function isCryptoKey(x) {
  try {
    CryptoKeyPrototypeGetType(x);
  } catch {
    return false;
  }
  return true;
};
