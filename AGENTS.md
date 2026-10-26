# Project conventions

- Keep new product feature collections in focused data modules and register them in the shared features map; this preserves the existing three-level product navigation without enlarging the legacy data file.
- Store downloaded official media as immutable asset pointers and import their URLs; this keeps published product content independent of external image hosting failures.
- Render category-based air-care comparisons in a semantic row-based table with explicit per-spec advantage flags; this guarantees aligned rows without inferring superiority from differing values and preserves legacy comparisons.
- Express display-only emphasis and label explanations (recommended-product badge, info-icon hint) through optional data flags rather than product names or copy inside shared components; this keeps one comparison renderer reusable across products.
- Store admin-managed care video segments (start/end seconds per care item) in the care_video_segments table with public read and writes only through the passcode-guarded care-video-admin function; this lets one shared MP4 serve per-care playback without editing the video file.
