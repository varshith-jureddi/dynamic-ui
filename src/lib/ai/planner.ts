import type { ContentDocument } from "@/lib/content/types";
import { createLayoutPlannerPayload } from "./prompt";
import { getCachedLayoutSpec, setCachedLayoutSpec } from "./cache";
import { validateLayoutSpec } from "./validator";
import type { LayoutSpec } from "./types";
import { createHash } from "node:crypto";
import { createDemoLayoutSpec } from "./mock-response";

export class AIPlannerError extends Error {}

function cacheKey(document: ContentDocument) {
  return createHash("sha256").update(JSON.stringify(document)).digest("hex");
}

function parseJsonResponse(value: unknown): unknown {
  if (typeof value === "string") {
    const cleaned = value.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    return JSON.parse(cleaned);
  }
  return value;
}

export async function planLayout(document: ContentDocument): Promise<LayoutSpec> {
  if (process.env.MOCK_AI?.trim().toLowerCase() === "true") {
    const demoSpec = createDemoLayoutSpec(document);
    return validateLayoutSpec(demoSpec, document);
  }

  if (process.env.AI_ENABLED?.trim().toLowerCase() !== "true") {
    throw new AIPlannerError("AI planning is disabled.");
  }

  const key = cacheKey(document);
  const cached = getCachedLayoutSpec(key);
  if (cached) return cached;

  const url = process.env.AI_API_URL?.trim();
  if (!url) throw new AIPlannerError("AI_API_URL is not configured.");

  const payload = createLayoutPlannerPayload(document);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const headers: Record<string, string> = { "content-type": "application/json" };
    const apiKey = process.env.AI_API_KEY?.trim();
    const authHeader = process.env.AI_API_AUTH_HEADER?.trim() || "Authorization";
    if (apiKey) headers[authHeader] = authHeader.toLowerCase() === "authorization" ? `Bearer ${apiKey}` : apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: process.env.AI_API_MODEL?.trim() || undefined,
        ...payload,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) throw new AIPlannerError(`AI API returned HTTP ${response.status}.`);
    const raw = await response.json();
    const candidate = isPlannerEnvelope(raw) ? raw.layoutSpec : raw;
    const spec = validateLayoutSpec(parseJsonResponse(candidate), document);
    setCachedLayoutSpec(key, spec);
    return spec;
  } catch (error) {
    if (error instanceof AIPlannerError) throw error;
    if (error instanceof Error && error.name === "AbortError") throw new AIPlannerError("AI API request timed out.");
    throw new AIPlannerError(error instanceof Error ? error.message : "AI API request failed.");
  } finally {
    clearTimeout(timeout);
  }
}

function isPlannerEnvelope(value: unknown): value is { layoutSpec: unknown } {
  return typeof value === "object" && value !== null && "layoutSpec" in value;
}




// import type { ContentDocument } from "@/lib/content/types";
// import { createLayoutPlannerPayload } from "./prompt";
// import { getCachedLayoutSpec, setCachedLayoutSpec } from "./cache";
// import { validateLayoutSpec } from "./validator";
// import type { LayoutSpec } from "./types";
// import { createHash } from "node:crypto";

// export class AIPlannerError extends Error {}

// function cacheKey(document: ContentDocument) {
//   return createHash("sha256")
//     .update(JSON.stringify(document))
//     .digest("hex");
// }

// function parseJsonResponse(value: unknown): unknown {
//   if (typeof value !== "string") {
//     return value;
//   }

//   const cleaned = value
//     .replace(/^```(?:json)?\s*/i, "")
//     .replace(/\s*```$/i, "")
//     .trim();

//   return JSON.parse(cleaned);
// }

// function extractContent(response: any): unknown {
//   // OpenRouter Chat Completions format
//   const content = response?.choices?.[0]?.message?.content;

//   if (typeof content === "string") {
//     return content;
//   }

