export = function isPrimitive(
  x: any,
): x is string | boolean | number | symbol | null | undefined | bigint {
  return x === null || (typeof x !== "object" && typeof x !== "function");
};
