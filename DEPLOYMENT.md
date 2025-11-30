# Deployment Guide

## Setting up GitHub Token for Production

The GitHub Activity widget requires a GitHub Personal Access Token to fetch commit data. Follow these steps to configure it for Cloudflare Workers:

### 1. Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Bentolink Bio Widget"
4. Select scopes: `public_repo` (or just `read:user` for public repos only)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### 2. Set the Secret in Cloudflare Workers

Run this command to set the token as a secret:

```bash
bunx wrangler secret put PUBLIC_GITHUB_TOKEN
```

When prompted, paste your GitHub token.

### 3. Verify the Configuration

After setting the secret, deploy your site:

```bash
bun run build
bunx wrangler deploy
```

### 4. Test in Production

Visit your deployed site and check the GitHub Activity widget. It should now display your commits.

## Troubleshooting

### Token not working in production

1. Verify the secret is set:
   ```bash
   bunx wrangler secret list
   ```

2. Check the token has correct permissions on GitHub

3. Ensure the token hasn't expired

### Rate limiting issues

GitHub API has rate limits:
- Authenticated: 5,000 requests/hour
- Unauthenticated: 60 requests/hour

The widget caches data for 5 minutes to minimize API calls.

## Local Development

For local development, create a `.env` file:

```bash
cp .env.example .env
```

Then add your GitHub token to the `.env` file:

```
PUBLIC_GITHUB_TOKEN=your_github_token_here
```
