import { getApiUrl } from "@/lib/env";

export type ApiResult<T> = Promise<{ data: T; requestId: string }>;

export async function apiGet<T>(data: T): ApiResult<T> {
  const apiUrl = getApiUrl();

  return {
    data,
    requestId: `${apiUrl ? "api" : "demo"}-${Date.now()}`,
  };
}
