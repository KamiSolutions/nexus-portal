export type ApiResult<T> = Promise<{ data: T; requestId: string }>;

export async function apiGet<T>(data: T): ApiResult<T> {
  return {
    data,
    requestId: `demo-${Date.now()}`,
  };
}

