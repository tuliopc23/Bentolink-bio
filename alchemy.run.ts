import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("bentolink-bio");

export const worker = await Astro("website", {
  build: { command: "bun run build" },
  dev: { command: "bun dev" },
  env: {
    PUBLIC_GITHUB_TOKEN: process.env.PUBLIC_GITHUB_TOKEN,
    PUBLIC_GITHUB_USERNAME: process.env.PUBLIC_GITHUB_USERNAME,
    PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID,
    PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET,
    PUBLIC_SANITY_API_VERSION: process.env.PUBLIC_SANITY_API_VERSION,
    SANITY_TOKEN: process.env.SANITY_TOKEN,
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
