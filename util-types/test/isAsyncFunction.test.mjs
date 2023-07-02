import test from "node:test";
import assert from "node:assert";
import { isAsyncFunction } from "node:util/types";
import isAsyncFunctionShim from "../dist/isAsyncFunction.js";

test("isAsyncFunction(function* () {})", () => {
  assert.equal(
    isAsyncFunctionShim(function* () {}),
    isAsyncFunction(function* () {})
  );
});

test("isAsyncFunction(async function* () {})", () => {
  assert.equal(
    isAsyncFunctionShim(async function* () {}),
    isAsyncFunction(async function* () {})
  );
});

test("isAsyncFunction(function () {})", () => {
  assert.equal(
    isAsyncFunctionShim(function () {}),
    isAsyncFunction(function () {})
  );
});

test("isAsyncFunction(async function () {})", () => {
  assert.equal(
    isAsyncFunctionShim(async function () {}),
    isAsyncFunction(async function () {})
  );
});

test("isAsyncFunction(() => {})", () => {
  assert.equal(
    isAsyncFunctionShim(() => {}),
    isAsyncFunction(() => {})
  );
});

test("isAsyncFunction(async () => {})", () => {
  assert.equal(
    isAsyncFunctionShim(async () => {}),
    isAsyncFunction(async () => {})
  );
});

test("isAsyncFunction(object with toString())", () => {
  assert.equal(
    isAsyncFunctionShim({ toString: () => "async () => {}" }),
    isAsyncFunction({ toString: () => "async () => {}" })
  );
});

test("isAsyncFunction(function with toString())", () => {
  const f = () => {};
  f.toString = () => "async () => {}";
  assert.equal(isAsyncFunctionShim(f), isAsyncFunction(f));
});

test("isAsyncFunction(null)", () => {
  assert.equal(isAsyncFunctionShim(null), isAsyncFunction(null));
});
