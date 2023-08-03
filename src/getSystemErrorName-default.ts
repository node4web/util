import getSystemErrorMap from "./getSystemErrorMap-default.js";

export = function getSystemErrorName(id: number): string {
  return getSystemErrorMap()[id]?.[0] ?? `Unknown system error ${id}`;
}
