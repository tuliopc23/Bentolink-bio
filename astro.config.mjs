// @ts-check

import solidJs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],
	output: 'server',
	adapter: cloudflare({
		imageService: 'compile'
	}),
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp"
		}
	}
});
