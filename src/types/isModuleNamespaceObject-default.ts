/** @see https://nodejs.org/api/util.html#utiltypesismodulenamespaceobjectvalue */
export = function isModuleNamespaceObject(x: any): x is object {
  if (!x || typeof x !== "object") {
    return false;
  }
  return Object.getPrototypeOf(x) == null && x[Symbol.toStringTag] === "Module";
};
