import { useState } from "react";
import { createPortal } from "react-dom";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode, Smartphone, X, Copy, Check } from "lucide-react";

interface MobileAccessQRProps {
  storeSlug?: string;
  variant?: "pill" | "segment";
}

const MobileAccessQR = ({ storeSlug, variant = "pill" }: MobileAccessQRProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const PUBLIC_HOST = "viewkit.lovable.app";

  const buildUrl = () => {
    if (typeof window === "undefined") return "";
    const current = new URL(window.location.href);
    // 미리보기(lovableproject.com / lovable.app 서브도메인)에서도 공개 도메인으로 강제
    const publicUrl = new URL(current.pathname + current.search + current.hash, `https://${PUBLIC_HOST}`);
    if (storeSlug) publicUrl.searchParams.set("store_id", storeSlug);
    return publicUrl.toString();
  };

  const url = buildUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "segment"
            ? "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            : "inline-flex h-8 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:border-[#A50034] hover:text-[#A50034] transition-colors shadow-sm"
        }
        title="모바일에서 보기"
      >
        <QrCode className="w-3.5 h-3.5" />
        <span>모바일에서 보기</span>
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <div className="text-center mb-5">
              <div className="inline-flex w-11 h-11 rounded-full bg-[#FBE8EE] items-center justify-center mb-3">
                <Smartphone className="w-5 h-5 text-[#A50034]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">모바일에서 접속하기</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                휴대폰 카메라로 QR을 스캔하면<br />
                현재 페이지가 그대로 열립니다
              </p>
            </div>

            <div className="flex items-center justify-center p-4 bg-white border border-gray-100 rounded-xl mb-4">
              <QRCodeCanvas
                value={url}
                size={220}
                level="M"
                marginSize={2}
                fgColor="#0F172A"
              />
            </div>

            {storeSlug && (
              <div className="text-center mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FBE8EE] text-[#A50034] text-xs font-semibold">
                  지점 코드 {storeSlug}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">링크가 복사되었습니다</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="truncate">{url}</span>
                </>
              )}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default MobileAccessQR;
