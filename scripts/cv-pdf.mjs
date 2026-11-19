// Prints dist/cv/print/ to dist/assets/files/vykoukal-cv.pdf with headless Chrome,
// so the PDF always matches the web CV. Run after build.mjs.
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const chrome = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));
if (!chrome) throw new Error("Chrome not found; set the CHROME environment variable");

const port = "8765";
const server = spawn("python3", ["-m", "http.server", port, "-b", "127.0.0.1", "-d", "dist"], { stdio: "ignore" });
try {
  await sleep(1000);
  mkdirSync("dist/assets/files", { recursive: true });
  execFileSync(chrome, [
    "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
    "--virtual-time-budget=5000",
    // Own profile, so a running Chrome doesn't swallow the job and exit silently.
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "cv-pdf-"))}`,
    `--print-to-pdf=${resolve("dist/assets/files/vykoukal-cv.pdf")}`,
    `http://127.0.0.1:${port}/cv/print/`,
  ], { stdio: "ignore" });
} finally {
  server.kill();
}
if (!existsSync("dist/assets/files/vykoukal-cv.pdf")) throw new Error("Chrome did not write the CV PDF");
console.log("Wrote dist/assets/files/vykoukal-cv.pdf");
