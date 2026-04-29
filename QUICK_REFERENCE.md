# Quick Reference Guide

## 🚀 For Developers

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run web

# Build for web
npm run build

# Type check
npm run typecheck

# Lint code
npm run lint
```

**Default Environment** (`.env`):
```
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_APP_ENV=development
```

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: description of change"

# 3. Push to GitHub
git push origin feature/my-feature

# 4. Create Pull Request
# Go to GitHub and create PR from feature branch to main

# 5. Vercel creates preview automatically
# Click "Visit Preview" link in PR

# 6. After review, merge PR
# GitHub → Merge Pull Request

# 7. Vercel deploys to production automatically
# Check https://nexus-portal.yourdomain.com
```

### Common Development Issues

| Problem | Solution |
|---------|----------|
| Build fails locally | Run `npm install` and check Node version |
| API not responding | Ensure backend is running at `EXPO_PUBLIC_API_URL` |
| Types/lint errors | Run `npm run typecheck` and `npm run lint` |
| Can't access preview | Wait 2-3 minutes for Vercel to build, or check build logs |

---

## 🔧 For DevOps/Platform

### Vercel Setup (One-time)

```bash
# 1. Import GitHub repo to Vercel
# Go to vercel.com/new → Select nexus-portal repo

# 2. Set environment variables in Vercel dashboard
# Settings → Environment Variables

# Production variables:
EXPO_PUBLIC_API_URL=https://api.nexus-portal.production.com
EXPO_PUBLIC_APP_ENV=production
EXPO_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Preview variables (same or staging):
EXPO_PUBLIC_API_URL=https://api.nexus-portal.staging.com
EXPO_PUBLIC_APP_ENV=preview
```

### Monitoring Deployments

```bash
# Check deployment status
# Dashboard → Deployments → Sort by date

# View build logs
# Deployments → [Select deployment] → Build Logs

# Rollback to previous deployment
# Deployments → [Select previous] → "Promote to Production"
```

### Managing Secrets

⚠️ **Never commit `.env` files or secrets to git**

Safe way to manage secrets:
1. Store in Vercel dashboard (not git)
2. Use GitHub Secrets for CI (if needed)
3. Use environment-specific configuration
4. Rotate secrets quarterly

### Monitoring Production

**Daily Checks**:
1. Sentry dashboard - check for new errors
2. Vercel Analytics - check performance metrics
3. GitHub deployments - verify latest main is deployed

**Weekly Checks**:
1. Error trends in Sentry
2. Performance trends in Vercel
3. User session analysis

---

## 📊 Vercel Dashboard Locations

| Task | Path |
|------|------|
| View deployments | Project → Deployments |
| Set environment vars | Project → Settings → Environment Variables |
| View analytics | Project → Analytics |
| Check build logs | Deployments → [Select] → Build Logs |
| Configure domain | Project → Settings → Domains |
| Update Git settings | Project → Settings → Git |
| Team management | Team → Members |

---

## 🔐 Environment Variables Cheat Sheet

### All Available Variables

```bash
# Required for API
EXPO_PUBLIC_API_URL=https://api.example.com

# Environment identifier
EXPO_PUBLIC_APP_ENV=production|preview|development

# Error tracking (optional but recommended)
EXPO_PUBLIC_SENTRY_DSN=https://key@sentry.io/id

# Tenant mode
EXPO_PUBLIC_TENANT_MODE=multi|single

# Debug mode (development only)
EXPO_PUBLIC_SENTRY_DEBUG=true
```

### Where to Set Each

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `EXPO_PUBLIC_API_URL` | `.env` | Vercel UI | Vercel UI |
| `EXPO_PUBLIC_APP_ENV` | `.env` | Vercel UI | Vercel UI |
| `EXPO_PUBLIC_SENTRY_DSN` | `.env` (optional) | Vercel UI | Vercel UI |

---

## 🧪 Testing & Verification

### Pre-Merge Checks

```bash
# Run locally before pushing
npm run typecheck
npm run lint
npm run build  # Verify builds
```

### Post-Deployment Checks

Use [DEPLOYMENT_VERIFICATION.md](DEPLOYMENT_VERIFICATION.md) checklist:
1. Page loads
2. API works
3. Auth works
4. No console errors
5. Check Sentry for errors

---

## 🚨 Emergency Procedures

### Site Down - Immediate Action

```bash
# 1. Check Vercel status
# Dashboard → Deployments
# Look for red X or error indicator

# 2. View build logs
# Click latest deployment → Build Logs
# Look for error message

# 3. Quick rollback (if needed)
# Deployments → [Previous good deployment] 
# → Click ... menu → Promote to Production

# 4. Notify team
# Post in #incidents channel
```

### API Not Responding

1. Check `EXPO_PUBLIC_API_URL` in Vercel
2. Ping backend at that URL (curl or browser)
3. If backend down, notify backend team
4. Revert deployment if just deployed

### High Error Rate in Sentry

1. Check Sentry dashboard
2. Look for patterns (endpoint, user, browser)
3. Revert if caused by last deployment
4. Otherwise, debug in code

---

## 📝 Common Git Commands

```bash
# Start new feature
git checkout -b feature/my-feature

# Update from main
git pull origin main
git rebase origin/main  # or merge

# Push changes
git push origin feature/my-feature

# Create PR (on GitHub UI)

# After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/my-feature
```

---

## 🔗 Important Links

- **Production**: https://nexus-portal.yourdomain.com
- **Vercel Dashboard**: https://vercel.com/dashboard/nexus-portal
- **GitHub Repo**: https://github.com/your-org/nexus-portal
- **Sentry**: https://sentry.io/organizations/your-org/issues/
- **API (Production)**: https://api.nexus-portal.production.com
- **API (Staging)**: https://api.nexus-portal.staging.com

---

## 📞 Support

**Issues?** See [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md#critical-paths-for-failures)

**Deploy help?** See [CI_CD_SETUP.md](CI_CD_SETUP.md)

**Error tracking?** See [SENTRY_SETUP.md](SENTRY_SETUP.md)

---

## 💡 Pro Tips

1. **Name branches clearly**: `feature/`, `fix/`, `docs/`, `chore/`
2. **Squash commits** before merging to keep history clean
3. **Add PR description** so reviewers understand the change
4. **Test in preview** before merging to main
5. **Wait for deployment** before closing PR (2-3 minutes)
6. **Check Sentry after deploy** to catch new errors early
7. **Use Vercel preview URL** to share with stakeholders

---

Last updated: 2026-04-29
