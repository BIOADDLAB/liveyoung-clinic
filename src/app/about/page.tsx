import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: "병원 소개 | 리브영클리닉",
    description:
        "리브영클리닉은 당신의 고민과 얼굴을 정밀하게 분석합니다. Needs Mapping → Curated Plan → 맞춤 시술.",
};

export default function AboutPage() {
    return (
        <div>
            <AboutContent />
        </div>
    );
}
