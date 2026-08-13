import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Image as ImageIcon, PlayCircle, FileText, Globe, MapPin, Award, ThumbsUp, ChevronLeft } from "lucide-react";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16 ${className}`}>{children}</section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12 text-foreground leading-snug">
    {children}
  </h2>
);

const RedHighlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[hsl(345_85%_42%)]">{children}</span>
);

const Chip = ({ children, tone = "indigo" }: { children: React.ReactNode; tone?: "indigo" | "red" | "dark" }) => {
  const styles = {
    indigo: "bg-[hsl(var(--manual-tag-bg))] text-[hsl(var(--manual-tag-text))]",
    red: "bg-[hsl(345_85%_42%)] text-white",
    dark: "bg-gray-800 text-white",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl manual-shadow-card border border-[hsl(var(--manual-indigo-light))] ${className}`}>
    {children}
  </div>
);

export default function Guide() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--manual-indigo-light))] to-white pb-20">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium relative">
              VIEW KIT
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-400 rounded-full" />
            </span>
          </Link>
          <Link
            to="/subscription"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-full border"
            style={{ color: "hsl(var(--brand))", backgroundColor: "hsl(var(--brand-soft))", borderColor: "#F5C9D5" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            구독
          </Link>
        </div>
      </div>

      {/* HERO */}
      <Section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[hsl(var(--manual-indigo-light))] mb-6">
          <Sparkles className="w-4 h-4 text-[hsl(var(--manual-indigo-dark))]" />
          <span className="text-xs sm:text-sm font-semibold text-[hsl(var(--manual-indigo-dark))]">증거제시 세일즈톡</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5">
          <RedHighlight>‘뷰킷 업’</RedHighlight> 실연 가이드
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          제품의 작동 원리, 유튜브 리뷰 또는 실험, 사용 전후 비교 이미지 등 상담 중 고객에게
          <br className="hidden sm:block" />
          <strong className="text-foreground">‘눈으로 보여줘야 하는 영상·사진’</strong>이 필요할 때가 있죠?
        </p>
        <Card className="mt-8 p-6 sm:p-8 text-left">
          <p className="text-sm sm:text-base leading-relaxed">
            <strong className="text-[hsl(var(--manual-indigo-dark))]">‘뷰킷 업’</strong>은 상담에 도움이 되는
            증거제시용 콘텐츠를 모아 만든 <strong>‘웹 페이지 형태의 세일즈톡’</strong>입니다.
            따로 앱을 설치하고 가입할 필요 없이 <strong>스탠바이미, 상담용 PC, 개인 모바일</strong>에서
            아래 주소로 접속하면 바로 이용할 수 있어요.
          </p>
          <a
            href="https://viewkit.lovable.app"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full manual-gradient-hero text-white font-semibold text-sm sm:text-base shadow-lg hover:opacity-95 transition"
          >
            <Globe className="w-4 h-4" /> https://viewkit.lovable.app
          </a>
        </Card>

        {/* Pain → Solution */}
        <div className="grid sm:grid-cols-2 gap-5 mt-8 text-left">
          <Card className="p-6">
            <div className="text-xs font-bold bg-gray-900 text-white inline-block px-2.5 py-1 rounded mb-4">
              말로 풀기 어려운 설명, <span className="text-yellow-300">터치 한 번에 영상으로!</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">참 좋은데… 말로 하니 전달이 안돼.</p>
            <p className="text-sm font-semibold text-[hsl(var(--manual-indigo-dark))]">
              → 영상을 보여주면, 바로 해결! 나는 편하고, 고객은 이해하기 쉬운 상담!
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-xs font-bold bg-gray-900 text-white inline-block px-2.5 py-1 rounded mb-4">
              상담 중 찾기 힘든 자료, <span className="text-yellow-300">모여 있어 빠르게!</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">분명히 아까는 나왔는데… 그 유튜브가 어디 있지?</p>
            <p className="text-sm font-semibold text-[hsl(var(--manual-indigo-dark))]">
              → 한번에 찾아서 딱! 프로다움이 강조되는 매끄러운 상담
            </p>
          </Card>
        </div>
      </Section>

      {/* SECTION 2 — Content types */}
      <div className="bg-[hsl(40_50%_97%)] border-y border-[hsl(40_40%_90%)]">
        <Section>
          <SectionTitle>
            <RedHighlight>‘뷰킷 업’</RedHighlight>에 접속해 다양한 콘텐츠를 보여주세요!
          </SectionTitle>

          <div className="grid sm:grid-cols-3 gap-5">
            <Card className="p-6 flex flex-col">
              <Chip tone="red"><ImageIcon className="w-3.5 h-3.5" /> 비교 이미지</Chip>
              <h3 className="mt-4 text-lg font-bold">설득을 돕는 결정적인 비교 이미지</h3>
              <p className="text-xs text-[hsl(var(--manual-indigo-dark))] mt-2 font-semibold">구독 케어 전·후 비교 이미지</p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                케어 영상에서 비교 포인트를 기다릴 필요 없이, 1:1 비교 이미지를 활용해 직관적으로
                구독과 케어 서비스의 필요성을 강조할 수 있어요.
              </p>
            </Card>
            <Card className="p-6 flex flex-col">
              <Chip tone="red"><PlayCircle className="w-3.5 h-3.5" /> 작동 원리 동영상</Chip>
              <h3 className="mt-4 text-lg font-bold">이해를 돕는 자세한 작동 원리 동영상</h3>
              <p className="text-xs text-[hsl(var(--manual-indigo-dark))] mt-2 font-semibold">AI 콜드프리 특장점 동영상</p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                좋은 기능인데 말로 설명하기 어려울 때가 있죠? 그래픽 영상으로 제품의 작동 원리와
                특장점을 더 쉽게 이해할 수 있어요.
              </p>
            </Card>
            <Card className="p-6 flex flex-col">
              <Chip tone="red"><FileText className="w-3.5 h-3.5" /> 설치·사용 정보</Chip>
              <h3 className="mt-4 text-lg font-bold">꼭 확인해야 할 설치·사용 정보</h3>
              <p className="text-xs text-[hsl(var(--manual-indigo-dark))] mt-2 font-semibold">STEM 수도관 인테리어 몰딩</p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                나는 분명 설명했는데 고객은 들은 적 없다고? 이해가 어려워 일단 알았다고 했을지도 몰라요.
                눈으로 함께 보며 꼭 안내해야 하는 내용 하나씩 체크해요!
              </p>
            </Card>
          </div>
        </Section>
      </div>

      {/* SECTION 3 — How to start */}
      <Section>
        <SectionTitle>
          <RedHighlight>‘뷰킷 업’</RedHighlight> 최초 접속은 이렇게 진행해 주세요!
        </SectionTitle>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Step 1 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full manual-gradient-hero text-white text-sm font-bold flex items-center justify-center">1</span>
              <Chip tone="red">URL 입력</Chip>
            </div>
            <h3 className="text-lg font-bold mb-3">스탠바이미 ‘인터넷 앱’에서 URL 입력</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              하나의 URL로 다양한 기기에서 편리하게 접속할 수 있어요.
            </p>
            <div className="mt-4 p-3 rounded-lg bg-[hsl(var(--manual-tag-bg))] text-center text-sm font-semibold text-[hsl(var(--manual-indigo-dark))] break-all">
              https://viewkit.lovable.app
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="inline-flex items-center gap-2">
                  <Chip tone="red">스탠바이미</Chip>
                  <span className="text-xs font-bold text-[hsl(345_85%_42%)] inline-flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" /> 강력추천!
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  제품 진열존 근처에 있는 <strong>스탠바이미에서 뷰킷 업</strong>을 활용하면
                  상담을 하며 자연스럽게 영상을 보여줄 수 있어 좋아요!
                </p>
                <div className="mt-3 px-3 py-2 rounded-lg bg-[hsl(40_60%_95%)] text-xs text-foreground leading-relaxed">
                  뷰킷 업 접속한 채로 ‘홈화면에 바로가기 추가’를 누르면
                  스탠바이미 화면에 바로가기 아이콘이 생겨요!
                </div>
              </div>
              <div>
                <Chip tone="red">상담테이블 PC</Chip>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  구독을 권유할 때 <strong>전/후 비교 이미지</strong>를 활용하면
                  케어 서비스의 필요성을 효과적으로 전달할 수 있어요.
                </p>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full manual-gradient-hero text-white text-sm font-bold flex items-center justify-center">2</span>
              <Chip tone="red"><MapPin className="w-3.5 h-3.5" /> 지점 설정</Chip>
            </div>
            <h3 className="text-lg font-bold mb-3">[최초 1회] 지점 설정하기</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>스탠바이미 또는 상담테이블 PC</strong>에서 뷰킷 업에 처음 접속하면
              <strong> 지점 설정</strong> 메뉴가 나타납니다.
            </p>
            <ol className="mt-4 space-y-2.5 text-sm">
              <li className="flex gap-2"><span className="text-[hsl(var(--manual-indigo-dark))] font-bold">·</span><span>매장명을 입력하면 자동으로 영문 코드가 부여됩니다.</span></li>
              <li className="flex gap-2"><span className="text-[hsl(var(--manual-indigo-dark))] font-bold">·</span><span>이후에 접속할 때는 따로 설정할 필요가 없어요.</span></li>
            </ol>
            <div className="mt-4 px-3 py-2.5 rounded-lg bg-[hsl(40_60%_95%)] text-xs text-foreground leading-relaxed">
              화면 맨 위 <strong>‘모바일에서 보기’</strong>를 누르면 우리 매장용 QR코드가 생성돼요.
              해당 QR로 언제든지 모바일에서도 뷰킷 업을 볼 수 있어요.
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full manual-gradient-hero text-white text-sm font-bold flex items-center justify-center">3</span>
              <Chip tone="red"><Award className="w-3.5 h-3.5" /> 판매 인증</Chip>
            </div>
            <h3 className="text-lg font-bold mb-3">구독 상담에 활용하고 판매 인증에 도전!</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              화면 아래, <strong>판매인증 이벤트</strong>에 참여할 수 있는 버튼이 있어요.
              뷰킷 업을 활용해 상담한 뒤, 판매로 연결되었다면 판매인증 이벤트에 참여해 주세요!
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[hsl(345_85%_42%)] text-white text-sm font-bold">
              <Award className="w-4 h-4" /> 판매인증 <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">매장 전용</span>
            </div>
            <div className="mt-4 px-3 py-2.5 rounded-lg bg-[hsl(40_60%_95%)] text-xs text-foreground leading-relaxed">
              * 자세한 이벤트 내용은 따로 안내할 예정이니 기다려 주세요!
            </div>
          </Card>
        </div>
      </Section>

      {/* Footer note */}
      <Section className="pt-0">
        <div className="text-[10px] sm:text-xs text-muted-foreground border-t border-[hsl(var(--manual-indigo-light))] pt-5 leading-relaxed">
          <strong className="text-foreground">사내교육용/대외비</strong> · 본 자료는 LG전자 사내 교육용으로 제작/배포되는 자료로,
          사내 교육 목적 외 다른 용도로의 사용을 금지하며 공개로 인한 책임은 공개 담당자가 모두 부담합니다.
          LG전자의 동의 없이 그 내용을 제3자에게 유출하는 경우 관련 법령에 따라 처벌 될 수 있습니다.
        </div>
      </Section>
    </div>
  );
}
