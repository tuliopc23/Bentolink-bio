# GitHub Token Setup for Production

## Quick Fix - Set the Secret in Cloudflare Workers

Your GitHub token is: `<your-github-token>`

### Method 1: Using Cloudflare Dashboard (RECOMMENDED)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Find and click on your worker: `bentolink-bio-website-tuliopinheirocunha`
4. Go to **Settings** > **Variables and Secrets**
5. Under **Environment Variables**, click **Add variable**
6. Set the following:
   - **Variable name**: `PUBLIC_GITHUB_TOKEN`
   - **Value**: `<your-github-token>`
   - **Type**: ✅ Check "Encrypt" (makes it a secret)
   - **Environment**: Production (default)
7. Click **Save and deploy**

**That's it!** Your GitHub activity widget will start fetching commits immediately.

### Method 2: Using Wrangler CLI

If you prefer the command line:

```bash
# 1. Login to Cloudflare (if not already)
npx wrangler login

# 2. Set the secret
echo "<your-github-token>" | npx wrangler secret put PUBLIC_GITHUB_TOKEN

# 3. Deploy
npx wrangler deploy
```

### Verify It's Working

After setting the secret, visit your site:
- Production: https://biolinks.tuliocunha.dev
- The GitHub widget should show your latest commits

If you see errors, check the browser console (F12) for API errors.

## Local Development

For local development, create a `.env` file (not committed to git):

```env
PUBLIC_GITHUB_TOKEN=<your-github-token>
PUBLIC_GITHUB_USERNAME=tuliopc23
```

## Token Permissions

Your GitHub token needs these scopes:
- `public_repo` or `repo` (read access to repositories)
- `read:user` (read user profile data)

## Security Notes

- **Never commit tokens to Git**
- Use Cloudflare Workers secrets for production
- Rotate tokens periodically
- This token has read-only access to public repositories
