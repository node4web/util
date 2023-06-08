import test from "node:test";
import assert from "node:assert";
import * as util from "node:util";
// @ts-ignore
import * as util_ from "../src/util.js";

test("exports match node:utils", () => {
  for (const key of Object.keys(util)) {
    assert(key in util_);
  }
});

test("exports match node:utils/types", () => {
  for (const key of Object.keys(util.types)) {
    assert(key in util_.types);
  }
});
