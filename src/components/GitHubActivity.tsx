import { createSignal, For, onMount, Show } from "solid-js";
import "../styles/github-activity-widget.css";

interface GitHubCommitAPI {
	sha: string;
	commit: {
		message: string;
		author: {
			date: string;
		};
	};
	html_url: string;
}

interface GitHubCommit {
	sha: string;
	commit: {
		message: string;
		author: {
			date: string;
		};
	};
	html_url: string;
}

interface GitHubRepo {
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	pushed_at: string;
	size: number;
	private: boolean;
	commits: GitHubCommit[];
}

interface RepoCache {
	data: GitHubRepo[];
	timestamp: number;
}

const repoCache = new Map<string, RepoCache>();
const CACHE_TTL = 300000;

function formatRelativeTime(dateString: string): string {
	const commitDate = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - commitDate.getTime());
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
		return diffHours === 0 ? "Just now" : `${diffHours}h ago`;
	}
	if (diffDays === 1) {
		return "Yesterday";
	}
	if (diffDays < 7) {
		return `${diffDays}d ago`;
	}
	return commitDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

const fetchRepositoriesWithCommits = async (
	username: string,
	token?: string,
): Promise<GitHubRepo[]> => {
	try {
		if (!token) {
			console.warn("GitHub token not found. Using unauthenticated requests (60 req/hour limit)");
		}

		const cached = repoCache.get(username);
		if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
			return cached.data;
		}

		const headers: HeadersInit = {
			Accept: "application/vnd.github.v3+json",
		};
		
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const reposResponse = await fetch(
			`https://api.github.com/users/${username}/repos?sort=pushed&per_page=12`,
			{ headers },
		);

		if (!reposResponse.ok) {
			if (reposResponse.status === 429) {
				const retryAfter = reposResponse.headers.get("Retry-After");
				throw new Error(`Rate limit exceeded. Retry after ${retryAfter || "60"} seconds.`);
			}
			console.error("[GitHubActivity] GitHub API Error:", reposResponse.status);
			return [];
		}

		const repos: GitHubRepo[] = await reposResponse.json();

		const filteredRepos = repos.filter((repo) => !repo.private && repo.size > 0).slice(0, 12);

		const reposWithCommits = await Promise.all(
			filteredRepos.map(async (repo) => {
				try {
					const headers: HeadersInit = {
						Accept: "application/vnd.github.v3+json",
					};
					
					if (token) {
						headers.Authorization = `Bearer ${token}`;
					}

					const commitsResponse = await fetch(
						`https://api.github.com/repos/${repo.full_name}/commits?per_page=3`,
						{ headers },
					);

					if (commitsResponse.ok) {
						const commits: GitHubCommitAPI[] = await commitsResponse.json();
						return {
							...repo,
							commits: commits.map((commit) => ({
								sha: commit.sha.substring(0, 7),
								commit: {
									message: commit.commit.message,
									author: {
										date: formatRelativeTime(commit.commit.author.date),
									},
								},
								html_url: commit.html_url,
							})),
						};
					}
					return { ...repo, commits: [] };
				} catch (error) {
					console.warn(`Error fetching commits for ${repo.name}:`, error);
					return { ...repo, commits: [] };
				}
			}),
		);

		const validRepos = reposWithCommits.filter((repo) => repo.commits.length > 0);

		repoCache.set(username, {
			data: validRepos,
			timestamp: Date.now(),
		});

		return validRepos;
	} catch (error) {
		console.error("Error fetching repositories:", error);
		throw error;
	}
};

function stripEmojis(text: string): string {
	return text.replace(/[\p{Emoji}\p{Emoji_Component}]/gu, "").trim();
}

function formatCommitMessage(message: string): string {
	const firstLine = message.split("\n")[0]?.trim() ?? "Commit";
	return firstLine.length <= 110 ? firstLine : `${firstLine.slice(0, 107)}…`;
}

