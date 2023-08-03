export = function deprecate<T extends (...a: any[]) => any>(
  f: T,
  message: string,
  code: string | undefined = undefined,
): T {
  return f;
};
