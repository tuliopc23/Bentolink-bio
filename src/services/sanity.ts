export interface SanityPost {
	_id: string;
	title: string;
	slug: string;
	publishedAt: string;
	summary?: string;
	category?: string;
}

const SANITY_PROJECT_ID = "61249gtj";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2023-05-03";
const SANITY_TOKEN =
	"sk2xsJxoY37VA2MHz9G2ugtRzl8SoBlqhl4WHwlt1FkRYYPn4LG80OR1SlUl3l48YJSCsyhyrzDaTgL62uVeMbH7rhHo3TH7ZA8opHF6v0j8Z4ifl1CHqcMRazotXMUTOTdUv9TP85KWRwG32oJQmyAwoW74lBAoBPd9Kzo4S1RYnOtOde1p";

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

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${SANITY_TOKEN}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Sanity API error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return data.result || [];
	} catch (error) {
		console.error("Error fetching posts from Sanity:", error);
		return [];
	}
}
