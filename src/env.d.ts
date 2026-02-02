/// <reference types="astro/client" />

interface Window {
	PUBLIC_GITHUB_TOKEN?: string;
}

interface ImportMetaEnv {
	readonly PUBLIC_GITHUB_TOKEN: string;
	readonly PUBLIC_GITHUB_USERNAME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
