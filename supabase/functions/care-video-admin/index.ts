import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
const id = z.string().trim().min(1).max(100);
const model = z.string().trim().max(100).default("");
const url = z.string().url().max(2000).refine(v => new URL(v).protocol === "https:", "HTTPS 영상 주소를 입력해 주세요.");
const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("save-product"), passcode: id, product_id: id, model_id: model, common_video_url: url.nullable(), video_duration: z.number().finite().positive().nullable(), shared_product_id: id.nullable(), shared_model_id: model, allow_full_video: z.boolean().default(true) }),
  z.object({ action: z.literal("upsert"), passcode: id, product_id: id, model_id: model, care_service_id: id, video_url: url, individual_video_url: url.nullable().optional(), start_seconds: z.number().finite().nonnegative(), end_seconds: z.number().finite().nonnegative().nullable(), video_duration: z.number().finite().positive().nullable().optional() }),
  z.object({ action: z.literal("delete"), passcode: id, product_id: id, model_id: model, care_service_id: id }),
]);
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  let input: unknown;
  try { input = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const parsed = schema.safeParse(input);
  if (!parsed.success) return json({ error: "입력값을 확인해 주세요.", details: parsed.error.flatten().fieldErrors }, 400);
  const body = parsed.data;
  const expected = Deno.env.get("ADMIN_PASSCODE");
  if (!expected || body.passcode !== expected) return json({ error: "관리자 패스코드를 확인해 주세요." }, 401);
  const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  try {
    if (body.action === "save-product") {
      if (!body.common_video_url && !body.shared_product_id) return json({ error: "영상 주소 또는 공유할 영상을 선택해 주세요." }, 400);
      if (body.shared_product_id) {
        const { data, error } = await client.from("product_care_videos").select("product_id,model_id,shared_product_id,shared_model_id");
        if (error) throw error;
        let source = data?.find(r => r.product_id === body.shared_product_id && r.model_id === body.shared_model_id);
        if (!source) return json({ error: "공유할 영상이 등록되지 않았습니다." }, 400);
        const visited = new Set([`${body.product_id}/${body.model_id}`]);
        while (source) {
          const key = `${source.product_id}/${source.model_id}`;
          if (visited.has(key)) return json({ error: "영상 공유가 순환하지 않도록 선택해 주세요." }, 400);
          visited.add(key);
          if (!source.shared_product_id) break;
          source = data?.find(r => r.product_id === source?.shared_product_id && r.model_id === source?.shared_model_id);
        }
      }
      const { passcode: _passcode, action: _action, ...fields } = body;
      const { error } = await client.from("product_care_videos").upsert({ ...fields, common_video_url: body.shared_product_id ? null : body.common_video_url, video_duration: body.shared_product_id ? null : body.video_duration, updated_at: new Date().toISOString() }, { onConflict: "product_id,model_id" });
      if (error) throw error;
    } else if (body.action === "upsert") {
      const { data: config } = await client.from("product_care_videos").select("shared_product_id,video_duration").eq("product_id", body.product_id).eq("model_id", body.model_id).maybeSingle();
      if (config?.shared_product_id) return json({ error: "공유 영상의 원본 제품에서 구간을 수정해 주세요." }, 400);
      const duration = body.individual_video_url ? body.video_duration : config?.video_duration ?? body.video_duration;
      if (body.end_seconds !== null && body.end_seconds <= body.start_seconds) return json({ error: "종료 시간은 시작 시간보다 늦어야 합니다." }, 400);
      if (duration && (body.start_seconds >= duration || (body.end_seconds !== null && body.end_seconds > duration + 0.05))) return json({ error: "구간이 영상 길이를 초과합니다." }, 400);
      const { error } = await client.from("care_video_segments").upsert({ product_id: body.product_id, model_id: body.model_id, care_service_id: body.care_service_id, video_url: body.video_url, individual_video_url: body.individual_video_url ?? null, start_seconds: body.start_seconds, end_seconds: body.end_seconds, updated_at: new Date().toISOString() }, { onConflict: "product_id,model_id,care_service_id" });
      if (error) throw error;
    } else {
      const { error } = await client.from("care_video_segments").delete().eq("product_id", body.product_id).eq("model_id", body.model_id).eq("care_service_id", body.care_service_id);
      if (error) throw error;
    }
    return json({ ok: true });
  } catch (e) { return json({ error: e instanceof Error ? e.message : "저장에 실패했습니다." }, 500); }
});
