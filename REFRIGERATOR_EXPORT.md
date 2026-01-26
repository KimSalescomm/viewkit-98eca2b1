# 냉장고 페이지 독립 프로젝트용 코드

이 문서는 냉장고 페이지만 새 프로젝트로 분리할 때 필요한 모든 코드를 포함합니다.

---

## 1. 필요한 npm 패키지

```bash
npm install react react-dom react-router-dom embla-carousel-react lucide-react
npm install -D typescript @types/react @types/react-dom vite
```

---

## 2. 파일 구조

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── pages/
│   ├── Home.tsx
│   └── FeatureDetail.tsx
├── components/
│   ├── FeatureCard.tsx
│   ├── MediaViewer.tsx
│   └── SafeImage.tsx
├── data/
│   ├── products.ts
│   └── features.ts
└── utils/
    └── videoUtils.ts
public/
├── placeholder.svg
└── images/
    ├── installation-step1.jpeg
    ├── installation-step2.jpeg
    ├── installation-step3.jpeg
    ├── installation-step4.jpeg
    └── installation-step5.jpeg
```

---

## 3. 핵심 코드 파일들

### 3.1 src/App.tsx

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FeatureDetail from "./pages/FeatureDetail";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature/:id" element={<FeatureDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
```

### 3.2 src/main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3.3 src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-break: keep-all;
  overflow-wrap: break-word;
  line-break: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

### 3.4 src/data/products.ts

```ts
export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  keyVisualImage: string;
}

export const product: Product = {
  id: "refrigerator",
  name: "냉장고",
  title: "DIOS 냉장고",
  description: "fresh sySTEM으로 완성되는 직수형 냉장고 STEM",
  keyVisualImage: "https://www.lge.co.kr/kr/story/buying-guide/img/lg-refrigerator-guide/keyvisual_02.jpg",
};

export const getProduct = (): Product => product;
```

---

### 3.5 src/data/features.ts

