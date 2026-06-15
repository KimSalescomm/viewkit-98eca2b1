import { Button } from "@/components/ui/button";

/**
 * /consult-demo
 * 상담 화면 전용 스타일 레이어 데모. 기존 페이지에 영향 없음.
 * 모든 스타일은 .consult-mode 하위에서만 작동.
 */
const ConsultDemo = () => {
  return (
    <div className="consult-mode has-consult-bottom-bar">
      <header className="consult-header">
        <div className="consult-shell flex items-center justify-between !py-4">
          <div className="flex items-center gap-3">
            <span className="recommendation-badge">추천</span>
            <h1 className="text-consult-title">LG 구독 상담</h1>
          </div>
          <span className="text-legal">강서본점 · 명장 홍길동</span>
        </div>
      </header>

      <main className="consult-shell space-y-6">
        <section className="space-y-2">
          <p className="text-consult-subtitle">
            고객님 라이프스타일에 맞는 구독 모델을 골라보세요.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="consult-card">
            <h3 className="text-benefit">STEM 냉장고</h3>
            <p className="text-consult-subtitle">
              모듈형 디자인으로 라이프스타일에 따라 변신.
            </p>
            <p className="model-code mt-2 text-sm text-muted-foreground">M-S402MWE</p>
          </article>

          <article className="consult-card-selected">
            <div className="flex items-center justify-between">
              <h3 className="text-benefit">워시타워 콤보</h3>
              <span className="recommendation-badge">베스트</span>
            </div>
            <p className="text-consult-subtitle">
              세탁 + 건조를 한 번에. 공간 효율 최상.
            </p>
            <p className="model-code mt-2 text-sm text-muted-foreground">WL22WSV</p>
          </article>
        </section>

        <section className="price-panel">
          <p className="text-consult-subtitle">월 구독료</p>
          <p className="price-main">59,900원</p>
          <p className="text-legal mt-1">6년 약정 · 무료 케어십 포함</p>
        </section>

        <section className="benefit-box">
          <span className="text-benefit">+ 카드 제휴 시 월 8,000원 추가 할인</span>
        </section>

        <section className="manager-note">
          <p className="text-manager-note">
            매니저 메모: 고객님 신혼 가구 · 30평형대 · 공간 효율 최우선.
            워시타워 콤보 + STEM 냉장고 조합 제안 추천.
          </p>
        </section>
      </main>

      <div className="consult-bottom-bar">
        <div className="consult-shell flex items-center gap-3 !py-0">
          <Button variant="consultSecondary" size="touch" className="flex-1">
            견적 저장
          </Button>
          <Button variant="sales" size="touchLg" className="flex-[2]">
            구독 신청하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsultDemo;
