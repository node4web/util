export = function log(...args: any[]): void {
  if (typeof args[0] === "string" && args[0].includes("%") && args.length > 1) {
    args[0] = new Date().toISOString() + " " + args[0];
    console.log(...args);
  } else {
    console.log(new Date().toISOString(), ...args);
  }
};