```ts
export interface ProductComparisonTable {
  name: string;
  imageUrl: string;
  specs: {
    label: string;
    values: string[];
  }[];
}

export interface GalleryImage {
  url: string;
  title?: string;
  description?: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag?: string;
  mediaType: "video" | "image" | "table" | "gallery" | "youtube";
  mediaUrl: string;
  description: string;
  highlights: string[];
  tableData?: ProductComparisonTable[];
  galleryImages?: (string | GalleryImage)[];
  isShorts?: boolean;
}

export const features: Feature[] = [
  {
    id: "1",
    title: "매번 물 채우기, 번거롭지 않나요?",
    subtitle: "물통 없이 스스로 채우는 직수형\n편리한 냉장고 STEM을 확인해보세요.",
    icon: "Seedling",
    tag: "STEM이란?",
    mediaType: "image",
    mediaUrl: "http://open.lge.co.kr/link/2024/usp/39_OBJET/01_WATER/W825_482/usp_06_gif.gif",
    description: "음식 보관을 넘어, 흐르는 물로 깨끗한 물과 얼음을 만드는 직수형 냉장고",
    highlights: [
      "흐르는 물로 얼음을 만드는 제빙 시스템",
      "전문가가 꼼꼼하게 관리하는 케어 시스템",
      "식재료를 신선하게 보관하는 냉기 시스템",
    ],
  },
  {
    id: "2",
    title: "나에겐 어떤 모델이 딱 맞을까요?",
    subtitle: "다양한 종류의 직수형 냉장고 STEM\n모델별 차이를 확인해 보세요.",
    icon: "Search",
    tag: "STEM 제품 비교",
    mediaType: "table",
    mediaUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img01.png",
    description: "STEM 얼음정수 냉장고와 STEM 베이직 냉장고의 주요 사양을 비교해보세요.",
    highlights: ["냉장고 용량", "정수기 디스펜서", "얼음 종류", "정수 필터", "케어 서비스"],
    tableData: [
      {
        name: "STEM 얼음정수",
        imageUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img01.png",
        specs: [
          { label: "냉장고 용량", values: ["800L대"] },
          { label: "정수기 디스펜서", values: ["있음", "(정수, 냉수, 각얼음, 조각얼음)"] },
          { label: "얼음 종류", values: ["각얼음, 조각 얼음", "미니 각얼음", "크래프트 아이스"] },
          { label: "정수 필터", values: ["중금속 9종, 노로 바이러스 걸러 주는", "3단계 정수 필터"] },
          { label: "케어 서비스", values: ["●"] },
        ],
      },
      {
        name: "STEM 베이직",
        imageUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img02.png",
        specs: [
          { label: "냉장고 용량", values: ["800L대"] },
          { label: "정수기 디스펜서", values: ["-"] },
          { label: "얼음 종류", values: ["미니 각얼음", "크래프트 아이스"] },
          { label: "정수 필터", values: ["중금속 7종, 박테리아 걸러 주는", "복합 안심 정수 필터"] },
          { label: "케어 서비스", values: ["●"] },
        ],
      },
      {
        name: "STEM 베이직 Fit & Max",
        imageUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10553840/gallery/medium-interior01.jpg",
        specs: [
          { label: "냉장고 용량", values: ["600L대"] },
          { label: "정수기 디스펜서", values: ["-"] },
          { label: "얼음 종류", values: ["각얼음 (트레이)", "크래프트 아이스"] },
          { label: "정수 필터", values: ["중금속 7종, 박테리아 걸러 주는", "복합 안심 정수 필터"] },
          { label: "케어 서비스", values: ["●"] },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "STEM 냉장고, 우리 집에 어떻게 설치하죠?",
    subtitle: "수도관 연결 어떻게 될지 고민되시죠?\n깔끔한 마무리까지 확인해보세요.",
    icon: "Ruler",
    tag: "설치 체크",
    mediaType: "gallery",
    mediaUrl: "",
    description:
      "수도관 매립 여부, 냉장고와 싱크대의 거리 등 환경에 따라 STEM 설치는 달라집니다. 가구색과 유사한 몰딩을 이용해 수도관이 드러나지 않도록 깔끔하게 마감합니다.",
    highlights: ["수도관 매립 여부 확인", "싱크대 타공 가능한지 확인", "몰딩 처리 확인"],
    galleryImages: [
      {
        url: "/images/installation-step1.jpeg",
        title: "1.냉장고장에 수도관이 매립되어 있나요?",
        description:
          "냉장고 장에 수도관이 있다면 STEM을 설치하기 가장 좋은 환경이에요! 깔끔하게 수도관을 연결할 수 있어요.",
      },
      {
        url: "/images/installation-step2.jpeg",
        title: "2.싱크대 거리가 가깝고, 싱크대 타공이 가능한가요?",
        description:
          "매립된 수도관이 없다면, 싱크대 옆면에 수도관을 꺼낼만큼 구멍을 내어 수도관이 밖으로 드러나지 않게 설치할 수 있어요.",
      },
      {
        url: "/images/installation-step3.jpeg",
        title: "3.싱크대 거리가 가깝지만, 싱크대 타공을 할 수 없다면?",
        description:
          "싱크대 아래 걸레받이 틈으로 수도관을 꺼내 연결할 수 있어요. 가구색과 가장 유사항 몰딩으로 깔끔하게 마무리 해드립니다.",
      },
      {
        url: "/images/installation-step4.jpeg",
        title: "4.싱크대가 냉장고를 놓을 위치와 다소 떨어져 있나요?",
        description:
          "싱크대와 냉장고 사이를 잇는 수도관을 벽면에 가깝게 붙여 설치합니다. 가구색과 가장 유사한 몰딩으로 깔끔하게 마무리 해드립니다",
      },
      {
        url: "/images/installation-step5.jpeg",
        title: "인테리어에 맞춘 몰딩 부자재",
        description:
          "Case3,4처럼 수도관이 밖으로 이어지는 경우에는 주방 가구 컬러에 맞춘 몰딩 부자재로 숨김 처리를 해드립니다.",
      },
    ],
  },
  {
    id: "4",
    title: "보이지 않는 물길 속, 관리는 누가 할까요?",
    subtitle: "필터부터 청소까지, 전문가가 알아서\n챙겨주는 전문 케어를 보여드려요.",
    icon: "Wrench",
    tag: "구독 전문케어",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/dVEO3aYykTM?si=j4iIwotCwLBvji5k",
    description:
      "물이 흐르는 길을 세척, 청소하기 힘든 기계실 세척, 이사 후 재설치까지 다양한 케어서비스 혜택이 있습니다.",
    highlights: ["유로 세척 케어", "기계실 세척(프리미엄)", "고무패킹 케어", "소모품 교체"],
  },
  {
    id: "5",
    title: "빌트인 감성의 주방을 원한다면?",
    subtitle: "주방이 훨씬 넓고 깔끔해 보이는\n'Fit & Max' 냉장고를 확인해보세요.",
    icon: "Ruler",
    tag: "Fit & Max란?",
    mediaType: "image",
    mediaUrl: "https://open.lge.co.kr/link/2025/usp/39_OBJET/03_TOP/M626_022/usp_05_gif.gif",
    description:
      "도어 걸림을 없앤 제로 클리어런스 힌지가 만드는 단 4mm 간격의 완벽에 가까운 밀착! 인테리어 조화를 생각한 디자인으로 공간에 자연스럽게 녹아듭니다.",
    highlights: ["제로 클리어런스 힌지", "인테리어 냉장고", "다양한 라인업", "냉툭튀가 싫다면 Fit & Max로"],
  },
  {
    id: "6",
    title: "함께하면 더 좋은 Fit & Max 어떤 세트가 있나요?",
    subtitle: "인테리어는 Fit 용량은 Max\n주방이 돋보이는 조합을 모아봤어요.",
    icon: "Puzzle",
    tag: "Fit & Max 세트",
    mediaType: "gallery",
    mediaUrl: "",
    galleryImages: [
      {
        url: "https://www.lge.co.kr/kr/images/refrigerators/interior/I5.jpg",
        title: "Fit & Max 냉장고 + 4도어 김치냉장고 조합",
        description:
          "노크온이 있는 Fit & Max 냉장고와 든든한 480L 용량의 4도어 김치냉장고, 가족이 많거나 미식을 즐기는 분을 위한 조합",
      },
      {
        url: "https://www.lge.co.kr/kr/images/refrigerators/interior/i2.jpg",
        title: "Fit & Max 냉장고 + 3도어 김치냉장고 조합",
        description:
          "깔끔하게 밀착 설치한 Fit & Max 냉장고에 3도어 김치냉장고를 더하면 디자인도 용량도 부족하지 않은 최상의 조합이 되죠.",
      },
      {
        url: "https://www.lge.co.kr/kr/images/convertible-refrigerators/md10574832/XYZ324_fitmax_01.jpg",
        title: "Fit & Max 냉장고 + 컨버터블 (냉장/냉동/김치)",
        description: "내 주방에 딱 맞는 Fit & Max에 내 라이프스타일에 맞는 컨버터블 모델을 하나 더 추가해 보세요.",
      },
    ],
    description:
      "다양한 Fit & Max 라인업, STEM 냉장고, 김치, 냉장,냉동 전용 컨버터블을 내 생활에 맞게 조합해 보세요. 공간은 아름다워지고, 생활은 더 풍요로워집니다.",
    highlights: ["다양한 인테리어 연출", "조합으로 더 넉넉해지는 용량", "Fit & Max로 트렌디한 인테리어"],
  },
];

export const featureIconMap: Record<string, string> = {
  Seedling: "🌱",
  Search: "🔍",
  Ruler: "📐",
  Wrench: "🧰",
  Puzzle: "🧩",
};

export const getFeatures = (): Feature[] => features;

export const getFeatureById = (featureId: string): Feature | undefined => {
  return features.find((f) => f.id === featureId);
};
```

