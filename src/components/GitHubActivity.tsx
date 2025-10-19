import { createResource, For, Show } from "solid-js";

interface GitHubCommit {
	message: string;
	repo: string;
	date: string;
	sha: string;
	url: string;
}

const fetchLatestCommits = async (
	username: string,
): Promise<GitHubCommit[]> => {
	// Placeholder - replace with actual GitHub API call
	return [
		{
			message: "Refactor layout system with Apple HIG principles",
			repo: "bentolink-bio",
			date: new Date().toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			sha: "a3f2c1d",
			url: "#",
		},
		{
			message: "Add ProfileCard component with proportional typography",
			repo: "bentolink-bio",
			date: new Date(Date.now() - 86400000).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			sha: "b4e5d2f",
			url: "#",
		},
		{
			message: "Update shadow system for equal elevation",
			repo: "design-system",
			date: new Date(Date.now() - 172800000).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			sha: "c7f8a3e",
			url: "#",
		},
	];
};

export default function GitHubActivity(props: { username: string }) {
	const [commits] = createResource(() => fetchLatestCommits(props.username));

	return (
		<div class="github-widget">
			<Show
				when={!commits.loading}
				fallback={<div class="loading">Loading activity...</div>}
			>
				<div class="github-stats">
					<div class="github-stat">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="github-icon"
						>
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
						</svg>
						<span class="github-stat-value">{commits()?.length || 0}</span>
						<span class="github-stat-label">Recent</span>
					</div>
					<div class="github-profile-link">
						<a
							href={`https://github.com/${props.username}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							@{props.username}
						</a>
					</div>
				</div>

				<div class="github-commits">
					<For each={commits()}>
						{(commit) => (
							<a
								href={commit.url}
								class="github-commit-item"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div class="commit-dot"></div>
								<div class="commit-content">
									<p class="commit-message-text">{commit.message}</p>
									<div class="commit-meta">
										<span class="commit-repo-name">{commit.repo}</span>
										<span class="commit-dot-separator">•</span>
										<span class="commit-date-text">{commit.date}</span>
									</div>
								</div>
							</a>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
}
