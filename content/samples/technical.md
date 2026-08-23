# Content Normalization

A normalized content model allows Markdown and JSON sources to share one renderer.

## Validation

The validator rejects unsupported component types and unknown content IDs.

```ts
const valid = validateLayoutSpec(candidate, document);
```

## Process

1. Load source content.
2. Normalize blocks.
3. Plan presentation.
4. Validate the plan.
5. Render trusted components.
