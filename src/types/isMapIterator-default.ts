const MapIteratorPrototype = Object.getPrototypeOf(new Map().entries());

/** @see https://nodejs.org/api/util.html#utiltypesismapiteratorvalue */
function isMapIterator(x: any): x is Iterator<any, any> {
  if (!x || typeof x !== "object") {
    return false;
  }
  return Object.getPrototypeOf(x) === MapIteratorPrototype;
}

export = isMapIterator;
