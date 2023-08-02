export = function getMainArgs(): string[] {
  const args = [];
  for (const [name, value] of new URLSearchParams(location.search)) {
    args.push(`--${name}`, value);
  }
  return args;
};
