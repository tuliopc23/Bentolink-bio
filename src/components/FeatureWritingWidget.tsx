import { createUniqueId, For, onCleanup, onMount, Show } from "solid-js";
import type { SanityPost } from "../services/sanity";
import "../styles/feature-writing-widget.css";

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

function formatExcerpt(summary?: string): string {
	if (!summary) return "Tap to read more.";
	const compact = summary.trim();
	if (compact.length === 0) return "Tap to read more.";
	if (compact.length <= 180) return compact;
	return `${compact.slice(0, 177)}…`;
}

function transformPosts(posts: SanityPost[]): Article[] {
	return posts.map((post) => ({
		id: post._id,
		title: post.title,
		date: formatDate(post.publishedAt),
		readTime: estimateReadTime(post.summary),
		category: post.category || "Article",
		url: `https://www.tuliocunha.dev/blog/${post.slug}`,
		excerpt: formatExcerpt(post.summary),
		isNew: isRecent(post.publishedAt),
	}));
}

export default function FeatureWritingWidget(props: Props) {
	const articles = () => transformPosts(props.posts);
	const widgetId = createUniqueId();

	onMount(() => {
		const root = document.querySelector(`[data-writing-widget="${widgetId}"]`);
		if (!root) return;

		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (motionQuery.matches) return;

		const setupParallax = (card: HTMLElement) => {
			let frame = 0;
			const maxTilt = 4;
			const maxShift = 6;

			const applyTilt = (event: PointerEvent) => {
				const rect = card.getBoundingClientRect();
				const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
				const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

				const clamp = (value: number, limit: number) => Math.min(Math.max(value, -limit), limit);
				const rotateX = clamp(-relativeY * maxTilt * 2, maxTilt);
				const rotateY = clamp(relativeX * maxTilt * 2, maxTilt);
				const translateY = clamp(-relativeY * maxShift, maxShift);

				if (frame) window.cancelAnimationFrame(frame);
				frame = window.requestAnimationFrame(() => {
					card.style.setProperty("--parallax-rotate-x", `${rotateX}deg`);
					card.style.setProperty("--parallax-rotate-y", `${rotateY}deg`);
					card.style.setProperty("--parallax-translate", `${translateY}px`);
				});
			};

			const resetTilt = () => {
				if (frame) window.cancelAnimationFrame(frame);
				card.style.setProperty("--parallax-rotate-x", "0deg");
				card.style.setProperty("--parallax-rotate-y", "0deg");
				card.style.setProperty("--parallax-translate", "0px");
			};

			const handlePointerMove = (event: PointerEvent) => {
				applyTilt(event);
			};

			const handlePointerEnter = (event: PointerEvent) => {
				card.classList.add("article-card--tilting");
				applyTilt(event);
			};

			const handlePointerEnd = () => {
				card.classList.remove("article-card--tilting");
				resetTilt();
			};

			card.addEventListener("pointerenter", handlePointerEnter, { passive: true });
			card.addEventListener("pointermove", handlePointerMove, { passive: true });
			card.addEventListener("pointerdown", handlePointerEnter, { passive: true });
			card.addEventListener("pointerup", handlePointerEnd, { passive: true });
			card.addEventListener("pointerleave", handlePointerEnd, { passive: true });
			card.addEventListener("pointercancel", handlePointerEnd, { passive: true });

			return () => {
				card.removeEventListener("pointerenter", handlePointerEnter);
				card.removeEventListener("pointermove", handlePointerMove);
				card.removeEventListener("pointerdown", handlePointerEnter);
				card.removeEventListener("pointerup", handlePointerEnd);
				card.removeEventListener("pointerleave", handlePointerEnd);
				card.removeEventListener("pointercancel", handlePointerEnd);
				resetTilt();
			};
		};

		let cleanups: Array<() => void> = [];

		const attach = () => {
			for (const dispose of cleanups) {
				dispose();
			}
			cleanups = [];
			const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax-card]"));
			for (const card of cards) {
				cleanups.push(setupParallax(card));
			}
		};

		attach();

		const observer = new MutationObserver(() => {
			attach();
		});
		observer.observe(root, { childList: true, subtree: true });

		const handleMotionChange = (event: MediaQueryListEvent) => {
			if (event.matches) {
				for (const dispose of cleanups) {
					dispose();
				}
				observer.disconnect();
			}
		};

		motionQuery.addEventListener("change", handleMotionChange);

		onCleanup(() => {
			for (const dispose of cleanups) {
				dispose();
			}
			observer.disconnect();
			motionQuery.removeEventListener("change", handleMotionChange);
		});
	});

	return (
		<div class="articles-carousel" data-writing-widget={widgetId}>
			<div class="articles-track">
				<Show
					when={articles().length > 0}
					fallback={<div class="articles-empty">No articles available yet.</div>}
				>
					<For each={articles()}>
						{(article) => (
							<a
								href={article.url}
								class="article-card"
								target="_blank"
								rel="noopener noreferrer"
								data-parallax-card
								aria-label={`Read ${article.title}`}
							>
								<header class="article-card__header">
									<div class="article-card__label-row">
										<span class="article-card__eyebrow">
											<i class="ph ph-newspaper icon--metadata" aria-hidden="true"></i>
											{article.category.toUpperCase()}
										</span>
										<Show when={article.isNew}>
											<span class="article-card__badge">NEW</span>
										</Show>
									</div>
									<h3 class="article-card__title">{article.title}</h3>
									<p class="article-card__excerpt">{article.excerpt}</p>
								</header>
								<footer class="article-card__footer">
									<div class="article-card__chip-group" role="presentation">
										<span class="article-card__chip" data-chip="meta">
											<i
												class="ph ph-calendar-blank article-card__chip-icon"
												aria-hidden="true"
											></i>
											<span>{article.date}</span>
										</span>
										<span class="article-card__chip" data-chip="meta">
											<i class="ph ph-clock article-card__chip-icon" aria-hidden="true"></i>
											<span>{article.readTime}</span>
										</span>
									</div>
									<span class="article-card__chip article-card__chip--cta" aria-hidden="true">
										<span>Read</span>
										<i class="ph ph-arrow-up-right article-card__chip-icon" aria-hidden="true"></i>
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

export { transformPosts };
