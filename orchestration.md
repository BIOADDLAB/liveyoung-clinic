# 🚀 Live Young Clinic - Project Orchestration

이 문서는 리브영의원 웹사이트 구축 프로젝트의 **최상위 운영 지침**입니다. 모든 작업은 이 문서에 정의된 단계와 원칙을 따릅니다.

---

## 📌 현재 프로젝트 단계: [Phase 3: Final Inspection & Optimization]
모든 주요 기능과 콘텐츠 배치가 완료되었습니다. 현재는 **Lighthouse 성능 지표 개선(90점 이상 목표), SEO 최적화, 웹 접근성 검수 및 실제 사용자 환경에서의 오류 수정**에 집중하고 있습니다.

### 📅 작업 히스토리 (최근)
- **Phase 1**: UI/UX 폴리싱 및 디자인 시스템 구축 (완료)
- **Phase 2**: 미디어 영문화 네이밍 및 고해상도 자산 마이그레이션 (진행 중 - Phase 3와 병행)
- **Phase 3 (신규)**: Lighthouse 성능 측정 및 최적화, 메타데이터 보완, 시동 성능(LCP) 개선.

---

## 🛠️ 운영 원칙 (Governance)

### 1. Performance & Lighthouse (CRITICAL)
- **성능 우선**: Lighthouse 4대 지표(Performance, Accessibility, Best Practices, SEO) 모두 **90점 이상**을 목표로 합니다.
- **이미지 최적화**: 모든 이미지는 고해상도를 유지하되 `Next/Image`의 `priority`, `loading` 속성을 적절히 사용하여 LCP(Largest Contentful Paint)를 단축합니다.
- **SEO 강화**: 각 페이지 구조에 맞는 유니크한 `title`과 `description`을 적용하고, Semantic HTML(h1~h6) 구조를 철저히 지킵니다.

### 2. Media Asset Standardization
- **영문 파일명 원칙**: 모든 파일명은 **영문(snake_case/kebab-case)**으로 작성합니다.
- **파일 교체**: 고해상도 미디어 적용 시 성능 하락이 없도록 반드시 포맷 변환(WebP/AVIF)을 거칩니다.

---

## 📁 주요 가이드 문서 링크
- [이미지/영상 관리 가이드](file:///c:/Users/a2585/OneDrive/Desktop/%EB%A6%AC%EB%B8%8C%EC%98%81%EC%9D%98%EC%9B%90%20%EC%99%B8%EC%A3%BC/livyoung-clinic%EC%9B%90%EB%B3%B8/MEDIA_GUIDE.md): 규격 및 경로 정보
- [상수 관리 데이터](file:///c:/Users/a2585/OneDrive/Desktop/%EB%A6%AC%EB%B8%8C%EC%98%81%EC%9D%98%EC%9B%90%20%EC%99%B8%EC%A3%BC/livyoung-clinic%EC%9B%90%EB%B3%B8/src/lib/constants.ts): 링크 및 기본 정보 수정

---

## 🎯 향후 주요 과제
1. **Lighthouse 감사**: 전체 페이지 성능 측정 및 지연 로딩(Lazy Loading) 최적화.
2. **SEO 및 Meta 데이터 보완**: 다국어(En, Ja, Ch, Tw)별 최적화된 검색 노출 정보 설정.
3. **영문화 네이밍 완결**: 남은 한글 미디어 자산의 영문 교체 및 코드 연동 마무리.
