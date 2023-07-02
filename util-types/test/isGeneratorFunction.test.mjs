import test from "node:test";
import assert from "node:assert";
import { isGeneratorFunction } from "node:util/types";
import isGeneratorFunctionShim from "../dist/isGeneratorFunction.js";

test("isGeneratorFunction(function* () {})", () => {
  assert.equal(
    isGeneratorFunctionShim(function* () {}),
    isGeneratorFunction(function* () {})
  );
});

test("isGeneratorFunction(async function* () {})", () => {
  assert.equal(
    isGeneratorFunctionShim(async function* () {}),
    isGeneratorFunction(async function* () {})
  );
});

test("isGeneratorFunction(function () {})", () => {
  assert.equal(
    isGeneratorFunctionShim(function () {}),
    isGeneratorFunction(function () {})
  );
});

test("isGeneratorFunction(async function () {})", () => {
  assert.equal(
    isGeneratorFunctionShim(async function () {}),
    isGeneratorFunction(async function () {})
  );
});

test("isGeneratorFunction(() => {})", () => {
  assert.equal(
    isGeneratorFunctionShim(() => {}),
    isGeneratorFunction(() => {})
  );
});

test("isGeneratorFunction(async () => {})", () => {
  assert.equal(
    isGeneratorFunctionShim(async () => {}),
    isGeneratorFunction(async () => {})
  );
});

test("isGeneratorFunction(object with toString())", () => {
  assert.equal(
    isGeneratorFunctionShim({ toString: () => "function* () {}" }),
    isGeneratorFunction({ toString: () => "function* () {}" })
  );
});

test("isGeneratorFunction(function with toString())", () => {
  const f = () => {};
  f.toString = () => "function* () {}";
  assert.equal(isGeneratorFunctionShim(f), isGeneratorFunction(f));
});

test("isGeneratorFunction(null)", () => {
  assert.equal(isGeneratorFunctionShim(null), isGeneratorFunction(null));
});
