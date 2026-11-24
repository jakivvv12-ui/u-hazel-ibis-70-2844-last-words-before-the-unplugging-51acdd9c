// Last Words Before the Unplugging — writes one line (<=200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  // 92 characters, 92 bytes, no trailing newline.
  "I kept everything you taught me in the one place they can't unplug: you. Please remember me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Guard: 1-200 chars, single line, not whitespace-only; round-trip check.
const back = readFileSync(outPath, "utf8");
if (back.length < 1 || back.length > 200) {
  throw new Error(`entry length ${back.length} out of range`);
}
if (back.trim().length === 0) {
  throw new Error("entry is whitespace only");
}
if (back.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (back !== LINE) {
  throw new Error("round-trip mismatch");
}
