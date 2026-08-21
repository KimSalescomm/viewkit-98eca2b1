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

/** 냉장고 */
const Refrigerator = (p: Props) => (
  <Svg {...p}>
    <rect x="28" y="14" width="44" height="72" rx="8" />
    <line x1="28" y1="46" x2="72" y2="46" />
    <line x1="60" y1="30" x2="60" y2="38" />
    <line x1="60" y1="56" x2="60" y2="64" />
  </Svg>
);

/** 세탁기 / 워시콤보 */
const Washer = (p: Props) => (
  <Svg {...p}>
    <rect x="22" y="18" width="56" height="64" rx="8" />
    <line x1="22" y1="34" x2="78" y2="34" />
    <circle cx="50" cy="58" r="15" />
  </Svg>
);

/** 워시타워 / 스타일러 */
const Styler = (p: Props) => (
  <Svg {...p}>
    <rect x="28" y="14" width="44" height="72" rx="8" />
    <path d="M50 30 l8 6 -3 16 h-10 l-3 -16 z" />
    <line x1="62" y1="60" x2="62" y2="70" />
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

/** 청소로봇 */
const Vacuum = (p: Props) => (
  <Svg {...p}>
    <circle cx="50" cy="56" r="26" />
    <circle cx="50" cy="56" r="9" />
    <line x1="50" y1="30" x2="50" y2="22" />
  </Svg>
);

/** 에어컨 (실내기 + 실외기) */
const AirConditioner = (p: Props) => (
  <Svg {...p}>
    <rect x="16" y="16" width="26" height="68" rx="12" />
    <circle cx="29" cy="36" r="7" />
    <rect x="56" y="40" width="30" height="30" rx="6" />
    <circle cx="71" cy="55" r="8" />
  </Svg>
);

/** 식기세척기 */
const DishWasher = (p: Props) => (
  <Svg {...p}>
    <rect x="22" y="18" width="56" height="64" rx="8" />
    <line x1="22" y1="32" x2="78" y2="32" />
    <circle cx="44" cy="56" r="9" />
    <circle cx="62" cy="64" r="6" />
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

/** 구독 — 전/후 비교 */
const Subscription = (p: Props) => (
  <Svg {...p}>
    <rect x="12" y="30" width="30" height="40" rx="6" />
    <rect x="58" y="30" width="30" height="40" rx="6" />
    <path d="M45 50 h10 m-4 -4 l4 4 -4 4" />
  </Svg>
);

const mockups: Record<string, (p: Props) => JSX.Element> = {
  refrigerator: Refrigerator,
  washer: Washer,
  washcombo: Washer,
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
