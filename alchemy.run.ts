import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("molecular-main");

export const worker = await Astro("website", {
  // Use Bun for all build commands
  build: {
    command: "bun run build",
  },
  
  // Custom domain - commented out until zone is configured in Cloudflare
  // You can add this domain later through Cloudflare Pages dashboard
  // domains: ["linkinbio.tuliocunha.dev"],
  
  // Environment variables for the worker
  env: {
    PUBLIC_GITHUB_TOKEN: process.env.PUBLIC_GITHUB_TOKEN || "",
    PUBLIC_GITHUB_USERNAME: process.env.PUBLIC_GITHUB_USERNAME || "",
    PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID || "",
    PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET || "",
    PUBLIC_SANITY_API_VERSION: process.env.PUBLIC_SANITY_API_VERSION || "",
    SANITY_TOKEN: process.env.SANITY_TOKEN || "",
  },
  
  // Use Bun for dev mode too
  dev: { 
    command: "bun run dev" 
  },
});

console.log({
  url: worker.url,
  // Custom domain can be added later via Cloudflare dashboard
});

await app.finalize();
