import { createResource, For, Show } from "solid-js";

interface Article {
	id: string;
	title: string;
	date: string;
	readTime: string;
	category: string;
	url: string;
	excerpt: string;
	isNew?: boolean;
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
			excerpt:
				"Foundations for resilient deployments: thread pools, observability budgets, and graceful degradation.",
			isNew: true,
		},
		{
			id: "2",
			title: "The Art of Minimalist Design Systems",
			date: "Jan 10, 2025",
			readTime: "6 min read",
			category: "Design",
			url: "#",
			excerpt:
				"Crafting expressive UI kits without sacrificing velocity—lessons from building cross-platform surfaces.",
		},
		{
			id: "3",
			title: "Performance Optimization Strategies",
			date: "Jan 5, 2025",
			readTime: "10 min read",
			category: "Performance",
			url: "#",
			excerpt:
				"Profiling end-to-end latency and designing feedback loops that keep teams honest about budgets.",
		},
		{
			id: "4",
			title: "Type-Safe Development Workflows",
			date: "Dec 28, 2024",
			readTime: "7 min read",
			category: "TypeScript",
			url: "#",
			excerpt:
				"How strict typing, automated lint gates, and ergonomics-first DX unlock stable velocity at scale.",
		},
	];
};

export default function FeatureWritingWidget() {
	const [articles] = createResource(fetchArticles);

	return (
		<Show
			when={!articles.loading}
			fallback={
				<div class="articles-carousel articles-carousel--loading" aria-hidden="true">
					<div class="article-card-skeleton"></div>
					<div class="article-card-skeleton"></div>
					<div class="article-card-skeleton"></div>
				</div>
			}
		>
			<div class="articles-carousel" role="list">
				<div class="articles-track">
					<For each={articles()}>
						{(article) => (
							<a href={article.url} class="article-card" target="_blank" rel="noopener noreferrer">
								<header class="article-card__header">
									<span class="article-card__eyebrow">{article.category}</span>
									<Show when={article.isNew}>
										<span class="article-card__badge">NEW</span>
									</Show>
								</header>
								<h3 class="article-card__title">{article.title}</h3>
								<p class="article-card__excerpt">{article.excerpt}</p>
								<footer class="article-card__footer">
									<span class="article-card__meta">{article.date}</span>
									<span class="article-card__dot" aria-hidden="true">
										•
									</span>
									<span class="article-card__meta">{article.readTime}</span>
									<span class="article-card__cta" aria-hidden="true">
										Read →
									</span>
								</footer>
							</a>
						)}
					</For>
				</div>
			</div>
		</Show>
	);
}
