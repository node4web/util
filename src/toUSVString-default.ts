let toUSVString: (s: string) => string;
// @ts-ignore
if (String.prototype.toWellFormed) {
  // @ts-ignore
  toUSVString = Object.call.bind(String.prototype.toWellFormed);
} else {
  toUSVString =
    require("./lib/StringPrototypeToWellFormed.js") as typeof import("./lib/StringPrototypeToWellFormed.js");
}

export = toUSVString;
