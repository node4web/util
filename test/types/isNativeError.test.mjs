import test from "node:test";
import assert from "node:assert";
import primordials from "@nodefill/primordials";
import { isNativeError } from "node:util/types";
import isNativeErrorShim from "../../dist/types/isNativeError.js";

test("isNativeError(new Error())", () => {
  assert.equal(isNativeErrorShim(new Error()), isNativeError(new Error()));
});

test("isNativeError(new EvalError())", () => {
  assert.equal(
    isNativeErrorShim(new EvalError()),
    isNativeError(new EvalError())
  );
});

test("isNativeError(new RangeError())", () => {
  assert.equal(
    isNativeErrorShim(new RangeError()),
    isNativeError(new RangeError())
  );
});

// Node.js v16 doesn't have DOMException global
if (typeof DOMException !== "undefined") {
  test("isNativeError(new DOMException())", () => {
    assert.equal(
      isNativeErrorShim(new DOMException()),
      isNativeError(new DOMException())
    );
  });
}

test("isNativeError(Error toStringTag)", () => {
  const e = new Error();
  e[Symbol.toStringTag] = "Error";
  assert.equal(isNativeErrorShim(e), isNativeError(e));
});

test("DIVERGE isNativeError(Error null prototype)", () => {
  const e = new Error();
  Object.setPrototypeOf(e, null);
  assert.equal(isNativeError(e), true);
  assert.equal(isNativeErrorShim(e), false);
});

test("isNativeError(null)", () => {
  assert.equal(isNativeErrorShim(null), isNativeError(null));
});
