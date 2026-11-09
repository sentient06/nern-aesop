import {
  readFile,
  readdir,
  rm,
  writeFile
} from "node:fs/promises";
import { join } from "node:path";

const output = "build/client";
const files = await readdir("app/data/tales");

const pages = [
  "about.html",
  ...files
    .filter(name => /^\d+\.json$/.test(name))
    .map(name => `tale-${name.slice(0, -5)}.html`)
];

for (const page of pages) {
  const directory = join(output, page);
  const nested = join(directory, "index.html");

  const html = await readFile(nested);

  await rm(directory, { recursive: true });
  await writeFile(join(output, page), html);

  console.log(`Generated ${page}`);
}
