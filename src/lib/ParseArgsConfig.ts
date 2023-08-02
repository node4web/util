interface ParseArgsOptionConfig {
  type: "string" | "boolean";
  multiple?: boolean | undefined;
  short?: string | undefined;
  default?: string | boolean | string[] | boolean[] | undefined;
}
interface ParseArgsOptionsConfig {
  [longOption: string]: ParseArgsOptionConfig;
}
interface ParseArgsConfig {
  args?: string[] | undefined;
  options?: ParseArgsOptionsConfig | undefined;
  strict?: boolean | undefined;
  allowPositionals?: boolean | undefined;
  tokens?: boolean | undefined;
}

export default ParseArgsConfig;
export type { ParseArgsOptionConfig, ParseArgsOptionsConfig };
