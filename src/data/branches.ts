// 하이프라자 담당별 지점 마스터
// 출처: 사용자 제공 표 (image-121.png)

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

// 관리자 코드 (SC 계정)
export const ADMIN_STORE_CODE = "SC";
export const isAdminStore = (slug?: string | null): boolean =>
  (slug || "").toUpperCase() === ADMIN_STORE_CODE;
