import { createSignal, createResource, For, Show, onMount } from "solid-js";

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

const fetchRecentCommits = async (
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
      console.error("GitHub API Error:", eventsResponse.status);
      return [];
    }

    const events = await eventsResponse.json();

    // Filter and map push events to commits
    const commits: GitHubCommit[] = [];
    const pushEvents = events.filter(
      (event: any) => event.type === "PushEvent"
    );

    for (const event of pushEvents) {
      const commitMessages = event.payload.commits || [];
      for (const commit of commitMessages.slice(0, 1)) {
        const commitDate = new Date(event.created_at);
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
            message: commit.message,
            author: {
              date: timeAgo,
            },
          },
          html_url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          repository: {
            name: event.repo.name.split("/")[1],
          },
        });
      }
      if (commits.length >= 5) break;
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

  const [commits] = createResource(refreshTrigger, () =>
    fetchRecentCommits(props.username, token)
  );

  // Auto-refresh every 5 minutes
  onMount(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, 300000);

    return () => clearInterval(interval);
  });

  return (
    <div class="github-widget" role="region" aria-label="GitHub commits">
      <Show
        when={!commits.loading && commits()}
        fallback={
          <div class="github-loading">
            <div class="github-skeleton"></div>
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
                    <span class="commit-item__repo">
                      {commit.repository?.name}
                    </span>
                    <span class="commit-item__divider">•</span>
                    <span class="commit-item__time">
                      {commit.commit.author.date}
                    </span>
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
