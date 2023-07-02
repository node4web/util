#!/usr/bin/env node
import fsPromises from "node:fs/promises";
import util from "node:util";
import utilTypes from "node:util/types";

console.debug("process.version", process.version);

await fsPromises.rm("dist", { recursive: true, force: true });
console.debug("removed dist/");

await fsPromises.cp("src", "dist", { recursive: true, force: true });
console.debug("copied src/ to dist/");

/* -------------------------------------------------------------------------- */

for (const name of Object.getOwnPropertyNames(util)) {
  var js = `
    "use strict";
    const { ${name} } = require("node:util");
    module.exports = ${name};
  `;
  await fsPromises.writeFile(`dist/${name}-node.js`, js);
  console.debug(`wrote ${name}-node.js`);
}

var js = `"use strict";`;
for (const name of Object.getOwnPropertyNames(util)) {
  js += `exports.${name} = null;`;
}
js += `module.exports = require("node:util");`;
await fsPromises.writeFile("dist/index-node.js", js);
console.debug("wrote index-node.js");

for (const name of Object.getOwnPropertyNames(utilTypes)) {
  var js = `
    "use strict";
    const { ${name} } = require("node:util/types");
    module.exports = ${name};
  `;
  await fsPromises.writeFile(`dist/types/${name}-node.js`, js);
  console.debug(`wrote types/${name}-node.js`);
}

var js = `"use strict";`;
for (const x of Object.getOwnPropertyNames(utilTypes)) {
  js += `exports.${x} = null;`;
}
js += `module.exports = require("node:util/types");`;
await fsPromises.writeFile("dist/types/index-node.js", js);
console.debug("wrote types/index-node.js");

console.info("completed build output to dist/");
