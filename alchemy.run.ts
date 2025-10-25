import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";

const app = await alchemy("bentolink-bio");

export const worker = await Astro("bentolink-bio-worker", {
	// @ts-expect-error: "main" is a supported runtime option but missing from current types
	main: "./dist/_worker.js/index.js",
	compatibilityDate: "2025-10-01",
	compatibilityFlags: ["nodejs_compat"],
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
	framework: "Astro 5.15.1 + SolidJS",
});

await app.finalize();
