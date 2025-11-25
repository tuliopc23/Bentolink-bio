import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("bentolink-bio");

export const worker = await Astro("website", {
  build: { command: "bun run build" },
  dev: { command: "bun dev" },
  domains: ["biolinks.tuliocunha.dev"],
  env: {
    // GitHub token - use wrangler secret for production
    PUBLIC_GITHUB_TOKEN: process.env.PUBLIC_GITHUB_TOKEN || "",
    PUBLIC_GITHUB_USERNAME: process.env.PUBLIC_GITHUB_USERNAME || "tuliopc23",
    // Sanity CMS
    PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID || "61249gtj",
    PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET || "production",
    PUBLIC_SANITY_API_VERSION: process.env.PUBLIC_SANITY_API_VERSION || "2023-05-03",
    SANITY_TOKEN: process.env.SANITY_TOKEN || "",
  },
});

console.log({
  url: worker.url,
});

await app.finalize();
