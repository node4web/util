import {
  ArrayIsArray,
  ArrayPrototypeJoin,
  ArrayPrototypePop,
  Date,
  DatePrototypeGetDate,
  DatePrototypeGetHours,
  DatePrototypeGetMinutes,
  DatePrototypeGetMonth,
  DatePrototypeGetSeconds,
  Error,
  FunctionPrototypeBind,
  NumberIsSafeInteger,
  ObjectDefineProperties,
  ObjectDefineProperty,
  ObjectGetOwnPropertyDescriptors,
  ObjectKeys,
  ObjectPrototypeToString,
  ObjectSetPrototypeOf,
  ObjectValues,
  ReflectApply,
  StringPrototypePadStart,
} from "#$primordials";

import {
  codes as _codes,
  errnoException,
  exceptionWithHostPort,
  hideStackFrames,
} from "#internal/errors";
const { ERR_FALSY_VALUE_REJECTION, ERR_INVALID_ARG_TYPE, ERR_OUT_OF_RANGE } =
  _codes;
import {
  format,
  formatWithOptions,
  inspect,
  stripVTControlCharacters,
} from "internal/util/inspect";
import { debuglog } from "#internal/util/debuglog";
import { validateFunction, validateNumber } from "#internal/validators";
import { Buffer as _Buffer } from "#buffer";
const { isBuffer } = _Buffer;
import * as types from "#internal/util/types";

import {
  deprecate,
  getSystemErrorMap,
  internalErrorName as getSystemErrorName,
  promisify,
  toUSVString,
  defineLazyProperties,
} from "#internal/util";

import {
  transferableAbortSignal as abortController_transferableAbortSignal,
  transferableAbortController as abortController_transferableAbortController,
  aborted as abortController_aborted,
} from "#internal/abort_controller";

let internalDeepEqual;

function isBoolean(arg) {
  return typeof arg === "boolean";
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg === null || arg === undefined;
}

function isNumber(arg) {
  return typeof arg === "number";
}

function isString(arg) {
  return typeof arg === "string";
}

function isSymbol(arg) {
  return typeof arg === "symbol";
}

function isUndefined(arg) {
  return arg === undefined;
}

function isObject(arg) {
  return arg !== null && typeof arg === "object";
}

function isError(e) {
  return ObjectPrototypeToString(e) === "[object Error]" || e instanceof Error;
}

function isFunction(arg) {
  return typeof arg === "function";
}

function isPrimitive(arg) {
  return arg === null || (typeof arg !== "object" && typeof arg !== "function");
}

function pad(n) {
  return StringPrototypePadStart(n.toString(), 2, "0");
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function timestamp() {
  const d = new Date();
  const t = ArrayPrototypeJoin(
    [
      pad(DatePrototypeGetHours(d)),
      pad(DatePrototypeGetMinutes(d)),
      pad(DatePrototypeGetSeconds(d)),
    ],
    ":"
  );
  return `${DatePrototypeGetDate(d)} ${months[DatePrototypeGetMonth(d)]} ${t}`;
}

import { log as console_log} from "#internal/console/global"
function log(...args) {
  console_log("%s - %s", timestamp(), format(...args));
}

function inherits(ctor, superCtor) {
  if (ctor === undefined || ctor === null)
    throw new ERR_INVALID_ARG_TYPE("ctor", "Function", ctor);

  if (superCtor === undefined || superCtor === null)
    throw new ERR_INVALID_ARG_TYPE("superCtor", "Function", superCtor);

  if (superCtor.prototype === undefined) {
    throw new ERR_INVALID_ARG_TYPE(
      "superCtor.prototype",
      "Object",
      superCtor.prototype
    );
  }
  ObjectDefineProperty(ctor, "super_", {
    __proto__: null,
    value: superCtor,
    writable: true,
    configurable: true,
  });
  ObjectSetPrototypeOf(ctor.prototype, superCtor.prototype);
}

function _extend(target, source) {
  // Don't do anything if source isn't an object
  if (source === null || typeof source !== "object") return target;

  const keys = ObjectKeys(source);
  let i = keys.length;
  while (i--) {
    target[keys[i]] = source[keys[i]];
  }
  return target;
}

const callbackifyOnRejected = hideStackFrames((reason, cb) => {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    reason = new ERR_FALSY_VALUE_REJECTION(reason);
  }
  return cb(reason);
});

function callbackify(original) {
  validateFunction(original, "original");

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified(...args) {
    const maybeCb = ArrayPrototypePop(args);
    validateFunction(maybeCb, "last argument");
    const cb = FunctionPrototypeBind(maybeCb, this);
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    ReflectApply(original, this, args).then(
      (ret) => process.nextTick(cb, null, ret),
      (rej) => process.nextTick(callbackifyOnRejected, rej, cb)
    );
  }

  const descriptors = ObjectGetOwnPropertyDescriptors(original);
  // It is possible to manipulate a functions `length` or `name` property. This
  // guards against the manipulation.
  if (typeof descriptors.length.value === "number") {
    descriptors.length.value++;
  }
  if (typeof descriptors.name.value === "string") {
    descriptors.name.value += "Callbackified";
  }
  const propertiesValues = ObjectValues(descriptors);
  for (let i = 0; i < propertiesValues.length; i++) {
    // We want to use null-prototype objects to not rely on globally mutable
    // %Object.prototype%.
    ObjectSetPrototypeOf(propertiesValues[i], null);
  }
  ObjectDefineProperties(callbackified, descriptors);
  return callbackified;
}

function getSystemErrorName(err) {
  validateNumber(err, "err");
  if (err >= 0 || !NumberIsSafeInteger(err)) {
    throw new ERR_OUT_OF_RANGE("err", "a negative integer", err);
  }
  return internalErrorName(err);
}

// Keep the `exports =` so that various functions can still be monkeypatched
const exports = {
  _errnoException: errnoException,
  _exceptionWithHostPort: exceptionWithHostPort,
  _extend,
  callbackify,
  debug: debuglog,
  debuglog,
  deprecate,
  format,
  formatWithOptions,
  getSystemErrorMap,
  getSystemErrorName,
  inherits,
  inspect,
  isArray: ArrayIsArray,
  isBoolean,
  isBuffer,
  isDeepStrictEqual(a, b) {
    if (internalDeepEqual === undefined) {
      internalDeepEqual =
        require("internal/util/comparisons").isDeepStrictEqual;
    }
    return internalDeepEqual(a, b);
  },
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp: types.isRegExp,
  isObject,
  isDate: types.isDate,
  isError,
  isFunction,
  isPrimitive,
  log,
  promisify,
  stripVTControlCharacters,
  toUSVString,
  get transferableAbortSignal() {
    return lazyAbortController().transferableAbortSignal;
  },
  get transferableAbortController() {
    return lazyAbortController().transferableAbortController;
  },
  get aborted() {
    return lazyAbortController().aborted;
  },
  types,
};

defineLazyProperties(module.exports, "internal/util/parse_args/parse_args", [
  "parseArgs",
]);

defineLazyProperties(module.exports, "internal/encoding", [
  "TextDecoder",
  "TextEncoder",
]);

defineLazyProperties(module.exports, "internal/mime", [
  "MIMEType",
  "MIMEParams",
]);
