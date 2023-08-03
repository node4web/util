import isNumberObject from "./isNumberObject-default.js";
import isStringObject from "./isStringObject-default.js";
import isBooleanObject from "./isBooleanObject-default.js";
import isBigIntObject from "./isBigIntObject-default.js";
import isSymbolObject from "./isSymbolObject-default.js";

/** @see https://nodejs.org/api/util.html#utiltypesisboxedprimitivevalue */
export = function isBoxedPrimitive(
  x: any,
): Number | String | Boolean | BigInt | Symbol {
  return (
    isNumberObject(x) ||
    isStringObject(x) ||
    isBooleanObject(x) ||
    isBigIntObject(x) ||
    isSymbolObject(x)
  );
};
