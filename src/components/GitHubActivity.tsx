import { createResource, For, Show } from "solid-js";

interface GitHubCommit {
	message: string;
	repo: string;
	date: string;
	sha: string;
	url: string;
}

const fetchLatestCommits = async (_username: string): Promise<GitHubCommit[]> => {
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
		<div class="github-widget" role="region" aria-label="GitHub activity">
			<Show
				when={!commits.loading}
				fallback={
					<div class="github-card github-card--loading" aria-hidden="true">
						<div class="github-card__skeleton-header"></div>
						<div class="github-card__skeleton-line"></div>
						<div class="github-card__skeleton-line"></div>
						<div class="github-card__skeleton-line"></div>
					</div>
				}
			>
				<div class="github-card">
					<header class="github-card__header">
						<div class="github-card__identity">
							<span class="github-card__avatar" aria-hidden="true">
								{props.username.slice(0, 1).toUpperCase()}
							</span>
							<div class="github-card__meta">
								<span class="github-card__eyebrow">GitHub</span>
								<a
									href={`https://github.com/${props.username}`}
									target="_blank"
									rel="noopener noreferrer"
									class="github-card__handle"
								>
									@{props.username}
								</a>
							</div>
						</div>
						<ul class="github-card__stats">
							<li class="github-card__stat">
								<span class="github-card__stat-value">{commits()?.length ?? 0}</span>
								<span class="github-card__stat-label">Recent</span>
							</li>
							<li class="github-card__stat">
								<span class="github-card__stat-value">42</span>
								<span class="github-card__stat-label">Repos</span>
							</li>
							<li class="github-card__stat">
								<span class="github-card__stat-value">7d</span>
								<span class="github-card__stat-label">Streak</span>
							</li>
						</ul>
					</header>

					<div class="github-commits" role="list">
						<For each={commits()}>
							{(commit) => (
								<a
									href={commit.url}
									class="github-commit"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span class="github-commit__accent" aria-hidden="true"></span>
									<div class="github-commit__body">
										<p class="github-commit__message">{commit.message}</p>
										<div class="github-commit__meta">
											<span class="github-commit__repo">{commit.repo}</span>
											<span class="github-commit__dot" aria-hidden="true">
												•
											</span>
											<span class="github-commit__date">{commit.date}</span>
										</div>
									</div>
									<span class="github-commit__arrow" aria-hidden="true">
										↗
									</span>
								</a>
							)}
						</For>
					</div>
				</div>
			</Show>
		</div>
	);
}
