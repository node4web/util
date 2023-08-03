export = function _extend<T, S>(target: T, source: S): T & S {
  return Object.assign(target, source);
};
