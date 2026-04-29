# CI/CD Pipeline Setup Guide

## Overview

This guide sets up **automatic continuous deployment** where:
- Every push to `main` → auto deploys to production
- Every pull request → creates preview deployment
- Every push to other branches → preview deployment
- No manual deployment steps required

## Architecture

```
GitHub (Your Code) → Vercel (CI/CD + Hosting) → Production
       ↓
    PR Preview
```

## Prerequisites

- GitHub repository with code pushed
- Vercel account (free tier sufficient)
- GitHub account with repository access
- Project admin access to both GitHub and Vercel

## Step 1: Connect GitHub to Vercel

### One-time Setup

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub repositories
4. Find your nexus-portal repository in the list
5. Click "Import"

### Configuration

1. **Project Name**: `nexus-portal` (auto-filled)
2. **Root Directory**: `.` (current)
3. **Framework Preset**: `Expo` (or None if not auto-detected)
4. **Build Command**: `npm run build` (from package.json)
5. **Output Directory**: `dist`
6. Click **Deploy**

Vercel will:
- Clone your repository
- Build the project
- Deploy to production
- Show you deployment URL

### What Just Happened

Vercel installed a GitHub app that:
- Listens for push events
- Triggers builds automatically
- Posts deployment status back to GitHub
- Allows preview deployments on PRs

## Step 2: Configure Environment Variables in Vercel

Environment variables must be set in Vercel dashboard (not in git).

### Access Environment Variables

1. Go to Vercel project dashboard
2. Select **Settings** → **Environment Variables**
3. Add each variable for appropriate environments

### Production Environment Variables

Add these for `Production`:

```
EXPO_PUBLIC_API_URL = https://api.nexus-portal.production.com
EXPO_PUBLIC_APP_ENV = production
EXPO_PUBLIC_SENTRY_DSN = https://your-sentry-dsn@sentry.io/project-id
EXPO_PUBLIC_TENANT_MODE = multi
```

### Preview Environment Variables

Add these for `Preview`:

```
EXPO_PUBLIC_API_URL = https://api.nexus-portal.staging.com
EXPO_PUBLIC_APP_ENV = preview
EXPO_PUBLIC_SENTRY_DSN = https://your-sentry-dsn@sentry.io/project-id
EXPO_PUBLIC_TENANT_MODE = multi
```

### Development Environment Variables

These stay in `.env` file (not committed to git):

```
EXPO_PUBLIC_API_URL = http://localhost:8000
EXPO_PUBLIC_APP_ENV = development
EXPO_PUBLIC_SENTRY_DSN = (optional)
EXPO_PUBLIC_TENANT_MODE = multi
```

**Security Note**: Never commit `.env` files with sensitive values to git. Add to `.gitignore`:

```
.env
.env.local
.env.*.local
```

## Step 3: Configure GitHub Branch Protection

Prevent accidental deployments and ensure code quality.

### Main Branch Protection

1. Go to GitHub repository
2. Settings → Branches
3. Under "Branch protection rules" → Add rule
4. Apply to: `main`
5. Check the following:
   - ✅ Require a pull request before merging
   - ✅ Require code reviews (set to 1)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### Deployment Branch Rules

Only merge to main after:
1. PR is reviewed
2. All status checks pass (tests, build, etc.)
3. Merge is done by authorized team member

This ensures:
- Code review before production
- Failed builds don't deploy
- Clear audit trail

## Step 4: Deployment Flow

### For Feature Development

```
1. Create branch from main
   git checkout -b feature/my-feature

2. Push changes
   git push origin feature/my-feature

3. Vercel auto-creates PREVIEW deployment
   → See live at: https://nexus-portal-abc123.vercel.app

4. Create Pull Request on GitHub
   → PR shows preview link
   → Team reviews code

5. Merge PR to main (after approval)
   → GitHub triggers Vercel build
   → Vercel deploys to PRODUCTION
   → Production goes live immediately
```

### Manual Override (Emergency Only)

If you need to trigger a deployment manually:

1. Go to Vercel dashboard
2. Select project
3. Click "Deployments" tab
4. Find desired commit
5. Click "..." → "Redeploy"

Avoid this in normal workflow.

## Step 5: Monitoring Deployments

### Vercel Dashboard

1. Go to project dashboard
2. Deployments tab shows history
3. Click deployment to see:
   - Build logs
   - Environment variables used
   - Performance metrics
   - Build duration

### GitHub Status Checks

In each PR, you'll see:
- ✅ Vercel deployment successful / ❌ failed
- Preview link available when successful
- Comments from Vercel with details

