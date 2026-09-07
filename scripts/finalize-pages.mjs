import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(projectRoot, "docs");
const mediaSource = path.join(projectRoot, "pages-assets");
const mediaTarget = path.join(docsDir, "assets", "media");
const indexPath = path.join(docsDir, "index.html");
const fallbackPath = path.join(docsDir, "404.html");

await mkdir(mediaTarget, { recursive: true });
await cp(mediaSource, mediaTarget, { recursive: true });

const projectPath = "/dr-vickis-tech-talk/";
const storageHero = "/manus-storage/hero-editorial_106889d6.jpg";
const pagesHero = `${projectPath}assets/media/hero-editorial.jpg`;
const indexHtml = (await readFile(indexPath, "utf8")).replaceAll(storageHero, pagesHero);
const routeEntries = [
  "about",
  "post/git-is-a-time-machine-not-a-backup-button",
  "post/terminal-workflow-hacks-for-developers",
  "post/ai-agents-from-chat-to-action",
  "post/personal-data-private-by-design",
  "post/spatial-computing-beyond-headsets",
  "post/human-checklist-before-adopting-ai",
  "post/signals-that-a-tech-trend-will-stick",
  "post/quiet-reinvention-of-search",
];

await writeFile(indexPath, indexHtml);
await copyFile(indexPath, fallbackPath);
for (const route of routeEntries) {
  const routeDirectory = path.join(docsDir, route);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), indexHtml);
}
await writeFile(path.join(docsDir, ".nojekyll"), "");
await rm(path.join(docsDir, "__manus__"), { recursive: true, force: true });
await rm(path.join(docsDir, ".gitkeep"), { force: true });

console.log("GitHub Pages package finalized in docs/.");
