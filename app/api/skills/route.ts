import { NextResponse } from "next/server";
import { loadSkills } from "@/lib/skills/loader";

export async function GET() {
  try {
    const skills = await loadSkills();
    return NextResponse.json({
      skills: skills.map(({ name, purpose, recommendedComponents }) => ({
        name,
        purpose,
        recommendedComponents
      }))
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load skills." }, { status: 500 });
  }
}
