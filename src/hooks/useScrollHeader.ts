"use client";

import { useState, useEffect } from "react";

/**
 * 헤더 스크롤 감지 훅
 */
export function useScrollHeader(threshold: number = 50) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // 초기 상태 체크

        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return isScrolled;
}
