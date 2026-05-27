// 하이프라자 담당별 지점 마스터
// 출처: 사용자 제공 표 (image-121.png)
// 각 지점은 고유한 영문 코드(BRANCH_CODE_MAP)를 가지며 GA4 집계 키로 사용됨.

export interface BranchGroup {
  manager: string; // 담당 (강남/경원/경인/중부/서부/경북/경남)
  branches: string[];
}

export const BRANCH_GROUPS: BranchGroup[] = [
  {
    manager: "강남",
    branches: [
      "강서본점", "양천본점", "구로본점", "금천본점", "대치본점", "서초본점",
      "소하본점", "강동본점", "문정본점", "분당본점", "미사본점", "죽전본점",
    ],
  },
  {
    manager: "경원",
    branches: [
      "강릉본점", "불광본점", "강북본점", "광진본점", "노원본점", "쌍문본점",
      "금오본점", "충주본점",
    ],
  },
  {
    manager: "경인",
    branches: [
      "계양본점", "송도본점", "인천본점", "중동본점", "덕양본점", "운정본점",
      "평촌본점",
    ],
  },
  {
    manager: "중부",
    branches: [
      "남수원본점", "남청주본점", "남평택본점", "동탄본점", "북천안본점",
      "수원본점", "이천본점", "평택본점",
    ],
  },
  {
    manager: "서부",
    branches: [
      "동대전본점", "대전본점", "세종본점", "전주본점", "전주송천본점",
      "서광주본점", "목포상동본점", "순천본점",
    ],
  },
  {
    manager: "경북",
    branches: [
      "구미본점", "북포항본점", "포항본점", "칠곡본점", "달서본점",
      "서대구본점", "북대구본점", "황금본점", "제주본점", "이도본점", "안동본점",
    ],
  },
  {
    manager: "경남",
    branches: ["사상본점", "동래본점", "상남본점", "김해본점"],
  },
];

export const ALL_BRANCHES: string[] = BRANCH_GROUPS.flatMap((g) => g.branches);

export const getManagerByBranch = (branch: string): string | null => {
  const norm = (branch || "").trim();
  for (const g of BRANCH_GROUPS) {
    if (g.branches.includes(norm)) return g.manager;
  }
  return null;
};

// ───────────────────────────────────────────────────────────────
// 지점별 고유 영문 코드 (수동 매핑 · 슬러그 충돌 방지용)
// 규칙: 3자리 대문자, 'SC' 는 관리자 코드로 예약
// ───────────────────────────────────────────────────────────────
export const BRANCH_CODE_MAP: Record<string, string> = {
  // 강남
  "강서본점": "GSB", "양천본점": "YCB", "구로본점": "GRB", "금천본점": "GCB",
  "대치본점": "DCB", "서초본점": "SCB", "소하본점": "SHB", "강동본점": "GDB",
  "문정본점": "MJB", "분당본점": "BDB", "미사본점": "MSB", "죽전본점": "JJB",
  // 경원
  "강릉본점": "KRB", "불광본점": "BKB", "강북본점": "GBB", "광진본점": "GJB",
  "노원본점": "NWB", "쌍문본점": "SMB", "금오본점": "GOB", "충주본점": "CJB",
  // 경인
  "계양본점": "KYB", "송도본점": "SDB", "인천본점": "ICB", "중동본점": "JDB",
  "덕양본점": "DYB", "운정본점": "UJB", "평촌본점": "PCB",
  // 중부
  "남수원본점": "NSW", "남청주본점": "NCJ", "남평택본점": "NPT", "동탄본점": "DTB",
  "북천안본점": "BCA", "수원본점": "SWB", "이천본점": "ECB", "평택본점": "PTB",
  // 서부
  "동대전본점": "DDJ", "대전본점": "DJB", "세종본점": "SJB", "전주본점": "JJU",
  "전주송천본점": "JJS", "서광주본점": "SGJ", "목포상동본점": "MPS", "순천본점": "SUC",
  // 경북
  "구미본점": "GMB", "북포항본점": "BPH", "포항본점": "PHB", "칠곡본점": "CGB",
  "달서본점": "DSB", "서대구본점": "SDG", "북대구본점": "BDG", "황금본점": "HGB",
  "제주본점": "JJE", "이도본점": "IDB", "안동본점": "ADB",
  // 경남
  "사상본점": "SSB", "동래본점": "DRB", "상남본점": "SNB", "김해본점": "KHB",
};

export const getBranchCode = (name: string): string | null => {
  const key = (name || "").trim();
  return BRANCH_CODE_MAP[key] ?? null;
};

export const getBranchNameByCode = (code: string): string | null => {
  const c = (code || "").trim().toUpperCase();
  const entry = Object.entries(BRANCH_CODE_MAP).find(([, v]) => v === c);
  return entry ? entry[0] : null;
};

// 관리자 코드 (SC 계정)
export const ADMIN_STORE_CODE = "SC";
export const isAdminStore = (slug?: string | null): boolean =>
  (slug || "").toUpperCase() === ADMIN_STORE_CODE;
