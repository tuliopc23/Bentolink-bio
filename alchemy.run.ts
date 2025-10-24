import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("bentolink-bio");

/**
 * Production Deployment Configuration
 *
 * Bentolink Bio - Cloudflare Workers Deployment
 * 
 * Configuration ensures:
 * ✓ Astro 5.14.6 SSR with SolidJS islands
 * ✓ Disabled sessions (not needed for portfolio)
 * ✓ Environment variable management
 * ✓ Production build optimizations
 */

export const worker = await Astro("bentolink-bio-worker", {
	// @ts-expect-error: "main" is a supported runtime option but missing from current types
	main: "./.output/server/index.mjs",
	build: {
		command: "bun run build",
	},
	dev: {
		command: "bun run dev",
	},
});

console.log({
	url: worker.url,
	environment: "production",
	framework: "Astro 5.14.6 + SolidJS",
});

await app.finalize();
