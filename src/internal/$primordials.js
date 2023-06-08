// TODO: Use some kind of existing intrinsic package?

import { isDataView } from "#$internalBinding_types";

const m = <T extends () => unknown>(f: T): T => f.call.bind(f);
const d = Object.getOwnPropertyDescriptor;

export const ArrayBufferIsView = ArrayBuffer.isView;
export const DatePrototypeValueOf = m(Date.prototype.valueOf);
export const ObjectPrototypeToString = m(Object.prototype.toString);
export const SymbolToStringTag = Symbol.toStringTag;
export const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
export const RegExpPrototypeGetGlobal = m(d(RegExp.prototype, "global")!.get!);

export const TypedArrayPrototypeGetSymbolToStringTag = (x) =>
  ArrayBufferIsView(x) && !isDataView(x) ? x[SymbolToStringTag] : undefined;
