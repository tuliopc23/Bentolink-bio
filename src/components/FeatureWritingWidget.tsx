import { For, Show } from "solid-js";
import type { SanityPost } from "../services/sanity";

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

interface Props {
	posts: SanityPost[];
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function isRecent(dateString: string): boolean {
	const publishDate = new Date(dateString);
	const now = new Date();
	const daysDiff = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
	return daysDiff <= 14; // Mark as new if published within 14 days
}

function estimateReadTime(summary?: string): string {
	if (!summary) return "5 min read";
	const wordCount = summary.split(/\s+/).length;
	const minutes = Math.max(Math.ceil(wordCount / 200), 3);
	return `${minutes} min read`;
}

function transformPosts(posts: SanityPost[]): Article[] {
	return posts.map((post) => ({
		id: post._id,
		title: post.title,
		date: formatDate(post.publishedAt),
		readTime: estimateReadTime(post.summary),
		category: post.category || "Article",
		url: `/blog/${post.slug}`,
		excerpt: post.summary || "Click to read more...",
		isNew: isRecent(post.publishedAt),
	}));
}

export default function FeatureWritingWidget(props: Props) {
	const articles = () => transformPosts(props.posts);

	return (
		<div class="articles-carousel" role="list">
			<div class="articles-track">
				<Show
					when={articles().length > 0}
					fallback={
						<div class="article-card">
							<p class="article-card__excerpt">No articles available yet.</p>
						</div>
					}
				>
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
				</Show>
			</div>
		</div>
	);
}
