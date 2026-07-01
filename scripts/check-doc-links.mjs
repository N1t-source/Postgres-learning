import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsRoot = path.join(root, "docs");
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (fullPath.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

walk(docsRoot);

const missing = [];

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/href="(\/docs\/[^"]+)"/g)) {
    const relTarget = match[1].replace(/^\/docs\//, "docs/");
    const fullTarget = path.join(root, relTarget);
    if (!fs.existsSync(fullTarget)) {
      missing.push({
        file: path.relative(root, file),
        target: relTarget,
      });
    }
  }
}

if (missing.length > 0) {
  console.log(JSON.stringify(missing, null, 2));
  process.exit(1);
}

console.log("internal-doc-links-ok");
