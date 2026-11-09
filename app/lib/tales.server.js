import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const directory = join(
  process.cwd(),
  "app/data/tales"
);

export async function getTale(id) {
  try {
    const file = join(directory, `${id}.json`);
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

export async function listTales() {
  const files = await readdir(directory);

  const ids = files
    .filter(name => /^\d+\.json$/.test(name))
    .map(name => name.replace(".json", ""))
    .sort((a, b) => Number(a) - Number(b));

  return Promise.all(
    ids.map(async id => {
      const tale = await getTale(id);

      return {
        id,
        title: tale?.english?.translation?.title || '?'
      };
    })
  );
}
