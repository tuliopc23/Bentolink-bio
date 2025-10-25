# Deployment Guide

This project is deployed to Cloudflare using Alchemy.

## Prerequisites

- Bun installed
- Alchemy CLI installed (`bun add -g alchemy`)
- GitHub account with repository secrets configured
- Cloudflare account

## Environment Variables

The following environment variables are required for production:

### GitHub API (for GitHubActivity component)
- `PUBLIC_GITHUB_TOKEN` - GitHub personal access token with `public_repo` or `read:user` permissions
- `PUBLIC_GITHUB_USERNAME` - Your GitHub username

### Sanity CMS (for FeatureWritingWidget component)
- `PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `PUBLIC_SANITY_DATASET` - Sanity dataset (usually `production`)
- `PUBLIC_SANITY_API_VERSION` - Sanity API version (e.g., `2023-05-03`)
- `SANITY_TOKEN` - Sanity API token with read permissions

### Alchemy
- `ALCHEMY_STATE_TOKEN` - Token for Alchemy state management

## Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables in `.env`

3. Install dependencies:
   ```bash
   bun install
   ```

4. Run development server:
   ```bash
   bun dev
   ```

## Manual Deployment

To deploy manually from your local machine:

```bash
bun run deploy
```

This will:
1. Build the Astro project
2. Deploy to Cloudflare using Alchemy
3. Use environment variables from your `.env` file

## Automated Deployment (GitHub Actions)

The project includes a GitHub Actions workflow that automatically deploys on push to `main`.

### Setup GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `PUBLIC_GITHUB_TOKEN`
- `PUBLIC_GITHUB_USERNAME`
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `SANITY_TOKEN`
- `ALCHEMY_STATE_TOKEN`

### Workflow Trigger

The deployment workflow runs:
- Automatically on push to `main` branch
- Manually via GitHub Actions UI (workflow_dispatch)

## Build Output

The build process creates a `dist/` folder with:
- `_worker.js/` - Cloudflare Worker entry point
- `_astro/` - Compiled JavaScript and CSS assets
- Static assets (images, fonts, icons)
- `_routes.json` - Cloudflare routing configuration

## Verifying Deployment

After deployment, Alchemy will output the URL where your site is deployed. The URL will be in the format:
```
https://bentolink-bio-website-[username].alchemy.run
```

## Troubleshooting

### Environment Variables Not Working
- Ensure all secrets are set in GitHub repository settings
- Verify `.env` file exists locally and contains all required variables
- Check that `alchemy.run.ts` properly passes environment variables

### Build Failures
- Run `bun run build` locally to test
- Check for TypeScript errors
- Verify all dependencies are installed

### API Rate Limits
- GitHub API: Authenticated requests have higher rate limits
- Sanity: Check your plan's API limits
- Both components implement caching to reduce API calls

## Additional Commands

- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run destroy` - Destroy Alchemy deployment
- `bun run alchemy:dev` - Run Alchemy in development mode
