#!/usr/bin/env node
import fsPromises from "node:fs/promises";
import fs from "node:fs";
import util from "node:util";
import utilTypes from "node:util/types";

console.debug("process.version", process.version);

await fsPromises.rm("dist", { recursive: true, force: true });
console.debug("removed dist/");

await fsPromises.cp("src", "dist", { recursive: true, force: true });
console.debug("copied src/ to dist/");

for (const fileName of await fsPromises.readdir("dist")) {
  if (fileName === "internal" || fileName === "index.js") {
    continue;
  }
  const name = fileName.replace(/\.js$/, "");
  var js = `
    "use strict";
    const { ${name} } = require("node:util");
    module.exports = ${name};
  `;
  await fsPromises.writeFile(`dist/${name}-node.js`, js);
  console.debug(`wrote ${name}-node.js`);
}

var js = `"use strict";`;
for (const name of Object.getOwnPropertyNames(utilTypes)) {
  js += `exports.${name} = null;`;
}
js += `module.exports = require("node:util/types");`;
await fsPromises.writeFile("dist/index-node.js", js);
console.debug("wrote index-node.js");

await fsPromises.mkdir("dist/types", { recursive: true });
console.debug("created dist/types/");

for (const name of Object.getOwnPropertyNames(utilTypes)) {
  var js = `
    "use strict";
    const { ${name} } = require("@nodefill/util-types");
    module.exports = ${name};
  `;
  await fsPromises.writeFile(`dist/types/${name}.js`, js);
  console.debug(`wrote types/${name}.js`);
}

var js = `"use strict";`;
for (const name of Object.getOwnPropertyNames(utilTypes)) {
  js += `exports.${name} = null;`;
}
js += `module.exports = require("@nodefill/util-types");`;
await fsPromises.writeFile("dist/types.js", js);
console.debug("wrote types.js");

console.info("completed build output to dist/");
