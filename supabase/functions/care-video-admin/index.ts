import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expected = Deno.env.get("ADMIN_PASSCODE");
  if (!expected) return json({ error: "Server not configured" }, 500);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const passcode = typeof body?.passcode === "string" ? body.passcode.trim() : "";
  if (!passcode || passcode !== expected) {
    await new Promise((r) => setTimeout(r, 250));
    return json({ error: "Unauthorized" }, 401);
  }

  const action = body?.action as string | undefined;
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    if (action === "upsert") {
      const product_id = String(body.product_id ?? "").trim();
      const care_service_id = String(body.care_service_id ?? "").trim();
      const video_url = String(body.video_url ?? "").trim();
      const start_seconds = Number(body.start_seconds);
      const end_seconds =
        body.end_seconds === null || body.end_seconds === undefined
          ? null
          : Number(body.end_seconds);

      if (!product_id || product_id.length > 64) return json({ error: "product_id required" }, 400);
      if (!care_service_id || care_service_id.length > 64)
        return json({ error: "care_service_id required" }, 400);
      if (!/^https?:\/\//i.test(video_url) || video_url.length > 1000)
        return json({ error: "Invalid video_url" }, 400);
      if (!Number.isFinite(start_seconds) || start_seconds < 0)
        return json({ error: "시작 시간은 0 이상이어야 합니다." }, 400);
      if (end_seconds !== null && (!Number.isFinite(end_seconds) || end_seconds <= start_seconds))
        return json({ error: "종료 시간은 시작 시간보다 늦어야 합니다." }, 400);

      const { error } = await supabase.from("care_video_segments").upsert(
        {
          product_id,
          care_service_id,
          video_url,
          start_seconds,
          end_seconds,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "product_id,care_service_id" },
      );
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (action === "delete") {
      const product_id = String(body.product_id ?? "").trim();
      const care_service_id = String(body.care_service_id ?? "").trim();
      if (!product_id || !care_service_id)
        return json({ error: "product_id, care_service_id required" }, 400);
      const { error } = await supabase
        .from("care_video_segments")
        .delete()
        .eq("product_id", product_id)
        .eq("care_service_id", care_service_id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      500,
    );
  }
});
