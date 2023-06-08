function isExternal(x) {
  // TODO: Better check!
  return false;
}

function isDate(x) {
  try {
    DatePrototypeValueOf(x);
  } catch {
    return false;
  }
  return true;
}

function isArgumentsObject(x) {
  return (
    x &&
    !(Symbol.toStringTag in x) &&
    ObjectPrototypeToString(x) === "[object Arguments]"
  );
}

function isBigIntObject(x) {
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

function isBooleanObject(x) {
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

function isNumberObject(x) {
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

function isStringObject(x) {
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

function isSymbolObject(x) {
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

function isNativeError(x) {
  return (
    !!x &&
    !(Symbol.toStringTag in x) &&
    ObjectPrototypeToString(x) === "[object Error]"
  );
}

function isRegExp(x) {
  try {
    RegExpPrototypeGetGlobal(x);
  } catch {
    return false;
  }
  return true;
}

function isAsyncFunction(x) {
  return (
    typeof x === "function" &&
    /^async\s+/.test(Function.prototype.toString.call(x))
  );
}

function isGeneratorFunction(x) {
  return (
    typeof x === "function" &&
    /^(?:async\s+)?function\s*\*/.test(Function.prototype.toString.call(x))
  );
}

function isGeneratorObject(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "Generator"
  );
}

function isPromise(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "Promise"
  );
}

function isMap(x) {
  try {
    Object.getOwnPropertyDescriptor(Map.prototype, "size").get.call(x);
  } catch {
    return false;
  }
  return true;
}

function isSet(x) {
  try {
    Object.getOwnPropertyDescriptor(Set.prototype, "size").get.call(x);
  } catch {
    return false;
  }
  return true;
}

function isMapIterator(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "MapIterator"
  );
}

function isSetIterator(x) {
  // TODO: Better check!
  return (
    typeof x === "object" &&
    Object.prototype.toString.call(x).slice(8, -1) === "SetIterator"
  );
}

function isWeakMap(x) {
  try {
    WeakMap.prototype.has.call(x);
  } catch {
    return false;
  }
  return true;
}

function isWeakSet(x) {
  try {
    WeakSet.prototype.has.call(x);
  } catch {
    return false;
  }
  return true;
}

function isArrayBuffer(x) {
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

function isDataView(x) {
  try {
    Object.getOwnPropertyDescriptor(DataView.prototype, "buffer").get.call(x);
  } catch {
    return false;
  }
  return true;
}

function isSharedArrayBuffer(x) {
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
function isProxy(x) {
  return proxies.has(x);
}

function isModuleNamespaceObject(x) {
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

function isAnyArrayBuffer(x) {
  return isArrayBuffer(x) || isSharedArrayBuffer(x);
}

function isBoxedPrimitive(x) {
  return (
    isNumberObject(x) ||
    isStringObject(x) ||
    isBooleanObject(x) ||
    isBigIntObject(x) ||
    isSymbolObject(x)
  );
}

module.exports = {
}
