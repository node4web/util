import { test, assert } from "vitest";
import MIMEType from "../src/MIMEType-default.js";

test("application/json", () => {
  const mimeType = new MIMEType("application/json");
  assert.equal(mimeType.type, "application");
  assert.equal(mimeType.subtype, "json");
  assert.equal(mimeType.essence, "application/json");
  assert.equal(mimeType.toString(), "application/json");
  assert.equal(mimeType.params.toString(), "");
});

test("text/plain;charset=utf-8", () => {
  const mimeType = new MIMEType("text/plain;charset=utf-8");
  assert.equal(mimeType.type, "text");
  assert.equal(mimeType.subtype, "plain");
  assert.equal(mimeType.essence, "text/plain");
  assert.equal(mimeType.toString(), "text/plain;charset=utf-8");
  assert.equal(mimeType.params.toString(), "charset=utf-8");
});