//   // Some providers may return structured content parts
//   if (Array.isArray(content)) {
//     const text = content
//       .filter((part: any) => part?.type === "text")
//       .map((part: any) => part.text)
//       .join("");

//     if (text) {
//       return text;
//     }
//   }

//   throw new AIPlannerError(
//     "OpenRouter returned no usable model content.",
//   );
// }

// export async function planLayout(
//   document: ContentDocument,
// ): Promise<LayoutSpec> {
//   const key = cacheKey(document);

//   // ------------------------------------------------------------
//   // Cache
//   // ------------------------------------------------------------

//   const cached = getCachedLayoutSpec(key);

//   if (cached) {
//     return cached;
//   }

//   // ------------------------------------------------------------
//   // Configuration
//   // ------------------------------------------------------------

//   const apiKey = process.env.OPENROUTER_API_KEY?.trim();

//   if (!apiKey) {
//     throw new AIPlannerError(
//       "OPENROUTER_API_KEY is not configured.",
//     );
//   }

//   const model =
//     process.env.OPENROUTER_MODEL?.trim() ||
//     "openrouter/free";

//   const url =
//     process.env.OPENROUTER_API_URL?.trim() ||
//     "https://openrouter.ai/api/v1/chat/completions";

//   // ------------------------------------------------------------
//   // Prompt
//   // ------------------------------------------------------------

//   const payload = createLayoutPlannerPayload(document);

//   const controller = new AbortController();

//   const timeout = setTimeout(() => {
//     controller.abort();
//   }, 20_000);

//   try {
//     // ----------------------------------------------------------
//     // OpenRouter request
//     // ----------------------------------------------------------

//     const response = await fetch(url, {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",

//         Authorization: `Bearer ${apiKey}`,

//         // Optional OpenRouter attribution headers
//         "HTTP-Referer":
//           process.env.OPENROUTER_SITE_URL ||
//           "http://localhost:3000",

//         "X-Title":
//           process.env.OPENROUTER_SITE_NAME ||
//           "Adaptive Dashboard",
//       },

//       body: JSON.stringify({
//         model,

//         messages: [
//           {
//             role: "system",
//             content: payload.system,
//           },
//           {
//             role: "user",
//             content: JSON.stringify(payload.content),
//           },
//         ],

//         temperature: 0.15,

//         max_tokens: 4000,

//         // Ask for JSON when supported.
//         response_format: {
//           type: "json_object",
//         },
//       }),

//       cache: "no-store",

//       signal: controller.signal,
//     });

//     // ----------------------------------------------------------
//     // HTTP error
//     // ----------------------------------------------------------

//     if (!response.ok) {
//       const errorText = await response.text();

//       throw new AIPlannerError(
//         `OpenRouter returned HTTP ${response.status}: ${errorText.slice(
//           0,
//           500,
//         )}`,
//       );
//     }

//     // ----------------------------------------------------------
//     // Parse response
//     // ----------------------------------------------------------

//     const raw = await response.json();

//     const content = extractContent(raw);

//     const candidate = parseJsonResponse(content);

//     // ----------------------------------------------------------
//     // SECURITY BOUNDARY
//     // ----------------------------------------------------------
//     // AI output is treated as untrusted data.
//     // Nothing reaches the renderer until it passes validation.

//     const spec = validateLayoutSpec(
//       candidate,
//       document,
//     );

//     // ----------------------------------------------------------
//     // Cache validated specification only
//     // ----------------------------------------------------------

//     setCachedLayoutSpec(key, spec);

//     return spec;
//   } catch (error) {
//     if (error instanceof AIPlannerError) {
//       throw error;
//     }

//     if (
//       error instanceof Error &&
//       error.name === "AbortError"
//     ) {
//       throw new AIPlannerError(
//         "OpenRouter request timed out.",
//       );
//     }

//     throw new AIPlannerError(
//       error instanceof Error
//         ? error.message
//         : "OpenRouter request failed.",
//     );
//   } finally {
//     clearTimeout(timeout);
//   }
// }