---

### 3.6 src/pages/Home.tsx

```tsx
import { Link } from "react-router-dom";
import { getProduct } from "@/data/products";
import { getFeatures } from "@/data/features";
import FeatureCard from "@/components/FeatureCard";
import SafeImage from "@/components/SafeImage";

const Home = () => {
  const product = getProduct();
  const features = getFeatures();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)",
        padding: "24px"
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: "16px"
            }}
          >
            VIEW KIT
          </p>

          <div
            style={{
              display: "inline-block",
              backgroundColor: "#faf5ff",
              border: "1px solid #e9d5ff",
              padding: "8px 20px",
              borderRadius: "50px",
              marginBottom: "20px"
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 600, color: "#9333ea" }}>
              냉장고
            </span>
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "12px"
            }}
          >
            LG DIOS 오브제컬렉션
          </h1>
          <p style={{ fontSize: "18px", color: "#4b5563" }}>
            {product.description}
          </p>
        </div>

        {/* Key Visual */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          }}
        >
          <SafeImage
            src={product.keyVisualImage}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover"
            }}
          />
        </div>

        {/* Features Section Title */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827"
            }}
          >
            주요 특장점
          </h3>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            marginBottom: "48px"
          }}
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              title={feature.title}
              subtitle={feature.subtitle}
              icon={feature.icon}
              tag={feature.tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
```

