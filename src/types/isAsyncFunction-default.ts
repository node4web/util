/**
 * Remember, a non-async function could return a `Promise` and still _feel_ like
 * an async function. This check uses `Function.prototype.toString()` to check
 * if the raw source code starts with the `async` marker.
 *
 * For example, in the browser `isAsyncFunction(fetch)` returns `false` even
 * though `fetch` returns a `Promise`.
 *
 * @see https://nodejs.org/api/util.html#utiltypesisasyncfunctionvalue
 */
export = function isAsyncFunction(x: any): x is (...a: any[]) => Promise<any> {
  return (
    typeof x === "function" &&
    Function.prototype.toString.call(x).startsWith("async ")
  );
};
