export interface SanityPost {
	_id: string;
	title: string;
	slug: string;
	publishedAt: string;
	summary?: string;
	category?: string;
}

const SANITY_PROJECT_ID = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "61249gtj";
const SANITY_DATASET = import.meta.env.PUBLIC_SANITY_DATASET || "production";
const SANITY_API_VERSION = import.meta.env.PUBLIC_SANITY_API_VERSION || "2023-05-03";
const SANITY_TOKEN = import.meta.env.SANITY_TOKEN || "";

const SANITY_QUERY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

export async function fetchLatestPosts(limit = 3): Promise<SanityPost[]> {
	const query = `*[_type == "post"] | order(publishedAt desc)[0..${limit - 1}] {
		_id,
		title,
		"slug": slug.current,
		publishedAt,
		summary,
		category
	}`;

	try {
		const url = `${SANITY_QUERY_URL}?query=${encodeURIComponent(query)}`;

		const headers: HeadersInit = {};
		if (SANITY_TOKEN) {
			headers.Authorization = `Bearer ${SANITY_TOKEN}`;
		}

		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(`Sanity API error: ${response.status} ${response.statusText}`);
		}

		const data = (await response.json()) as { result?: SanityPost[] };
		return data.result || [];
	} catch (error) {
		console.error("Error fetching posts from Sanity:", error);
		return [];
	}
}
