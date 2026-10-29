const configuredApiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";
const apiBase = configuredApiBase.replace(/\/+$/, "").replace(/\/api$/, "");

export async function postPublicApi<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${apiBase}/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    let message = `Request failed (${response.status}). Please try again.`;
    try {
      const result = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(result.message)) {
        message = result.message.join(" ");
      } else if (result.message) {
        message = result.message;
      }
    } catch {
      // Keep the HTTP status message when the API doesn't return JSON.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
