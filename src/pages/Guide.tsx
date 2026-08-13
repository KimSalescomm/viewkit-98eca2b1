import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Guide() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 shrink-0">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/70 px-4 h-9 text-[13px] font-semibold text-gray-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>홈으로</span>
          </Link>
        </div>
      </div>

      {/* Embedded guide */}
      <main className="flex-1 w-full h-[calc(100vh-3.5rem)]">
        <iframe
          src="https://viewkitup-showcase-pages.lovable.app"
          title="View Kit UP Showcase"
          className="w-full h-full border-0"
          allow="fullscreen"
          loading="lazy"
        />
      </main>
    </div>
  );
}
