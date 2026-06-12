import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const expected = Deno.env.get("ADMIN_PASSCODE");
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!expected || !url || !serviceKey) {
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const code = typeof body.code === "string" ? body.code.trim() : "";
  const mode = typeof body.mode === "string" ? body.mode : "";

  if (!code || code.length > 64) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid passcode" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Constant-time compare
  const enc = new TextEncoder();
  const a = enc.encode(code);
  const b = enc.encode(expected);
  let mismatch = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  await new Promise((r) => setTimeout(r, 250));
  if (mismatch !== 0) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  try {
    if (mode === "one") {
      const id = typeof body.id === "string" ? body.id : "";
      if (!id) throw new Error("missing id");
      const { error } = await admin.from("sales_certifications").delete().eq("id", id);
      if (error) throw error;
    } else if (mode === "many") {
      const ids = Array.isArray(body.ids) ? body.ids.filter((v): v is string => typeof v === "string") : [];
      if (ids.length === 0) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { error } = await admin.from("sales_certifications").delete().in("id", ids);
      if (error) throw error;
    } else if (mode === "all") {
      const { error } = await admin
        .from("sales_certifications")
        .delete()
        .not("id", "is", null);
      if (error) throw error;
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Invalid mode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error("[delete-sales] failed", err);
    return new Response(JSON.stringify({ ok: false, error: "Delete failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
