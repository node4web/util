export = function isSymbol(x: any): x is symbol {
  return typeof x === "symbol";
};
