# Production Deployment Verification Checklist

Use this checklist **after every production deployment** to ensure stability and correctness.

**Deployment Date**: ____________________  
**Deployed By**: ____________________  
**Commit SHA**: ____________________  
**Vercel Deployment URL**: ____________________

---

## Pre-Deployment (Before Merging to Main)

- [ ] **Code Review**: PR approved by at least 1 reviewer
- [ ] **Tests Pass**: All status checks pass on GitHub
- [ ] **Local Build Works**: `npm run build` succeeds without errors
- [ ] **No Console Errors**: Local `npm run web` has no TypeScript/linting errors
- [ ] **Environment Variables**: All required vars are in Vercel dashboard
- [ ] **Commits are Clean**: No hardcoded URLs, keys, or credentials in code
- [ ] **CHANGELOG Updated**: If applicable, update CHANGELOG.md
- [ ] **Version Bumped**: Update package.json version if needed

---

## Immediate Post-Deployment (0-5 minutes)

### Vercel Deployment Status

- [ ] **Build Completed**: Check Vercel Deployments tab shows green checkmark
- [ ] **Deployment Successful**: No errors in build logs
- [ ] **Build Time Reasonable**: Under 5 minutes (benchmark)
- [ ] **Deployment URL**: Preview link shows correct domain

### GitHub Integration

- [ ] **GitHub Status Check**: Green checkmark on deployment
- [ ] **PR Closed Successfully**: PR automatically closed after merge

### Browser Access

- [ ] **Website Loads**: https://nexus-portal.yourdomain.com loads in browser
- [ ] **No 404 Errors**: Page loads completely (check dev tools)
- [ ] **No Console Errors**: Browser DevTools console is clean
- [ ] **Page Responsive**: Works on desktop, tablet, mobile (check with DevTools)

---

## Functional Verification (5-15 minutes)

### SPA Routing & Navigation

- [ ] **Home Page Loads**: Dashboard or main page displays correctly
- [ ] **Navigation Works**: Can click through main navigation menu
- [ ] **Page Refresh Works**: F5 refresh doesn't break routes
- [ ] **Deep Linking Works**: Can access `/dashboard` directly in URL
- [ ] **Back Button Works**: Browser back button navigates correctly
- [ ] **Deep Link Refresh**: Refresh page from deep URL (e.g., `/dashboard`) works
- [ ] **404 Handling**: Invalid route `/invalid-route` shows proper error/fallback

### API Integration

- [ ] **API Connection**: App can reach backend API
- [ ] **Auth Token Loaded**: User session loads (check Network tab)
- [ ] **API Requests**: Network tab shows successful API calls (200s)
- [ ] **No Hardcoded URLs**: Network tab shows correct API domain from env vars
- [ ] **CORS Headers**: No CORS errors in console
- [ ] **API Errors Handled**: If API is down, app shows graceful error

### Authentication Flow

- [ ] **Login Works** (if applicable): Can login with valid credentials
- [ ] **Session Persists**: Reload page - user still logged in
- [ ] **Logout Works**: After logout, redirects to login page
- [ ] **Invalid Token Handling**: Revoke token in backend - app detects it
- [ ] **Token Refresh**: Session remains valid after token refresh
- [ ] **Auth Headers**: Network tab shows `Authorization: Bearer ...` headers

### Critical User Flows

- [ ] **Primary Action Works**: Main CTA functions (e.g., submit form)
- [ ] **Form Submission**: Can submit a form and see success/error
- [ ] **Data Display**: Tables/lists load and display data correctly
- [ ] **Search/Filter**: Search functionality works if applicable
- [ ] **File Upload**: File upload works if applicable
- [ ] **Permissions**: User sees correct features based on role

---

## Error Tracking Verification (15-30 minutes)

### Sentry Configuration

- [ ] **Sentry DSN Set**: Check Network tab for sentry.io requests
- [ ] **Environment Tag**: Sentry shows environment=production
- [ ] **Deployment Linked**: Sentry shows linked commit SHA

### Error Capture Testing

**Trigger a test error** (only for validation, revert after):

```javascript
// In browser console (temporary for testing):
await import('@/lib/error-tracking').then(m => m.captureException(new Error('Test error')))
```

- [ ] **Test Error Appears**: Check Sentry dashboard after 1-2 minutes
- [ ] **Error Details Complete**: Error includes stack trace, request URL
- [ ] **Environment Correct**: Error tagged with production environment
- [ ] **User Context**: If logged in, error shows user ID

**Remove test error from browser console after verification.**

### API Error Handling

- [ ] **API Timeout Handled**: If API is slow, app doesn't crash
- [ ] **Network Error Handled**: If backend is unreachable, app shows error
- [ ] **Retry Logic**: Check console for retry messages on failed requests
- [ ] **401 Handling**: Invalid token triggers re-authentication or error

---

## Performance Verification (5-10 minutes)

### Metrics Check

- [ ] **Page Load Time**: Check Vercel Analytics - should be < 3 seconds
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Bundle Size**: Check Network tab - total <500KB for initial load
- [ ] **Asset Caching**: Static assets return 304 (cached) on reload

### Load Testing

