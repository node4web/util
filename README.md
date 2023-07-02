![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# `node:util/types` ponyfill

🔎 A ponyfill of the typechecking functions from [`node:util/types`]

<div align="center">

![](https://user-images.githubusercontent.com/61068799/250212103-c280dfa3-d68a-4e1e-b289-c471398bbb64.png)

</div>

✅ As correct as possible \
📦 Works with Node.js, Deno, Bun, and the browser \
🔬 Has TypeScript types using JSDoc \
✨ Uses the `node:util/types` native package if available \
⚠️ Distributed as CommonJS for widest compatibility

👀 Also check out the complete [@nodefill/util] package! It uses this package
for the `util.types` namespace.

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![jsDelivr](https://img.shields.io/static/v1?style=for-the-badge&message=jsDelivr&color=E84D3D&logo=jsDelivr&logoColor=FFFFFF&label=)

```sh
npm install @nodefill/util-types
```

```js
import {} from "npm:@nodefill/util-types";
import {} from "https://esm.sh/@nodefill/util-types";
```

```js
import {} from "https://esm.sh/@nodefill/util-types";
import {} from "https://esm.run/@nodefill/util-types";
```

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Browser](https://img.shields.io/static/v1?style=for-the-badge&message=Browser&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

You can import this package like normal! It will automatically use the native
`node:util/types` package if it is available. Otherwise, you'll get some nice
shims that replicate the functionality. This is useful when authoring packages
intended to be used in Node.js and the browser.

```js
import { isAnyArrayBuffer, isArgumentsObject } from "@nodefill/util-types";

console.log(isAnyArrayBuffer(new ArrayBuffer(1)));
//=> true
console.log(isArgumentsObject({ [Symbol.toStringTag]: "Arguments" }));
//=> false
```

### Caveats

⚠️ Some of the functions in this package are **very loose** (using plain-old
`Object.prototype.toString.call()` or `Symbol.toStringTag`). Make sure you
understand what each check does and whether or not it's looser than the native
`node:util/types` function.

For example, take `isModuleNamespaceObject()`. There's no way to be _100% sure_
that an object originated from an `import()` statement or if it's just some
clever `null`-prototype object with a good `Symbol.toStringTag`. The native
Node.js `util.types.isModuleNamespaceObject()` function delegates this to the
C++ layer which has more privileged information about the object.

```js
// Try this in your DevTools console!
import { isModuleNamespaceObject } from "@nodefill/util-types";

const realModuleNamespaceObject = await import("@nodefill/util-types");
const fakeModuleNamespaceObject = Object.create(null);
fakeModuleNamespaceObject[Symbol.toStringTag] = "Module";

console.log(isModuleNamespaceObject(realModuleNamespaceObject));
//=> true
console.log(isModuleNamespaceObject(fakeModuleNamespaceObject));
//=> true (in browser)
```

## Development

![JavaScript](https://img.shields.io/static/v1?style=for-the-badge&message=JavaScript&color=222222&logo=JavaScript&logoColor=F7DF1E&label=)

We use JavaScript with JSDoc for type annotations. There's also a
`tsconfig.json` so we can lint the types with `tsc`. Note that there's a
`build.mjs` script which creates all the Node.js re-export shims. This is done
to minimize the redundant repetition of the same code in `src/` cluttering the
workspace.

**Why use CommonJS?** ESM is the onvious choice. The reason we still use
CommonJS is because some packages may want a drop-in replacement for
`node:util/types` _when they use `require()`_. Since ESM packages cannot be
`require()`-ed, but CommonJS packages can be `import()`-ed, we use CommonJS for
maximum compatibility. **This may cause issues.** If it is deemed such, this
package _may_ migrate to ESM-only in the future.

**Why not distribute ESM and CJS versions?** We could, but it would lead to the
[dual package hazard]. The best way to support ESM and CJS at the same time is
to **write good CJS that imports well in ESM environments**, possibly with a
short `index.mjs` file to wrap the main CJS part. This is what we do.

[@nodefill/util]: https://github.com/nodefill/util#readme
[`node:util/types`]: https://nodejs.org/api/util.html#utiltypes
[dual package hazard]: https://nodejs.org/api/packages.html#dual-package-hazard
