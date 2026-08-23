import { NextResponse } from "next/server";
import { planLayout } from "@/lib/ai/planner";
import type { ContentDocument } from "@/lib/content/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const document = body?.document as ContentDocument;
    if (!document || !Array.isArray(document.blocks)) {
      return NextResponse.json({ error: "A normalized ContentDocument is required." }, { status: 400 });
    }
    return NextResponse.json(await planLayout(document));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create a layout plan.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
