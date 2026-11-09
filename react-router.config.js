import { readdirSync } from "node:fs";

const files = readdirSync("app/data/tales");

const talePaths = files
  .filter(name => /^\d+\.json$/.test(name))
  .map(name => {
    const id = name.replace(".json", "");
    return `/tale-${id}.html`;
  });

export default {
  ssr: false,

  routeDiscovery: {
    mode: "initial"
  },

  prerender: [
    "/",
    "/about.html",
    ...talePaths
  ]
};
