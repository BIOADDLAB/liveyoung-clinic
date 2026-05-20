import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { TreatmentPrecautions } from "@/components/treatment/TreatmentTemplate";
import { ALL_PRECAUTION_GROUPS, type TreatmentPageData } from "@/lib/treatments";

export const metadata: Metadata = {
    title: "시술 후 주의사항 | 리브영클리닉",
    description: "리브영클리닉 시술별 시술 후 주의사항 안내입니다.",
};

const PRECAUTIONS_PAGE_DATA: TreatmentPageData = {
    slug: "precautions",
    enCategory: "AFTER CARE",
    title: "시술 후 주의사항",
    heroMessage: "시술별 회복 과정과 관리 방법을 한눈에 확인하세요",
    description: "시술별 회복 과정과 관리 방법을 한눈에 확인하세요.",
    precautionGroups: ALL_PRECAUTION_GROUPS,
    treatments: [],
    ctaMessage: "시술 후 주의사항 확인하기",
    bgImage: "/images/covers/미백_모공_흉터.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/미백_모공_흉터_m.webp",
};

export default function PrecautionsPage() {
    return (
        <div>
            <PageHeader
                title="시술 후 주의사항"
                subtitle="AFTER CARE"
                description="시술별 회복 과정과 관리 방법을 한눈에 확인하세요."
                bgImage={PRECAUTIONS_PAGE_DATA.bgImage}
                mobileBgImage={PRECAUTIONS_PAGE_DATA.mobileBgImage}
            />
            <TreatmentPrecautions data={PRECAUTIONS_PAGE_DATA} />
        </div>
    );
}
