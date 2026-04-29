import { env, getSentryDsn } from "@/lib/env";

let sentryInitialized = false;

/**
 * Error context for enhanced reporting
 */
export interface ErrorContext {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  userId?: string;
  requestId?: string;
}

/**
 * Initialize Sentry error tracking
 * Only runs once and silently if DSN is not configured
 */
export async function initializeSentry(): Promise<void> {
  if (sentryInitialized) return;

  const dsn = getSentryDsn();
  if (!dsn) {
    console.log("[Sentry] Not initialized - EXPO_PUBLIC_SENTRY_DSN not configured");
    sentryInitialized = true;
    return;
  }

  try {
    // Dynamically import Sentry to avoid bundle size impact
    const Sentry = await import("@sentry/react");

    Sentry.init({
      dsn,
      environment: env.appEnv,
      // Only sample 10% of transactions in production to control costs
      tracesSampleRate: env.isProduction ? 0.1 : 1.0,
      // Ignore known non-critical errors
      ignoreErrors: [
        // Network errors are often from user's connectivity
        /network/i,
        // React warnings during development
        /Warning: /i,
        // Browser extensions and scripts
        /top\.GLOBALS/i,
        // Known issues from third-party code
        /crappyJsLib/i,
      ],
      // Filter sensitive data from URLs
      beforeSend(event, hint) {
        // Don't send events in development unless explicitly enabled
        if (env.isDevelopment && !process.env.EXPO_PUBLIC_SENTRY_DEBUG) {
          return null;
        }

        // Sanitize URLs to remove sensitive query params
        if (event.request?.url) {
          const url = new URL(event.request.url);
          // Remove auth tokens from URL if present
          url.searchParams.delete("token");
          url.searchParams.delete("auth");
          url.searchParams.delete("key");
          event.request.url = url.toString();
        }

        return event;
      },
      // Custom integrations
      integrations: [
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Replay configuration
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });

    sentryInitialized = true;
    console.log("[Sentry] Initialized successfully for environment:", env.appEnv);
  } catch (error) {
    console.error("[Sentry] Failed to initialize:", error);
    sentryInitialized = true; // Don't retry
  }
}

/**
 * Capture an exception in error tracking service
 * Silently fails if Sentry is not configured
 */
export async function captureException(
  error: Error | unknown,
  context?: ErrorContext
): Promise<void> {
  if (!sentryInitialized) {
    await initializeSentry();
  }

  const dsn = getSentryDsn();
  if (!dsn) {
    // Still log to console in development
    if (env.isDevelopment) {
      console.error("[Error]", error, context);
    }
    return;
  }

  try {
    const Sentry = await import("@sentry/react");

    Sentry.captureException(error, {
      tags: {
        environment: env.appEnv,
        ...context?.tags,
      },
      extra: {
        tenantMode: env.tenantMode,
        ...context?.extra,
      },
      ...(context?.userId && { user: { id: context.userId } }),
      ...(context?.requestId && { request: { id: context.requestId } }),
    });
  } catch (error) {
    // Fail silently to not break the app
    console.error("[Error Tracking] Failed to capture exception:", error);
  }
}

/**
 * Capture a message in error tracking service
 * Useful for tracking significant non-error events
 */
export async function captureMessage(
  message: string,
  level: "fatal" | "error" | "warning" | "info" | "debug" = "info",
  context?: ErrorContext
): Promise<void> {
  if (!sentryInitialized) {
    await initializeSentry();
  }

  const dsn = getSentryDsn();
  if (!dsn) {
    console.log(`[${level.toUpperCase()}]`, message, context);
    return;
  }

  try {
    const Sentry = await import("@sentry/react");
    Sentry.captureMessage(message, level);
  } catch (error) {
    console.error("[Error Tracking] Failed to capture message:", error);
  }
}

/**
 * Set user context for error tracking
 * Call this after user logs in
 */
export async function setErrorTrackingUser(userId: string, userEmail?: string): Promise<void> {
  try {
    const Sentry = await import("@sentry/react");
    Sentry.setUser({
      id: userId,
      email: userEmail,
    });
  } catch (error) {
    console.error("[Error Tracking] Failed to set user:", error);
  }
}

/**
 * Clear user context for error tracking
 * Call this after user logs out
 */
export async function clearErrorTrackingUser(): Promise<void> {
  try {
    const Sentry = await import("@sentry/react");
    Sentry.setUser(null);
  } catch (error) {
    console.error("[Error Tracking] Failed to clear user:", error);
  }
}

/**
 * Global error handler for unhandled promise rejections
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window !== "undefined") {
    window.addEventListener("error", (event) => {
      console.error("[Global Error]", event.error);
      captureException(event.error, {
        tags: { type: "uncaught_error" },
        extra: { message: event.message },
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      console.error("[Unhandled Rejection]", event.reason);
      captureException(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        {
          tags: { type: "unhandled_rejection" },
        }
      );
    });
  }
}

// Initialize error tracking on module load
initializeSentry().catch((error) => {
  console.error("[Error Tracking Init] Failed:", error);
});
