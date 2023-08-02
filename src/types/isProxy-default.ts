const knownProxies = new WeakSet();
Proxy.revocable = new Proxy(Proxy.revocable, {
  apply(target, thisArg, argArray) {
    const object = Reflect.apply(target, thisArg, argArray);
    knownProxies.add(object.proxy);
    return object;
  },
});
Proxy = new Proxy(Proxy, {
  construct(target, argArray, newTarget) {
    const proxy = Reflect.construct(target, argArray, newTarget);
    knownProxies.add(proxy);
    return proxy;
  },
  apply(target, thisArg, argArray) {
    const proxy = Reflect.apply(target, thisArg, argArray);
    knownProxies.add(proxy);
    return proxy;
  },
});

/**
 * 🛑 There is no good way to 100% guarantee that a value is or is not a proxy.
 *
 * @see https://nodejs.org/api/util.html#utiltypesisproxyvalue
 */
export = function isProxy(x: any): boolean {
  return knownProxies.has(x);
};
