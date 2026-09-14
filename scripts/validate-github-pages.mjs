import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const required = [
  "index.html",
  "404.html",
  ".nojekyll",
  "rss.xml",
  "rss.xsl",
  "about/index.html",
  "post/the-real-cost-of-a-click-understanding-data-centers/index.html",
  "post/how-to-let-ai-write-excel-formulas-for-you/index.html",
  "post/working-with-excel-data-without-formulas/index.html",
  "post/git-is-a-time-machine-not-a-backup-button/index.html",
  "post/terminal-workflow-hacks-for-developers/index.html",
  "post/ai-agents-from-chat-to-action/index.html",
  "post/personal-data-private-by-design/index.html",
  "post/spatial-computing-beyond-headsets/index.html",
  "post/human-checklist-before-adopting-ai/index.html",
  "post/signals-that-a-tech-trend-will-stick/index.html",
  "post/quiet-reinvention-of-search/index.html",
  "assets/downloads/dr-vicki-excel-ai-checklist.xlsx",
  "assets/downloads/dr-vicki-excel-ai-prompt-pack.zip",
  "assets/downloads/excel-ai-prompts/01-spot-trends-and-assess-risk.txt",
  "assets/downloads/excel-ai-prompts/02-turn-findings-into-action.txt",
  "assets/downloads/excel-ai-prompts/03-build-a-reusable-routine.txt",
  "assets/downloads/dr-vicki-excel-formula-practice.xlsx",
  "assets/downloads/dr-vicki-excel-formula-prompt-pack.zip",
  "assets/downloads/excel-formula-prompts/01-translate-goal-to-formula.txt",
  "assets/downloads/excel-formula-prompts/02-stress-test-edge-cases.txt",
  "assets/downloads/excel-formula-prompts/03-build-reusable-formula-library.txt",
];
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
const rssXml = await readFile(path.join(docs, "rss.xml"), "utf8");
const rssXsl = await readFile(path.join(docs, "rss.xsl"), "utf8");
const media = await readdir(path.join(docs, "assets", "media"));
const bundlePath = indexHtml.match(/src="\/dr-vickis-tech-talk\/(assets\/index-[^"]+\.js)"/)?.[1];
const bundle = bundlePath ? await readFile(path.join(docs, bundlePath), "utf8") : "";

if (!indexHtml.includes("/dr-vickis-tech-talk/assets/")) errors.push("index.html is missing the project-aware asset base");
if (!fallbackHtml.includes("/dr-vickis-tech-talk/assets/")) errors.push("404.html is missing the project-aware asset base");
if (indexHtml.includes("/manus-storage/")) errors.push("index.html still references Manus-only storage");
if (fallbackHtml.includes("/manus-storage/")) errors.push("404.html still references Manus-only storage");
if (media.filter((file) => file.endsWith(".jpg")).length !== 9) errors.push("Expected nine optimized editorial images");
if (!guide.includes("DrVicki/dr-vickis-tech-talk")) errors.push("Deployment guide has the wrong repository");
if (!guide.includes("main") || !guide.includes("/docs")) errors.push("Deployment guide is missing branch-based Pages settings");
if (!bundle.includes("formula-challenge")) errors.push("Production bundle is missing the public formula challenge");
if (!bundle.includes("Copy formula") || !bundle.includes("Copy prompt")) errors.push("Production bundle is missing formula or prompt copy controls");
if (!bundle.includes("api.github.com/repos/DrVicki/dr-vickis-tech-talk/issues")) errors.push("Production bundle is missing the public solution feed");
if (!rssXml.includes('<?xml-stylesheet type="text/xsl" href="rss.xsl?v=reader-buttons"?>')) errors.push("RSS feed is missing its versioned browser stylesheet");
if (!rssXsl.includes("This is an RSS feed") || !rssXsl.includes('<xsl:for-each select="item">')) errors.push("RSS stylesheet is missing the feed explanation or article renderer");
if (!rssXsl.includes("Subscribe in Feedly") || !rssXsl.includes("feedly.com/i/subscription/feed/")) errors.push("RSS stylesheet is missing the Feedly subscription button");
if (!rssXsl.includes("Subscribe in Inoreader") || !rssXsl.includes("inoreader.com/?add_feed=")) errors.push("RSS stylesheet is missing the Inoreader subscription button");
if (!rssXsl.includes("drvickitechtalk.org%2Frss.xml")) errors.push("RSS reader buttons are missing the canonical feed URL");

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
