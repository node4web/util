import {
  DatePrototypeValueOf,
  ObjectPrototypeToString,
  BigIntPrototypeValueOf,
  BooleanPrototypeValueOf,
  NumberPrototypeValueOf,
  StringPrototypeValueOf,
  SymbolPrototypeValueOf,
} from "#$primordials";

export function isExternal(x) {
  // TODO: Better check!
  return false;
}

export function isDate(x) {
  try {
    DatePrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

export function isArgumentsObject(x) {
  return (
    x &&
    !(Symbol.toStringTag in x) &&
    ObjectPrototypeToString(x) === "[object Arguments]"
  );
}

export function isBigIntObject(x) {
  if (typeof x !== "object") {
    return false;
  }

  try {
    BigIntPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

export function isBooleanObject(x) {
  if (typeof x !== "object") {
    return false;
  }

  try {
    BooleanPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

export function isNumberObject(x) {
  if (typeof x !== "object") {
    return false;
  }

  try {
    NumberPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

export function isStringObject(x) {
  if (typeof x !== "object") {
    return false;
  }

  try {
    StringPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

export function isSymbolObject(x) {
  if (typeof x !== "object") {
    return false;
  }

  try {
    SymbolPrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

export function isNativeError(x) {
  return (
    !!x &&
    !(Symbol.toStringTag in x) &&
    ObjectPrototypeToString(x) === "[object Error]"
  );
}

export function isRegExp(x) {
  try {
    RegExpPrototypeGetGlobal(x);
  } catch {
    return false;
  }
  return true;
}

export function isAsyncFunction(x) {
  return (
    typeof x === "function" &&
    /^async\s+/.test(Function.prototype.toString.call(x))
  );
}

export function isGeneratorFunction(x) {
  return (
    typeof x === "function" &&
    /^(?:async\s+)?function\s*\*/.test(Function.prototype.toString.call(x))
  );
}

export function isGeneratorObject(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "Generator"
  );
}

export function isPromise(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "Promise"
  );
}

export function isMap(x) {
  try {
    Object.getOwnPropertyDescriptor(Map.prototype, "size").get.call(x);
  } catch {
    return false;
  }
  return true;
}

export function isSet(x) {
  try {
    Object.getOwnPropertyDescriptor(Set.prototype, "size").get.call(x);
  } catch {
    return false;
  }
  return true;
}

export function isMapIterator(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "MapIterator"
  );
}

export function isSetIterator(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "SetIterator"
  );
}

export function isWeakMap(x) {
  try {
    WeakMap.prototype.has.call(x);
  } catch {
    return false;
  }
  return true;
}

export function isWeakSet(x) {
  try {
    WeakSet.prototype.has.call(x);
  } catch {
    return false;
  }
  return true;
}

export function isArrayBuffer(x) {
  try {
    Object.getOwnPropertyDescriptor(
      ArrayBuffer.prototype,
      "byteLength"
    ).get.call(x);
  } catch {
    return false;
  }
  return true;
}

export function isDataView(x) {
  try {
    Object.getOwnPropertyDescriptor(DataView.prototype, "buffer").get.call(x);
  } catch {
    return false;
  }
  return true;
}

export function isSharedArrayBuffer(x) {
  if (typeof SharedArrayBuffer === "undefined") {
    return false;
  }

  try {
    Object.getOwnPropertyDescriptor(
      SharedArrayBuffer.prototype,
      "byteLength"
    ).get.call(x);
  } catch {
    return false;
  }
  return true;
}

const proxies = new WeakSet();
Proxy = new Proxy(Proxy, {
  construct() {
    const p = Reflect.construct(...arguments);
    proxies.add(p);
    return p;
  },
});
proxies.add(Proxy);
export function isProxy(x) {
  return proxies.has(x);
}

export function isModuleNamespaceObject(x) {
  if (typeof x !== "object") {
    return false;
  }

  // TODO: Improve check!
  const d = Object.getOwnPropertyDescriptor(x, Symbol.toStringTag);
  return (
    !d.configurable &&
    !d.enumerable &&
    d.value === "Module" &&
    !d.writable &&
    Object.getPrototypeOf(x) === null
  );
}

/* -------------------------------------------------------------------------- */

export function isAnyArrayBuffer(x) {
  return isArrayBuffer(x) || isSharedArrayBuffer(x);
}

export function isBoxedPrimitive(x) {
  return (
    isNumberObject(x) ||
    isStringObject(x) ||
    isBooleanObject(x) ||
    isBigIntObject(x) ||
    isSymbolObject(x)
  );
}
