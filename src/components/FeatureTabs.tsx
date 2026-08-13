interface FeatureTabsProps {
  tabs: { label: string }[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
  scrollable?: boolean;
}

/**
 * 공통 탭 컴포넌트 (알약/필 버튼 형태)
 * - 선택: 보라색 단색 배경 + 흰색 텍스트
 * - 미선택: 흰색 배경 + 얇은 테두리 + 어두운 회색 텍스트
 * 모든 제품 페이지의 비교/선택 탭에서 이 컴포넌트만 사용합니다.
 */
const FeatureTabs = ({ tabs, activeIndex, onChange, className = "", scrollable = false }: FeatureTabsProps) => {
  if (!tabs || tabs.length === 0) return null;

  return (
    <div
      className={`mb-4 sm:mb-5 flex gap-2 sm:gap-2.5 ${
        scrollable ? "overflow-x-auto scrollbar-hide pb-1" : "flex-wrap justify-center"
      } ${className}`}
      role="tablist"
    >
      {tabs.map((tab, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(idx)}
            className={`min-h-[44px] whitespace-nowrap rounded-full px-4 sm:px-5 text-sm sm:text-base font-semibold border transition-colors ${
              isActive
                ? "text-white border-transparent shadow-sm"
                : "bg-white text-gray-800 border-gray-200"
            }`}
            style={isActive ? { backgroundColor: "hsl(var(--tab-accent))" } : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default FeatureTabs;
