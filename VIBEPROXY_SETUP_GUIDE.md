# VibeProxy Setup Guide for Codex, Gemini and Qwen

## Overview
VibeProxy allows you to use your existing ChatGPT, Google, and Qwen subscriptions with Factory CLI without needing separate API keys.

## Prerequisites
- macOS with Apple Silicon (M1/M2/M3/M4)
- Active ChatGPT Plus/Pro subscription (for Codex models)
- Google account (for Gemini models)
- Factory CLI installed

## Step 1: Install VibeProxy
1. Download VibeProxy from: https://github.com/automazeio/vibeproxy/releases
2. Extract and drag `VibeProxy.app` to `/Applications`
3. Launch VibeProxy (if blocked, right-click → Open → click "Open")

## Step 2: Connect Your Accounts
1. Click the VibeProxy menu bar icon
2. Select "Open Settings"
3. Click "Connect" next to:
   - **Codex**: Authenticate with your ChatGPT account
   - **Gemini**: Authenticate with your Google account
   - **Qwen**: Authenticate with your Qwen account (if applicable)
4. Wait for all services to show as "Connected"

## Step 3: Start VibeProxy
- The server should start automatically on port 8317
- Green dot in menu bar = running, red dot = stopped
- Click the status to toggle server on/off if needed

## Step 4: Use with Factory CLI
Your Factory CLI configuration has been updated with:
- **Codex models**: GPT-5 Codex variants (low/medium/high reasoning)
- **Gemini models**: Gemini 2.5/3.0 Pro variants
- **Qwen models**: Qwen3 Coder Plus and Flash

### To use:
1. Launch Factory CLI: `droid`
2. Select model: `/model`
3. Choose from available models:
   - GPT-5.1 Codex (recommended for coding)
   - Gemini 3 Pro (for advanced reasoning)
   - Qwen3 Coder Plus (alternative coding model)

## Model Recommendations
- **Best for coding**: GPT-5.1 Codex (Medium) or GPT-5.1 Codex (High)
- **Fast responses**: GPT-5.1 Codex (Low) or Qwen3 Coder Flash
- **Complex reasoning**: Gemini 3 Pro (High)
- **Vision tasks**: Gemini 3 Pro (Image)

## Troubleshooting
- **404 errors**: Ensure VibeProxy is running (green dot)
- **Authentication issues**: Reconnect services in VibeProxy settings
- **Port conflicts**: Quit other VibeProxy instances
- **Model not available**: Check authentication status in VibeProxy

## Security Notes
- All tokens stored locally in `~/.cli-proxy-api/`
- VibeProxy only binds to localhost
- Uses HTTPS for all upstream traffic
- May violate provider ToS - use at your own risk

## Support
- Report issues: https://github.com/automazeio/vibeproxy/issues
- Documentation: https://github.com/automazeio/vibeproxy/blob/main/FACTORY_SETUP.md
