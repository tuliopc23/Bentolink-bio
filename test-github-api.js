// Test script to verify GitHub API access
// Run with: node test-github-api.js

const username = "tuliopc23";
const token = process.env.PUBLIC_GITHUB_TOKEN;

if (!token) {
	console.error("❌ PUBLIC_GITHUB_TOKEN not found in environment");
	console.log("Set it with: export PUBLIC_GITHUB_TOKEN=your_token_here");
	process.exit(1);
}

console.log("✓ Token found, length:", token.length);
console.log("Testing GitHub API access...\n");

fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=3`, {
	headers: {
		Authorization: `Bearer ${token}`,
		Accept: "application/vnd.github.v3+json",
	},
})
	.then(async (response) => {
		console.log("Status:", response.status);
		console.log("Rate limit remaining:", response.headers.get("x-ratelimit-remaining"));
		
		if (!response.ok) {
			const error = await response.text();
			console.error("❌ API Error:", error);
			process.exit(1);
		}
		
		return response.json();
	})
	.then((repos) => {
		console.log(`✓ Successfully fetched ${repos.length} repositories\n`);
		
		repos.forEach((repo, i) => {
			console.log(`${i + 1}. ${repo.name}`);
			console.log(`   URL: ${repo.html_url}`);
			console.log(`   Last push: ${repo.pushed_at}\n`);
		});
		
		// Test fetching commits for first repo
		if (repos.length > 0) {
			const firstRepo = repos[0];
			console.log(`Fetching commits for ${firstRepo.name}...`);
			
			return fetch(`https://api.github.com/repos/${firstRepo.full_name}/commits?per_page=3`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github.v3+json",
				},
			});
		}
	})
	.then(async (response) => {
		if (!response) return;
		
		const commits = await response.json();
		console.log(`✓ Successfully fetched ${commits.length} commits\n`);
		
		commits.forEach((commit, i) => {
			console.log(`${i + 1}. ${commit.commit.message.split('\n')[0]}`);
			console.log(`   SHA: ${commit.sha.substring(0, 7)}`);
			console.log(`   Date: ${commit.commit.author.date}\n`);
		});
		
		console.log("✅ All tests passed! GitHub API is working correctly.");
	})
	.catch((error) => {
		console.error("❌ Error:", error.message);
		process.exit(1);
	});
