"use client";

import { useEffect } from "react";

/**
 * 모바일 vh 보정 훅
 * CSS에서 height: calc(var(--vh, 1vh) * 100) 으로 사용
 */
export function useVh() {
    useEffect(() => {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setVh();
        window.addEventListener("resize", setVh);

        return () => window.removeEventListener("resize", setVh);
    }, []);
}
