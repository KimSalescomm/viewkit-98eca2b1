import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { BRANCH_GROUPS, BRANCH_CODE_MAP } from "@/data/branches";

const StoreCodes = () => {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BRANCH_GROUPS.map((g) => ({
      manager: g.manager,
      items: g.branches
        .map((name) => ({ name, code: BRANCH_CODE_MAP[name] ?? "-" }))
        .filter(
          ({ name, code }) =>
            !q ||
            name.toLowerCase().includes(q) ||
            code.toLowerCase().includes(q),
        ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const total = useMemo(
    () => Object.keys(BRANCH_CODE_MAP).length,
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-purple-50/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <span className="text-xs text-gray-500">총 {total}개 매장</span>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            매장 코드 목록
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            매장명과 GA4 집계용 영문 코드 매핑입니다. 관리자(SC) · 유관부서(KOR)는
            예약 코드로 별도 운영됩니다.
          </p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="매장명 또는 코드 검색 (예: 강서, GSB)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              예약 코드
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                <span className="text-gray-700">관리자</span>
                <code className="font-mono text-purple-700">SC</code>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                <span className="text-gray-700">유관부서</span>
                <code className="font-mono text-purple-700">KOR</code>
              </div>
            </div>
          </section>

          {groups.map((g) => (
            <section
              key={g.manager}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  {g.manager}
                </h2>
                <span className="text-xs text-gray-500">{g.items.length}개</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {g.items.map(({ name, code }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <span
                      className="text-gray-800 break-keep"
                      style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                    >
                      {name}
                    </span>
                    <code className="font-mono text-xs text-purple-700 shrink-0">
                      {code}
                    </code>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {groups.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-10">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCodes;
