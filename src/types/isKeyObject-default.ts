/** 🛑 This is a **loose** check. It uses `Object.prototype.toString()`. */
export = function isKeyObject(x: any): x is import("node:crypto").KeyObject {
  return Object.prototype.toString.call(x) === "[object KeyObject]";
};
