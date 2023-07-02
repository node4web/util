import test from "node:test";
import assert from "node:assert";
import primordials from "@nodefill/primordials";
import { isProxy } from "node:util/types";
import isProxyShim from "../dist/isProxy.js";

test("isProxy(new Proxy())", () => {
  assert.equal(isProxyShim(new Proxy({}, {})), isProxy(new Proxy({}, {})));
});

test("isProxy(Proxy.revocable())", () => {
  assert.equal(
    isProxyShim(Proxy.revocable({}, {}).proxy),
    isProxy(Proxy.revocable({}, {}).proxy)
  );
});

test("DIVERGE isProxy(new primordials.Proxy())", () => {
  assert.equal(isProxy(new primordials.Proxy({}, {})), true);
  assert.equal(isProxyShim(new primordials.Proxy({}, {})), false);
});

test("DIVERGE isProxy(primordials.Proxy.revocable())", () => {
  assert.equal(isProxy(primordials.ProxyRevocable({}, {}).proxy), true);
  assert.equal(isProxyShim(primordials.ProxyRevocable({}, {}).proxy), false);
});

test("isProxy({})", () => {
  assert.equal(isProxyShim({}), isProxy({}));
});

test("isProxy(null)", () => {
  assert.equal(isProxyShim(null), isProxy(null));
});
