/**
 * Centralized, validated access to server-side environment variables.
 *
 * Where secrets actually live:
 *   - Locally: the gitignored `.env` file (never committed).
 *   - In production: the host's encrypted env store (e.g. Vercel → Project
 *     Settings → Environment Variables).
 *
 * Why this module exists:
 *   Reading `process.env` directly is fine and expected — but doing it inline,
 *   scattered across route handlers, means no single source of truth, no typing,
 *   and no validation. This module is the ONE place the app reads these values,
 *   so every consumer gets a typed, already-checked config object.
 *
 * Server-only: none of these are prefixed with NEXT_PUBLIC_, so they are never
 * bundled into client-side JavaScript.
 */

export interface AzureOpenAIConfig {
  endpoint: string;
  apiKey: string;
  apiVersion: string;
  deployment: string;
}

/**
 * Returns the Azure OpenAI config only when every required variable is present;
 * otherwise returns null so callers can degrade gracefully (the chat route
 * shows a friendly fallback instead of crashing) rather than throwing.
 */
export function getAzureOpenAIConfig(): AzureOpenAIConfig | null {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
  const deployment = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;

  if (!endpoint || !apiKey || !apiVersion || !deployment) {
    return null;
  }

  return { endpoint, apiKey, apiVersion, deployment };
}
