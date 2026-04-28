"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const UNIQUE_IMAGES = [
    "/images/about/4.webp",
    "/images/about/7.webp",
    "/images/about/8.webp",
    "/images/about/9.webp",
    "/images/about/11.webp",
    "/images/about/12.webp",
    "/images/about/14.webp",
];

// 무한 루프를 위해 배열을 2번 반복합니다.
const INTERIOR_IMAGES = [...UNIQUE_IMAGES, ...UNIQUE_IMAGES];

export default function InteriorGallery() {
    return (
        <section className="py-[60px] md:py-[100px] overflow-hidden bg-[#F2F1ED]">
            <div
                className="relative w-full overflow-hidden"
                style={{ clipPath: "url(#panorama-mask)" }}
            >
                <motion.div
                    className="flex gap-2 md:gap-4"
                    animate={{
                        // 7개 이미지의 총 너비만큼 이동 (7 * (450px + 16px gap) = 3262px)
                        x: [-3262, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "max-content" }}
                >
                    {INTERIOR_IMAGES.map((src, idx) => (
                        <div
                            key={idx}
                            className="relative h-[250px] w-[300px] shrink-0 overflow-hidden bg-[#F2F1ED] md:h-[650px] md:w-[450px]"
                        >
                            <Image
                                src={src}
                                alt={`Clinic interior ${idx + 1}`}
                                fill
                                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 300px, 500px"
                            />
                            {/* 이미지 간 구분선 */}
                            <div className="absolute inset-0 border-r border-white/10" />
                        </div>
                    ))}
                </motion.div>

                {/* SVG 클립패스 정의 - 중앙이 낮고 양 끝이 높은 오목한(Concave) 아치형 */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id="panorama-mask" clipPathUnits="objectBoundingBox">
                            {/* 
                                M 0,0: 왼쪽 최상단
                                Q 0.5,0.12 1,0: 중앙에서 12% 내려오는 오목한 위쪽 곡선
                                L 1,1: 오른쪽 최하단
                                Q 0.5,0.88 0,1: 중앙에서 12% 올라오는 오목한 아래쪽 곡선
                                Z: 닫기
                            */}
                            <path d="M0,0 Q0.5,0.12 1,0 L1,1 Q0.5,0.88 0,1 Z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            <div className="mt-8 text-center px-5">
                <p className="text-brand/40 text-xs md:text-sm tracking-[4px] uppercase font-medium">
                    <span className="text-brand">Live Young Clinic</span> Premium Interior
                </p>
            </div>
        </section>
    );
}
