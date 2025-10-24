// @ts-check

import solidJs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs()],
	output: 'server',
	adapter: cloudflare({
		imageService: 'compile',
		// @ts-expect-error: sessionBinding is supported by the runtime adapter but not typed yet
		sessionBinding: false, // Disabled: not needed for static portfolio
	}),
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp"
		}
	}
});
