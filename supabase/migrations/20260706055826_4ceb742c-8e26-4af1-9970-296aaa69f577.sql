-- Patch the latest published snapshot: replace dev-server local paths with stable CDN URLs
WITH latest AS (
  SELECT id, payload FROM public.content_snapshots
  ORDER BY created_at DESC LIMIT 1
),
patched AS (
  SELECT id,
    jsonb_set(
      payload,
      '{products}',
      (
        SELECT jsonb_agg(
          CASE
            WHEN p->>'id' = 'washer' THEN
              jsonb_set(p, '{keyVisualImage}', to_jsonb('/__l5e/assets-v1/44417e99-5cfd-4db7-a46d-279a3102029d/washer-keyvisual.png'::text))
            WHEN p->>'id' = 'styler' THEN
              jsonb_set(p, '{keyVisualImage}', to_jsonb('/__l5e/assets-v1/3e593d8b-fb8c-4dc7-89ec-dda8814c6ee6/styler-keyvisual.png'::text))
            ELSE p
          END
        )
        FROM jsonb_array_elements(payload->'products') p
      )
    ) AS new_payload
  FROM latest
)
UPDATE public.content_snapshots cs
SET payload = patched.new_payload
FROM patched
WHERE cs.id = patched.id;