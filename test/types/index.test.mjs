import test from "node:test";
import assert from "node:assert";
import utilTypes from "node:util/types";

console.debug("process.version", process.version);

for (const name of Object.getOwnPropertyNames(utilTypes)) {
  test(`exports ${name}`, async () => {
    const index = await import("../../dist/types/index.js");
    assert(name in index, `missing ${name}`);
  });
}

for (const name of Object.getOwnPropertyNames(utilTypes)) {
  test(`file types/${name}.js importable`, async () => {
    await import(`../../dist/types/${name}.js`);
  });
}
