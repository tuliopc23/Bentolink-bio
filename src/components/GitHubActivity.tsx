import { createSignal, For, onMount, Show } from "solid-js";

interface GitHubCommit {
	sha: string;
	commit: {
		message: string;
		author: {
			date: string;
		};
	};
	html_url: string;
	repository?: {
		name: string;
	};
}

interface GitHubRepo {
	name: string;
	full_name: string;
	html_url: string;
	pushed_at: string;
}

const fetchRecentCommits = async (username: string, token: string): Promise<GitHubCommit[]> => {
	try {
		console.log("[GitHubActivity] Fetching commits for:", username);
		console.log("[GitHubActivity] Token exists:", !!token);

		if (!token) {
			console.warn("GitHub token not found. Please add PUBLIC_GITHUB_TOKEN to your .env file");
			return [];
		}

		// First, get the user's recently updated repositories
		const reposResponse = await fetch(
			`https://api.github.com/users/${username}/repos?sort=pushed&per_page=3`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github.v3+json",
				},
			},
		);

		if (!reposResponse.ok) {
			console.error("[GitHubActivity] GitHub API Error:", reposResponse.status);
			return [];
		}

		const repos: GitHubRepo[] = await reposResponse.json();
		console.log(
			"[GitHubActivity] Fetched repos:",
			repos.length,
			repos.map((r) => r.name),
		);

		const commits: GitHubCommit[] = [];

		// Fetch the most recent commit from each repo
		for (const repo of repos.slice(0, 3)) {
			try {
				const commitsResponse = await fetch(
					`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							Accept: "application/vnd.github.v3+json",
						},
					},
				);

				if (commitsResponse.ok) {
					const repoCommits = await commitsResponse.json();
					if (repoCommits.length > 0) {
						const commit = repoCommits[0];
						const commitDate = new Date(commit.commit.author.date);
						const now = new Date();
						const diffTime = Math.abs(now.getTime() - commitDate.getTime());
						const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

						let timeAgo = "";
						if (diffDays === 0) {
							const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
							timeAgo = diffHours === 0 ? "Just now" : `${diffHours}h ago`;
						} else if (diffDays === 1) {
							timeAgo = "Yesterday";
						} else if (diffDays < 7) {
							timeAgo = `${diffDays}d ago`;
						} else {
							timeAgo = commitDate.toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							});
						}

						commits.push({
							sha: commit.sha.substring(0, 7),
							commit: {
								message: commit.commit.message,
								author: {
									date: timeAgo,
								},
							},
							html_url: commit.html_url,
							repository: {
								name: repo.name,
							},
						});
					}
				}
			} catch (error) {
				console.warn(`Error fetching commits for ${repo.name}:`, error);
			}
		}

		console.log("[GitHubActivity] Final commits:", commits.length);
		return commits;
	} catch (error) {
		console.error("Error fetching commits:", error);
		return [];
	}
};

export default function GitHubActivity(props: { username: string }) {
	const token = import.meta.env.PUBLIC_GITHUB_TOKEN;

	// Fetch data immediately for SSR
	const initialData = fetchRecentCommits(props.username, token);
	const [commits, setCommits] = createSignal<GitHubCommit[]>([]);
	const [loading, setLoading] = createSignal(true);

	// Initialize with data
	initialData.then((data) => {
		setCommits(data);
		setLoading(false);
	});

	// Load on mount for client-side hydration
	onMount(() => {
		// Auto-refresh every 5 minutes
		const interval = setInterval(async () => {
			setLoading(true);
			const data = await fetchRecentCommits(props.username, token);
			setCommits(data);
			setLoading(false);
		}, 300000);

		return () => clearInterval(interval);
	});

	return (
		<div class="github-widget">
			<Show
				when={!loading() && commits().length > 0}
				fallback={
					<div class="github-loading">
						<div class="github-skeleton"></div>
						<div class="github-skeleton"></div>
						<div class="github-skeleton"></div>
					</div>
				}
			>
				<div class="github-commits-list">
					<For each={commits()}>
						{(commit, index) => (
							<a
								href={commit.html_url}
								class="commit-item"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									"animation-delay": `${index() * 50}ms`,
								}}
							>
								<div class="commit-item__indicator"></div>
								<div class="commit-item__content">
									<p class="commit-item__message">{commit.commit.message}</p>
									<div class="commit-item__meta">
										<span class="commit-item__repo">{commit.repository?.name}</span>
										<span class="commit-item__divider">•</span>
										<span class="commit-item__time">{commit.commit.author.date}</span>
										<span class="commit-item__sha">{commit.sha}</span>
									</div>
								</div>
								<div class="commit-item__arrow">
									<svg
										width="14"
										height="14"
										viewBox="0 0 14 14"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.5M10.5 3.5V8.5" />
									</svg>
								</div>
							</a>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
}
