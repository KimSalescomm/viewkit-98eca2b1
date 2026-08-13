import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const HEADER_HEIGHT_PX = 56; // h-14

export default function Guide() {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: "100dvh",
      }}
    >
      {/* Top bar */}
      <header
        className="shrink-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-20"
        style={{ height: HEADER_HEIGHT_PX }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/70 px-4 h-9 text-[13px] font-semibold text-gray-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>홈으로</span>
          </Link>
        </div>
      </header>

      {/* Embedded guide */}
      <main
        className="flex-1 min-h-0 w-full relative"
        style={{
          height: `calc(100dvh - ${HEADER_HEIGHT_PX}px)`,
        }}
      >
        <iframe
          src="https://viewkitup-showcase-pages.lovable.app"
          title="View Kit UP Showcase"
          className="absolute inset-0 w-full h-full block"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="fullscreen"
          loading="lazy"
        />
      </main>
    </div>
  );
}