- [ ] **Rapid Clicks**: Clicking buttons multiple times doesn't break UI
- [ ] **Network Throttling**: With slow 3G in DevTools, app still functional
- [ ] **Memory Leaks**: Keep app open for 5 minutes, memory stable (DevTools Memory tab)

---

## Security Verification (5-10 minutes)

### Headers & Configuration

- [ ] **HTTPS Only**: All requests use HTTPS, no HTTP warnings
- [ ] **Security Headers**: Check Network Response headers:
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-XSS-Protection: 1; mode=block`
- [ ] **No Credentials Exposed**: Network tab shows no API keys in URLs
- [ ] **No Hardcoded URLs**: All API URLs from environment variables
- [ ] **localStorage Clean**: No sensitive data in localStorage (DevTools Application tab)

### Environment Variable Security

- [ ] **No Dev URLs**: API URL is production domain, not localhost
- [ ] **No Test Keys**: Sentry/Analytics keys are production, not test
- [ ] **No Credentials in Code**: Search codebase for any exposed secrets

---

## Content & Configuration Verification (5-10 minutes)

### Content & Branding

- [ ] **Correct Tenant/Brand**: Company logo and name correct for production
- [ ] **Correct Environment**: App shows "Production" or appropriate environment indicator
- [ ] **Correct API**: API calls go to production backend (check Network tab)

### Feature Flags

If using feature flags:
- [ ] **Flags Correct**: Expected features enabled/disabled for production
- [ ] **No Test Features**: Beta/test features not visible to users

### Theme & Styling

- [ ] **Correct Theme**: Production theme/colors applied
- [ ] **No Dev Styles**: No debug borders or test styling visible
- [ ] **All Images Load**: Icons, logos, images display correctly

---

## Monitoring & Alerts (Ongoing, First 24 Hours)

### Sentry Monitoring

- [ ] **Error Rate Normal**: No spike in errors vs. baseline
- [ ] **No New Error Patterns**: No unexpected issue categories
- [ ] **User Session Captured**: Sentry shows actual user sessions

### Vercel Analytics

- [ ] **Traffic Normal**: Analytics show expected user volume
- [ ] **Performance Stable**: Response times consistent
- [ ] **Deployment Stable**: No frequent redeployments needed

### Manual Checks (1 hour after deploy)

- [ ] **Refresh Site**: Browser refresh still shows production version
- [ ] **Check Again**: Run through "Functional Verification" section again
- [ ] **User Feedback**: Check Slack/email for user reports

---

## Post-Verification Sign-Off

All checks passed? **Get approval from:**

- [ ] **Team Lead**: __________________ (signature/approval)
- [ ] **DevOps/Infrastructure**: __________________ (if applicable)

**Any failures?** 
1. Document the failure
2. Create GitHub issue
3. Determine if rollback needed
4. Follow [Rollback Procedure](CI_CD_SETUP.md#rollback-procedure)

---

## 24-Hour Stability Check

Come back 24 hours after deployment and verify:

- [ ] **Sentry Clean**: No error spikes or new patterns
- [ ] **Users Happy**: No complaints on Slack/support
- [ ] **Performance Stable**: Analytics show consistent performance
- [ ] **No Escalations**: No urgent issues requiring rollback

---

## Checklist History

| Date | Deployed By | Commit | Status | Notes |
|------|-------------|--------|--------|-------|
| | | | ✅ Pass / ❌ Rollback | |
| | | | ✅ Pass / ❌ Rollback | |
| | | | ✅ Pass / ❌ Rollback | |

---

## Quick Reference

### Useful URLs

- **Production**: https://nexus-portal.yourdomain.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Sentry**: https://sentry.io/organizations/your-org/issues/
- **GitHub Repo**: https://github.com/your-org/nexus-portal
- **Backend API** (prod): https://api.nexus-portal.production.com

### Browser DevTools for Verification

1. **Network Tab**: See API calls and their status
2. **Console Tab**: Look for errors (red X icons)
3. **Application Tab**: Check localStorage and environment
4. **Performance Tab**: Measure load times
5. **Security Tab**: Verify HTTPS and headers

### Common Issues & Fixes

| Issue | Quick Fix |
|-------|-----------|
| "API not found" errors | Check EXPO_PUBLIC_API_URL in Vercel env vars |
| Page refreshes go to 404 | Check SPA rewrite in vercel.json |
| Login doesn't work | Check backend API is running and accessible |
| Sentry not capturing errors | Check EXPO_PUBLIC_SENTRY_DSN is set in Vercel |
| Styles broken | Check asset caching headers in vercel.json |
| Routing broken | Verify vercel.json rewrites to /index.html |

---

## Rollback Decision Tree

```
Is production broken?
├─ YES, completely inaccessible → ROLLBACK immediately
├─ YES, but partially working → Assess scope, decide based on severity
└─ NO → Monitor and proceed with next deployment

Is there active user impact?
├─ YES, many users affected → ROLLBACK
├─ YES, one feature broken → Monitor, fix, redeploy
└─ NO, only backend involved → Monitor and proceed
```

**See [Rollback Procedure](CI_CD_SETUP.md#rollback-procedure) for steps.**

---

## Document Control

- **Version**: 1.0
- **Last Updated**: 2026-04-29
- **Owner**: DevOps Team
- **Review Frequency**: After each major release or quarterly

