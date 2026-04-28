import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: "상담문의 | 리브영클리닉",
    description: "리브영클리닉에 시술 상담을 문의하세요. 원장님 직접 상담으로 맞춤 솔루션을 제안해드립니다.",
};

export default function ContactPage() {
    return (
        <div>
            <ContactContent />
        </div>
    );
}
