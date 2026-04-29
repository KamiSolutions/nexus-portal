import { env, getApiUrl } from "@/lib/env";
import { captureException } from "@/lib/error-tracking";

/**
 * Configuration for API client behavior
 */
export const API_CONFIG = {
  /** Request timeout in milliseconds */
  TIMEOUT_MS: 30000,
  /** Max number of retry attempts for failed requests */
  MAX_RETRIES: 3,
  /** Initial delay for exponential backoff in milliseconds */
  RETRY_DELAY_MS: 1000,
  /** Backoff multiplier for each retry */
  RETRY_BACKOFF: 2,
};

/**
 * API Error types for different failure scenarios
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

/**
 * HTTP request options
 */
export interface RequestOptions extends Omit<RequestInit, "signal"> {
  skipAuth?: boolean;
  timeout?: number;
  maxRetries?: number;
}

/**
 * Internal retry metadata
 */
interface RetryMetadata {
  attempt: number;
  delayMs: number;
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay
 */
function calculateBackoffDelay(attempt: number, initialDelay: number): number {
  return initialDelay * Math.pow(API_CONFIG.RETRY_BACKOFF, attempt - 1);
}

/**
 * Check if error is retryable
 */
function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

/**
 * Check if error is a network error (not a response error)
 */
function isNetworkError(error: unknown): boolean {
  return (
    error instanceof TypeError &&
    (error.message.includes("fetch") ||
      error.message.includes("network") ||
      error.message.includes("Failed to fetch"))
  );
}

/**
 * Get stored JWT token
 */
async function getAuthToken(): Promise<string | null> {
  try {
    // Using localStorage for web, AsyncStorage would be needed for native
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("auth_token");
    }
  } catch (error) {
    console.error("[API] Failed to retrieve auth token:", error);
  }
  return null;
}

/**
 * Store JWT token
 */
export async function setAuthToken(token: string): Promise<void> {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("auth_token", token);
    }
  } catch (error) {
    console.error("[API] Failed to store auth token:", error);
  }
}

/**
 * Clear stored JWT token
 */
export async function clearAuthToken(): Promise<void> {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("auth_token");
    }
  } catch (error) {
    console.error("[API] Failed to clear auth token:", error);
  }
}

/**
 * Main API request function with retry logic, timeout, and error handling
 */
async function makeRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
  retryMetadata?: RetryMetadata
): Promise<T> {
  const apiUrl = getApiUrl();
  const fullUrl = `${apiUrl}${endpoint}`;
  const timeout = options.timeout ?? API_CONFIG.TIMEOUT_MS;
  const maxRetries = options.maxRetries ?? API_CONFIG.MAX_RETRIES;
  const attempt = retryMetadata?.attempt ?? 1;

  try {
    // Build headers with auth token if not skipped
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (!options.skipAuth) {
      const token = await getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeout);

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      // Handle 401 Unauthorized - clear token and potentially redirect to login
      if (response.status === 401) {
        await clearAuthToken();
        console.warn("[API] Unauthorized - Token cleared. User may need to re-authenticate.");
        // Optionally dispatch auth reset event here
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        }
      }

      // Handle HTTP errors
      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        // Track 4xx errors (excluding 401) to error tracking service
        if (response.status >= 400 && response.status < 500 && response.status !== 401) {
          captureException(new ApiError(response.status, errorMessage), {
            tags: { endpoint, statusCode: response.status },
            extra: { errorBody: errorBody.substring(0, 500) },
          });
        }

        // Determine if we should retry
        if (isRetryableStatus(response.status) && attempt < maxRetries) {
          const delayMs = calculateBackoffDelay(attempt, API_CONFIG.RETRY_DELAY_MS);
          console.warn(
            `[API] Retryable error ${response.status}. Retrying in ${delayMs}ms (attempt ${attempt}/${maxRetries})`
          );
          await sleep(delayMs);
          return makeRequest(endpoint, options, { attempt: attempt + 1, delayMs });
        }

        throw new ApiError(response.status, errorMessage);
      }

      // Parse response
      const data = await response.json();
      return data as T;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    // Handle timeout
    if (error instanceof DOMException && error.name === "AbortError") {
      const timeoutError = new TimeoutError(
        `Request to ${endpoint} timed out after ${timeout}ms`
      );
      captureException(timeoutError, {
        tags: { endpoint, type: "timeout" },
      });

      // Retry on timeout
      if (attempt < maxRetries) {
        const delayMs = calculateBackoffDelay(attempt, API_CONFIG.RETRY_DELAY_MS);
        console.warn(
          `[API] Timeout. Retrying in ${delayMs}ms (attempt ${attempt}/${maxRetries})`
        );
        await sleep(delayMs);
        return makeRequest(endpoint, options, { attempt: attempt + 1, delayMs });
      }

      throw timeoutError;
    }

    // Handle network errors
    if (isNetworkError(error)) {
      const networkError = new NetworkError(
        `Network error requesting ${endpoint}`,
        error as Error
      );
      captureException(networkError, {
        tags: { endpoint, type: "network" },
      });

      // Retry on network error
      if (attempt < maxRetries) {
        const delayMs = calculateBackoffDelay(attempt, API_CONFIG.RETRY_DELAY_MS);
        console.warn(
          `[API] Network error. Retrying in ${delayMs}ms (attempt ${attempt}/${maxRetries})`
        );
        await sleep(delayMs);
        return makeRequest(endpoint, options, { attempt: attempt + 1, delayMs });
      }

      throw networkError;
    }

    // Unknown error
    captureException(error instanceof Error ? error : new Error(String(error)), {
      tags: { endpoint, type: "unknown" },
    });
    throw error;
  }
}

/**
 * Convenience methods for common HTTP operations
 */
export const apiClient = {
  /**
   * GET request
   */
  get: async <T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> => {
    return makeRequest<T>(endpoint, { ...options, method: "GET" });
  },

  /**
   * POST request
   */
  post: async <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    return makeRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * PUT request
   */
  put: async <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    return makeRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * PATCH request
   */
  patch: async <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> => {
    return makeRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete: async <T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> => {
    return makeRequest<T>(endpoint, { ...options, method: "DELETE" });
  },
};

export default apiClient;
