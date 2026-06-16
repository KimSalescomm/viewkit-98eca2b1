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
    if (action === "add") {
      const url = String(body.url ?? "").trim();
      if (!/^https?:\/\//i.test(url) || url.length > 1000) {
        return json({ error: "Invalid url" }, 400);
      }
      const label =
        typeof body.label === "string" && body.label.trim()
          ? body.label.trim().slice(0, 100)
          : null;
      const is_youtube = /(?:youtube\.com|youtu\.be)/i.test(url);
      const { data: maxRow } = await supabase
        .from("screensaver_videos")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const sort_order = (maxRow?.sort_order ?? -1) + 1;
      const { error } = await supabase
        .from("screensaver_videos")
        .insert({ url, label, is_youtube, sort_order, enabled: true });
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (action === "delete") {
      const id = String(body.id ?? "");
      if (!id) return json({ error: "id required" }, 400);
      const { error } = await supabase
        .from("screensaver_videos")
        .delete()
        .eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (action === "toggle") {
      const id = String(body.id ?? "");
      const enabled = Boolean(body.enabled);
      if (!id) return json({ error: "id required" }, 400);
      const { error } = await supabase
        .from("screensaver_videos")
        .update({ enabled })
        .eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (action === "swap_order") {
      const a = String(body.a_id ?? "");
      const b = String(body.b_id ?? "");
      const aOrder = Number(body.a_order);
      const bOrder = Number(body.b_order);
      if (!a || !b || !Number.isFinite(aOrder) || !Number.isFinite(bOrder)) {
        return json({ error: "invalid swap" }, 400);
      }
      const r1 = await supabase
        .from("screensaver_videos")
        .update({ sort_order: bOrder })
        .eq("id", a);
      if (r1.error) return json({ error: r1.error.message }, 500);
      const r2 = await supabase
        .from("screensaver_videos")
        .update({ sort_order: aOrder })
        .eq("id", b);
      if (r2.error) return json({ error: r2.error.message }, 500);
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
