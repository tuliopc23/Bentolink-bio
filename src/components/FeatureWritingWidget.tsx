import { createResource, For, Show } from "solid-js";

interface Article {
	id: string;
	title: string;
	date: string;
	readTime: string;
	category: string;
	url: string;
}

const fetchArticles = async (): Promise<Article[]> => {
	// Placeholder articles for demo
	return [
		{
			id: "1",
			title: "Building Scalable Architecture with Modern Tools",
			date: "Jan 15, 2025",
			readTime: "8 min read",
			category: "Engineering",
			url: "#",
		},
		{
			id: "2",
			title: "The Art of Minimalist Design Systems",
			date: "Jan 10, 2025",
			readTime: "6 min read",
			category: "Design",
			url: "#",
		},
		{
			id: "3",
			title: "Performance Optimization Strategies",
			date: "Jan 5, 2025",
			readTime: "10 min read",
			category: "Performance",
			url: "#",
		},
		{
			id: "4",
			title: "Type-Safe Development Workflows",
			date: "Dec 28, 2024",
			readTime: "7 min read",
			category: "TypeScript",
			url: "#",
		},
	];
};

export default function FeatureWritingWidget() {
	const [articles] = createResource(fetchArticles);

	return (
		<Show
			when={!articles.loading}
			fallback={<div class="loading">Loading articles...</div>}
		>
			<div class="articles-grid">
				<For each={articles()}>
					{(article) => (
						<a
							href={article.url}
							class="article-card"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Read article: ${article.title}`}
						>
							<div class="article-card__content">
								<h3 class="article-card__title">{article.title}</h3>
								<div class="article-card__metadata">
									<span class="article-card__date">{article.date}</span>
									<span class="article-card__separator">·</span>
									<span class="article-card__read-time">
										{article.readTime}
									</span>
									<span class="article-card__separator">·</span>
									<span class="article-card__category">{article.category}</span>
								</div>
							</div>
						</a>
					)}
				</For>
			</div>
		</Show>
	);
}
