import { test, assert } from "vitest"
import parseArgs from "../src/parseArgs-default.js"

test("--hello=world", () => {
  const args = ['--hello=world']
  const { values, positionals } = parseArgs({ args, strict: false })
})
