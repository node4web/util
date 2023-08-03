# `node:util` ponyfill

🧰 [`node:util`] for use anywhere

<div align="center">

![](https://i.imgur.com/mqtU8Ik.png)

</div>

✅ Mostly correct \
📦 Works with Node.js, Deno, Bun, and the browser \
🔬 Has TypeScript types \
✨ Uses the `node:util` native package if available \
⚠️ Distributed as CommonJS for widest compatibility

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![jsDelivr](https://img.shields.io/static/v1?style=for-the-badge&message=jsDelivr&color=E84D3D&logo=jsDelivr&logoColor=FFFFFF&label=)

You can install this package via npm, [pnpm], or [Yarn]. It's also available on
npm CDNs like [jsDelivr] and [esm.sh] if you want to import it straight from
your browser!

```sh
npm install @nodefill/util
```

```js
import {} from "https://esm.sh/@nodefill/util";
import {} from "https://esm.run/@nodefill/util";
```

If you're using [Deno], you can use the [new `npm:` specifier] to import this
package straight from npm, or use the [esm.sh] CDN which has support for Deno.

```js
import {} from "npm:@nodefill/util";
import {} from "https://esm.sh/@nodefill/util";
```

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Browser](https://img.shields.io/static/v1?style=for-the-badge&message=Browser&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

You can import this package as though it were the normal `node:util` package! It
will automatically use the native `node:util` package if it is available.
Otherwise, you'll get some really nice shims that replicate the functionality.
This is useful when authoring packages intended to be used in Node.js and the
browser.

```js
import { isArrayBuffer } from "@nodefill/util/types";
import { format } from "@nodefill/util";

console.log(isAnyArrayBuffer(new ArrayBuffer(1)));
//=> true
console.dir(format("Hello %s!", "world"));
//=> "Hello world!"
```

### Limitations

⚠️ Some of the `util.types.*` functions in this package are **loose** (using
plain-old `Object.prototype.toString.call()` or `Symbol.toStringTag`). Make sure
you understand what each check does and whether or not it's looser than the
native `node:util/types` function.

Some of the other utility functions like `transferableAbortSignal()` and
`transferableAbortController()` don't really do much on non-Node.js platforms
since Node.js is the only place you can do magic like that. They're included for
API completeness.

## Development

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![Vitest](https://img.shields.io/static/v1?style=for-the-badge&message=Vitest&color=6E9F18&logo=Vitest&logoColor=FFFFFF&label=)

This package uses TypeScript! That makes it easy to co-locate types and code
side-by-side without complicated `/** @param */` declarations that get unweildy
with larger projects.

To get started, clone this repository (or your fork) and run any of these
commands to play around with the code:

```sh
npm test
npm run build
npm run build:docs
```

There's also a file naming convention where `-default.ts` files get exported via
the `default` condition (via the [exports field] in `package.json`) and
`-node.ts` files get exported via the `node` condition. This way, we can switch
on "is this Node.js or something else?" _statically_ instead of at runtime. This
helps bundlers, loading performance, and more. The convention is that if there's
more than one file for a given export, then explicitly suffix the file name with
said export. For non-ambiguous exports (no conditions), we don't need to do this
explicit naming (ex: `lib/argsToTokens.ts` doesn't have alternate
implementations, so it's plain-old `argsToTokens.ts`).

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

[dual package hazard]: https://nodejs.org/api/packages.html#dual-package-hazard
[yarn]: https://yarnpkg.com/
[pnpm]: https://pnpm.io/
[jsdelivr]: https://www.jsdelivr.com/esm
[deno]: https://deno.land/
[new `npm:` specifier]: https://deno.land/manual@v1.35.3/node/npm_specifiers
[esm.sh]: https://esm.sh/
[exports field]: https://nodejs.org/api/packages.html#exports
[`node:util`]: https://nodejs.org/api/util.html
