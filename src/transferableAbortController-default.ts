const globalThis = require("@nodefill/primordials/globalThis.js");

const AbortController = globalThis.AbortController;

/** @returns {AbortController} */
module.exports = function transferableAbortController() {
  return new AbortController();
};
