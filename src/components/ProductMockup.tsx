// 제품별 미니 목업 아이콘 (LG 제품 실루엣 기반, 배경박스 안에 떠 있는 톤)
// - 모든 목업은 100x100 viewBox 기준으로 그려 카드 간 볼륨감이 동일하게 보이도록 통일
type Props = { className?: string };

const BODY = "#E9E6DF";
const BODY_DARK = "#D6D2C8";
const LINE = "#B9B4A8";
const DEEP = "#3A3A38";
const ACCENT = "#A50034";

const Svg = ({ className, children }: Props & { children: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

/** 냉장고 — 4도어 (오브제/노크온 스타일) */
const Refrigerator = (p: Props) => (
  <Svg {...p}>
    <rect x="30" y="8" width="40" height="84" rx="5" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <line x1="30" y1="47" x2="70" y2="47" stroke={LINE} strokeWidth="1.5" />
    <line x1="50" y1="8" x2="50" y2="92" stroke={LINE} strokeWidth="1.5" />
    <rect x="44" y="20" width="3" height="16" rx="1.5" fill={DEEP} opacity="0.6" />
    <rect x="53" y="20" width="3" height="16" rx="1.5" fill={DEEP} opacity="0.6" />
    <rect x="44" y="58" width="3" height="16" rx="1.5" fill={DEEP} opacity="0.6" />
    <rect x="53" y="58" width="3" height="16" rx="1.5" fill={DEEP} opacity="0.6" />
  </Svg>
);

/** 세탁기 — 드럼 프론트로드 */
const Washer = (p: Props) => (
  <Svg {...p}>
    <rect x="20" y="16" width="60" height="68" rx="7" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <rect x="26" y="22" width="48" height="9" rx="4" fill="#fff" stroke={LINE} strokeWidth="1" />
    <circle cx="50" cy="57" r="19" fill="#F7F6F3" stroke={LINE} strokeWidth="1.5" />
    <circle cx="50" cy="57" r="12" fill={DEEP} opacity="0.85" />
    <circle cx="68" cy="26.5" r="2" fill={ACCENT} />
  </Svg>
);

/** 워시콤보 — 세탁건조 일체형 (큰 드럼 + 상단 디스플레이) */
const WashCombo = (p: Props) => (
  <Svg {...p}>
    <rect x="18" y="10" width="64" height="80" rx="8" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <rect x="24" y="16" width="52" height="11" rx="5" fill="#fff" stroke={LINE} strokeWidth="1" />
    <circle cx="50" cy="60" r="22" fill="#F7F6F3" stroke={LINE} strokeWidth="1.5" />
    <circle cx="50" cy="60" r="14" fill={DEEP} opacity="0.85" />
    <circle cx="50" cy="60" r="6" fill="#fff" opacity="0.25" />
    <rect x="28" y="19.5" width="16" height="4" rx="2" fill={ACCENT} opacity="0.8" />
  </Svg>
);

/** 워시타워 / 스타일러 — 세로형 도어 캐비닛 */
const Styler = (p: Props) => (
  <Svg {...p}>
    <rect x="28" y="8" width="44" height="84" rx="6" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <rect x="34" y="16" width="32" height="56" rx="4" fill="#F7F6F3" stroke={LINE} strokeWidth="1.2" />
    <path d="M50 26 l8 6 -4 22 h-8 l-4 -22 z" fill={BODY_DARK} stroke={LINE} strokeWidth="1" />
    <rect x="64" y="38" width="3" height="12" rx="1.5" fill={DEEP} opacity="0.6" />
    <rect x="38" y="80" width="24" height="4" rx="2" fill={LINE} />
  </Svg>
);

/** TV — OLED 슬림 스탠드 */
const TvMock = (p: Props) => (
  <Svg {...p}>
    <rect x="8" y="20" width="84" height="50" rx="3" fill={DEEP} />
    <rect x="11" y="23" width="78" height="44" rx="2" fill="#1B1B1F" />
    <rect x="11" y="23" width="78" height="44" rx="2" fill="url(#tvg)" opacity="0.55" />
    <rect x="42" y="70" width="16" height="9" fill={BODY_DARK} />
    <rect x="28" y="79" width="44" height="4" rx="2" fill={LINE} />
    <defs>
      <linearGradient id="tvg" x1="11" y1="23" x2="89" y2="67" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5B5BD6" />
        <stop offset="1" stopColor="#A50034" />
      </linearGradient>
    </defs>
  </Svg>
);

/** 청소로봇 — 상단뷰 + 도킹 스테이션 */
const Vacuum = (p: Props) => (
  <Svg {...p}>
    <rect x="60" y="26" width="26" height="58" rx="6" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <rect x="65" y="34" width="16" height="20" rx="3" fill="#F7F6F3" stroke={LINE} strokeWidth="1" />
    <rect x="62" y="74" width="22" height="8" rx="3" fill={BODY_DARK} />
    <circle cx="36" cy="62" r="22" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <circle cx="36" cy="62" r="14" fill="#F7F6F3" stroke={LINE} strokeWidth="1" />
    <circle cx="36" cy="62" r="5" fill={DEEP} opacity="0.8" />
    <circle cx="36" cy="44" r="3" fill={ACCENT} />
  </Svg>
);

/** 에어컨 — 실내기(스탠드) + 실외기 나란히 */
const AirConditioner = (p: Props) => (
  <Svg {...p}>
    {/* 실내기 스탠드 */}
    <rect x="16" y="10" width="30" height="80" rx="14" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <circle cx="31" cy="32" r="10" fill="#F7F6F3" stroke={LINE} strokeWidth="1.2" />
    <circle cx="31" cy="32" r="4" fill={LINE} />
    <rect x="24" y="52" width="14" height="26" rx="7" fill="#F7F6F3" stroke={LINE} strokeWidth="1" />
    {/* 실외기 */}
    <rect x="56" y="40" width="34" height="34" rx="5" fill={BODY_DARK} stroke={LINE} strokeWidth="1.5" />
    <circle cx="73" cy="57" r="11" fill="#F7F6F3" stroke={LINE} strokeWidth="1.2" />
    <path d="M73 57 l0 -8 M73 57 l7 4 M73 57 l-7 4" stroke={LINE} strokeWidth="1.6" strokeLinecap="round" />
    <rect x="60" y="74" width="26" height="4" rx="2" fill={LINE} />
  </Svg>
);

/** 식기세척기 — 빌트인 도어 + 상단 컨트롤 */
const DishWasher = (p: Props) => (
  <Svg {...p}>
    <rect x="18" y="14" width="64" height="72" rx="6" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <rect x="18" y="14" width="64" height="12" rx="6" fill={DEEP} opacity="0.85" />
    <circle cx="30" cy="20" r="2" fill={ACCENT} />
    <rect x="26" y="34" width="48" height="44" rx="4" fill="#F7F6F3" stroke={LINE} strokeWidth="1.2" />
    <circle cx="42" cy="56" r="8" fill="none" stroke={LINE} strokeWidth="1.4" />
    <circle cx="58" cy="62" r="6" fill="none" stroke={LINE} strokeWidth="1.4" />
    <rect x="34" y="28" width="32" height="3" rx="1.5" fill={LINE} />
  </Svg>
);

/** 바스에어시스템 — 욕실 천장형 환기/건조 유닛 */
const BathAir = (p: Props) => (
  <Svg {...p}>
    <rect x="14" y="22" width="72" height="34" rx="6" fill={BODY} stroke={LINE} strokeWidth="1.5" />
    <rect x="22" y="30" width="26" height="18" rx="3" fill="#F7F6F3" stroke={LINE} strokeWidth="1" />
    <path d="M24 34 h22 M24 39 h22 M24 44 h22" stroke={LINE} strokeWidth="1.2" />
    <circle cx="66" cy="39" r="9" fill="#F7F6F3" stroke={LINE} strokeWidth="1.2" />
    <path d="M66 39 l0 -6 M66 39 l5 3 M66 39 l-5 3" stroke={LINE} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M34 64 c0 6 -6 6 -6 12 M50 64 c0 6 -6 6 -6 12 M66 64 c0 6 -6 6 -6 12" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
  </Svg>
);

/** 구독 — 케어 전/후 비교 (좌우 박스 + 화살표) */
const Subscription = (p: Props) => (
  <Svg {...p}>
    <rect x="10" y="28" width="32" height="44" rx="5" fill={BODY_DARK} stroke={LINE} strokeWidth="1.5" />
    <path d="M16 60 h20 M16 52 h14" stroke={LINE} strokeWidth="2" strokeLinecap="round" />
    <rect x="58" y="28" width="32" height="44" rx="5" fill="#fff" stroke={ACCENT} strokeWidth="1.6" />
    <path d="M64 58 l6 6 12 -14" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M45 50 h10 m0 0 l-4 -4 m4 4 l-4 4" stroke={DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const mockups: Record<string, (p: Props) => JSX.Element> = {
  refrigerator: Refrigerator,
  washer: Washer,
  washcombo: WashCombo,
  styler: Styler,
  tv: TvMock,
  vacuum: Vacuum,
  airconditioner: AirConditioner,
  cooking: DishWasher,
  dishwasher: DishWasher,
  bathair: BathAir,
  subscription: Subscription,
};

const ProductMockup = ({ productId, className }: { productId: string; className?: string }) => {
  const Comp = mockups[productId] || Subscription;
  return <Comp className={className} />;
};

export default ProductMockup;
