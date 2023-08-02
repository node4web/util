/** @see https://nodejs.org/api/util.html#utiltypesisgeneratorfunctionvalue */
export = function isGeneratorFunction(x: any): x is GeneratorFunction {
  return (
    typeof x === "function" &&
    /^(async\s+)?function\s*\*/.test(Function.prototype.toString.call(x))
  );
};
