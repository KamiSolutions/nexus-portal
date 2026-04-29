# Sentry Error Tracking Setup Guide

## Overview

Sentry provides real-time error tracking, performance monitoring, and session replay for the Nexus Portal production environment. The integration is already implemented in the codebase but requires configuration.

## Prerequisites

- Active Sentry account (Free tier available at https://sentry.io)
- Access to Vercel project settings
- Project admin or DevOps access

## Setup Steps

### 1. Create a Sentry Project

1. Go to [sentry.io](https://sentry.io)
2. Sign in or create account
3. Click "Create Project"
4. Select "React" as platform
5. Name it "nexus-portal" (or your preference)
6. Select your organization
7. Click "Create Project"

### 2. Get Your DSN

After project creation, you'll see your **Data Source Name (DSN)**. It looks like:
```
https://examplePublicKey@o0.ingest.sentry.io/0
```

Copy this DSN - you'll need it for configuration.

### 3. Configure for Each Environment

#### Development Environment

Create or update `.env`:
```bash
EXPO_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
EXPO_PUBLIC_APP_ENV=development
```

Note: In development, error tracking runs at 100% sample rate to catch all issues during testing.

#### Preview/Staging Environment

In Vercel dashboard for preview deployments:
1. Go to Project Settings → Environment Variables
2. Add `EXPO_PUBLIC_SENTRY_DSN` with your Sentry DSN
3. Set for "Preview" environment only

#### Production Environment

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `EXPO_PUBLIC_SENTRY_DSN` with your Sentry DSN
3. Set for "Production" environment only

**Important**: In production, transaction sample rate is 10% (configurable in [lib/error-tracking.ts](lib/error-tracking.ts)) to control costs while still capturing errors.

### 4. Verify Configuration

After deployment, check:
1. Go to Sentry dashboard
2. Navigate to "Issues"
3. You should see test events or real errors from production

### 5. Configure Alerts (Optional but Recommended)

Set up notifications for production errors:

1. In Sentry project, go to **Alerts** → **New Alert Rule**
2. Select "Issues" rule type
3. Configure:
   - For environments: Select "production"
   - Actions: Email to ops team
   - Sample: Alert on all new issues

## Code Integration Points

### Automatic Error Capture

The API client (`lib/api-client.ts`) automatically captures:
- Network errors with retry attempts
- Timeout errors
- HTTP errors (4xx, 5xx)
- Request metadata (endpoint, status code)

### Global Error Handlers

Unhandled errors and promise rejections are captured automatically via `lib/error-tracking.ts`

### Manual Error Capture

For custom events:
```typescript
import { captureException, captureMessage, setErrorTrackingUser } from "@/lib/error-tracking";

// Capture exception
captureException(error, {
  tags: { feature: "billing" },
  extra: { invoiceId: "123" }
});

// Capture message
captureMessage("User initiated action completed", "info");

// Set user context (call after login)
setErrorTrackingUser(userId, userEmail);
```

## Environment-Specific Behavior

| Environment | Sample Rate | Includes Replays | Debug Mode |
|-------------|------------|------------------|-----------|
| development | 100% | No | Optional |
| preview     | 100% | 10% | No |
| production  | 10%  | 10% | No |

## Sensitive Data Handling

The Sentry integration includes safeguards:
- Query parameters with `token`, `auth`, `key` are removed from URLs
- User PII is not automatically captured
- Request bodies are not captured by default
- Session replays mask all text and media

## Disabling for Development

To completely disable Sentry during development:
1. Don't set `EXPO_PUBLIC_SENTRY_DSN` in `.env`
2. Errors will still log to console but won't send to Sentry

## Testing Sentry Integration

### Test in Development

```typescript
import { captureException } from "@/lib/error-tracking";

// Add this temporarily to test
captureException(new Error("Test Sentry error"));
```

### Verify Production

1. Deploy to production with Sentry DSN configured
2. Trigger an error (e.g., API call to invalid endpoint)
3. Check Sentry dashboard after 1-2 minutes
4. Verify error appears with correct environment tag

## Troubleshooting

### Errors not appearing in Sentry

1. Check `EXPO_PUBLIC_SENTRY_DSN` is set correctly in Vercel
2. Verify DSN is for correct Sentry project
3. Check sample rate (10% in production may mean missing some errors)
4. Look at browser console for any initialization errors

### High costs

- Reduce `tracesSampleRate` in `lib/error-tracking.ts` (lower = fewer transactions)
- Set up event filtering in Sentry to ignore known non-critical errors
- Check "Replays" settings - may need to lower session rate

### Privacy concerns

Review data collection:
1. In Sentry project → Settings → Data Scrubbing
2. Configure what data gets sent
3. Enable "Breadcrumbs" only if needed
4. Disable replay if not needed

## Monitoring Best Practices

### Key Metrics to Track

1. **Error Rate**: Errors per 100 requests
2. **New Issues**: Track when new error patterns emerge
3. **Affected Users**: How many users experience errors
4. **Response Times**: API and page load performance

### Creating Custom Metrics

Use Sentry's integration with:
- Vercel deployments (auto-linked)
- GitHub releases (for tracking errors by version)
- Slack (for real-time alerts)

## Documentation Links

- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [API Reference](https://docs.sentry.io/platforms/javascript/)
- [Best Practices](https://docs.sentry.io/platforms/javascript/best-practices/)
