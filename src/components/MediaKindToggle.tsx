import { Image as ImageIcon, Play } from "lucide-react";

/** 메인 미디어의 표시 유형: 사진 또는 영상 */
export type MediaKind = "image" | "video";

interface MediaKindToggleProps {
  value: MediaKind;
  onChange: (value: MediaKind) => void;
  /** 토글 바깥 여백 (기본: 아래 여백) */
  wrapperClassName?: string;
}

/**
 * 사진/영상 전환 슬라이딩 토글 (케어 상세와 동일한 디자인)
 * - 연회색 트랙 안에서 레드 슬라이더가 이동
 * - 영상이 없는 미디어에는 렌더링하지 않는다(호출 측에서 분기)
 */
const MediaKindToggle = ({ value, onChange, wrapperClassName = "mb-3" }: MediaKindToggleProps) => (
  <div className={`flex min-h-[44px] justify-end ${wrapperClassName}`}>
    <div className="relative grid grid-cols-2 rounded-full bg-gray-100 p-1" role="group" aria-label="미디어 유형 선택">
      <div
        aria-hidden
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand-accent shadow-sm transition-transform duration-300 ease-out ${
          value === "video" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {(["image", "video"] as MediaKind[]).map((type) => {
        const isOn = value === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            aria-pressed={isOn}
            className={`relative z-10 flex h-9 min-w-[92px] items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 ${
              isOn ? "text-brand-accent-foreground" : "text-gray-500"
            }`}
          >
            {type === "image" ? <ImageIcon className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
            {type === "image" ? "사진" : "영상"}
          </button>
        );
      })}
    </div>
  </div>
);

export default MediaKindToggle;
