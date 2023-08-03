import { test, assert } from "vitest";
import isGeneratorObject from "../../src/types/isGeneratorObject-default.js";

function* g() {}
async function* gAsync() {}

test("isGeneratorObject(g()) == true", () => {
  assert.equal(isGeneratorObject(g()), true);
});

test("isGeneratorObject(gAsync()) == true", () => {
  assert.equal(isGeneratorObject(gAsync()), true);
});

test("isGeneratorObject({}) == false", () => {
  assert.equal(isGeneratorObject({}), false);
});

test("isGeneratorObject(object with toString()) == false", () => {
  const fakeGenerator = { toString: () => "[object Generator]" };
  assert.equal(isGeneratorObject(fakeGenerator), false);
});

test("isGeneratorObject(class with toStringTag) == false", () => {
  class C {
    get [Symbol.toStringTag]() {
      return "Generator";
    }
  }
  assert.equal(isGeneratorObject(new C()), false);
});

test("DIVERGE isGeneratorObject(g() with null proto) == false", () => {
  const generator = g();
  Object.setPrototypeOf(generator, null);
  assert.equal(isGeneratorObject(generator), false);
});

test("isGeneratorObject(null) == false", () => {
  assert.equal(isGeneratorObject(null), false);
});
