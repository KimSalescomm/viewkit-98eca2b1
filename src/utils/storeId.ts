// 지점 식별자 유틸: 매장명 → 영문 슬러그 자동 변환 + 매핑 저장
// 규칙:
//  1) 영문만 → 그대로 대문자 (예: "gn" → "GN")
//  2) 한글 포함 → 각 음절 초성을 로마자로 변환, 끝 글자 '점'은 제거
//     (예: 강서본점 → 강·서·본 → G·S·B → "GSB", 대치본점 → "DCB")
//  3) 기타 문자(공백/특수문자)는 제거
//  4) 사용자가 등록한 매핑은 localStorage에 영구 저장 (이름 ↔ 슬러그)

import { BRANCH_CODE_MAP } from "@/data/branches";

const REGISTRY_KEY = "viewkit_store_registry";
const CURRENT_NAME_KEY = "viewkit_store_name";
const CURRENT_ID_KEY = "viewkit_store_id";

// 한글 초성 → 로마자 ('' = ㅇ 무음)
const CHOSEONG_ROMAN = [
  "G", "GG", "N", "D", "DD", "R", "M", "B", "BB",
  "S", "SS", "", "J", "JJ", "C", "K", "T", "P", "H",
];

// 한글 중성 → 로마자 (초성이 무음일 때 fallback)
const JUNGSEONG_ROMAN = [
  "A", "AE", "YA", "YAE", "EO", "E", "YEO", "YE", "O",
  "WA", "WAE", "OE", "YO", "U", "WO", "WE", "WI", "YU", "EU", "YI", "I",
];

const getChoseongRoman = (ch: string): string => {
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return "";
  const idx = Math.floor((code - 0xac00) / 588);
  return CHOSEONG_ROMAN[idx] ?? "";
};

const getJungseongRoman = (ch: string): string => {
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return "";
  const idx = Math.floor(((code - 0xac00) % 588) / 28);
  return JUNGSEONG_ROMAN[idx] ?? "";
};

const hasHangul = (s: string) => /[\uac00-\ud7a3]/.test(s);

const RESERVED_CODE_TO_NAME: Record<string, string> = {
  SC: "관리자",
  KOR: "유관부서",
};

const RESERVED_NAME_TO_CODE: Record<string, string> = {
  관리자: "SC",
  유관부서: "KOR",
};

const getBranchNameBySlug = (slug: string): string | null => {
  const code = (slug || "").trim().toUpperCase();
  const entry = Object.entries(BRANCH_CODE_MAP).find(([, value]) => value === code);
  return entry?.[0] ?? null;
};

