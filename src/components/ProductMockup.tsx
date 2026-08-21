// 제품별 라인 아이콘 (간결한 스트로크 스타일, 배경박스 없이 사용)
// - 모두 100x100 viewBox / currentColor 스트로크로 통일해 카드 간 볼륨감을 맞춤
type Props = { className?: string };

const Svg = ({ className, children }: Props & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

/** 냉장고 — 4도어 (프렌치 도어) */
const Refrigerator = (p: Props) => (
  <Svg {...p}>
    <rect x="24" y="12" width="52" height="76" rx="6" />
    <line x1="24" y1="50" x2="76" y2="50" />
    <line x1="50" y1="12" x2="50" y2="88" />
    <line x1="42" y1="34" x2="42" y2="42" />
    <line x1="58" y1="34" x2="58" y2="42" />
    <line x1="42" y1="60" x2="42" y2="68" />
    <line x1="58" y1="60" x2="58" y2="68" />
  </Svg>
);

/** 워시콤보 — 드럼 1개 + 하단 베이스 */
const WashCombo = (p: Props) => (
  <Svg {...p}>
    <rect x="24" y="14" width="52" height="54" rx="6" />
    <line x1="24" y1="28" x2="76" y2="28" />
    <circle cx="50" cy="48" r="13" />
    <rect x="24" y="72" width="52" height="16" rx="4" />
  </Svg>
);

/** 워시타워 — 드럼 2개 상하 적층 */
const WashTower = (p: Props) => (
  <Svg {...p}>
    <rect x="26" y="10" width="48" height="80" rx="6" />
    <line x1="26" y1="24" x2="74" y2="24" />
    <circle cx="50" cy="40" r="12" />
    <line x1="26" y1="56" x2="74" y2="56" />
    <circle cx="50" cy="73" r="12" />
  </Svg>
);

/** 의류관리기 (스타일러) — 슬림 세로 캐비닛 */
const Styler = (p: Props) => (
  <Svg {...p}>
    <rect x="34" y="8" width="32" height="84" rx="5" />
    <line x1="40" y1="20" x2="60" y2="20" />
    <line x1="60" y1="48" x2="60" y2="58" />
  </Svg>
);

/** TV */
const TvMock = (p: Props) => (
  <Svg {...p}>
    <rect x="14" y="22" width="72" height="46" rx="6" />
    <line x1="50" y1="68" x2="50" y2="78" />
    <line x1="34" y1="78" x2="66" y2="78" />
  </Svg>
);

/** 청소로봇 — 올인원 스테이션 + 로봇 */
const Vacuum = (p: Props) => (
  <Svg {...p}>
    <rect x="28" y="10" width="44" height="80" rx="6" />
    <line x1="28" y1="40" x2="72" y2="40" />
    <path d="M34 90 v-18 h32 v18" />
    <circle cx="50" cy="80" r="7" />
  </Svg>
);

/** 에어컨 — 사각 타워형 스탠드 + 벽걸이 */
const AirConditioner = (p: Props) => (
  <Svg {...p}>
    <rect x="18" y="14" width="24" height="74" rx="4" />
    <circle cx="30" cy="32" r="6" />
    <line x1="24" y1="56" x2="36" y2="56" />
    <rect x="56" y="34" width="30" height="14" rx="4" />
    <line x1="60" y1="56" x2="82" y2="56" />
  </Svg>
);

/** 식기세척기 */
const DishWasher = (p: Props) => (
  <Svg {...p}>
    <rect x="24" y="14" width="52" height="72" rx="6" />
    <line x1="24" y1="30" x2="76" y2="30" />
    <line x1="34" y1="22" x2="52" y2="22" />
    <line x1="34" y1="76" x2="66" y2="76" />
    <circle cx="50" cy="52" r="10" />
  </Svg>
);

/** 바스에어시스템 */
const BathAir = (p: Props) => (
  <Svg {...p}>
    <rect x="16" y="24" width="68" height="30" rx="8" />
    <line x1="28" y1="34" x2="52" y2="34" />
    <line x1="28" y1="44" x2="52" y2="44" />
    <circle cx="68" cy="39" r="6" />
    <path d="M34 66 c0 6 -6 6 -6 12 M50 66 c0 6 -6 6 -6 12 M66 66 c0 6 -6 6 -6 12" />
  </Svg>
);

/** 가전 구독 — 캘린더 */
const Subscription = (p: Props) => (
  <Svg {...p}>
    <rect x="22" y="26" width="56" height="52" rx="6" />
    <line x1="22" y1="42" x2="78" y2="42" />
    <line x1="36" y1="18" x2="36" y2="30" />
    <line x1="64" y1="18" x2="64" y2="30" />
    <line x1="38" y1="60" x2="42" y2="60" />
    <line x1="52" y1="60" x2="56" y2="60" />
    <line x1="66" y1="60" x2="70" y2="60" />
  </Svg>
);

const mockups: Record<string, (p: Props) => JSX.Element> = {
  refrigerator: Refrigerator,
  washer: WashTower,
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
