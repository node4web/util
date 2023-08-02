const RegExpPrototypeSymbolReplace = require("@nodefill/primordials/RegExpPrototypeSymbolReplace.js");
const TypeError = require("@nodefill/primordials/TypeError.js");

const ansi =
  /[\u001B\u009B][[\\]()#;?]*|(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\\/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~]))/g;

/**
 * @param {string} s
 * @returns {string}
 */
module.exports = function stripVTControlCharacters(s) {
  if (typeof s !== "string") {
    throw new TypeError(`${s} is not a string`);
  }
  return RegExpPrototypeSymbolReplace(ansi, s, "");
};
