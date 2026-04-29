export type AppEnvironment = "development" | "preview" | "production";
export type TenantMode = "single" | "multi";

const appEnv = (process.env.EXPO_PUBLIC_APP_ENV || "development") as AppEnvironment;
const apiUrl = process.env.EXPO_PUBLIC_API_URL || "";
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN || "";

export const env = {
  apiUrl,
  appEnv,
  sentryDsn,
  tenantMode: (process.env.EXPO_PUBLIC_TENANT_MODE || "multi") as TenantMode,
  isProduction: appEnv === "production",
  isPreview: appEnv === "preview",
  isDevelopment: appEnv === "development",
};

/**
 * Get the API URL with strict validation for production environments
 * @throws {Error} If API URL is not configured in production
 */
export function getApiUrl(): string {
  if (!env.apiUrl) {
    if (env.isProduction) {
      throw new Error(
        "EXPO_PUBLIC_API_URL must be configured for production deployments. " +
        "Set this environment variable in Vercel dashboard or .env.production"
      );
    }
    // Log warning in preview/dev but allow fallback to empty string for demo
    if (env.isPreview) {
      console.warn("[WARN] EXPO_PUBLIC_API_URL not configured in preview environment");
    }
  }
  return env.apiUrl;
}

/**
 * Get Sentry DSN with optional warning
 */
export function getSentryDsn(): string | null {
  if (!env.sentryDsn && env.isProduction) {
    console.warn(
      "[WARN] EXPO_PUBLIC_SENTRY_DSN not configured. Error tracking will be disabled."
    );
  }
  return env.sentryDsn || null;
}
