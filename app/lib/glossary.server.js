import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const directory = join(
  process.cwd(),
  "app/data"
);

export async function getGlossary() {
  try {
    const file = join(directory, `glossary.json`);
    const json = await readFile(file, "utf8");

    return JSON.parse(json);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Response("Tale not found", {
        status: 404
      });
    }

    throw error;
  }
}

export async function findWordsInGlossary() {
  const files = await readdir(directory);
  const glossary = await getGlossary();

  return glossary;
}
