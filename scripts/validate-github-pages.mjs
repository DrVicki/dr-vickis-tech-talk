import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const required = ["index.html", "404.html", ".nojekyll", "rss.xml"];
const errors = [];

for (const file of required) {
  try {
    await access(path.join(docs, file));
  } catch {
    errors.push(`Missing docs/${file}`);
  }
}

const indexHtml = await readFile(path.join(docs, "index.html"), "utf8");
const fallbackHtml = await readFile(path.join(docs, "404.html"), "utf8");
const guide = await readFile(path.join(root, "GITHUB_PAGES.md"), "utf8");
const media = await readdir(path.join(docs, "assets", "media"));

if (!indexHtml.includes("/dr-vickis-tech-talk/assets/")) errors.push("index.html is missing the project-aware asset base");
if (!fallbackHtml.includes("/dr-vickis-tech-talk/assets/")) errors.push("404.html is missing the project-aware asset base");
if (indexHtml.includes("/manus-storage/")) errors.push("index.html still references Manus-only storage");
if (fallbackHtml.includes("/manus-storage/")) errors.push("404.html still references Manus-only storage");
if (media.filter((file) => file.endsWith(".jpg")).length !== 5) errors.push("Expected five optimized editorial images");
if (!guide.includes("DrVicki/dr-vickis-tech-talk")) errors.push("Deployment guide has the wrong repository");
if (!guide.includes("main") || !guide.includes("/docs")) errors.push("Deployment guide is missing branch-based Pages settings");

try {
  await access(path.join(docs, "__manus__"));
  errors.push("docs/ contains a Manus-only development directory");
} catch {
  // Expected: Pages output should not include the development collector.
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("GitHub Pages validation passed.");
