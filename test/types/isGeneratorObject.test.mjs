import test from "node:test";
import assert from "node:assert";
import { isGeneratorObject } from "node:util/types";
import isGeneratorObjectShim from "../../dist/types/isGeneratorObject.js";

function* generatorFunction() {}
async function* asyncGeneratorFunction() {}

test("isGeneratorObject(generatorFunction())", () => {
  assert.equal(
    isGeneratorObjectShim(generatorFunction()),
    isGeneratorObject(generatorFunction())
  );
});

test("isGeneratorObject(asyncGeneratorFunction())", () => {
  assert.equal(
    isGeneratorObjectShim(asyncGeneratorFunction()),
    isGeneratorObject(asyncGeneratorFunction())
  );
});

test("isGeneratorObject({})", () => {
  assert.equal(isGeneratorObjectShim({}), isGeneratorObject({}));
});

test("isGeneratorObject(object with toString())", () => {
  assert.equal(
    isGeneratorObjectShim({ toString: () => "[object Generator]" }),
    isGeneratorObject({ toString: () => "[object Generator]" })
  );
});

test("isGeneratorObject(class with toStringTag)", () => {
  class C {
    get [Symbol.toStringTag]() {
      return "Generator";
    }
  }
  assert.equal(isGeneratorObjectShim(new C()), isGeneratorObject(new C()));
});

test("DIVERGE isGeneratorObject(generatorFunction() with null prototype)", () => {
  const generator = generatorFunction();
  Object.setPrototypeOf(generator, null);
  assert.equal(isGeneratorObject(generator), true);
  assert.equal(isGeneratorObjectShim(generator), false);
});

test("isGeneratorObject(null)", () => {
  assert.equal(isGeneratorObjectShim(null), isGeneratorObject(null));
});
