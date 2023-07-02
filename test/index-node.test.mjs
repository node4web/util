import test from "node:test";
import assert from "node:assert";
import util from "node:util";

console.debug("process.version", process.version);

for (const name of Object.getOwnPropertyNames(util)) {
  test(`exports ${name}`, async () => {
    const index = await import("../dist/index-node.js");
    assert(name in index, `missing ${name}`);
  });
}

for (const name of Object.getOwnPropertyNames(util)) {
  test(`file ${name}-node.js importable`, async () => {
    await import(`../dist/${name}-node.js`);
  });
}
