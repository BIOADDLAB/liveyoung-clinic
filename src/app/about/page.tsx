import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: "병원 소개 | 리브영클리닉",
    description:
        "리브영클리닉은 시술을 팔지 않고 당신의 얼굴을 분석합니다. Needs Mapping과 Curated Plan 시스템으로 맞춤 시술을 제공합니다.",
};

export default function AboutPage() {
    return (
        <div>
            <AboutContent />
        </div>
    );
}
