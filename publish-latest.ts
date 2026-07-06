import { products } from "./src/data/products";
import { featuresMap } from "./src/data/features";

const payload = { featuresMap, products };
const body = JSON.stringify({
  passcode: process.env.ADMIN_PASSCODE,
  payload,
  published_by: "SC",
  note: "Publish after moving vacuum to 2nd position",
});

const res = await fetch("https://tktxfgpdcvknzaoasrsf.supabase.co/functions/v1/publish-content", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer " + process.env.SUPABASE_ANON_KEY },
  body,
});

const text = await res.text();
console.log(res.status, text);