### Logs

**Build failed?** Check Vercel build logs:
1. Click failed deployment
2. "Build Logs" tab
3. Look for error message (usually near end)
4. Common issues:
   - Missing env var
   - Incorrect build command
   - Type errors
   - Missing dependency

## Step 6: Rollback Procedure

If production deployment fails or needs rollback:

### Quick Rollback (within 24 hours)

1. Go to Vercel Deployments
2. Find previous good deployment
3. Click "..." → "Promote to Production"

### Full Rollback (revert code)

```bash
# Revert last commit
git revert HEAD

# Or reset to specific commit
git reset --hard COMMIT_HASH

# Push to main
git push origin main

# Vercel auto-deploys new build
```

**Best Practice**: Use git revert instead of reset for deployed code.

## Step 7: Troubleshooting

### Build Fails on Vercel but Works Locally

Common causes:
- Environment variables missing in Vercel
- Different Node version (check in Vercel → Settings → Node.js Version)
- Missing environment-specific configuration
- Path separator issues (use `/` not `\`)

**Debug**: View full Vercel build logs in Deployments tab

### Preview Deployment Not Working

1. Check PR has status check from Vercel
2. If missing, verify Vercel GitHub app is installed
3. Re-trigger by pushing new commit
4. Check Vercel project settings have correct repo linked

### Production Deployment Stuck

1. Check Vercel Deployments - see if building
2. If stuck, click deployment and check build logs
3. Can manually cancel and restart

### Environment Variables Not Applied

1. Verify added to correct environment (Production/Preview)
2. Revert to previous deployment (vars may be out of sync)
3. Re-deploy: Deployments → find good deployment → Promote

## Step 8: Local Development vs. Deployed

### Local Development

```bash
npm install
npm run web  # or other platform
```

Uses `.env` file for config.

### Vercel Preview/Production

Uses environment variables from Vercel dashboard (deployed from git).

**Never commit `.env`** - Vercel loads from dashboard instead.

## Workflow Summary

```
┌─ Main Branch Protection Rules ─┐
│ ✓ PR required                  │
│ ✓ Code review required         │
│ ✓ Status checks pass           │
└────────────────────────────────┘
           ↓
┌─ Create PR ─────────────────────────┐
│ • Push feature branch               │
│ • Create PR                         │
│ • Vercel creates preview            │
│ • Team reviews preview & code       │
└─────────────────────────────────────┘
           ↓
┌─ Merge to Main ─────────────────────┐
│ • All checks pass                   │
│ • Approved by reviewer              │
│ • Merge PR                          │
│ • GitHub triggers Vercel            │
└─────────────────────────────────────┘
           ↓
┌─ Vercel Production Deploy ──────────┐
│ • Build app (npm run build)         │
│ • Load environment variables        │
│ • Deploy to edge network            │
│ • 2-3 minute deployment time        │
└─────────────────────────────────────┘
           ↓
      ✓ LIVE PRODUCTION
```

## Advanced Configuration

### Custom Domain

1. Vercel dashboard → Settings → Domains
2. Add custom domain
3. Follow DNS setup instructions
4. SSL certificate auto-provisioned

### Analytics

Enable in Vercel to track:
- Page views
- Core Web Vitals
- Performance metrics
- Errors

### Scheduled Deployments

Vercel allows scheduling:
1. Build at off-peak hours
2. Deploy during maintenance window
3. Useful for major updates

## Best Practices

1. **Always use PR workflow** - Never push directly to main
2. **Require reviews** - Catch issues before production
3. **Test locally first** - Verify build with `npm run build`
4. **Keep deployments small** - Easier to debug and rollback
5. **Monitor production** - Check Sentry for errors after deploy
6. **Document changes** - Use PR descriptions for tracking
7. **Tag releases** - Create GitHub release for major versions

```bash
# Tag a release
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

## Accessing Deployments

**Preview**: Each PR shows preview link
- Example: `https://nexus-portal-pr-123.vercel.app`
- Available until PR is closed

**Production**: Custom domain
- Example: `https://nexus-portal.yourdomain.com`
- Always latest main branch

## Integration with External Services

### Sentry

Automatically linked with Vercel - errors are tagged with:
- Commit SHA
- Environment (production/preview)
- Deployment ID

### GitHub

PR status shows:
- Vercel build status
- Preview link
- Performance metrics

### Slack Notifications (Optional)

Setup in Vercel:
1. Settings → Integrations
2. Connect Slack
3. Choose channels for notifications
4. Get alerts on deploy success/failure

## Documentation Links

- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
