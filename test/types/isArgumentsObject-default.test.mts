import { test, assert } from "vitest"
import isArgumentsObject from "../../src/types/isArgumentsObject-default.js";

test("isArgumentsObject(arguments) == true", function () {
  assert.equal(isArgumentsObject(arguments), true);
});

test("isArgumentsObject([]) == false", function () {
  assert.equal(isArgumentsObject([]), false);
});

test("isArgumentsObject(object toStringTag Arguments) == false", function () {
  const fakeArguments = { [Symbol.toStringTag]: "Arguments" };
  assert.equal(isArgumentsObject(fakeArguments), false);
});

test("DIVERGE isArgumentsObject(arguments custom toStringTag)", function () {
  arguments[Symbol.toStringTag] = "Arguments";
  // assert.equal(isArgumentsObject(arguments), true);
  assert.equal(isArgumentsObject(arguments), false);
});
