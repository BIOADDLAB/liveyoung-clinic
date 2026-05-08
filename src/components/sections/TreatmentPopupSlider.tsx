"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

/**
 * TreatmentPopupSlider - 시그니처 시술 5종 팝업 슬라이더
 */
const SLIDES = [
    {
        id: 1,
        enTitle: "CONTOURING",
        koTitle: "얼굴/바디 컨투어링",
        description: "얼굴의 지방을 정리하고 비어있는 곳을 채워, 입체적인 윤곽선을 완성하는 고도의 디자인 작업입니다.",
        href: "/treatment/tightening",
        imageUrl: "/images/popupslide/contouring_popup.webp",
        mobileImageUrl: "/images/popupslide_m/contouring_popup_m.webp" // 세로형 이미지 파일명으로 교체 필요
    },
    {
        id: 2,
        enTitle: "SKIN BOOSTER",
        koTitle: "스킨부스터",
        description: "겉도는 광채가 아닌, 세포 속부터 건강한 아름다움을 설계합니다. 피부 컨디션 분석을 통한 맞춤형 성분 커스터마이징.",
        href: "/treatment/skin-booster",
        imageUrl: "/images/popupslide/skin_booster_popup.webp",
        mobileImageUrl: "/images/popupslide_m/skin_booster_popup_m.webp"
    },
    {
        id: 3,
        enTitle: "LIFTING",
        koTitle: "리프팅",
        description: "보이지 않는 근막층까지, 피부 두께와 개인의 라인을 분석하여 설계하는 정밀 거상 시술입니다.",
        href: "/treatment/lifting",
        imageUrl: "/images/popupslide/lifting_popup.webp",
        mobileImageUrl: "/images/popupslide_m/lifting_popup_m.webp"
    },
    {
        id: 4,
        enTitle: "TEXTURE",
        koTitle: "미백/모공",
        description: "지우는 것을 넘어, 건강한 피부 바탕의 본연을 되찾아 드립니다. 색소의 뿌리와 흉터의 깊이를 파악하는 심층 분석.",
        href: "/treatment/texture",
        imageUrl: "/images/popupslide/texture_popup.webp",
        mobileImageUrl: "/images/popupslide_m/texture_popup_m.webp"
    },
    {
        id: 5,
        enTitle: "STEM CELL",
        koTitle: "줄기세포",
        description: "손상된 피부 조직의 재생을 촉진하는 줄기세포 치료. 본연의 건강한 피부로 되돌리는 근본적인 솔루션입니다.",
        href: "/treatment/stem-cell",
        imageUrl: "/images/popupslide/stem_cell_popup.webp",
        mobileImageUrl: "/images/popupslide_m/stem_cell_popup_m.webp"
    }
];

