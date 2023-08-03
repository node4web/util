export = function isNullOrUndefined(x: any): x is null | undefined {
  return x === null || x === undefined;
};
