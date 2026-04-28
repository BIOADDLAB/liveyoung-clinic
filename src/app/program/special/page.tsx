import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import SpecialProgramContent from "./SpecialProgramContent";

export const metadata: Metadata = {
    title: "LY Special | 리브영의원",
    description: "천편일률적인 시술이 아닌, 오직 당신만을 위해 조합된 커스텀 시술 패키지를 제안합니다.",
};

export default function SpecialProgramPage() {
    return (
        <main>
            <PageHeader
                title="LY Special 프로그램"
                subtitle="TAILORED PROGRAM"
                description="천편일률적인 시술이 아닌, 오직 당신만을 위해 조합된 커스텀 시술 패키지를 제안합니다"
                bgImage="/images/covers/LY_Special_cover.jpg"
                mobileBgImage="/images/covers/LY_Special_cover.jpg"
            />
            <SpecialProgramContent />
        </main>
    );
}
