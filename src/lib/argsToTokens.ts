import { ParseArgsOptionsConfig } from "./ParseArgsConfig.js";
import { Token } from "./ParsedResults.js";

function isLoneShortOption(arg: string): boolean {
  return arg.length === 2 && arg[0] === "-" && arg[1] !== "-";
}
function isShortOptionAndValue(arg: string, options: ParseArgsOptionsConfig) {
  if (arg.length <= 2) return false;
  if (arg[0] !== "-") return false;
  if (arg[1] === "-") return false;
  const shortOption = arg[1];
  const longOption = findLongOptionForShort(shortOption, options);
  return options[longOption]?.type === "string";
}
function isShortOptionGroup(arg: string, options: ParseArgsOptionsConfig) {
  if (arg.length <= 2) return false;
  if (arg[0] !== "-") return false;
  if (arg[1] === "-") return false;
  const firstShort = arg[1];
  const longOption = findLongOptionForShort(firstShort, options);
  return options[longOption]?.type !== "string";
}

function isLoneLongOption(arg: string) {
  return arg.length > 2 && arg.startsWith("--") && !arg.includes("=", 3);
}
function isLongOptionAndValue(arg: string) {
  return arg.length > 2 && arg.startsWith("--") && arg.includes("=", 3);
}

function findLongOptionForShort(
  shortOption: string,
  options: ParseArgsOptionsConfig
) {
  const longOptionEntry = Object.entries(options).find(
    ([key, optionConfig]) => optionConfig.short === shortOption
  );
  return longOptionEntry?.[0] ?? shortOption;
}

function argsToTokens(args: string[], options: ParseArgsOptionsConfig): Token[] {
  const tokens: Token[] = [];
  let index = -1;
  let groupCount = 0;

  const remainingArgs = args.slice();
  while (remainingArgs.length > 0) {
    const arg = remainingArgs.shift();
    const nextArg = remainingArgs[0];
    if (groupCount > 0) groupCount--;
    else index++;

    // Check if `arg` is an options terminator.
    // Guideline 10 in https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html
    if (arg === "--") {
      // Everything after a bare '--' is considered a positional argument.
      tokens.push({ kind: "option-terminator", index });
      tokens.push(
        ...remainingArgs.map((arg) => {
          return { kind: "positional", index: ++index, value: arg } as const;
        })
      );
      break; // Finished processing args, leave while loop.
    }

    if (isLoneShortOption(arg)) {
      // e.g. '-f'
      const shortOption = arg.charAt(1);
      const longOption = findLongOptionForShort(shortOption, options);
      let value: string;
      let inlineValue: boolean;
      if (options[longOption]?.type === "string" && nextArg != null) {
        // e.g. '-f', 'bar'
        value = remainingArgs.shift();
        inlineValue = false;
      }
      tokens.push({
        kind: "option",
        name: longOption,
        rawName: arg,
        index,
        value,
        inlineValue,
      });
      if (value != null) ++index;
      continue;
    }

    if (isShortOptionGroup(arg, options)) {
      // Expand -fXzy to -f -X -z -y
      const expanded = [];
      for (let index = 1; index < arg.length; index++) {
        const shortOption = arg.charAt(index);
        const longOption = findLongOptionForShort(shortOption, options);
        if (
          options[longOption]?.type !== "string" ||
          index === arg.length - 1
        ) {
          // Boolean option, or last short in group. Well formed.
          expanded.push(`-${shortOption}`);
        } else {
          // String option in middle. Yuck.
          // Expand -abfFILE to -a -b -fFILE
          expanded.push(`-${arg.slice(index)}`);
          break; // finished short group
        }
      }
      remainingArgs.unshift(...expanded);
      groupCount = expanded.length;
      continue;
    }

    if (isShortOptionAndValue(arg, options)) {
      // e.g. -fFILE
      const shortOption = arg.charAt(1);
      const longOption = findLongOptionForShort(shortOption, options);
      const value = arg.slice(2);
      tokens.push({
        kind: "option",
        name: longOption,
        rawName: `-${shortOption}`,
        index,
        value,
        inlineValue: true,
      });
      continue;
    }

    if (isLoneLongOption(arg)) {
      // e.g. '--foo'
      const longOption = arg.slice(2);
      let value: string;
      let inlineValue: boolean;
      if (options[longOption]?.type === "string" && nextArg != null) {
        // e.g. '--foo', 'bar'
        value = remainingArgs.shift();
        inlineValue = false;
      }
      tokens.push({
        kind: "option",
        name: longOption,
        rawName: arg,
        index,
        value,
        inlineValue,
      });
      if (value != null) ++index;
      continue;
    }

    if (isLongOptionAndValue(arg)) {
      // e.g. --foo=bar
      const equalIndex = arg.indexOf("=");
      const longOption = arg.slice(2, equalIndex);
      const value = arg.slice(equalIndex + 1);
      tokens.push({
        kind: "option",
        name: longOption,
        rawName: `--${longOption}`,
        index,
        value,
        inlineValue: true,
      });
      continue;
    }

    tokens.push({ kind: "positional", index, value: arg });
  }

  return tokens;
}

export = argsToTokens;
