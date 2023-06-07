// import { kKeyObject } from "#internal/crypto/util";
// WHERE const kKeyObject = Symbol('kKeyObject');

// const kKeyType = Symbol('kKeyType');

function isKeyObject(obj) {
  const kKeyType = Object.getOwnPropertySymbols(obj).find(
    (x) => x.description === "kKeyType"
  );
  const obj_kKeyType = kKeyType ? obj[kKeyType] : undefined;

  return obj != null && obj_kKeyType !== undefined;
}

function isCryptoKey(obj) {
  const kKeyObject = Object.getOwnPropertySymbols(obj).find(
    (x) => x.description === "kKeyObject"
  );
  const obj_kKeyObject = kKeyObject ? obj[kKeyObject] : undefined;

  return obj != null && obj_kKeyObject !== undefined;
}

export { isKeyObject, isCryptoKey };
