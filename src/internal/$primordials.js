import { isDataView } from "#$internalBinding_types";

export const ArrayBufferIsView = ArrayBuffer.isView;
export const DatePrototypeValueOf = Date.prototype.valueOf.call.bind(
  Date.prototype.valueOf
);
export const ObjectPrototypeToString = Object.prototype.toString.call.bind(
  Object.prototype.toString
);
export const SymbolToStringTag = Symbol.toStringTag;
export const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
export const TypedArrayPrototypeGetSymbolToStringTag = (x) =>
  ArrayBufferIsView(x) && !isDataView(x) ? x[SymbolToStringTag] : undefined;
export const RegExpPrototypeGetGlobal = ObjectGetOwnPropertyDescriptor(
  RegExp.prototype,
  "global"
).get.call.bind(ObjectGetOwnPropertyDescriptor(RegExp.prototype, "global").get);
