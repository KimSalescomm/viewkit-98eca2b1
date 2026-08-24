import { cn } from "@/lib/utils";

/**
 * 사이트 전역 공통 콘텐츠 컨테이너.
 * 모든 페이지(목록 / 상세 / 향후 추가 페이지)는 이 컴포넌트를 사용해
 * 동일한 max-width · 좌우 padding 규칙을 공유한다.
 * 페이지마다 개별적으로 폭을 지정하지 않는다.
 */
export const PAGE_CONTENT_WIDTH = "w-full max-w-xl sm:max-w-4xl lg:max-w-6xl mx-auto";
export const PAGE_CONTENT_PADDING = "px-5 sm:px-8";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** 세로 padding (기본값 대신 지정 가능) */
  verticalPadding?: string;
  /** true면 세로 padding 없이 폭/좌우 여백만 적용 (sticky 헤더 내부 등) */
  bare?: boolean;
  /** 렌더링할 엘리먼트 (기본 div) */
  as?: "div" | "main" | "section";
}

const PageContainer = ({
  children,
  className,
  verticalPadding = "py-6 sm:py-8",
  bare = false,
  as: Tag = "div",
}: PageContainerProps) => (
  <Tag
    className={cn(
      PAGE_CONTENT_PADDING,
      !bare && verticalPadding,
      PAGE_CONTENT_WIDTH,
      className,
    )}
  >
    {children}
  </Tag>
);

export default PageContainer;
