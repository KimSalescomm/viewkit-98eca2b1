# Project conventions

- Keep new product feature collections in focused data modules and register them in the shared features map; this preserves the existing three-level product navigation without enlarging the legacy data file.
- Store downloaded official media as immutable asset pointers and import their URLs; this keeps published product content independent of external image hosting failures.
- Render category-based air-care comparisons in a semantic row-based table with explicit per-spec advantage flags; this guarantees aligned rows without inferring superiority from differing values and preserves legacy comparisons.
- Express display-only emphasis and label explanations (recommended-product badge, info-icon hint) through optional data flags rather than product names or copy inside shared components; this keeps one comparison renderer reusable across products.
- Store product/model common videos and sharing links in product_care_videos and model-scoped care segments in care_video_segments; public reads and passcode-guarded care-video-admin writes preserve legacy data while supporting shared sources. Legacy common videos keep their visibility policy until explicitly registered again.
- Reuse subscriptionCare, careProcess and feature service data through careCatalog; durable source IDs (never array indexes) keep saved segments stable, and optional legacy media controls preserve existing customer layouts.
- Change a product card's on-screen position only through productCardConfig order; the features array order is not what the product page renders, so reordering the array leaves the visible layout unchanged.
