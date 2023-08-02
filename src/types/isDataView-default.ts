/** @see https://nodejs.org/api/util.html#utiltypesisdataviewvalue */
export = function isDataView(x: any): x is DataView {
  try {
    Reflect.get(DataView.prototype, "byteLength", x);
  } catch {
    return false;
  }
  return true;
};