---

### 3.7 src/pages/FeatureDetail.tsx

```tsx
import { Link, useParams } from "react-router-dom";
import { getFeatureById, featureIconMap } from "@/data/features";
import { getProduct } from "@/data/products";
import MediaViewer from "@/components/MediaViewer";

const FeatureDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const feature = getFeatureById(id || "");
  const product = getProduct();

  if (!feature) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", color: "#111827", marginBottom: "16px" }}>
            특장점을 찾을 수 없습니다
          </h1>
          <Link
            to="/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 500
            }}
          >
            ← 특장점 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const emoji = featureIconMap[feature.icon] || "✨";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)"
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          zIndex: 100
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "14px"
            }}
          >
            <span>←</span>
            <span>{product.name} 특장점으로 돌아가기</span>
          </Link>
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#1f2937"
              }}
            >
              VIEW KIT
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 24px", maxWidth: "1080px", margin: "0 auto" }}>
        {/* Feature Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px"
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #2563eb, #9333ea)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: "48px" }}>{emoji}</span>
          </div>
          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "8px"
              }}
            >
              {feature.title}
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                whiteSpace: "pre-line",
                lineHeight: "1.5"
              }}
            >
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Media */}
        <div style={{ marginBottom: "32px" }}>
          <MediaViewer
            mediaType={feature.mediaType}
            mediaUrl={feature.mediaUrl}
            title={feature.title}
            tableData={feature.tableData}
            galleryImages={feature.galleryImages}
            isShorts={feature.isShorts}
          />
        </div>

        {/* Description Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "16px"
            }}
          >
            설명 더 보기
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#4b5563",
              lineHeight: "1.8"
            }}
          >
            {feature.description}
          </p>
        </div>

        {/* Highlights Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "48px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "16px"
            }}
          >
            핵심만 쏙
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "12px"
            }}
          >
            {feature.highlights.map((highlight, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px",
                  background: "#eff6ff",
                  borderRadius: "12px"
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    color: "#2563eb",
                    fontWeight: "bold"
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#1f2937",
                    fontWeight: 500
                  }}
                >
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div style={{ textAlign: "center" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 600,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
          >
            <span>←</span>
            <span>전체 특장점으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;
```

---

### 3.8 src/components/FeatureCard.tsx

```tsx
import { Link } from "react-router-dom";
import { featureIconMap } from "@/data/features";

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag?: string;
}

const FeatureCard = ({ id, title, subtitle, icon, tag }: FeatureCardProps) => {
  const emoji = featureIconMap[icon] || "✨";

  return (
    <Link
      to={`/feature/${id}`}
      style={{
        display: "block",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #f3f4f6",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        textDecoration: "none",
        textAlign: "center"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #2563eb, #9333ea)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px auto"
        }}
      >
        <span style={{ fontSize: "32px" }}>{emoji}</span>
      </div>
      {tag && (
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#EFF6FF",
            color: "#2563EB",
            fontSize: "13px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "12px",
            marginBottom: "12px"
          }}
        >
          {tag}
        </span>
      )}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#111827",
          marginBottom: "8px"
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#6b7280",
          whiteSpace: "pre-line",
          lineHeight: "1.5"
        }}
      >
        {subtitle}
      </p>
    </Link>
  );
};

export default FeatureCard;
```

---

### 3.9 src/components/SafeImage.tsx

```tsx
import * as React from "react";

export type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = "/placeholder.svg";

const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ fallbackSrc = DEFAULT_FALLBACK, onError, ...props }, ref) => {
    const hasFailedRef = React.useRef(false);

    return (
      <img
        ref={ref}
        {...props}
        onError={(e) => {
          if (!hasFailedRef.current) {
            hasFailedRef.current = true;
            e.currentTarget.src = fallbackSrc;
          }
          onError?.(e);
        }}
      />
    );
  }
);
SafeImage.displayName = "SafeImage";

export default SafeImage;
```

---

### 3.10 src/components/MediaViewer.tsx

