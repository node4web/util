"use strict";
const ObjectGetPrototypeOf = require("@nodefill/primordials/ObjectGetPrototypeOf.js");
const ErrorPrototype = require("@nodefill/primordials/ErrorPrototype.js");
const AggregateErrorPrototype = require("@nodefill/primordials/AggregateErrorPrototype.js");
const EvalErrorPrototype = require("@nodefill/primordials/EvalErrorPrototype.js");
const RangeErrorPrototype = require("@nodefill/primordials/RangeErrorPrototype.js");
const ReferenceErrorPrototype = require("@nodefill/primordials/ReferenceErrorPrototype.js");
const SyntaxErrorPrototype = require("@nodefill/primordials/SyntaxErrorPrototype.js");
const TypeErrorPrototype = require("@nodefill/primordials/TypeErrorPrototype.js");
const URIErrorPrototype = require("@nodefill/primordials/URIErrorPrototype.js");

/**
 * @param {any} x
 * @returns {x is Error}
 * @see https://nodejs.org/api/util.html#utiltypesisnativeerrorvalue
 */
module.exports = function isNativeError(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  const p = ObjectGetPrototypeOf(x);
  return (
    p === ErrorPrototype ||
    p === AggregateErrorPrototype ||
    p === EvalErrorPrototype ||
    p === RangeErrorPrototype ||
    p === ReferenceErrorPrototype ||
    p === SyntaxErrorPrototype ||
    p === TypeErrorPrototype ||
    p === URIErrorPrototype
  );
};
