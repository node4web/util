"use strict";
const SymbolFor = require("@nodefill/primordials/SymbolFor.js");
const ObjectDefineProperty = require("@nodefill/primordials/ObjectDefineProperty.js");
const ArrayPrototypePush = require("@nodefill/primordials/ArrayPrototypePush.js");
const ReflectApply = require("@nodefill/primordials/ReflectApply.js");
const ObjectSetPrototypeOf = require("@nodefill/primordials/ObjectSetPrototypeOf.js");
const ObjectGetPrototypeOf = require("@nodefill/primordials/ObjectGetPrototypeOf.js");
const ObjectGetOwnPropertyDescriptors = require("@nodefill/primordials/ObjectGetOwnPropertyDescriptors.js");
const ObjectValues = require("@nodefill/primordials/ObjectValues.js");
const ObjectDefineProperties = require("@nodefill/primordials/ObjectDefineProperties.js");
const TypeError = require("@nodefill/primordials/TypeError.js");

const PromisifySymbolCustom = SymbolFor("nodejs.util.promisify.custom");
const PromisifySymbolCustomArgs = SymbolFor("customPromisifyArgs");

/**
 * @param {(...args: any[]) => any} original
 * @returns {(...args: any[]) => Promise<any>}
 */
function promisify(original) {
  if (typeof original !== "function") {
    throw new TypeError(`${original} is not a function`);
  }

  if (original[PromisifySymbolCustom]) {
    const fn = original[PromisifySymbolCustom];

    if (typeof fn !== "function") {
      throw new TypeError(`${fn} is not a function`);
    }

    return ObjectDefineProperty(fn, PromisifySymbolCustom, {
      __proto__: null,
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }

  const argumentNames = original[PromisifySymbolCustomArgs];

  function fn(...args) {
    return new Promise((resolve, reject) => {
      ArrayPrototypePush(args, (err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (argumentNames !== undefined && values.length > 1) {
          const obj = {};
          for (let i = 0; i < argumentNames.length; i++)
            obj[argumentNames[i]] = values[i];
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
      ReflectApply(original, this, args);
    });
  }

  ObjectSetPrototypeOf(fn, ObjectGetPrototypeOf(original));

  ObjectDefineProperty(fn, PromisifySymbolCustom, {
    __proto__: null,
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true,
  });

  const descriptors = ObjectGetOwnPropertyDescriptors(original);
  const propertiesValues = ObjectValues(descriptors);
  for (let i = 0; i < propertiesValues.length; i++) {
    ObjectSetPrototypeOf(propertiesValues[i], null);
  }
  return ObjectDefineProperties(fn, descriptors);
}
promisify.custom = PromisifySymbolCustom;

module.exports = promisify;
