import HeroSlider from "@/components/sections/HeroSlider";
import About from "@/components/sections/About";
import SignatureCards from "@/components/sections/SignatureCards";
import TreatmentPopupSlider from "@/components/sections/TreatmentPopupSlider";
import BrandManifesto from "@/components/sections/BrandManifesto";
import PopupNotice from "@/components/ui/PopupNotice";

/**
 * 메인 페이지
 * Hero → About → Marquee → Signature → TreatmentPopup → Manifesto
 */
export default function Home() {
  return (
    <>
      {/* 1. 히어로 슬라이더 - 풀스크린 첫인상 */}
      <HeroSlider />

      {/* 2. 의료진 & 클리닉 소개 - Needs Mapping 시스템 */}
      <About />

      {/* 4. 시그니처 시술 5종 카드 */}
      <SignatureCards />

      {/* 5. 시그니처 시술 팝업 슬라이더 (추가됨) */}
      <TreatmentPopupSlider />

      {/* 6. 브랜드 매니페스토 - 맞춤형 분석 & 꼼꼼함 (Point 01, 02) */}
      <BrandManifesto />

      <PopupNotice />
    </>
  );
}
