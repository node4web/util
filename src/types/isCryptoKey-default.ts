/** @see https://nodejs.org/api/util.html#utiltypesiscryptokeyvalue */
export = function isCryptoKey(x: any): x is CryptoKey {
  if (typeof CryptoKey === "undefined") {
    return false;
  }
  try {
    Reflect.get(CryptoKey.prototype, "type", x);
  } catch {
    return false;
  }
  return true;
};
