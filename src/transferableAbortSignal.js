"use strict";
/**
 * @param {AbortSignal} signal
 * @returns {AbortSignal}
 */
module.exports = function transferableAbortSignal(signal) {
  return signal;
};
