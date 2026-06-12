import { Sparkles } from "lucide-react";
import ProductSelection from "./ProductSelection";

const Maintenance = () => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Blurred background of existing product page */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none"
      style={{ filter: "blur(16px) saturate(1.1)", transform: "scale(1.05)" }}
    >
      <ProductSelection />
    </div>

    {/* Soft overlay to soften the background */}
    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" aria-hidden />

    {/* Foreground notice */}
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div
        className="w-full max-w-md rounded-3xl border border-white/60 bg-white/80 px-8 py-10 text-center shadow-2xl backdrop-blur-xl"
        style={{ wordBreak: "keep-all", overflowWrap: "break-word", lineBreak: "auto" }}
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100">
          <Sparkles className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl leading-snug">
          뷰킷 업, Coming Soon~!
        </h1>
        <p className="mb-2 text-base text-gray-600 leading-relaxed">
          더 나은 모습으로 찾아뵙기 위해
          <br />
          잠시 자리를 비웠어요.
        </p>
        <p className="text-sm text-gray-400">
          이용에 불편을 드려 죄송합니다.
        </p>
      </div>
    </div>
  </div>
);

export default Maintenance;
