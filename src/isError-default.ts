export = function isError(x: any): x is Error {
  return (
    x instanceof Error || Object.prototype.toString.call(x) === "[object Error]"
  );
};
