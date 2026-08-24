import SafeImage from "@/components/SafeImage";

interface BlurMediaFrameProps {
  src: string;
  alt: string;
  /** 컨테이너 비율 (tailwind aspect 클래스). imageFit="original"일 때는 무시됩니다. */
  aspectClassName?: string;
  /** 바깥 카드와 동일한 radius 클래스 */
  radiusClassName?: string;
  className?: string;
  objectPosition?: string;
  loading?: "lazy" | "eager";
  /** 이미지 표시 방식: original = 원본 비율 유지, 블러 배경 없음 */
  imageFit?: "cover" | "contain" | "original";
}

/**
 * 블러 확장 배경 프레임 (스포티파이/애플뮤직 플레이어 스타일).
 * 확대 + 블러 처리한 원본 이미지를 배경으로 깔고,
 * 그 위에 원본을 object-contain으로 올려 구도가 잘리지 않게 노출.
 * imageFit="original"이면 원본 비율을 유지하고 블러 배경을 제거합니다.
 */
const BlurMediaFrame = ({
  src,
  alt,
  aspectClassName = "aspect-[4/3]",
  radiusClassName = "rounded-[14px]",
  className = "",
  objectPosition,
  loading = "lazy",
  imageFit = "cover",
}: BlurMediaFrameProps) => {
  const isOriginal = imageFit === "original";

  return (
    <div
      className={`w-full overflow-hidden bg-muted ${isOriginal ? "" : aspectClassName} ${radiusClassName} ${className}`}
    >
      {/* 확대 + 블러 배경 (original일 때는 제거) */}
      {!isOriginal && (
        <SafeImage
          src={src}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding="async"
          className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl opacity-70"
        />
      )}
      {/* 원본 이미지 */}
      <SafeImage
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
        className={
          isOriginal
            ? "h-auto w-full object-contain"
            : "absolute inset-0 h-full w-full object-contain"
        }
      />
    </div>
  );
};

export default BlurMediaFrame;
