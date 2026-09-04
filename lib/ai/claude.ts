import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient() {
  // if (!process.env.ANTHROPIC_API_KEY) {
  //   throw new Error("ANTHROPIC_API_KEY is not configured. Copy .env.local.example to .env.local and add your key.");
  // }
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is not configured. Add your OpenRouter API key to .env.local."
    );
  }
  // client ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  client ??= new Anthropic({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api",
  });
  return client;
}

export async function askClaude(system: string, user: string): Promise<string> {
  const response = await getClient().messages.create({
    model: process.env.CLAUDE_MODEL || "anthropic/claude-sonnet-4-5",
    max_tokens: 8000,
    system,
    messages: [{ role: "user", content: user }]
  });


  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

// import OpenAI from "openai"


// export const client = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// })
