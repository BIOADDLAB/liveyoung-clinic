# 리브영의원 (LIV YOUNG CLINIC) 웹사이트

> Next.js 16 (Turbopack) + Tailwind CSS v4 기반 프리미엄 클리닉 웹사이트

## 🚀 시작하기

### 개발 환경 설정
```bash
npm install
npm run dev
```
→ http://localhost:3000

### 프로덕션 빌드 및 실행
```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지 및 레이아웃
│   ├── page.tsx            # 메인 페이지 (히어로, 시그니처, 브랜드 매니페스토 등)
│   ├── about/              # 병원 소개 (AboutContent.tsx)
│   ├── treatment/          # 시술 안내 (5개 카테고리)
│   │   └── [slug]/         # 동적 라우팅 (lifting, tightening 등)
│   ├── gallery/            # 전후사진 (GalleryContent.tsx)
│   ├── contact/            # 상담문의 (ContactContent.tsx)
│   ├── pricing/            # 비급여 안내 페이지
│   └── admin/              # 관리자 시스템 (로그인 및 팝업 제어)
├── components/
│   ├── layout/             # Header, Footer, QuickMenu, PageHeader
│   ├── sections/           # 메인 및 정보 섹션 (HeroSlider, Marquee, Location 등)
│   ├── treatment/          # 시술 상세 템플릿
│   └── ui/                 # 공용 컴포넌트 (SectionTitle, PopupNotice 등)
├── contexts/               # AuthContext (관리자 인증 상태 관리)
├── hooks/                  # useScrollHeader, useInView 등 커스텀 훅
└── lib/                    # 데이터 정의 (constants.ts, treatments.ts)
```

## 🎨 디자인 시스템

### 폰트 시스템 (Typography)
리브영클리닉은 프리미엄 무드를 위해 3종의 전용 폰트를 조합하여 사용합니다.

- **Primary (국문/본문)**: `Pretendard` (가독성과 현대적인 느낌의 산세리프)
- **Serif (영문 타이틀)**: `Cormorant Garamond` (고급스럽고 클래식한 세리프)
- **Deco (포인트/필기체)**: `Whisper` (감성적이고 세련된 필기체 스타일)

### 브랜드 컬러 (Color Palette)
- **Main**: `#002344` (리브영 시그니처 딥 네이비)
- **Accent**: `#1A4A6E` (신뢰감을 주는 서브 네이비)
- **Base**: `#FFFFFF` / `#F8F9FA` (깨끗한 의료 공간의 베이스)

### 레이아웃 규칙
- **최대 폭 (Max-Width)**: `1560px` 고정 (대형 모니터 대응)
- **반응형**: 모바일, 태블릿, 데스크탑 최적화 중

## 🔐 관리자 기능

- **로그인**: `/admin/login` (admin / livyoung2024 - 설정에 따라 변경 권장)
- **주요 기능**: 메인 공지/이벤트 팝업 실시간 관리 (등록/수정/삭제/활성화 상태 제어)

## 📸 미디어 관리

정적 이미지(로고, 배경, 아이콘 등)의 관리 방법은 [MEDIA_GUIDE.md](file:///c:/Users/a2585/OneDrive/Desktop/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%99%B8%EC%A3%BC/livyoung-clinic%EC%9B%90%EB%B3%B8/MEDIA_GUIDE.md)를 참고하세요.
- **정적 이미지**: `public/images/` 폴더 내 파일을 교체하거나 코드를 수정하여 변경 가능.
- **동적 이미지**: 관리자 페이지(`/admin`)를 통해 팝업 및 전후사진 실시간 업데이트 가능.

## 📋 전체 페이지 목록

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | `/` | 히어로 + 소개 + 시그니처 + 프로그램 + 위치 |
| 병원 소개 | `/about` | 클리닉 철학, 프로세스, 의료진 |
| 리프팅 | `/treatment/lifting` | 울쎄라, 리니어지, 레프톤, 올타이트 |
| 타이트닝 | `/treatment/tightening` | 써마지, 포텐자 |
| 스킨부스터 | `/treatment/skin-booster` | 쥬베룩, 리쥬란, 스킨바이브 |
| 모공 | `/treatment/pore` | 포텐자 |
| 미백/색소 | `/treatment/pigmentation` | 브라이톤, 레프톤, CO2 레이저 |
| 보톡스&필러 | `/treatment/botox-filler` | 제오민, 레스틸렌 |
| 전후사진 | `/gallery` | 카테고리 필터 + 비교 갤러리 |
| 상담문의 | `/contact` | 문의 폼 + 연락처 |
| 관리자 | `/admin` | 팝업 관리 대시보드 |

## 🛠 최근 업데이트 사항 (2026.04)

- **Phase 3 진입 (최적화 및 완성)**: Lighthouse 성능 지표 90점 이상 목표로 최적화 진행 중.
- **미디어 자산 영문화**: 한글 파일명 리스크 제거를 위해 모든 미디어 자산 영문 네이밍 원칙 수립 및 적용.
- **상담문의(Contact) 페이지 고도화**: 프리미엄 테이블 레이아웃 적용, 예약 희망일시 선택 기능 구현.
- **Next.js 16/Turbopack 안정화**: 최신 스택 기반의 빌드 및 개발 환경 최적화 완료.

## 🛠 기술 스택

- **Core**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4 (최신 기능 및 테마 시스템 활용)
- **Animation**: Framer Motion (스크롤 애니메이션, 페이드 효과)
- **Slider**: Swiper (메인 히어로, 시술 팝업 등)
- **SEO**: Dynamic Sitemap (`sitemap.ts`), Robots.txt 자동 생성 및 메타 태그 최적화
