import { Container, Hero } from "@/components/ui";
import { loadContent } from "@/lib/content/loader";
import { planLayout } from "@/lib/ai/planner";
import { createFallbackLayoutSpec } from "@/lib/ai/fallback";
import { AdaptiveRenderer } from "@/lib/rendering/AdaptiveRenderer";

export default async function Home() {
  try {
    const document = await loadContent();
    const sourceType = process.env.CONTENT_FILE?.toLowerCase().endsWith(".json") ? "JSON" : "MD";
    let spec = createFallbackLayoutSpec(document);
    let mode = "Fallback";

    if (process.env.MOCK_AI?.trim().toLowerCase() === "true" || process.env.AI_ENABLED?.trim().toLowerCase() === "true") {
      try {
        spec = await planLayout(document);
        mode = process.env.MOCK_AI?.trim().toLowerCase() === "true" ? "Demo" : "Adaptive";
      } catch {
        mode = "Fallback";
      }
    }

    return (
      <div className="app-shell">
        <nav className="app-nav" aria-label="Application navigation">
          <div className="app-brand">Dynamic</div>
          <div className="app-status" aria-label="Content status">
            <span>Content</span>
            <span><i className="status-dot" aria-hidden="true" /> {mode}</span>
          </div>
        </nav>

        <main>
          <Container className="page">
            <Hero
              title={document.title || "Untitled document"}
              meta={<><span>CONTENT</span><strong>{sourceType}</strong></>}
            />
            <article aria-label="Document content">
              <AdaptiveRenderer document={document} spec={spec} />
            </article>
          </Container>
        </main>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "The content could not be loaded.";
    return (
      <div className="app-shell">
        <nav className="app-nav" aria-label="Application navigation">
          <div className="app-brand">dynamic</div>
          <div className="app-status">Content · Unavailable</div>
        </nav>
        <main>
          <Container className="page">
            <section className="error-state" role="alert">
              <p className="eyebrow">Content</p>
              <h1>Content unavailable</h1>
              <p>{message}</p>
            </section>
          </Container>
        </main>
      </div>
    );
  }
}
