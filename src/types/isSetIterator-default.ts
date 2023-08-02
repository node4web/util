const SetIteratorPrototype = Object.getPrototypeOf(new Set().entries());

/** @see https://nodejs.org/api/util.html#utiltypesissetiteratorvalue */
function isSetIterator(x: any): x is Iterator<any, any> {
  if (!x || typeof x !== "object") {
    return false;
  }
  return Object.getPrototypeOf(x) === SetIteratorPrototype;
}

export = isSetIterator;
