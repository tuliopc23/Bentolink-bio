import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("molecular-main");

export const worker = await Astro("website", {
  // replace if different from default:
  //
  // main: "./.output/server/index.mjs",
  // command: "astro build",
  // dev: { command: "astro dev" },
});

console.log({
  url: worker.url,
});

await app.finalize();
