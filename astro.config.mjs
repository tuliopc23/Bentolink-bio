// @ts-check

import solidJs from "@astrojs/solid-js";
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],
	output: "server",
	adapter: cloudflare({
		imageService: "compile"
	}),
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {}
		}
	}
});
