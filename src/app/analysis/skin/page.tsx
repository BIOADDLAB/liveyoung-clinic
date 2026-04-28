import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SkinAnalysisContent from "./SkinAnalysisContent";

export const metadata: Metadata = {
    title: "피부진단기 | 리브영의원",
    description: "육안으로 보기 힘든 피부 속 상태까지 과학적으로 분석하여 최적의 솔루션을 제안합니다.",
};

export default function SkinAnalysisPage() {
    return (
        <main>
            <PageHeader
                title="피부진단기"
                subtitle="SKIN ANALYSIS"
                description="육안으로 보기 힘든 피부 속 상태까지 과학적으로 분석하여 최적의 솔루션을 제안합니다"
                bgImage="/images/covers/analysis.jpg"
                objectPosition="object-[30%_center] md:object-right"
            />
            <SkinAnalysisContent />
        </main>
    );
}