```tsx
import { convertToEmbedUrl } from "@/utils/videoUtils";
import SafeImage from "@/components/SafeImage";
import { ProductComparisonTable, GalleryImage } from "@/data/features";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

interface MediaViewerProps {
  mediaType: "video" | "image" | "table" | "gallery" | "youtube";
  mediaUrl: string;
  title: string;
  tableData?: ProductComparisonTable[];
  galleryImages?: (string | GalleryImage)[];
  isShorts?: boolean;
}

const VideoPlayer = ({ mediaUrl }: { mediaUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(() => {
        setHasError(true);
      });
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(timeout);
    };
  }, [mediaUrl]);

  if (hasError) {
    return (
      <div
        style={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          minHeight: "300px",
        }}
      >
        <PlayCircle size={64} color="#fff" style={{ opacity: 0.6, marginBottom: "16px" }} />
        <p style={{ color: "#fff", fontSize: "16px", textAlign: "center", opacity: 0.8 }}>
          영상을 로드할 수 없습니다
        </p>
        <a
          href={mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "16px",
            padding: "12px 24px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "8px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          외부 링크에서 보기
        </a>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
        position: "relative",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}
      <video
        ref={videoRef}
        src={mediaUrl}
        muted
        autoPlay
        loop
        playsInline
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          objectFit: "contain",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
};

const MediaViewer = ({ mediaType, mediaUrl, title, tableData, galleryImages, isShorts }: MediaViewerProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryLength = galleryImages?.length ?? 0;
  useEffect(() => {
    if (!galleryLength) return;
    if (selectedIndex < galleryLength) return;
    setSelectedIndex(0);
    emblaApi?.scrollTo(0);
  }, [galleryLength, selectedIndex, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // TABLE 렌더링
  if (mediaType === "table" && tableData) {
    const specLabels = tableData[0]?.specs.map(s => s.label) || [];
    
    const isCellDifferent = (productIdx: number, label: string): boolean => {
      const allValues = tableData.map(product => {
        const spec = product.specs.find(s => s.label === label);
        return spec?.values.join('|') || '-';
      });
      const uniqueValues = new Set(allValues);
      if (uniqueValues.size === 1) return false;
      if (uniqueValues.size === allValues.length) return true;
      const valueCounts = allValues.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const majorityValue = Object.entries(valueCounts).reduce((a, b) => 
        a[1] >= b[1] ? a : b
      )[0];
      return allValues[productIdx] !== majorityValue;
    };
    
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {tableData.map((product, idx) => (
            <div
              key={idx}
              style={{
                flex: "0 0 280px",
                minWidth: "280px",
                maxWidth: "280px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 12px",
                  background: "#f5f5f5",
                  borderRadius: "12px 12px 0 0",
                  height: "260px",
                }}
              >
                <h4 style={{ 
                  fontSize: "15px", fontWeight: 600, color: "#1f1f1f",
                  marginBottom: "16px", textAlign: "center", minHeight: "36px",
                  display: "flex", alignItems: "center",
                }}>
                  {product.name}
                </h4>
                <div style={{ width: "180px", height: "180px", overflow: "hidden", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SafeImage src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.2)" }} />
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: "0 0 12px 12px", overflow: "hidden", flex: 1 }}>
                {specLabels.map((label, rowIdx) => {
                  const spec = product.specs.find(s => s.label === label);
                  const values = spec?.values || ["-"];
                  const isCellHighlighted = isCellDifferent(idx, label);
                  return (
                    <div key={rowIdx} style={{ borderTop: "1px dotted #ccc", borderBottom: rowIdx === specLabels.length - 1 ? "2px solid #333" : "none" }}>
                      <div style={{ padding: "8px 12px", background: "#f9f9f9", fontWeight: 500, fontSize: "12px", color: isCellHighlighted ? "#2563eb" : "#666", height: "35px", display: "flex", alignItems: "center" }}>
                        {label}
                      </div>
                      <div style={{ padding: "8px 12px", fontSize: "13px", color: isCellHighlighted ? "#2563eb" : "#333", textAlign: "center", lineHeight: "1.4", height: "51px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        {values.map((value, vIdx) => (
                          <div key={vIdx} style={{ marginBottom: vIdx < values.length - 1 ? "2px" : 0 }}>{value}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // GALLERY 렌더링
  if (mediaType === "gallery" && galleryImages && galleryImages.length > 0) {
    const normalizedImages: GalleryImage[] = galleryImages.map((img) =>
      typeof img === "string" ? { url: img } : img
    );
    const currentImage = normalizedImages[selectedIndex] ?? normalizedImages[0];

    return (
      <div style={{ width: "100%", position: "relative" }}>
        {canScrollPrev && (
          <button onClick={scrollPrev} style={{ position: "absolute", left: "8px", top: "calc(50% - 40px)", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            <ChevronLeft size={24} color="#333" />
          </button>
        )}
        {canScrollNext && (
          <button onClick={scrollNext} style={{ position: "absolute", right: "8px", top: "calc(50% - 40px)", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            <ChevronRight size={24} color="#333" />
          </button>
        )}
        <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          <div style={{ display: "flex" }}>
            {normalizedImages.map((image, idx) => (
              <div key={idx} style={{ flex: "0 0 100%", minWidth: "100%" }}>
                <SafeImage src={image.url} alt={image.title || `${title} - 이미지 ${idx + 1}`} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
        {(currentImage?.title || currentImage?.description) && (
          <div style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", padding: "20px 24px", borderRadius: "0 0 16px 16px", borderTop: "1px solid #dee2e6" }}>
            {currentImage?.title && <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#212529", marginBottom: currentImage?.description ? "8px" : 0 }}>{currentImage.title}</h4>}
            {currentImage?.description && <p style={{ fontSize: "15px", color: "#495057", lineHeight: 1.5, margin: 0 }}>{currentImage.description}</p>}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
          {normalizedImages.map((_, idx) => (
            <button key={idx} onClick={() => emblaApi?.scrollTo(idx)} style={{ width: selectedIndex === idx ? "24px" : "8px", height: "8px", borderRadius: "4px", background: selectedIndex === idx ? "#333" : "#ccc", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "8px", fontSize: "14px", color: "#666" }}>
          {selectedIndex + 1} / {normalizedImages.length}
        </div>
      </div>
    );
  }

  // YOUTUBE 렌더링
  if (mediaType === "youtube") {
    const aspectRatio = isShorts ? "177.78%" : "56.25%";
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: isShorts ? "min(100%, 400px)" : "100%", paddingBottom: isShorts ? "0" : aspectRatio, height: isShorts ? "min(80vh, 711px)" : "auto", borderRadius: "16px", overflow: "hidden", background: "#000" }}>
          <iframe src={mediaUrl} title={title} style={{ position: isShorts ? "relative" : "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </div>
    );
  }

  // VIDEO 렌더링
  if (mediaType === "video") {
    const { embedUrl, isYoutube } = convertToEmbedUrl(mediaUrl);
    if (isYoutube) {
      return (
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", borderRadius: "16px", overflow: "hidden", background: "#000" }}>
          <iframe src={embedUrl} title={title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      );
    }
    return <VideoPlayer mediaUrl={mediaUrl} />;
  }

  // IMAGE 렌더링 (기본)
  return (
    <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", background: "#f3f4f6" }}>
      <SafeImage src={mediaUrl} alt={title} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
};

export default MediaViewer;
```