export const normalizeStoreIdentity = (name: string, slug: string): { name: string; slug: string } => {
  const cleanName = (name || "").trim();
  const cleanSlug = (slug || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  const upperName = cleanName.toUpperCase();

  const reservedCode = RESERVED_NAME_TO_CODE[cleanName] || (upperName === "ADMIN" ? "SC" : "");
  if (reservedCode) return { name: RESERVED_CODE_TO_NAME[reservedCode], slug: reservedCode };
  if (RESERVED_CODE_TO_NAME[cleanSlug]) return { name: RESERVED_CODE_TO_NAME[cleanSlug], slug: cleanSlug };

  const masterCode = BRANCH_CODE_MAP[cleanName];
  if (masterCode) return { name: cleanName, slug: masterCode };

  const masterName = getBranchNameBySlug(cleanSlug);
  if (masterName) return { name: masterName, slug: cleanSlug };

  // 점 보정: 한글 매장명이 "점"으로 끝나지 않으면 붙여서 마스터 재조회, 없으면 이름만 보정
  if (hasHangul(cleanName) && !cleanName.endsWith("점")) {
    const withJum = cleanName + "점";
    const masterCodeJum = BRANCH_CODE_MAP[withJum];
    if (masterCodeJum) {
      return { name: withJum, slug: masterCodeJum };
    }
    return { name: withJum, slug: cleanSlug };
  }

  return { name: cleanName || cleanSlug, slug: cleanSlug };
};

// 한 음절 → 영문 1자 이상 (초성 무음이면 중성 첫 글자로 대체)
const syllableRoman = (ch: string): string => {
  const cho = getChoseongRoman(ch);
  if (cho) return cho;
  const jung = getJungseongRoman(ch);
  return jung.charAt(0);
};

export const slugifyStoreName = (raw: string): string => {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  // 1순위: 마스터 지점 코드 매핑 (충돌 없는 고유 코드)
  if (BRANCH_CODE_MAP[trimmed]) return BRANCH_CODE_MAP[trimmed];

  // 영문만 (숫자 제외 — 매장코드는 영문 대문자만)
  if (/^[A-Za-z_-]+$/.test(trimmed)) {
    const cleaned = trimmed.toUpperCase().replace(/[_-]/g, "");
    return cleaned.length >= 2 ? cleaned : (cleaned + "X").slice(0, 2);
  }

  // 한글 처리
  if (hasHangul(trimmed)) {
    let name = trimmed.replace(/[\s]/g, "");
    name = name.replace(/점$/u, "");

    let out = "";
    for (const ch of name) {
      if (/[\uac00-\ud7a3]/.test(ch)) {
        out += syllableRoman(ch);
      } else if (/[A-Za-z]/.test(ch)) {
        out += ch.toUpperCase();
      }
    }
    // 최소 2글자 보장
    while (out.length < 2) out += "X";
    return out;
  }

  // fallback: 영문만 추출
  const cleaned = trimmed.replace(/[^A-Za-z]/g, "").toUpperCase();
  return cleaned.length >= 2 ? cleaned : (cleaned + "XX").slice(0, 2);
};

// 매장 코드가 이미 사용 중이면 뒤에 숫자(2,3,4...)를 붙여 고유 코드 반환
export const resolveUniqueSlug = (baseSlug: string, ownerName: string): string => {
  const base = (baseSlug || "").toUpperCase();
  if (!base) return base;
  const reg = getRegistry();
  // 본인의 기존 코드는 그대로 유지
  if (reg[ownerName] === base) return base;

  // 마스터 매핑된 매장이 본인 코드를 그대로 가져왔다면 통과
  if (BRANCH_CODE_MAP[ownerName] === base) return base;
  // 관리자 SC 코드 예외 (관리자/Admin/SC 명칭으로 등록 시)
  const upperName = ownerName.toUpperCase();
  if (base === "SC" && (upperName === "SC" || ownerName === "관리자" || upperName === "ADMIN")) return base;
  if (base === "KOR" && (upperName === "KOR" || ownerName === "유관부서")) return base;

  const used = new Set<string>([
    "SC", "KOR",
    ...Object.values(BRANCH_CODE_MAP),
    ...Object.entries(reg).filter(([n]) => n !== ownerName).map(([, s]) => s),
  ]);

  if (!used.has(base)) return base;
  for (let i = 2; i <= 99; i++) {
    const candidate = `${base}${i}`;
    if (!used.has(candidate)) return candidate;
  }
  return base;
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
  const initialName = (name || "").trim();
  const initialBase = (slugOverride || slugifyStoreName(initialName)).toUpperCase();
  const normalized = normalizeStoreIdentity(initialName, initialBase);
  const cleanName = normalized.name;
  const base = normalized.slug;
  // SC/KOR 등 예약 코드와 마스터 코드는 그대로(자기 자신이면 통과)
  const slug = normalizeStoreIdentity(cleanName, resolveUniqueSlug(base, cleanName)).slug;
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
      if (name) {
        const normalized = normalizeStoreIdentity(name, slug);
        try {
          localStorage.setItem(CURRENT_NAME_KEY, normalized.name);
          localStorage.setItem(CURRENT_ID_KEY, normalized.slug);
          sessionStorage.setItem(CURRENT_ID_KEY, normalized.slug);
        } catch {
          /* noop */
        }
        return normalized;
      }
      const reg = getRegistry();
      const recoveredName = Object.entries(reg).find(([, s]) => s === slug)?.[0];
      const normalized = normalizeStoreIdentity(recoveredName || slug, slug);
      try {
        localStorage.setItem(CURRENT_NAME_KEY, normalized.name);
        localStorage.setItem(CURRENT_ID_KEY, normalized.slug);
      } catch {
        /* noop */
      }
      return normalized;
    }
    // slug도 없지만 registry에 등록된 매장이 있으면 첫 항목으로 복구
    const reg = getRegistry();
    const first = Object.entries(reg)[0];
    if (first) {
      const [n, s] = first;
      const normalized = normalizeStoreIdentity(n, s);
      try {
        localStorage.setItem(CURRENT_NAME_KEY, normalized.name);
        localStorage.setItem(CURRENT_ID_KEY, normalized.slug);
      } catch {
        /* noop */
      }
      return normalized;
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
