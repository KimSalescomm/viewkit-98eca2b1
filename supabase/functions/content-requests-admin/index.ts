import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const STATUSES = ["대기", "처리중", "완료"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expected = Deno.env.get("ADMIN_PASSCODE");
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!expected || !url || !serviceKey) return json({ error: "Server not configured" }, 500);

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const code = typeof body.code === "string" ? body.code.trim() : "";
  const mode = typeof body.mode === "string" ? body.mode : "list";
  if (!code || code.length > 64) return json({ ok: false, error: "Invalid passcode" }, 400);

  const enc = new TextEncoder();
  const a = enc.encode(code);
  const b = enc.encode(expected);
  let mismatch = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  if (mismatch !== 0) return json({ ok: false, error: "Unauthorized" }, 401);

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  try {
    if (mode === "list") {
      const { data, error } = await admin
        .from("content_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2000);
      if (error) throw error;
      return json({ ok: true, rows: data ?? [] });
    }

    if (mode === "status") {
      const id = typeof body.id === "string" ? body.id : "";
      const status = typeof body.status === "string" ? body.status : "";
      if (!id || !STATUSES.includes(status)) return json({ ok: false, error: "Invalid input" }, 400);
      const { error } = await admin.from("content_requests").update({ status }).eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ ok: false, error: "Invalid mode" }, 400);
  } catch (err) {
    console.error("[content-requests-admin] failed", err);
    return json({ ok: false, error: "Request failed" }, 500);
  }
});
