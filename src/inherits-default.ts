export = function inherits<
  C extends new (...a: any[]) => any,
  S extends new (...a: any[]) => any,
>(Class: C, SuperClass: S): void {
  if (!Class || !SuperClass) {
    throw new TypeError(`${Class} and ${SuperClass} must be functions`);
  }
  if (SuperClass.prototype === undefined) {
    throw new TypeError(`${SuperClass} has no prototype`);
  }
  // @ts-ignore
  Class.super_ = SuperClass;
  Object.setPrototypeOf(Class.prototype, SuperClass.prototype);
};
