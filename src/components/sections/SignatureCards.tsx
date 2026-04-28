"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SIGNATURE_TREATMENTS } from "@/lib/constants";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

/**
 * SignatureCards 섹션
 * - 데스크탑: 기존의 프리미엄 확산 애니메이션 유지
 * - 모바일: 초기 확산 애니메이션 후 화살표 버튼을 통한 무한 루프 카드 교체 기능 적용
 */
export default function SignatureCards() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bgCircleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // [상태] 모바일 전용
    const [activeIndex, setActiveIndex] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    // 각 카드 그라데이션 설정
    const gradients = [
        "from-brand-dark via-brand to-brand-light/80",
        "from-brand via-brand-light to-brand-muted/60",
        "from-brand-dark via-brand-dark to-brand/80",
        "from-brand-light via-brand to-brand-dark/90",
        "from-brand via-brand-muted to-brand-light/70",
    ];

    useEffect(() => {
        if (!containerRef.current || cardsRef.current.length === 0) return;

        const mm = gsap.matchMedia();

        // --- [데스크탑 전용] ---
        mm.add("(min-width: 1024px)", () => {
            setIsMobile(false);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                }
            });

            // 배경 원형
            tl.fromTo(bgCircleRef.current,
                { opacity: 0, y: 80 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
                0
            );

            // 제목
            tl.fromTo(".section-title-wrap",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                0.3
            );

            // 체크 표시 드로잉 (해당 요소가 없으므로 제거)

            // 카드 등장 및 확산
            const waitTime = 1.2;
            cardsRef.current.forEach((card, idx) => {
                if (!card) return;

                tl.fromTo(card,
                    {
                        x: 0,
                        y: 30,
                        opacity: 0,
                        rotate: idx === 2 ? -8 : idx === 0 ? 8 : 0,
                        scale: 0.9
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    },
                    0.4
                );

                const spreadDistance = 480;
                let targetX = 0;
                if (idx === 0) targetX = spreadDistance;
                if (idx === 1) targetX = 0;
                if (idx === 2) targetX = -spreadDistance;

                tl.to(card,
                    {
                        x: targetX,
                        rotate: 0,
                        scale: 1,
                        duration: 1.5,
                        ease: "power4.out"
                    },
                    waitTime
                );
            });
        });

        // --- [모바일 전용] ---
        mm.add("(max-width: 1023px)", () => {
            setIsMobile(true);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    once: true,
                }
            });

            // 배경 및 제목 (체크 제거됨)
            tl.fromTo(bgCircleRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.2)" }, 0);
            tl.fromTo(".section-title-wrap", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.2);

            // 초기 카드 펼쳐짐 (팬 아웃)
            tl.addLabel("appear", "-=0.2");
            cardsRef.current.forEach((card, idx) => {
                if (!card) return;
                tl.fromTo(card,
                    { x: 0, y: 40, opacity: 0, scale: 0.8, rotate: 0 },
                    { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
                    "appear"
                );
            });

            tl.addLabel("spread", "+=0.1");
            cardsRef.current.forEach((card, idx) => {
                if (!card) return;
                const spreadDistanceX = 105;
                let targetX = idx === 0 ? spreadDistanceX : (idx === 2 ? -spreadDistanceX : 0);
                let targetRotate = idx === 0 ? 5 : (idx === 2 ? -5 : 0);
                tl.to(card, { x: targetX, rotate: targetRotate, duration: 0.8, ease: "back.out(1.7)" }, "spread");
            });
        });

        return () => mm.revert();
    }, []);

    // 모바일 activeIndex 실시간 반영 (무한 루프 대응)
    useEffect(() => {
        if (!isMobile) return;

        cardsRef.current.forEach((card, idx) => {
            if (!card) return;

            const isCenter = idx === activeIndex;
            const distance = idx - activeIndex;

            let targetX = distance * 140; // 커진 카드에 맞춰 간격 조절
            let targetScale = isCenter ? 1.05 : 0.85;
            let targetOpacity = isCenter ? 1 : 0.4;
            let targetRotate = distance * 4;
            let targetZIndex = isCenter ? 50 : 30 - Math.abs(distance) * 5;

            gsap.to(card, {
                x: targetX,
                scale: targetScale,
                opacity: targetOpacity,
                rotate: targetRotate,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            });

            card.style.zIndex = targetZIndex.toString();
        });
    }, [activeIndex, isMobile]);

    const handlePrev = () => {
        setActiveIndex(prev => (prev > 0 ? prev - 1 : SIGNATURE_TREATMENTS.length - 1));
    };

    const handleNext = () => {
        setActiveIndex(prev => (prev < SIGNATURE_TREATMENTS.length - 1 ? prev + 1 : 0));
    };

    return (
        <section id="signature" ref={sectionRef} className="relative pt-[40px] pb-[80px] md:py-[150px] overflow-hidden bg-[#F2F1ED]">
            <div ref={bgCircleRef} className="absolute left-1/2 top-0 z-0 h-[1560px] w-[1560px] -translate-x-1/2 rounded-full overflow-hidden"
                style={{ background: "linear-gradient(180deg, rgba(40, 45, 61, 0.08) 0%, rgba(40, 45, 61, 0.00) 15%)", pointerEvents: "none" }}
            />

            <div className="relative z-10 mx-auto max-w-[1560px] px-5 md:px-8">
                <div className="section-title-wrap mb-6 md:mb-16">
                    <div className="text-center">
                        <p className="mb-2 text-[12px] font-black gold-gradient-text tracking-[0.1em] md:text-[14px]">SIGNATURE</p>
                        <h3 className="korean-serif-title mt-1 flex items-center justify-center text-[32px] font-bold leading-[1.1] text-brand md:text-[46px] md:tracking-[-0.04em]">
                            리브영의원의 시그니처
                        </h3>
                        <p className="mx-auto mt-6 max-w-[600px] text-[14px] font-normal leading-[1.75] text-brand-muted tracking-[-0.026em] break-keep">
                            당신의 얼굴을 분석하여 꼭 맞는 시술만을 제안합니다.
                        </p>
                    </div>
                </div>

                <div ref={containerRef} className="relative mt-10 flex flex-col items-center justify-center min-h-[460px] md:min-h-[680px]">
                    <div className="relative w-full flex items-center justify-center min-h-[350px] md:min-h-[600px]">
                        {SIGNATURE_TREATMENTS.map((treatment, idx) => (
                            <div key={treatment.id} ref={(el) => { cardsRef.current[idx] = el; }}
                                className="absolute w-full max-w-[240px] md:max-w-[460px] will-change-transform cursor-pointer"
                                onClick={() => isMobile && setActiveIndex(idx)}
                            >
                                <Link href={treatment.href} className="group block">
                                    <div className="relative overflow-hidden rounded-[25px] md:rounded-[40px] shadow-xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-4" style={{ height: "340px" }}>
                                        <style jsx>{` @media (min-width: 768px) { div { height: 600px !important; } } `}</style>
                                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                            {(treatment as any).imageUrl ? (
                                                <>
                                                    <Image
                                                        src={(treatment as any).imageUrl}
                                                        alt={treatment.koTitle}
                                                        fill
                                                        priority={idx === 1} // 중앙 카드 우선 로드
                                                        unoptimized // 원본 화질 유지
                                                        className={`h-full w-full object-cover ${idx === 2 ? 'object-[10%_center]' : 'object-center'} transition-transform duration-700 group-hover:scale-105`}
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]} opacity-30 group-hover:opacity-10 transition-opacity duration-500`} />
                                                </>
                                            ) : (<div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]}`} />)}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-6 text-left">
                                            <p className="font-black uppercase tracking-widest text-[13px] text-white mb-2 md:text-[30px]">{treatment.enTitle}</p>
                                            <h4 className="text-[17px] md:text-[24px] font-bold tracking-tight mb-2">{treatment.koTitle}</h4>
                                            <p className="text-[11px] md:text-[14px] font-normal leading-relaxed text-white/80 tracking-tight line-clamp-2 break-keep">{treatment.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-8 mt-16 md:hidden">
                        <button onClick={handlePrev} className="flex items-center justify-center w-12 h-12 rounded-full border border-brand/20 bg-white/70 backdrop-blur-md shadow-md active:scale-95 transition-all text-brand">
                            <span className="text-2xl text-brand">←</span>
                        </button>
                        <div className="flex gap-2">
                            {SIGNATURE_TREATMENTS.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-brand' : 'bg-brand/20'}`} />
                            ))}
                        </div>
                        <button onClick={handleNext} className="flex items-center justify-center w-12 h-12 rounded-full border border-brand/20 bg-white/70 backdrop-blur-md shadow-md active:scale-95 transition-all text-brand">
                            <span className="text-2xl text-brand">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
