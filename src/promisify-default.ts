// prettier-ignore
function promisify<T extends ((...a: any[]) => any) & { [promisify.custom]: any }>(f: T): T[typeof promisify.custom];
// prettier-ignore
function promisify<A extends any[], R>(f: (...a: [...A, (error: any, value: R) => any]) => any): (...a: A) => Promise<R>;
function promisify(f: (...a: any[]) => any): (...a: any[]) => Promise<any> {
  if (typeof f !== "function") {
    throw new TypeError(`${f} is not a function`);
  }

  if (f[promisify.custom]) {
    const promisified = f[promisify.custom];
    if (typeof promisified !== "function") {
      throw new TypeError(`${promisified} is not a function`);
    }
    return promisified;
  }

  function promisified(...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const callback = (error: any, value: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      };
      f.call(this, ...args, callback);
    });
  }
  promisified[promisify.custom] = promisified;
  return promisified;
}
declare namespace promisify {
  export const custom: unique symbol;
}
promisify["" + "custom"] = Symbol.for("nodejs.util.promisify.custom");

export = promisify;
