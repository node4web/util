import test from "node:test";
import assert from "node:assert";
import utilTypes from "node:util/types";

console.debug("process.version", process.version);

for (const name of Object.getOwnPropertyNames(utilTypes)) {
  test(`exports ${name}`, async () => {
    const index = await import("../dist/index.js");
    assert(name in index);
  });
}
