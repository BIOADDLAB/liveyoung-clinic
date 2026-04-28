"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useVh } from "@/hooks/useVh";
import SubPageNav from "./SubPageNav";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    bgImage: string;
    mobileBgImage?: string;
    objectPosition?: string;
}

/**
 * 서브페이지 공통 상단 비주얼 영역 (PageHeader)
 */
export default function PageHeader({ title, subtitle, description, bgImage, mobileBgImage, objectPosition }: PageHeaderProps) {
    useVh();

    return (
        <section
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        >
            {/* 배경 이미지: 모바일 우선 노출 (Next.js Image 최적화 적용) */}
            <div className="absolute inset-0 z-0">
                {/* 모바일 배경 이미지 (모바일에서만 보임) */}
                {mobileBgImage && (
                    <div className="md:hidden absolute inset-0">
                        <Image
                            src={mobileBgImage}
                            alt={`${title} mobile background`}
                            fill
                            priority
                            unoptimized // 원본 화질 그대로 유지
                            className={`object-cover ${objectPosition || 'object-center'}`}
                        />
                    </div>
                )}
                {/* 데스크탑 배경 이미지 (데스크탑 이상에서만 보임 또는 mobileBgImage가 없는 경우 전체 노출) */}
                <div className={`${mobileBgImage ? 'hidden md:block' : ''} absolute inset-0`}>
                    <Image
                        src={bgImage}
                        alt={`${title} background`}
                        fill
                        priority
                        unoptimized // 원본 화질 그대로 유지
                        className={`object-cover ${objectPosition || 'object-center md:object-right'}`}
                    />
                </div>
            </div>

            {/* 다크 그라디언트 오버레이: 가독성 확보 */}
            <div className="absolute inset-0 z-10 bg-black/40 bg-gradient-to-t from-black/60 to-transparent" />

            {/* 헤더 텍스트 */}
            <div className="relative z-20 mx-auto w-full max-w-[1560px] px-5 text-center flex flex-col items-center md:px-8 pb-[80px]">
                {subtitle && (
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-runalto text-[26px] md:text-[36px] font-medium tracking-[0.05em] text-white leading-none mb-3 text-center uppercase"
                    >
                        {subtitle}
                    </motion.span>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="whitespace-pre-line text-[32px] md:text-[66px] font-suit-el leading-[1.2] tracking-[-0.05em] text-white break-keep"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 text-[16px] md:text-[18px] font-suit-el leading-[1.7] text-white/90 max-w-2xl text-center tracking-[-0.03em] break-keep"
                    >
                        {description}
                    </motion.p>
                )}
            </div>

            {/* 하단 스크롤 다운 애니메이션 (네비게이션 바와 겹치지 않게 위치 조정) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-[100px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="sub_title text-sm tracking-[2px] text-white/50">
                    Scroll Down
                </span>
                <span className="animate-bounce-down text-white/50">↓</span>
            </motion.div>

            {/* 서브페이지 하단 네비게이션 바 */}
            <SubPageNav />
        </section>
    );
}
