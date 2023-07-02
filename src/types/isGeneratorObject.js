"use strict";
const ObjectGetPrototypeOf = require("@nodefill/primordials/ObjectGetPrototypeOf.js");

const GeneratorPrototype = ObjectGetPrototypeOf(function* () {}.prototype);
const AsyncGeneratorPrototype = ObjectGetPrototypeOf(
  async function* () {}.prototype
);

module.exports = function isGeneratorObject(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  const p1 = ObjectGetPrototypeOf(x);
  if (!p1) {
    return false;
  }
  const p2 = ObjectGetPrototypeOf(p1);
  return p2 === GeneratorPrototype || p2 === AsyncGeneratorPrototype;
};