export default function TreatmentPopupSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAuto, setIsAuto] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isAuto) {
            // 사용자가 클릭한 경우 10초 후에 다시 자동 전환 시작
            timer = setTimeout(() => setIsAuto(true), 10000);
            return () => clearTimeout(timer);
        }

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAuto]);

    const handleTabClick = (index: number) => {
        setIsAuto(false);
        setCurrentIndex(index);
    };

    return (
        <section className="relative h-auto min-h-[850px] w-full overflow-hidden md:h-[850px] bg-surface py-[60px] md:py-0">
            {/* 배경 레이어 (bg-surface 통합) */}
            <div className="absolute inset-0 bg-surface" />

            <div className="relative z-10 mx-auto h-full max-w-[1400px] px-5 md:px-8">
                <div className="flex h-full flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

                    {/* 좌측: 5분할 탭 메뉴 (Desktop) / 상단 스크롤 메뉴 (Mobile) */}
                    <div className="w-full md:w-[320px] shrink-0 pt-4 md:pt-0">
                        <div className="flex md:flex-col gap-3 overflow-x-auto pb-6 md:pb-0 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
                            {SLIDES.map((slide, idx) => (
                                <button
                                    key={slide.id}
                                    onClick={() => handleTabClick(idx)}
                                    className={`relative flex flex-col items-center justify-center p-5 md:p-6 rounded-[24px] border transition-all duration-500 w-[170px] shrink-0 md:min-w-full md:items-start text-center md:text-left group
                                        ${currentIndex === idx
                                            ? "bg-brand border-transparent shadow-[0_20px_40px_rgba(34,39,54,0.15)]"
                                            : "bg-white/60 border-black/[0.03] hover:bg-white hover:border-black/10"
                                        }`}
                                >
                                    <span className={`text-[9px] font-black tracking-[0.15em] uppercase mb-1.5 transition-colors duration-500
                                        ${currentIndex === idx ? "text-white/40" : "text-brand/40"}`}>
                                        {slide.enTitle}
                                    </span>
                                    <span className={`text-[15px] md:text-[19px] font-bold tracking-tight transition-colors duration-500
                                        ${currentIndex === idx ? "text-white" : "text-brand"}`}>
                                        {slide.koTitle}
                                    </span>

                                    {/* 활성화 표시 포인트 */}
                                    {currentIndex === idx && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 우측/중앙: 상세 컨텐츠 영역 */}
                    <div className="flex-1 w-full max-w-[850px] pb-10 md:pb-0">
                        <div className="relative min-h-[520px] md:h-[580px] rounded-[40px] md:rounded-[56px] overflow-hidden bg-white shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-black/[0.03] group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative flex flex-col md:flex-row h-full"
                                >
                                    {/* 이미지 영역 */}
                                    <div className="w-full md:w-[42%] h-[280px] md:h-full relative overflow-hidden shrink-0">
                                        <Image
                                            src={isMobile && SLIDES[currentIndex].mobileImageUrl ? SLIDES[currentIndex].mobileImageUrl : SLIDES[currentIndex].imageUrl}
                                            alt={SLIDES[currentIndex].koTitle}
                                            fill
                                            priority // 슬라이더 이미지는 사용자 경험을 위해 가급적 빠르게 노출
                                            unoptimized // 원본 화질 유지
                                            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${currentIndex === 4 ? 'object-[110%_115%] scale-[1.02]' : 'object-center'}`}
                                        />
                                        <div className="absolute inset-0 bg-brand/5 mix-blend-multiply" />
                                    </div>

                                    {/* 텍스트 영역 */}
                                    <div className="flex-1 px-7 py-10 md:p-16 flex flex-col justify-center bg-white min-w-0">
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                visible: { transition: { staggerChildren: 0.08 } },
                                                hidden: {}
                                            }}
                                            className="relative z-10"
                                        >
                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                                }}
                                                className="mb-8 hidden md:block"
                                            >
                                                <div className="w-12 h-[1px] bg-accent" />
                                            </motion.div>

                                            <motion.span
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                                }}
                                                className="text-[11px] font-black tracking-[0.25em] text-accent uppercase mb-3 md:mb-5 block"
                                            >
                                                SIGNATURE TREATMENT
                                            </motion.span>

                                            <motion.h3
                                                variants={{
                                                    hidden: { opacity: 0, y: 15 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                                                }}
                                                className="text-[32px] md:text-[44px] font-bold text-brand leading-tight tracking-[-0.05em] mb-6 md:mb-10 break-keep"
                                            >
                                                {SLIDES[currentIndex].koTitle}
                                            </motion.h3>

                                            <motion.p
                                                variants={{
                                                    hidden: { opacity: 0, y: 15 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                                                }}
                                                className="text-[15px] md:text-[19px] font-normal leading-[1.7] md:leading-[1.8] text-brand-muted tracking-[-0.03em] break-keep mb-10 md:mb-14"
                                            >
                                                {SLIDES[currentIndex].description}
                                            </motion.p>

                                            <motion.div
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0.95 },
                                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                                                }}
                                            >
                                                <Link
                                                    href={SLIDES[currentIndex].href}
                                                    className="inline-flex items-center gap-10 md:gap-12 rounded-full border border-brand/10 pl-8 md:pl-10 pr-4 py-2.5 md:py-3 transition-all duration-400 hover:border-brand/30 hover:bg-brand/5 group/btn"
                                                >
                                                    <span className="text-[14px] md:text-[15px] font-bold text-brand tracking-widest">DETAILS</span>
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand text-white flex items-center justify-center transition-transform duration-400 group-hover/btn:translate-x-1">
                                                        <Icon icon="ph:arrow-right-bold" width={16} />
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* 하단 인디케이터 (Mobile 전용) */}
                        <div className="flex justify-center gap-2 mt-8 md:hidden">
                            {SLIDES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleTabClick(i)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                                        ${currentIndex === i ? "w-6 bg-brand" : "bg-brand/20"}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
