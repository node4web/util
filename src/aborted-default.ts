export = function aborted(
  signal: AbortSignal,
  resource: object,
): Promise<Event | void> {
  if (signal === undefined) {
    throw new TypeError("signal is not defined");
  }
  if (typeof signal !== "object" || !("aborted" in signal)) {
    throw new TypeError("signal is not an AbortSignal");
  }
  if (typeof resource !== "object" && typeof resource !== "function") {
    throw new TypeError("resource is not an object or function");
  }
  if (signal.aborted) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    signal.addEventListener("abort", resolve, { once: true });
  });
};
