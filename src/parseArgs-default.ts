import getMainArgs from "#lib/getMainArgs.js";
import ParseArgsConfig, {
  ParseArgsOptionConfig,
  ParseArgsOptionsConfig,
} from "./lib/ParseArgsConfig.js";
import ParsedResults, { OptionToken } from "./lib/ParsedResults.js";
import argsToTokens from "./lib/argsToTokens.js";

function parseArgs<T extends ParseArgsConfig>(
  config: T = {} as any,
): ParsedResults<T> {
  const {
    args = getMainArgs(),
    strict = true,
    tokens: returnTokens = false,
    options = Object.create(null) as ParseArgsOptionsConfig,
  } = config;
  const { allowPositionals = !strict } = config;

  // 1. Parse the arguments into tokens
  const tokens = argsToTokens(args, options);

  // 2. Parse the tokens into values
  const result = {
    values: Object.create(null),
    positionals: [],
    ...(returnTokens && { tokens }),
  } as ParsedResults<T>;
  for (const token of tokens) {
    if (token.kind === "option") {
      if (strict) {
        if (options[token.name] === undefined) {
          throw new DOMException(
            `Unexpected option ${token.name}`,
            "SyntaxError",
          );
        }
        if (
          options[token.name].type === "string" &&
          typeof token.value !== "string"
        ) {
          throw new DOMException(
            `Expected string value for ${(token as OptionToken).name}`,
            "TypeError",
          );
        } else if (
          options[token.name].type === "boolean" &&
          token.value != null
        ) {
          throw new DOMException(
            `${token.name} does not take a value`,
            "TypeError",
          );
        }
        if (!token.inlineValue && token.value?.startsWith("-")) {
          throw new DOMException(
            `Unexpected option ${token.value}`,
            "SyntaxError",
          );
        }
      }

      const actualValue = token.value ?? true;
      if (options[token.name].multiple) {
        if (result.values[token.name] === undefined) {
          result.values[token.name] = [];
        }
        result.values[token.name].push(actualValue);
      } else {
        result.values[token.name] = actualValue;
      }
    } else if (token.kind === "positional") {
      if (!allowPositionals) {
        throw new DOMException(
          `Unexpected positional argument ${token.value}`,
          "SyntaxError",
        );
      }
      (result.positionals as string[]).push(token.value);
    }
  }

  // 3. Fill in defaults
  for (const [name, option] of Object.entries<ParseArgsOptionConfig>(options)) {
    if (option.default !== undefined && result.values[name] === undefined) {
      result.values[name] = option.default;
    }
  }

  return result;
}

export = parseArgs;
