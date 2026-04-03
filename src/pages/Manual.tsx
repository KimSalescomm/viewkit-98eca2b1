import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Smartphone, ChevronRight, Gamepad2, Search, Info, CheckCircle2, ArrowLeft } from "lucide-react";

// Manual assets
import balanceQ1 from "@/assets/manual/balance-q1.jpg";
import balanceQ2 from "@/assets/manual/balance-q2.jpg";
import balanceQ3 from "@/assets/manual/balance-q3.jpg";
import balanceResult from "@/assets/manual/balance-result.jpg";
import emojiSilent from "@/assets/manual/emoji-silent.jpg";
import standbymeScreen1 from "@/assets/manual/standbyme-screen1.jpg";
import internetIcon from "@/assets/manual/internet-icon.png";
import standbymeScreen2 from "@/assets/manual/standbyme-screen2.jpg";
import viewkitList from "@/assets/manual/viewkit-list.jpg";
import viewkitDetail from "@/assets/manual/viewkit-detail.jpg";

/* ── Shared sub-components ── */

const SectionHeader = ({ number, title }: { number: number; title: string }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <span className="w-7 h-7 rounded-lg bg-manual-indigo text-white text-xs font-bold flex items-center justify-center">
      {number}
    </span>
    <h2 className="text-lg font-bold text-foreground">{title}</h2>
  </div>
);

const PainCard = ({ image, text }: { image: string; text: string }) => (
  <div className="bg-card rounded-2xl p-3.5 manual-shadow-card flex flex-col items-center text-center">
    <img src={image} alt="" className="w-10 h-10 rounded-full mb-2" />
    <p className="text-xs text-foreground leading-relaxed font-medium">{text}</p>
  </div>
);

const AppCard = ({ title, tag, description, href }: { title: string; tag: string; description: string; href?: string }) => {
  const content = (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 hover:bg-white/25 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-sm">{title}</span>
          <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{tag}</span>
        </div>
        <p className="text-xs opacity-80 leading-relaxed">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 opacity-60 shrink-0" />
    </div>
  );
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
};

/* ── Sections ── */

const HeroSection = () => (
  <section className="manual-gradient-hero px-5 pt-12 pb-10 text-white">
    <div className="flex items-center gap-2 mb-6">
      <Smartphone className="w-5 h-5" />
      <span className="text-sm font-medium opacity-90">앱 사용 가이드</span>
    </div>
    <h1 className="text-xl font-bold leading-snug mb-2">읽고 외워서 말하는 상담이</h1>
    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
      <span className="text-lg font-extrabold">터치하고 보며 말하는 상담으로</span>
    </div>
    <p className="text-sm leading-relaxed opacity-90 mb-8">
      가전 상담은 수많은 제품과 정보 속에서 고객에게 꼭 맞는 선택을 제안하는 일입니다.
      <br />
      세일즈 앱을 통해 <strong className="font-bold">숨은 니즈를 빠르게 파악</strong>하고,{" "}
      <strong className="font-bold">화면 기반으로 쉽고 명확하게 상담</strong>해 보세요!
    </p>
    <div className="flex flex-col gap-3">
      <AppCard title="가전 밸런스 게임" tag="# 니즈파악" description="생활 밀착형 질문으로 고객 취향을 빠르게 파악" href="https://refbalancegame.lovable.app/refrigerator" />
      <AppCard title="뷰킷 업" tag="# 증거제시" description="작동 원리·비교·설치까지 보면서 쉽게 설명" href="https://viewkit.lovable.app/product/refrigerator" />
    </div>
  </section>
);

