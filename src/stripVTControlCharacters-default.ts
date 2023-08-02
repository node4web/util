export = function stripVTControlCharacters(s: string): string {
  if (typeof s !== "string") {
    throw new TypeError(`${s} is not a string`);
  }
  return s.replaceAll(
    /[\u001B\u009B][[\\]()#;?]*|(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d\\/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-ntqry=><~]))/g,
    ""
  );
};
