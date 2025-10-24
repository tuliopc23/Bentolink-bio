import { createSignal, For, onMount, Show } from "solid-js";
import "../styles/github-activity-widget.css";

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

		return commits;
	} catch (error) {
		console.error("Error fetching commits:", error);
		return [];
	}
};

function formatCommitMessage(message: string): string {
	const firstLine = message.split("\n")[0]?.trim() ?? "Commit";
	return firstLine.length <= 110 ? firstLine : `${firstLine.slice(0, 107)}…`;
}

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
		<section class="github-widget" data-github-widget>
			<Show
				when={!loading() && commits().length > 0}
				fallback={
					<div class="github-widget__loading">
						<div class="github-commit-skeleton"></div>
						<div class="github-commit-skeleton"></div>
						<div class="github-commit-skeleton"></div>
					</div>
				}
			>
				<div class="github-commits">
					<For each={commits()}>
						{(commit) => (
							<a
								href={commit.html_url}
								class="github-commit-card"
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`View ${commit.sha} on ${commit.repository?.name ?? "GitHub"}`}
							>
								<header class="github-commit-card__header">
									<span class="github-commit-card__eyebrow icon-text-group">
										<i class="ph ph-git-branch" aria-hidden="true"></i>
										{commit.repository?.name ?? "Repository"}
									</span>
									<p class="github-commit-card__message">
										{formatCommitMessage(commit.commit.message)}
									</p>
								</header>
								<footer class="github-commit-card__footer">
									<div class="github-commit-card__chip-group" role="presentation">
										<span class="github-commit-card__chip">
											<i class="ph ph-clock" aria-hidden="true"></i>
											{commit.commit.author.date}
										</span>
										<span class="github-commit-card__chip github-commit-card__chip--mono">
											<i class="ph ph-hash" aria-hidden="true"></i>
											{commit.sha}
										</span>
									</div>
									<span class="github-commit-card__cta" aria-hidden="true">
										<i class="ph ph-arrow-up-right"></i>
									</span>
								</footer>
							</a>
						)}
					</For>
				</div>
			</Show>
		</section>
	);
}
