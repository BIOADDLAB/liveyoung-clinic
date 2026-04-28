"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useVh } from "@/hooks/useVh";
import { HERO_SLIDES } from "@/lib/constants";

/**
 * HeroSlider 섹션
 * 이미지/영상은 플레이스홀더로 처리 (내부 팀 전달 대기)
 */

function SlideContent({ slide, isActive }: { slide: typeof HERO_SLIDES[0]; isActive: boolean }) {
    return (
        <div className="relative flex h-full w-full items-center justify-center">
            {/* 텍스트 콘텐츠 (활성화된 슬라이드만 애니메이션과 함께 표시) */}
            <div
                className={`relative z-10 flex flex-col items-center px-5 text-center text-white transition-all duration-1000 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                {slide.subtitle && (
                    <p className="font-suit-el text-[16px] md:text-[24px] font-medium tracking-[0.12em] text-white/90 leading-none mb-6 text-center">
                        {slide.subtitle}
                    </p>
                )}
                <h2 className="whitespace-pre-line text-[30px] md:text-[60px] font-[200] leading-[1.2] tracking-[-3.6px] text-white break-keep">
                    {slide.title}
                </h2>
                <p className="mt-6 text-[14px] md:text-[18px] font-suit-el leading-[1.7] text-white/90 max-w-2xl text-center tracking-[-0.03em] break-keep">
                    {slide.description}
                </p>
            </div>
        </div>
    );
}

export default function HeroSlider() {
    useVh();
    const swiperRef = useRef<SwiperType | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // 영상 시간에 맞춰 슬라이드와 프로그레스 바를 동기화하는 로직
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let lastIndex = -1;

        const syncSlider = () => {
            if (!video.duration) {
                requestAnimationFrame(syncSlider);
                return;
            }

            const duration = video.duration;
            const currentTime = video.currentTime;
            const segmentDuration = duration / 3;

            // 1. 현재 슬라이드 인덱스 계산 (0, 1, 2)
            const currentIndex = Math.min(Math.floor(currentTime / segmentDuration), 2);

            // 2. 슬라이드 변경 트리거 (한 번만 실행되도록 체크)
            if (currentIndex !== lastIndex && swiperRef.current) {
                swiperRef.current.slideToLoop(currentIndex);
                lastIndex = currentIndex;
            }

            // 3. 프로그레스 바 업데이트 (현재 구간 내의 0~100%)
            if (progressRef.current) {
                const currentSegmentProgress = ((currentTime % segmentDuration) / segmentDuration) * 100;
                progressRef.current.style.width = `${currentSegmentProgress}%`;
            }

            requestAnimationFrame(syncSlider);
        };

        const animationId = requestAnimationFrame(syncSlider);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const handlePrev = useCallback(() => {
        if (!videoRef.current || !swiperRef.current) return;
        const video = videoRef.current;
        const segment = video.duration / 3;
        const prevIndex = (activeIndex - 1 + 3) % 3;
        video.currentTime = prevIndex * segment;
    }, [activeIndex]);

    const handleNext = useCallback(() => {
        if (!videoRef.current || !swiperRef.current) return;
        const video = videoRef.current;
        const segment = video.duration / 3;
        const nextIndex = (activeIndex + 1) % 3;
        video.currentTime = nextIndex * segment;
    }, [activeIndex]);

    return (
        <section
            id="visual"
            className="relative overflow-hidden"
            style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        >
            {/* 전체 배경 비디오 (단일 소스) */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    src="/videos/리브영 메인.mov"
                    className="h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                />
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <Swiper
                modules={[EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                allowTouchMove={false} // 비디오와 동기화되므로 직접 드래그 금지
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex);
                }}
                className="h-full w-full"
            >
                {HERO_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {({ isActive }) => (
                            <SlideContent slide={slide} isActive={isActive} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 하단 컨트롤 영역 (진행바 + 네비게이션) */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
                {/* 얇은 프로그레스 바 영역 */}
                <div className="relative h-[2px] w-full bg-white/10">
                    <div
                        ref={progressRef}
                        className="absolute left-0 top-0 h-full bg-white transition-none"
                        style={{ width: "0%" }}
                    />
                </div>

                {/* 컨트롤 버튼 & 정보 영역 */}
                <div className="flex items-center justify-between px-5 py-6 md:px-12 md:py-8 lg:px-24">
                    {/* 좌측: 슬라이드 카운터 */}
                    <div className="flex items-center gap-2 text-white/90">
                        <span className="text-sm font-semibold tracking-widest md:text-base">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-light text-white/50 opacity-50 md:text-sm">/</span>
                        <span className="text-xs font-light text-white/50 md:text-sm">
                            {String(HERO_SLIDES.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* 중앙: Scroll Down (Desktop Only) */}
                    <div className="hidden flex-col items-center gap-2 md:flex">
                        <span className="sub_title text-sm tracking-[2px] text-white/50">
                            Scroll Down
                        </span>
                        <span className="animate-bounce-down text-white/50">↓</span>
                    </div>

                    {/* 우측: 화살표 네비게이션 */}
                    <div className="flex gap-2 md:gap-4">
                        <button
                            onClick={handlePrev}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white md:h-12 md:w-12"
                            aria-label="이전 슬라이드"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/70 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white md:h-12 md:w-12"
                            aria-label="다음 슬라이드"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

