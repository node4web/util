"use strict";
const uncurryThis = require("@nodefill/primordials/uncurryThis.js");
const StringPrototype = require("@nodefill/primordials/StringPrototype.js");

const StringPrototypeToWellFormed =
  StringPrototype.toWellFormed && uncurryThis(StringPrototype.toWellFormed);

let toUSVString;
if (StringPrototypeToWellFormed) {
  toUSVString = StringPrototypeToWellFormed;
} else {
  toUSVString = require("./internal/String_toWellFormed.js");
}

/** @type {(s: string) => string} */
module.exports = toUSVString;
