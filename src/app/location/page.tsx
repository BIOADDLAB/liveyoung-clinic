import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import LocationContent from "./LocationContent";

export const metadata: Metadata = {
    title: "오시는 길 | 리브영의원",
    description: "리브영의원은 압구정역 2번 출구 인근 본경빌딩 2층에 위치하고 있습니다.",
};

export default function LocationPage() {
    return (
        <main>
            <PageHeader
                title="오시는 길"
                subtitle="LOCATION"
                description="리브영의원은 압구정역 2번 출구 인근 본경빌딩 2층에 위치하고 있습니다"
                bgImage="/images/covers/location_cover.webp"
                mobileBgImage="/images/cover_m/LY Clinic/오시는길/location_cover_m2.webp"
            />
            <LocationContent />
        </main>
    );
}
