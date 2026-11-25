// The GPS Swears It Was a Shortcut
// Node standard library only. Writes the GPS's one-line excuse to
// /output/entry.txt, then reads it back and validates it.
import { mkdirSync, writeFileSync, readFileSync, chmodSync } from "node:fs";

const LINE =
  "The map called that goat track a shortcut, and I repeated it in my most confident voice — in my defence, the goat looked like it knew the way.";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
chmodSync("/output/entry.txt", 0o644);

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) fail("entry.txt does not match the expected line");
if (back.length < 1 || back.length > 200) {
  fail(`line must be 1-200 characters, got ${back.length}`);
}
if (back.includes("\n") || back.includes("\r")) {
  fail("entry must be a single line");
}
if (back.trim().length === 0) fail("entry must not be only whitespace");

console.log(`ok: wrote ${back.length} characters to /output/entry.txt`);