export default function GitHubActivity(props: { username: string; token?: string }) {
	const [repositories, setRepositories] = createSignal<GitHubRepo[]>([]);
	const [loading, setLoading] = createSignal(true);
	const [error, setError] = createSignal<string | null>(null);
	const [activeRepoIndex, setActiveRepoIndex] = createSignal(0);
	const [showScrollHint, setShowScrollHint] = createSignal(true);

	const getToken = () => {
		const token = props.token || 
			(typeof window !== "undefined" ? (window as any).PUBLIC_GITHUB_TOKEN : undefined);
		
		if (!token && typeof window !== "undefined") {
			console.error("[GitHubActivity] Token not found. Props token:", !!props.token, "Window token:", !!(window as any).PUBLIC_GITHUB_TOKEN);
		}
		
		return token;
	};

	const loadRepositories = async () => {
		const currentToken = getToken();
		
		try {
			setLoading(true);
			setError(null);
			const repos = await fetchRepositoriesWithCommits(props.username, currentToken);
			setRepositories(repos);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load repositories");
		} finally {
			setLoading(false);
		}
	};

	onMount(() => {
		loadRepositories();

		const scrollHintSeen = localStorage.getItem("github-widget-scroll-hint-seen");
		if (scrollHintSeen === "true") {
			setShowScrollHint(false);
		}

		const track = document.querySelector(".github-repo-carousel__track");

		const handleScroll = () => {
			if (!track) return;
			const scrollLeft = track.scrollLeft;
			const cardWidth = track.querySelector(".github-repo-card")?.clientWidth || 0;
			const gap = 16;
			const index = Math.round(scrollLeft / (cardWidth + gap));
			setActiveRepoIndex(index);

			if (showScrollHint() && scrollLeft > 10) {
				setShowScrollHint(false);
				localStorage.setItem("github-widget-scroll-hint-seen", "true");
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (!track) return;
			const cards = track.querySelectorAll(".github-repo-card");
			const currentIndex = activeRepoIndex();

			if (e.key === "ArrowLeft" && currentIndex > 0) {
				e.preventDefault();
				cards[currentIndex - 1]?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "center",
				});
				setActiveRepoIndex(currentIndex - 1);
			} else if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
				e.preventDefault();
				cards[currentIndex + 1]?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "center",
				});
				setActiveRepoIndex(currentIndex + 1);
			}
		};

		track?.addEventListener("scroll", handleScroll);
		document.addEventListener("keydown", handleKeyDown);

		const interval = setInterval(() => {
			loadRepositories();
		}, 300000);

		return () => {
			clearInterval(interval);
			track?.removeEventListener("scroll", handleScroll);
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<section class="github-widget" data-github-widget>
			<Show
				when={error()}
				fallback={
					<Show
						when={!loading() && repositories().length > 0}
						fallback={
							<div class="github-widget__loading">
								<div class="github-commit-skeleton"></div>
								<div class="github-commit-skeleton"></div>
								<div class="github-commit-skeleton"></div>
							</div>
						}
					>
						<div class="github-repo-carousel">
							<Show when={showScrollHint()}>
								<div class="github-scroll-cta" role="status" aria-live="polite">
									<span>Scroll left</span>
									<i class="ph ph-arrow-right" aria-hidden="true"></i>
								</div>
							</Show>
							<div class="github-repo-carousel__track">
								<For each={repositories()}>
									{(repo, index) => (
										<article class="github-repo-card" data-repo-index={index()}>
											<header class="github-repo-card__header">
												<a
													href={repo.html_url}
													class="github-repo-card__title"
													target="_blank"
													rel="noopener noreferrer"
												>
													<i class="ph ph-git-branch" aria-hidden="true"></i>
													{repo.name}
												</a>
												<Show when={repo.description}>
													<p class="github-repo-card__description">
														{stripEmojis(repo.description ?? "")}
													</p>
												</Show>
												<div class="github-repo-card__meta">
													<Show when={repo.language}>
														<span class="github-repo-card__language">
															<i class="ph ph-code" aria-hidden="true"></i>
															{repo.language}
														</span>
													</Show>
													<Show when={repo.stargazers_count > 0}>
														<span class="github-repo-card__stars">
															<i class="ph ph-star" aria-hidden="true"></i>
															{repo.stargazers_count}
														</span>
													</Show>
												</div>
											</header>
											<div class="github-commit-list">
												<For each={repo.commits}>
													{(commit) => (
														<a
															href={commit.html_url}
															class="github-commit-list-item"
															target="_blank"
															rel="noopener noreferrer"
															aria-label={`View commit ${commit.sha} in ${repo.name}`}
														>
															<div class="github-commit-list-item__content">
																<p class="github-commit-list-item__message">
																	{formatCommitMessage(commit.commit.message)}
																</p>
																<div class="github-commit-list-item__meta">
																	<span class="github-commit-list-item__chip">
																		<i class="ph ph-clock" aria-hidden="true"></i>
																		{commit.commit.author.date}
																	</span>
																	<span class="github-commit-list-item__chip github-commit-list-item__chip--mono">
																		<i class="ph ph-hash" aria-hidden="true"></i>
																		{commit.sha}
																	</span>
																</div>
															</div>
															<i
																class="ph ph-arrow-up-right github-commit-list-item__icon"
																aria-hidden="true"
															></i>
														</a>
													)}
												</For>
											</div>
										</article>
									)}
								</For>
							</div>
						</div>
					</Show>
				}
			>
				<div class="github-widget__error">
					<i class="ph ph-warning-circle" aria-hidden="true"></i>
					<p>{error()}</p>
				</div>
			</Show>
		</section>
	);
}
