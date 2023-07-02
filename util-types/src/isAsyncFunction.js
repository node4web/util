"use strict";
const FunctionPrototypeToString = require("@nodefill/primordials/FunctionPrototypeToString.js");
const StringPrototypeStartsWith = require("@nodefill/primordials/StringPrototypeStartsWith.js");

/**
 * Remember, a non-async function could return a `Promise` and still _feel_ like
 * an async function. This check uses `Function.prototype.toString()` to check
 * if the raw source code starts with the `async` marker.
 *
 * For example, in the browser `isAsyncFunction(fetch)` returns `false` even
 * though `fetch` returns a `Promise`.
 *
 * @param {any} x
 * @returns {x is AsyncFunction}
 * @see https://nodejs.org/api/util.html#utiltypesisasyncfunctionvalue
 */
module.exports = function isAsyncFunction(x) {
  return (
    typeof x === "function" &&
    StringPrototypeStartsWith(FunctionPrototypeToString(x), "async ")
  );
};
