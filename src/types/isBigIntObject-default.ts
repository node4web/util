/** @see https://nodejs.org/api/util.html#utiltypesisbigintobjectvalue */
export = function isBigIntObject(x: any): x is BigInt {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    BigInt.prototype.valueOf.call(x);
  } catch {
    return false;
  }
  return true;
};
