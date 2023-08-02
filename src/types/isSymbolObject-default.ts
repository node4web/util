export = function isSymbolObject(x: any): x is Symbol {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    Reflect.get(Symbol.prototype, "description", x);
  } catch {
    return false;
  }
  return true;
};