const WhenToUseSection = () => (
  <section className="px-5 py-8">
    <SectionHeader number={2} title="언제 사용하나요?" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
      고객들의 반응도 다양하고, 취향도 다양해{" "}
      <strong className="text-foreground font-semibold">점점 길고 힘들어지는 니즈파악!</strong>
      <br />
      홈페이지, 유튜브에 가득한{" "}
      <strong className="text-foreground font-semibold">이미지, 영상 … 바로 꺼내 보여주기 어려울 때!</strong>
      <br />
      두 개의 앱이 상담을 도와 드립니다.
    </p>
    <div className="grid grid-cols-2 gap-3 mb-8">
      <PainCard image={emojiSilent} text={`"아 ... 넹 ..." 파악이 어려운 고객`} />
      <PainCard image={emojiSilent} text={`"봐야 아는데 (답답)" 말로는 부족할 때!`} />
    </div>
    <div className="relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
      <div className="flex justify-between relative">
        {[
          { label: "고객맞이", active: false },
          { label: "니즈파악", active: true, app: "밸런스 게임", icon: <Gamepad2 className="w-3.5 h-3.5" /> },
          { label: "제품/구독 상담", active: true, app: "뷰킷 업", icon: <Search className="w-3.5 h-3.5" /> },
          { label: "가격 상담", active: false },
          { label: "마무리", active: false },
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 z-10">
            <div className={`w-3 h-3 rounded-full ${step.active ? "bg-manual-indigo" : "bg-border"}`} />
            <span className={`text-[10px] leading-tight text-center ${step.active ? "text-manual-indigo font-bold" : "text-muted-foreground"}`}>
              {step.label}
            </span>
            {step.app && (
              <span className="inline-flex items-center gap-0.5 text-[9px] bg-manual-tag-bg text-manual-tag-text rounded-full px-1.5 py-0.5 font-medium">
                {step.icon}
                {step.app}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SetupSection = () => (
  <section className="px-5 py-8 manual-gradient-section">
    <SectionHeader number={3} title="사용 환경 세팅하기" />
    <div className="flex flex-col gap-4">
      <div className="bg-card rounded-2xl p-5 manual-shadow-card">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-manual-indigo text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground mb-1.5">시연용 '스탠바이미' 준비</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">제품 진열 존에 시연용 스탠바이미를 설치해 주세요.</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-2xl p-5 pb-7 manual-shadow-card">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-manual-indigo text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground mb-1.5">'인터넷' 앱에서 URL 입력</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">인터넷 앱을 실행한 뒤 아래 주소를 직접 입력하세요.</p>
            <div className="flex items-center gap-5 mt-2">
              <div className="flex flex-col items-center shrink-0">
                <img src={internetIcon} alt="인터넷 앱 아이콘" className="w-24 h-24 object-contain rounded-2xl" />
                <span className="text-[11px] text-muted-foreground mt-1 font-medium">인터넷</span>
              </div>
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-manual-indigo bg-manual-tag-bg rounded px-1.5 py-0.5 shrink-0">밸런스 게임</span>
                  <span className="text-xs text-muted-foreground font-mono truncate">refbalancegame.lovable.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-manual-indigo bg-manual-tag-bg rounded px-1.5 py-0.5 shrink-0">뷰킷</span>
                  <span className="text-xs text-muted-foreground font-mono truncate">viewkit.lovable.app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-2xl p-5 manual-shadow-card">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-manual-indigo text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground mb-1.5">홈 화면에 바로가기 추가</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              설정 메뉴에서 '홈 화면에 바로가기 추가'를 선택하면,
              <br />다음부턴 URL 입력이 필요 없어요!
            </p>
            <img src={standbymeScreen2} alt="홈 화면 바로가기 추가 화면" className="w-full max-w-[180px] mx-auto rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BalanceGameSection = () => (
  <section className="px-5 py-8">
    <SectionHeader number={4} title="'밸런스 게임' 사용법" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
      어떤 질문에도 시큰둥하거나, 애매한 답을 해 고객 취향을 알기가 어려울 때가 있죠?{" "}
      <strong className="text-foreground font-semibold">가전 밸런스 게임</strong>을 권해보세요.
      <br />
      고객이 직접 답을 고르는 과정은 본인의 선택인 듯 여겨져,{" "}
      <strong className="text-foreground font-semibold">이후 제품 추천이 더 수월해지고 고객 취향도 단번에 파악</strong>할 수 있습니다.
    </p>
    <div className="bg-card rounded-2xl p-4 manual-shadow-card mb-4">
      <h3 className="text-sm font-bold text-foreground mb-3">앱 화면 미리보기</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
        {[
          { src: balanceQ1, label: "질문 1: 마트 장 볼 때 나는?" },
          { src: balanceQ2, label: "질문 2: 주방 인테리어에서 가장 중요한 건?" },
          { src: balanceQ3, label: "질문 3: 좋아하는 음료 스타일은?" },
          { src: balanceResult, label: "결과: 맞춤 제품 추천" },
        ].map((item, i) => (
          <div key={i} className="shrink-0 w-[55%] snap-center">
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <img src={item.src} alt={item.label} className="w-full h-auto" />
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1.5 leading-tight">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-card rounded-2xl p-5 manual-shadow-card mb-4">
      <h3 className="text-sm font-bold text-foreground mb-4">사용 흐름</h3>
      <div className="flex flex-col gap-0">
        {[
          { step: "생활 밀착형 질문 제시", desc: "마트 장 볼 때 나는? 주방 인테리어에서 가장 중요한 건?" },
          { step: "고객이 선택지 터치", desc: "두 가지 선택지 중 본인 취향에 맞는 답을 고릅니다" },
          { step: "취향 분석 결과 확인", desc: "선택 기반으로 고객 취향 유형이 자동 분석됩니다" },
          { step: "맞춤 제품 추천 연결", desc: "분석 결과를 바탕으로 적합한 제품을 자연스럽게 제안" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 relative">
            {i < 3 && <div className="absolute left-[11px] top-7 w-0.5 h-[calc(100%-12px)] bg-border" />}
            <div className="w-6 h-6 rounded-full bg-manual-indigo text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 z-10">
              {i + 1}
            </div>
            <div className="pb-5 flex-1">
              <p className="text-xs font-bold text-foreground mb-0.5">{item.step}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-manual-tag-bg rounded-2xl p-4 flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-manual-indigo shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-foreground mb-1">상담 TIP</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          "잠깐 재미있는 게임 하나 해볼까요?" 라고 가볍게 권유하면 고객 참여율이 높아집니다.
          <br />
          결과가 나오면 "역시 OO 타입이시네요!" 라며 자연스럽게 제품 추천으로 연결하세요.
        </p>
      </div>
    </div>
  </section>
);

const ViewKitSection = () => (
  <section className="px-5 py-8 manual-gradient-section">
    <SectionHeader number={5} title="'뷰킷' 앱 사용법" />
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
      영상이나 이미지를 보여주면 더 이해가 쉬운 특장점들을 모았습니다.{" "}
      <strong className="text-foreground font-semibold">특장점 카드를 누르면 상세 화면으로 이동</strong>해요.
      <br />
      참고로 <strong className="text-manual-indigo font-semibold">파란 박스</strong>를 보면 어떤 특장점을 다루는지 간단하게 파악할 수 있어요.
    </p>
    <div className="bg-card rounded-2xl p-4 manual-shadow-card mb-4">
      <h3 className="text-sm font-bold text-foreground mb-3">앱 화면 미리보기</h3>
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden border border-border shadow-sm">
            <img src={viewkitList} alt="뷰킷 제품 목록 화면" className="w-full h-auto" />
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-1.5">제품별 특장점 카드</p>
        </div>
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden border border-border shadow-sm">
            <img src={viewkitDetail} alt="뷰킷 상세 화면" className="w-full h-auto" />
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-1.5">상세 설명 화면</p>
        </div>
      </div>
    </div>
    <div className="bg-card rounded-2xl p-5 manual-shadow-card mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-manual-indigo" />
        <h3 className="text-sm font-bold text-foreground">파란 박스 = 특장점 키워드</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        카드 상단의 파란색 박스를 보면 어떤 특장점을 다루는지 빠르게 파악할 수 있습니다.
        <br />
        카드를 터치하면 영상·이미지가 포함된 상세 설명으로 이동합니다.
      </p>
    </div>
    <div className="bg-card rounded-2xl p-5 manual-shadow-card">
      <h3 className="text-sm font-bold text-foreground mb-3">활용 예시</h3>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "설치 체크", desc: "우리 집에 어떻게 설치하죠?" },
          { label: "작동 원리", desc: "이 기능이 어떻게 작동하나요?" },
          { label: "제품 비교", desc: "이 제품과 저 제품 차이는?" },
          { label: "핵심 특장점", desc: "이 제품만의 장점이 뭔가요?" },
        ].map((ex) => (
          <div key={ex.label} className="bg-manual-tag-bg rounded-xl p-3">
            <span className="text-[10px] font-bold text-manual-indigo mb-1 block">{ex.label}</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{ex.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Sticky Nav ── */

const sections = [
  { id: "manual-hero", label: "소개" },
  { id: "manual-when", label: "활용" },
  { id: "manual-setup", label: "세팅" },
  { id: "manual-balance", label: "밸런스" },
  { id: "manual-viewkit", label: "뷰킷" },
];

const ManualStickyNav = ({ onBack }: { onBack: string }) => {
  const [active, setActive] = useState("manual-hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center">
        <Link to={onBack} className="px-3 py-3 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex overflow-x-auto no-scrollbar">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors ${
                active === s.id ? "text-manual-indigo border-b-2 border-manual-indigo" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

/* ── Main Page ── */

const Manual = () => {
  const { productId } = useParams<{ productId: string }>();
  const backPath = productId ? `/product/${productId}` : "/";

  return (
    <div className="max-w-xl mx-auto sm:max-w-4xl min-h-screen bg-background text-center">
      <ManualStickyNav onBack={backPath} />
      <div id="manual-hero"><HeroSection /></div>
      <div id="manual-when"><WhenToUseSection /></div>
      <div id="manual-setup"><SetupSection /></div>
      <div id="manual-balance"><BalanceGameSection /></div>
      <div id="manual-viewkit"><ViewKitSection /></div>
      <footer className="px-5 py-6 text-center">
        <p className="text-[11px] text-muted-foreground">© 2026 세일즈 앱 가이드 · 내부 교육용</p>
      </footer>
    </div>
  );
};

export default Manual;
