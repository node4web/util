import test from "node:test";
import assert from "node:assert";
import { isArgumentsObject } from "node:util/types";
import isArgumentsObjectShim from "../dist/isArgumentsObject.js";

function getArgumentsObject() {
  return arguments;
}

test("isArgumentsObject(arguments)", () => {
  assert.equal(
    isArgumentsObjectShim(getArgumentsObject()),
    isArgumentsObject(getArgumentsObject())
  );
});

test("isArgumentsObject([])", () => {
  assert.equal(isArgumentsObjectShim([]), isArgumentsObject([]));
});

test("isArgumentsObject(object toStringTag Arguments)", () => {
  assert.equal(
    isArgumentsObjectShim({ [Symbol.toStringTag]: "Arguments" }),
    isArgumentsObject({ [Symbol.toStringTag]: "Arguments" })
  );
});

test("DIVERGE isArgumentsObject(arguments custom toStringTag)", () => {
  const args = getArgumentsObject();
  args[Symbol.toStringTag] = "custom";
  assert.equal(isArgumentsObject(args), true);
  assert.equal(isArgumentsObjectShim(args), false);
});

test("isArgumentsObject(arguments null prototype)", () => {
  const args = getArgumentsObject();
  Object.setPrototypeOf(args, null);
  assert.equal(isArgumentsObjectShim(args), isArgumentsObject(args));
});

test("isArgumentsObject(null)", () => {
  assert.equal(isArgumentsObjectShim(null), isArgumentsObject(null));
});
