"use strict";
const AbortController = globalThis.AbortController;

/** @returns {AbortController} */
module.exports = function transferableAbortController() {
  return new AbortController();
};