---

### 3.11 src/utils/videoUtils.ts

```ts
export interface VideoInfo {
  embedUrl: string;
  isYoutube: boolean;
}

export const convertToEmbedUrl = (url: string): VideoInfo => {
  const youtubePatterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&t=(\d+))?/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)(?:\?t=(\d+))?/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      const videoId = match[1];
      const startTime = match[2];
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      if (startTime) {
        embedUrl += `?start=${startTime}`;
      }
      return { embedUrl, isYoutube: true };
    }
  }

  return { embedUrl: url, isYoutube: false };
};
```

---

## 4. 필요한 이미지 파일

`public/images/` 폴더에 다음 이미지들을 복사하세요:
- installation-step1.jpeg
- installation-step2.jpeg
- installation-step3.jpeg
- installation-step4.jpeg
- installation-step5.jpeg

`public/` 폴더에:
- placeholder.svg

---

## 5. vite.config.ts

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 6. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 7. index.html

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LG DIOS 냉장고</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 주의사항

1. **GIF 재생 문제**: 스탠바이미에서 GIF가 재생되지 않는 경우, `mediaType: "image"`로 설정된 GIF URL을 `mediaType: "video"`로 변경하고 MP4/WebM 파일로 교체하는 것을 권장합니다.

2. **영상 CORS 문제**: LG 서버의 영상은 CORS 정책으로 직접 재생이 불가능합니다. YouTube 임베드를 사용하거나, 영상을 직접 호스팅하세요.

3. **feature ID**: 새 프로젝트에서는 feature ID가 1-6으로 재정렬되어 있습니다. 기존 프로젝트의 7-12 ID와 다릅니다.
