import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import ConsultationContent from "./ConsultationContent";

export const metadata: Metadata = {
    title: "1:1 원장상담 | 리브영의원",
    description: "데이터로 증명하고 진심으로 경청합니다. 리브영의원은 대표원장이 모든 상담과 시술 설계를 직접 진행하여 고객님만의 Signature Care를 완성합니다.",
};

export default function ConsultationPage() {
    return (
        <main>
            <PageHeader
                title={"1:1 원장상담"}
                subtitle="PERSONALIZED CONSULTATION"
                description="정밀 데이터와 1:1 심층 상담을 통해 당신만의 최적화된 Curated Plan를 설계합니다"
                bgImage="/images/covers/consultation_cover.webp"
                mobileBgImage="/images/cover_m/Signature 분석/1대1 원장상담/consultation_cover_m.webp"
            />
            <ConsultationContent />
        </main>
    );
}
