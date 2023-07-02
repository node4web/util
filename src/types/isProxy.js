"use strict";
const ReflectConstruct = require("@nodefill/primordials/ReflectConstruct.js");
const ReflectApply = require("@nodefill/primordials/ReflectApply.js");
const SafeWeakSet = require("@nodefill/primordials/SafeWeakSet.js");
const Proxy = require("@nodefill/primordials/Proxy.js");
const globalThis = require("@nodefill/primordials/globalThis.js");

const knownProxies = new SafeWeakSet();
globalThis.Proxy = new Proxy(globalThis.Proxy, {
  construct(target, argArray, newTarget) {
    const proxy = ReflectConstruct(target, argArray, newTarget);
    knownProxies.add(proxy);
    return proxy;
  },
  apply(target, thisArg, argArray) {
    const proxy = ReflectApply(target, thisArg, argArray);
    knownProxies.add(proxy);
    return proxy;
  },
});
globalThis.Proxy.revocable = new Proxy(globalThis.Proxy.revocable, {
  apply(target, thisArg, argArray) {
    const object = ReflectApply(target, thisArg, argArray);
    knownProxies.add(object.proxy);
    return object;
  },
});

/**
 * 🛑 There is no good way to 100% guarantee that a value is or is not a proxy.
 *
 * @param {any} x
 * @returns {boolean}
 * @see https://nodejs.org/api/util.html#utiltypesisproxyvalue
 */
module.exports = function isProxy(x) {
  return knownProxies.has(x);
};
