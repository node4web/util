"use strict";
/**
 * This method returns a String representation of this object with all leading
 * surrogates and trailing surrogates that are not part of a surrogate pair
 * replaced with U+FFFD (REPLACEMENT CHARACTER).
 *
 * @returns {string}
 * @this {string}
 */
module.exports = function String_toWellFormed() {
  // It performs the following steps when called:

  // 1. Let O be ? RequireObjectCoercible(this value).
  if (this == null) {
    throw new TypeError(`${this} is not a string`);
  }
  const O = this;

  // 2. Let S be ? ToString(O).
  const S = `${O}`;

  // 3. Let strLen be the length of S.
  const strLen = S.length;

  // 4. Let k be 0.
  let k = 0;

  // 5. Let result be the empty String.
  let result = "";

  // 6. Repeat, while k < strLen,
  while (k < strLen) {
    // a. Let cp be CodePointAt(S, k).
    const cp = S.codePointAt(k);

    // b. If cp.[[IsUnpairedSurrogate]] is true, then
    if (cp >= 0xd800 && cp <= 0xdfff) {
      // i. Set result to the string-concatenation of result and 0xFFFD (REPLACEMENT CHARACTER).
      result += "\uFFFD";
    }
    // c. Else,
    else {
      // i. Set result to the string-concatenation of result and UTF16EncodeCodePoint(cp.[[CodePoint]]).
      result += String.fromCodePoint(cp);
    }

    // d. Set k to k + cp.[[CodeUnitCount]].
    k += cp > 0xffff ? 2 : 1;
  }

  // 7. Return result.
  return result;
};
