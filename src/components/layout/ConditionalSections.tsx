"use client";

import { usePathname } from "next/navigation";
import Location from "@/components/sections/Location";
import Footer from "@/components/layout/Footer";

/**
 * 페이지 경로에 따라 특정 섹션(지도 등)을 조건부로 렌더링하는 컴포넌트
 */
export default function ConditionalSections() {
    const pathname = usePathname();

    // '병원소개(/about)' 및 '오시는길(/location)' 페이지에서만 지도를 표시
    const showLocation = 
        pathname?.startsWith("/about") || 
        pathname?.startsWith("/location");

    return (
        <>
            {showLocation && <Location />}
            <Footer />
        </>
    );
}
