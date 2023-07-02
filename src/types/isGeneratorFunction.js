"use strict";
const FunctionPrototypeToString = require("@nodefill/primordials/FunctionPrototypeToString.js");
const RegExpPrototypeTest = require("@nodefill/primordials/RegExpPrototypeTest.js");

/**
 * @param {any} x
 * @returns {x is GeneratorFunction}
 * @see https://nodejs.org/api/util.html#utiltypesisgeneratorfunctionvalue
 */
module.exports = function isGeneratorFunction(x) {
  return (
    typeof x === "function" &&
    RegExpPrototypeTest(
      /^(async\s+)?function\s*\*/,
      FunctionPrototypeToString(x)
    )
  );
};
