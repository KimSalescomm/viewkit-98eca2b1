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
  if (!expected) {
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const code =
    body && typeof body === "object" && typeof (body as Record<string, unknown>).code === "string"
      ? ((body as Record<string, unknown>).code as string).trim()
      : "";

  if (!code || code.length > 64) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid passcode" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Constant-time comparison
  const enc = new TextEncoder();
  const a = enc.encode(code);
  const b = enc.encode(expected);
  let mismatch = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  const ok = mismatch === 0;

  // Small delay to slow brute force
  await new Promise((r) => setTimeout(r, 250));

  if (!ok) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
