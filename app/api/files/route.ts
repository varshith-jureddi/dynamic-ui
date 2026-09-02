import { NextResponse } from "next/server";
import { listInputFiles } from "@/lib/input/loader";

export async function GET() {
  try {
    const filenames = await listInputFiles();
    return NextResponse.json({
      files: filenames.map((filename) => ({
        filename,
        format: filename.toLowerCase().endsWith(".json") ? "json" : "markdown"
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to read the input directory." }, { status: 500 });
  }
}