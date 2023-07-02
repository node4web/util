import test from "node:test";
import assert from "node:assert";
import { isModuleNamespaceObject } from "node:util/types";
import isModuleNamespaceObjectShim from "../dist/isModuleNamespaceObject.js";

test("isModuleNamespaceObject({})", () => {
  assert.equal(isModuleNamespaceObjectShim({}), isModuleNamespaceObject({}));
});

test("isModuleNamespaceObject(null prototype)", () => {
  const o = Object.create(null);
  assert.equal(isModuleNamespaceObjectShim(o), isModuleNamespaceObject(o));
});

test("isModuleNamespaceObject(import('node:util'))", async () => {
  const util = await import("node:util");
  assert.equal(
    isModuleNamespaceObjectShim(util),
    isModuleNamespaceObject(util)
  );
});

test("DIVERGE isModuleNamespaceObject(null prototype + toStringTag)", () => {
  const o = Object.create(null);
  o[Symbol.toStringTag] = "Module";
  assert.equal(isModuleNamespaceObject(o), false);
  assert.equal(isModuleNamespaceObjectShim(o), true);
});

test("isModuleNamespaceObject(null)", () => {
  assert.equal(
    isModuleNamespaceObjectShim(null),
    isModuleNamespaceObject(null)
  );
});
