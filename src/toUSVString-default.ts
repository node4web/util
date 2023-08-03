import StringPrototypeToWellFormed from "./lib/StringPrototypeToWellFormed.js";

let toUSVString: (s: string) => string;
// @ts-ignore
if (String.prototype.toWellFormed) {
  // @ts-ignore
  toUSVString = Object.call.bind(String.prototype.toWellFormed);
} else {
  toUSVString = StringPrototypeToWellFormed;
}

export = toUSVString;
