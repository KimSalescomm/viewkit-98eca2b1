import { Link } from "react-router-dom";

interface BackButtonProps {
  /** 이동할 경로 (기본: 제품 선택 화면) */
  to?: string;
  /** 버튼 라벨 (기본: 제품 선택) */
  label?: string;
  className?: string;
}

/**
 * 모든 제품/서비스 페이지에서 공통으로 사용하는 뒤로가기 버튼.
 * 스타일 변경은 이 컴포넌트에서만 관리합니다.
 */
const BackButton = ({ to = "/", label = "제품 선택", className = "" }: BackButtonProps) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/70 px-4 h-11 text-[15px] font-semibold text-gray-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:bg-white transition-colors ${className}`}
  >
    <span className="text-base leading-none" aria-hidden="true">←</span>
    <span>{label}</span>
  </Link>
);

export default BackButton;
