/**
 * Deprecated: Use lib/api-client.ts directly instead
 * This file is kept for backward compatibility only
 * 
 * @deprecated Use apiClient from lib/api-client.ts
 */

import { apiClient } from "@/lib/api-client";

export type ApiResult<T> = Promise<{ data: T; requestId: string }>;

/**
 * @deprecated Use apiClient.get from lib/api-client.ts
 */
export async function apiGet<T>(data: T): ApiResult<T> {
  return {
    data,
    requestId: `api-${Date.now()}`,
  };
}

// Re-export the new API client for convenience
export { apiClient } from "@/lib/api-client";
export type { RequestOptions } from "@/lib/api-client";
export {
  setAuthToken,
  clearAuthToken,
  ApiError,
  NetworkError,
  TimeoutError,
  API_CONFIG,
} from "@/lib/api-client";
