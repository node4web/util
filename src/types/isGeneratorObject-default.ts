const GeneratorPrototype = Object.getPrototypeOf(function* () {}.prototype);
const AsyncGeneratorPrototype = Object.getPrototypeOf(
  async function* () {}.prototype
);

/** @see https://nodejs.org/api/util.html#utiltypesisgeneratorobjectvalue */
function isGeneratorObject(x: any): x is IterableIterator<any> {
  if (!x || typeof x !== "object") {
    return false;
  }
  const p1 = Object.getPrototypeOf(x);
  if (!p1) {
    return false;
  }
  const p2 = Object.getPrototypeOf(p1);
  return p2 === GeneratorPrototype || p2 === AsyncGeneratorPrototype;
}

export = isGeneratorObject;
