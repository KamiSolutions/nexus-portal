export type TenantMode = "single" | "multi";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "";

export const env = {
  apiUrl,
  tenantMode: (process.env.EXPO_PUBLIC_TENANT_MODE || "multi") as TenantMode,
};

export function getApiUrl() {
  return env.apiUrl;
}
