// 지점 식별자 유틸: 매장명 → 영문 슬러그 자동 변환 + 매핑 저장
// 규칙:
//  1) 영문/숫자만 → 그대로 대문자 (예: "D5" → "D5", "gn01" → "GN01")
//  2) 한글 포함 → 각 음절 초성을 로마자로 변환, 끝 글자 '점'은 제거
//     (예: 강서본점 → 강·서·본 → G·S·B → "GSB", 대치본점 → "DCB")
//  3) 기타 문자(공백/특수문자)는 제거
//  4) 사용자가 등록한 매핑은 localStorage에 영구 저장 (이름 ↔ 슬러그)

const REGISTRY_KEY = "viewkit_store_registry";
const CURRENT_NAME_KEY = "viewkit_store_name";
const CURRENT_ID_KEY = "viewkit_store_id";

// 한글 초성 → 로마자
const CHOSEONG_ROMAN = [
  "G", "GG", "N", "D", "DD", "R", "M", "B", "BB",
  "S", "SS", "", "J", "JJ", "C", "K", "T", "P", "H",
];

const getChoseongRoman = (ch: string): string => {
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return "";
  const idx = Math.floor((code - 0xac00) / 588);
  return CHOSEONG_ROMAN[idx] ?? "";
};

const hasHangul = (s: string) => /[\uac00-\ud7a3]/.test(s);

export const slugifyStoreName = (raw: string): string => {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  // 영문/숫자만
  if (/^[A-Za-z0-9_-]+$/.test(trimmed)) {
    return trimmed.toUpperCase().replace(/[_-]/g, "");
  }

  // 한글 처리
  if (hasHangul(trimmed)) {
    // 끝의 '점' 제거 (본점/지점/매장점 등)
    let name = trimmed.replace(/[\s]/g, "");
    name = name.replace(/점$/u, "");

    let out = "";
    for (const ch of name) {
      if (/[\uac00-\ud7a3]/.test(ch)) {
        out += getChoseongRoman(ch);
      } else if (/[A-Za-z0-9]/.test(ch)) {
        out += ch.toUpperCase();
      }
    }
    return out || "STORE";
  }

  // fallback: 영숫자만 추출
  return trimmed.replace(/[^A-Za-z0-9]/g, "").toUpperCase() || "STORE";
};

export type StoreRegistry = Record<string, string>; // name → slug

export const getRegistry = (): StoreRegistry => {
  try {
    return JSON.parse(localStorage.getItem(REGISTRY_KEY) || "{}");
  } catch {
    return {};
  }
};

export const saveRegistry = (reg: StoreRegistry) => {
  try {
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(reg));
  } catch {
    /* noop */
  }
};

export const registerStore = (name: string, slugOverride?: string): { name: string; slug: string } => {
  const cleanName = (name || "").trim();
  const slug = (slugOverride || slugifyStoreName(cleanName)).toUpperCase();
  const reg = getRegistry();
  reg[cleanName] = slug;
  saveRegistry(reg);
  try {
    localStorage.setItem(CURRENT_NAME_KEY, cleanName);
    localStorage.setItem(CURRENT_ID_KEY, slug);
    sessionStorage.setItem(CURRENT_ID_KEY, slug);
  } catch {
    /* noop */
  }
  return { name: cleanName, slug };
};

export const getCurrentStore = (): { name: string; slug: string } | null => {
  try {
    const name = localStorage.getItem(CURRENT_NAME_KEY);
    const slug =
      localStorage.getItem(CURRENT_ID_KEY) ||
      sessionStorage.getItem(CURRENT_ID_KEY);
    if (slug) {
      // name이 유실됐어도 슬러그가 있으면 동일 브라우저로 보고 복구
      if (name) return { name, slug };
      const reg = getRegistry();
      const recoveredName = Object.entries(reg).find(([, s]) => s === slug)?.[0];
      const finalName = recoveredName || slug;
      try {
        localStorage.setItem(CURRENT_NAME_KEY, finalName);
        localStorage.setItem(CURRENT_ID_KEY, slug);
      } catch {
        /* noop */
      }
      return { name: finalName, slug };
    }
    // slug도 없지만 registry에 등록된 매장이 있으면 첫 항목으로 복구
    const reg = getRegistry();
    const first = Object.entries(reg)[0];
    if (first) {
      const [n, s] = first;
      try {
        localStorage.setItem(CURRENT_NAME_KEY, n);
        localStorage.setItem(CURRENT_ID_KEY, s);
      } catch {
        /* noop */
      }
      return { name: n, slug: s };
    }
  } catch {
    /* noop */
  }
  return null;
};

export const clearCurrentStore = () => {
  try {
    localStorage.removeItem(CURRENT_NAME_KEY);
    localStorage.removeItem(CURRENT_ID_KEY);
    sessionStorage.removeItem(CURRENT_ID_KEY);
  } catch {
    /* noop */
  }
};
