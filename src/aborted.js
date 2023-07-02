"use strict";
const TypeError = require("@nodefill/primordials/TypeError.js");
const Promise = require("@nodefill/primordials/Promise.js");
const PromiseResolve = require("@nodefill/primordials/PromiseResolve.js");

/**
 *
 * @param {AbortSignal} signal
 * @param {object} resource
 * @returns {Promise<Event | undefined>}
 */
module.exports = function aborted(signal, resource) {
  if (signal === undefined) {
    throw new TypeError("signal is not defined");
  }
  if (typeof signal !== "object" || !("aborted" in signal)) {
    throw new TypeError("signal is not an AbortSignal");
  }
  if (typeof resource !== "object" && typeof resource !== "function") {
    throw new TypeError("resource is not an object or function");
  }
  if (signal.aborted) {
    return PromiseResolve();
  }
  return new Promise((resolve) => {
    signal.addEventListener("abort", resolve, { once: true });
  });
};
