import { ApiError, ApiRequestOptions, ApiResponse } from "./types";

// const API_BASE_URL = "https://app-260118003111.azurewebsites.net";
const API_BASE_URL = "http://localhost:8080";

export async function apiRequest<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<ApiResponse<TResponse>> {
  const { method = "GET", body, headers = {}, timeoutMs } = options;

  const controller = new AbortController();
  const id = timeoutMs
    ? setTimeout(() => controller.abort(), timeoutMs)
    : undefined;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (response.status === 204) {
      return {
        success: true,
        status: 204,
        message: "No content",
        data: null as TResponse,
      };
    }

    const result = (await response.json()) as ApiResponse<TResponse>;

    if (!response.ok || !result.success) {
      const error: ApiError = new Error(result.message || "API request failed");
      error.status = result.status || response.status;
      error.data = result;
      throw error;
    }

    return result;
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    if (id) clearTimeout(id);
  }
}
