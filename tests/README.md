# Manual test checklist

1. Start the app with `npm run dev`.
2. Confirm the input selector lists all four demo files.
3. Generate `dashboard.json` and verify metrics/chart/table-style UI is possible.
4. Generate `article.md` and verify a prose-oriented UI is possible.
5. Generate `project-status.json` and verify timeline/progress-oriented UI is possible.
6. Generate `timeline.md` and verify chronological content is preserved.
7. Put malformed JSON in an input file and verify the API reports `Unable to parse JSON input.`
8. Try a filename containing `../` and verify it is rejected.
9. Inspect the UI specification panel and confirm only known component types appear.
10. Confirm no AI-generated JavaScript/React source is executed by the renderer.