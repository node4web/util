export = function isObject(x: any): x is object {
  return x !== null && typeof x === "object";
};
