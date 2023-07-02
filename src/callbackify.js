"use strict";
const TypeError = require("@nodefill/primordials/TypeError.js");
const ArrayPrototypePop = require("@nodefill/primordials/ArrayPrototypePop.js");
const FunctionPrototypeBind = require("@nodefill/primordials/FunctionPrototypeBind.js");
const ObjectGetOwnPropertyDescriptors = require("@nodefill/primordials/ObjectGetOwnPropertyDescriptors.js");
const ObjectValues = require("@nodefill/primordials/ObjectValues.js");
const ObjectSetPrototypeOf = require("@nodefill/primordials/ObjectSetPrototypeOf.js");
const ObjectDefineProperties = require("@nodefill/primordials/ObjectDefineProperties.js");
const ReflectApply = require("@nodefill/primordials/ReflectApply.js");
const Error = require("@nodefill/primordials/Error.js");
const globalThis = require("@nodefill/primordials/globalThis.js");

const queueMicrotask = globalThis.queueMicrotask;

const callbackifyOnRejected = (reason, cb) => {
  if (!reason) {
    reason = new Error(reason);
  }
  return cb(reason);
};

/**
 * @template T
 * @template {any[]} A
 * @template R
 * @param {(this: T, ...args: A) => PromiseLike<R>} original
 * @returns {(this: T, ...args: [...A, (err: Error | null, result: R) => void]) => void}
 */
module.exports = function callbackify(original) {
  if (typeof original !== "function") {
    throw new TypeError(`${original} is not a function`);
  }

  function callbackified(...args) {
    const maybeCb = ArrayPrototypePop(args);
    if (typeof maybeCb !== "function") {
      throw new TypeError(`${maybeCb} is not a function`);
    }
    const cb = FunctionPrototypeBind(maybeCb, this);
    ReflectApply(original, this, args).then(
      (ret) => queueMicrotask(() => cb(null, ret)),
      (rej) => queueMicrotask(() => callbackifyOnRejected(rej, cb))
    );
  }

  const descriptors = ObjectGetOwnPropertyDescriptors(original);
  if (typeof descriptors.length.value === "number") {
    descriptors.length.value++;
  }
  if (typeof descriptors.name.value === "string") {
    descriptors.name.value += "Callbackified";
  }
  const propertiesValues = ObjectValues(descriptors);
  for (let i = 0; i < propertiesValues.length; i++) {
    ObjectSetPrototypeOf(propertiesValues[i], null);
  }
  ObjectDefineProperties(callbackified, descriptors);
  return callbackified;
};
