import { ApiError, ApiRequestOptions } from "./types";

const API_BASE_URL = "https://app-260118003111.azurewebsites.net";
// const API_BASE_URL = "http://localhost:8080";

export async function apiRequest<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
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

    if (!response.ok) {
      const error: ApiError = new Error("API request failed");
      error.status = response.status;

      try {
        error.data = await response.json();
      } catch {
        error.data = await response.text();
      }

      throw error;
    }

    // Handle empty responses (e.g. DELETE 204)
    if (response.status === 204) {
      return null as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    if (id) clearTimeout(id);
  }
}
