import { test, assert } from "vitest";
import parseArgs from "../src/parseArgs-default.js";

test("--hello=world", () => {
  const args = ["--hello=world"];
  const { values, positionals } = parseArgs({ args, strict: false });
  assert.equal(values.hello, "world");
});

test("-hWorld", () => {
  const args = ["-hWorld"];
  const options = {
    hello: { short: "h", type: "string" },
  };
  const { values, positionals } = parseArgs({ args, options, strict: false });
  assert.equal(values.hello, "World");
});

test("hello=world is positional", () => {
  const args = ["hello=world"];
  const { values, positionals } = parseArgs({ args, strict: false });
  assert.equal(positionals[0], "hello=world");
});

test("--hello world", () => {
  const args = ["--hello", "world"];
  const options = {
    hello: { type: "string" },
  };
  const { values, positionals } = parseArgs({ args, options, strict: false });
  assert.equal(values.hello, "world");
});

test("-h world", () => {
  const args = ["-h", "world"];
  const options = {
    hello: { short: "h", type: "string" },
  };
  const { values, positionals } = parseArgs({ args, options, strict: false });
  assert.equal(values.hello, "world");
});

test("-hi is two short options", () => {
  const args = ["-hi"];
  const { values, positionals } = parseArgs({ args, strict: false });
  assert.equal(values.h, true);
  assert.equal(values.i, true);
});

test("--hello world --world hello", () => {
  const args = ["--hello", "world", "--world", "hello"];
  const options = {
    hello: { type: "string" },
    world: { type: "string" },
  };
  const { values, positionals } = parseArgs({ args, options, strict: false });
  assert.equal(values.hello, "world");
  assert.equal(values.world, "hello");
});
