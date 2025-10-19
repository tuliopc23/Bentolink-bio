import { createSignal, createResource, For, Show, onMount } from "solid-js";

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  repository?: {
    name: string;
    full_name: string;
  };
}

interface GitHubStats {
  totalCommits: number;
  repositories: number;
  lastCommitDate: string;
}

const fetchGitHubStats = async (
  username: string,
  token: string
): Promise<GitHubStats> => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  try {
    // Fetch user's events (includes commits)
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!eventsResponse.ok) {
      throw new Error("Failed to fetch GitHub events");
    }

    const events = await eventsResponse.json();

    // Filter push events and count commits from last 3 months
    const pushEvents = events.filter(
      (event: any) =>
        event.type === "PushEvent" &&
        new Date(event.created_at) >= threeMonthsAgo
    );

    const totalCommits = pushEvents.reduce(
      (sum: number, event: any) => sum + (event.payload?.commits?.length || 0),
      0
    );

    const uniqueRepos = new Set(
      pushEvents.map((event: any) => event.repo.name)
    );

    // Get last commit date
    const lastCommitDate =
      pushEvents.length > 0
        ? new Date(pushEvents[0].created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "N/A";

    return {
      totalCommits,
      repositories: uniqueRepos.size,
      lastCommitDate,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      totalCommits: 0,
      repositories: 0,
      lastCommitDate: "N/A",
    };
  }
};

const fetchLatestCommits = async (
  username: string,
  token: string
): Promise<GitHubCommit[]> => {
  try {
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!eventsResponse.ok) {
      throw new Error("Failed to fetch commits");
    }

    const events = await eventsResponse.json();

    // Filter and map push events to commits
    const commits: GitHubCommit[] = [];
    const pushEvents = events.filter(
      (event: any) => event.type === "PushEvent"
    );

    for (const event of pushEvents.slice(0, 5)) {
      const commitMessages = event.payload.commits || [];
      for (const commit of commitMessages.slice(0, 1)) {
        // Get first commit per push
        commits.push({
          sha: commit.sha.substring(0, 7),
          commit: {
            message: commit.message,
            author: {
              name: event.actor.display_login,
              date: new Date(event.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            },
          },
          html_url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          repository: {
            name: event.repo.name.split("/")[1],
            full_name: event.repo.name,
          },
        });
      }
      if (commits.length >= 3) break;
    }

    return commits;
  } catch (error) {
    console.error("Error fetching commits:", error);
    return [];
  }
};

export default function GitHubActivity(props: { username: string }) {
  const token = import.meta.env.PUBLIC_GITHUB_TOKEN;
  const [refreshTrigger, setRefreshTrigger] = createSignal(0);

  const [stats] = createResource(refreshTrigger, () =>
    fetchGitHubStats(props.username, token)
  );
  const [commits] = createResource(refreshTrigger, () =>
    fetchLatestCommits(props.username, token)
  );

  // Auto-refresh every 5 minutes
  onMount(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  });

  return (
    <div class="github-widget" role="region" aria-label="GitHub activity">
      <Show
        when={!stats.loading && !commits.loading}
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
              <div class="github-card__avatar" aria-hidden="true">
                {props.username.slice(0, 1).toUpperCase()}
              </div>
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
                <span class="github-card__stat-value">
                  {stats()?.totalCommits ?? 0}
                </span>
                <span class="github-card__stat-label">3mo commits</span>
              </li>
              <li class="github-card__stat">
                <span class="github-card__stat-value">
                  {stats()?.repositories ?? 0}
                </span>
                <span class="github-card__stat-label">Active repos</span>
              </li>
              <li class="github-card__stat">
                <span class="github-card__stat-value">
                  {stats()?.lastCommitDate}
                </span>
                <span class="github-card__stat-label">Last commit</span>
              </li>
            </ul>
          </header>

          <div class="github-commits" role="list">
            <For each={commits()}>
              {(commit) => (
                <a
                  href={commit.html_url}
                  class="github-commit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="github-commit__accent" aria-hidden="true"></div>
                  <div class="github-commit__body">
                    <p class="github-commit__message">
                      {commit.commit.message}
                    </p>
                    <div class="github-commit__meta">
                      <span class="github-commit__repo">
                        {commit.repository?.name}
                      </span>
                      <span class="github-commit__dot" aria-hidden="true">
                        •
                      </span>
                      <span class="github-commit__date">
                        {commit.commit.author.date}
                      </span>
                    </div>
                  </div>
                  <div class="github-commit__arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </a>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}
