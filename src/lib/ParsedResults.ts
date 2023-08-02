import ParseArgsConfig, {
  ParseArgsOptionConfig,
  ParseArgsOptionsConfig,
} from "./ParseArgsConfig.js";

type IfDefaultsTrue<T, IfTrue, IfFalse> = T extends true
  ? IfTrue
  : T extends false
  ? IfFalse
  : IfTrue;

type IfDefaultsFalse<T, IfTrue, IfFalse> = T extends false
  ? IfFalse
  : T extends true
  ? IfTrue
  : IfFalse;

type ExtractOptionValue<
  T extends ParseArgsConfig,
  O extends ParseArgsOptionConfig,
> = IfDefaultsTrue<
  T["strict"],
  O["type"] extends "string"
    ? string
    : O["type"] extends "boolean"
    ? boolean
    : string | boolean,
  string | boolean
>;

type ParsedValues<T extends ParseArgsConfig> = IfDefaultsTrue<
  T["strict"],
  unknown,
  { [longOption: string]: undefined | string | boolean }
> &
  (T["options"] extends ParseArgsOptionsConfig
    ? {
        -readonly [LongOption in keyof T["options"]]: IfDefaultsFalse<
          T["options"][LongOption]["multiple"],
          undefined | Array<ExtractOptionValue<T, T["options"][LongOption]>>,
          undefined | ExtractOptionValue<T, T["options"][LongOption]>
        >;
      }
    : {});

type ParsedPositionals<T extends ParseArgsConfig> = IfDefaultsTrue<
  T["strict"],
  IfDefaultsFalse<T["allowPositionals"], string[], []>,
  IfDefaultsTrue<T["allowPositionals"], string[], []>
>;

type PreciseTokenForOptions<
  K extends string,
  O extends ParseArgsOptionConfig,
> = O["type"] extends "string"
  ? {
      kind: "option";
      index: number;
      name: K;
      rawName: string;
      value: string;
      inlineValue: boolean;
    }
  : O["type"] extends "boolean"
  ? {
      kind: "option";
      index: number;
      name: K;
      rawName: string;
      value: undefined;
      inlineValue: undefined;
    }
  : OptionToken & { name: K };

type TokenForOptions<
  T extends ParseArgsConfig,
  K extends keyof T["options"] = keyof T["options"],
> = K extends unknown
  ? T["options"] extends ParseArgsOptionsConfig
    ? PreciseTokenForOptions<K & string, T["options"][K]>
    : OptionToken
  : never;

type ParsedOptionToken<T extends ParseArgsConfig> = IfDefaultsTrue<
  T["strict"],
  TokenForOptions<T>,
  OptionToken
>;

type ParsedPositionalToken<T extends ParseArgsConfig> = IfDefaultsTrue<
  T["strict"],
  IfDefaultsFalse<
    T["allowPositionals"],
    { kind: "positional"; index: number; value: string },
    never
  >,
  IfDefaultsTrue<
    T["allowPositionals"],
    { kind: "positional"; index: number; value: string },
    never
  >
>;

type ParsedTokens<T extends ParseArgsConfig> = Array<
  | ParsedOptionToken<T>
  | ParsedPositionalToken<T>
  | { kind: "option-terminator"; index: number }
>;

type PreciseParsedResults<T extends ParseArgsConfig> = IfDefaultsFalse<
  T["tokens"],
  {
    values: ParsedValues<T>;
    positionals: ParsedPositionals<T>;
    tokens: ParsedTokens<T>;
  },
  {
    values: ParsedValues<T>;
    positionals: ParsedPositionals<T>;
  }
>;

type OptionToken =
  | {
      kind: "option";
      index: number;
      name: string;
      rawName: string;
      value: string;
      inlineValue: boolean;
    }
  | {
      kind: "option";
      index: number;
      name: string;
      rawName: string;
      value: undefined;
      inlineValue: undefined;
    };

type Token =
  | OptionToken
  | { kind: "positional"; index: number; value: string }
  | { kind: "option-terminator"; index: number };

type ParsedResults<T extends ParseArgsConfig> = ParseArgsConfig extends T
  ? {
      values: {
        [longOption: string]:
          | undefined
          | string
          | boolean
          | Array<string | boolean>;
      };
      positionals: string[];
      tokens?: Token[];
    }
  : PreciseParsedResults<T>;

export default ParsedResults;
export type {
  ParsedValues,
  ParsedPositionals,
  ParsedTokens,
  Token,
  OptionToken,
  ParsedOptionToken,
  ParsedPositionalToken,
  PreciseParsedResults,
};
