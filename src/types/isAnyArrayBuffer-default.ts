import isArrayBuffer from "./isArrayBuffer-default.js";
import isSharedArrayBuffer from "./isSharedArrayBuffer-default.js";

/** @see https://nodejs.org/api/util.html#utiltypesisanyarraybuffervalue */
export = function isAnyArrayBuffer(
  x: any
): x is ArrayBuffer | SharedArrayBuffer {
  return isArrayBuffer(x) || isSharedArrayBuffer(x);
};
