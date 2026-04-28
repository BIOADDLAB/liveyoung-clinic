"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import PageHeader from "@/components/layout/PageHeader";
import { DOCTOR_INFO } from "@/lib/constants";

const PROCESS_STEPS = [
    {
        step: "01",
        title: "Needs Mapping",
        subtitle: "정밀 분석 및 상담",
        desc: "해부학적 구조와 표정 근육 분석",
        keyword: "Analyze",
        icon: "/images/emoji/LY Clinic/about/병원소개_Needs Mapping.webp",
    },
    {
        step: "02",
        title: "Curated Plan 설계",
        subtitle: "최적화된 시술 동선",
        desc: "원장 상담 후 직접 맞춤형 솔루션 설계",
        keyword: "Design",
        icon: "/images/emoji/LY Clinic/about/병원소개_Curated Plan 설계.webp",
    },
    {
        step: "03",
        title: "맞춤 시술 진행",
        subtitle: "정교한 책임 시술",
        desc: "필요한 변화만 Check 정교한 시술",
        keyword: "Perform",
        icon: "/images/emoji/LY Clinic/about/병원소개_맞춤 시술 진행.webp",
    },
];

export default function AboutContent() {
    return (
        <>
            <PageHeader
                title="병원 소개"
                subtitle="ABOUT LIVE YOUNG"
                description="시술을 팔지 않고 당신의 고민과 얼굴을 정밀하게 분석하여 꼭 필요한 솔루션만 제안합니다"
                bgImage="/images/covers/about_cover.webp"
                mobileBgImage="/images/cover_m/LY Clinic/병원소개/about_cover_m.webp"
            />

            <section className="relative pt-[80px] md:pt-[140px] pb-0 bg-[#F2F1ED] overflow-hidden">
                <div className="mx-auto max-w-[1560px] px-5 md:px-8 text-center relative z-10 pb-[220px] md:pb-[440px]">
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-whisper text-[44px] md:text-[80px] gold-gradient-text italic leading-none mb-2 md:mb-3"
                    >
                        About Us
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mt-0 font-cormorant text-[42px] md:text-[110px] uppercase leading-[1] tracking-[0.05em] text-brand"
                    >
                        Live Young Clinic
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-12 md:mt-16 mx-auto max-w-4xl space-y-4 text-center relative"
                    >
                        <div className="relative z-10 space-y-6 px-10 md:px-14 text-center">
                            <p className="text-[14px] md:text-[16px] leading-[1.8] text-brand-light break-keep">
                                <span className="relative inline-block">
                                    {/* 왼쪽 따옴표 */}
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                        className="absolute -left-4 md:-left-6 -top-4 md:-top-6 text-[32px] md:text-[48px] gold-gradient-text select-none opacity-60"
                                    >
                                        &ldquo;
                                    </motion.span>
                                    저희
                                </span>{" "}
                                리브영은 속도보다 가치를 우선합니다. 모든 상담은 원장이 직접하며, <br className="hidden md:block" /> 과정에서의 얼굴 해부학적 구조와 미세한 표정 근육까지 세밀하게 분석합니다. <br className="hidden md:block" /> 본인조차 미처 발견하지 못한 고민의 근원까지 찾아내는 <strong className="font-semibold text-brand">'Needs Mapping'</strong>을 통해 추구미 설계가 가능합니다.
                            </p>

                            <p className="text-[14px] md:text-[16px] leading-[1.8] text-brand-light break-keep">
                                당신의 일상이 더 아름다워지는 고집과 집착. 단 1샷의 에너지와 0.1 unit의 오차도 허용하지 않는 집요함이 있습니다. <br className="hidden md:block" /> FDA, CE 승인된 정품 장비와 제품만을 고집하는 이유, 오직 고객님의 신뢰와 만족을 위한 <br className="hidden md:block" />
                                <span className="relative inline-block">
                                    리브영의 약속입니다.
                                    {/* 오른쪽 따옴표 */}
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                                        className="absolute -right-4 md:-right-6 -top-4 md:-top-5 text-[32px] md:text-[48px] gold-gradient-text select-none opacity-60"
                                    >
                                        &rdquo;
                                    </motion.span>
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="relative w-full mt-50 md:mt-70 pb-0">
                    {/* 상단: 산맥스타일 배경 */}
                    <div className="absolute top-0 left-0 w-full h-[150px] md:h-[250px] z-10 pointer-events-none transform -translate-y-[98%]">
                        <div
                            className="w-full h-full bg-brand"
                            style={{
                                maskImage: "url(/images/about/about.background.webp)",
                                maskSize: "100% 100%",
                                maskRepeat: "no-repeat",
                                WebkitMaskImage: "url(/images/about/about.background.webp)",
                                WebkitMaskSize: "100% 100%",
                                WebkitMaskRepeat: "no-repeat",
                            }}
                        />
                    </div>

                    <div className="bg-brand w-full pb-16 md:pb-[120px] relative z-20 pt-[40px] md:pt-[50px]">

                        <div className="flex justify-center -mt-[400px] md:-mt-[650px] relative z-30 mb-16 md:mb-24 px-5">
                            <div className="imgBox relative inline-block">
                                {/* 타원형(Capsule) 모양 */}
                                <svg width="0" height="0" className="absolute">
                                    <clipPath id="capsule-clip" clipPathUnits="objectBoundingBox">
                                        <rect x="0" y="0" width="1" height="1" rx="0.5" ry="0.35" />
                                    </clipPath>
                                </svg>

                                {/* 모바일 */}
                                <motion.svg
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="block md:hidden absolute w-[300px] h-[400px] overflow-visible z-20 left-1/2 -translate-x-1/2 pointer-events-none"
                                    viewBox="0 0 480 680"
                                >
                                    <path id="mobileBottomPath" d="M 40,440 C 40,600 140,630 240,630 C 340,630 440,600 440,440" fill="transparent" />
                                    <text className="text-[14px] fill-[#282d3d] uppercase font-light" style={{ letterSpacing: '0.45em' }}>
                                        <textPath href="#mobileBottomPath" startOffset="51%" textAnchor="middle">
                                            LIVE YOUNG CLINIC
                                        </textPath>
                                    </text>
                                </motion.svg>

                                {/* 데스크탑 전용 텍스트 배치 */}
                                <motion.svg
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="hidden md:block absolute md:w-[480px] md:h-[680px] overflow-visible z-20 left-1/2 -translate-x-1/2 pointer-events-none"
                                    viewBox="0 0 480 680"
                                >
                                    <path id="desktopBottomPath" d="M 40,440 C 40,600 140,640 240,640 C 340,640 440,600 440,440" fill="transparent" />
                                    <text className="text-[15px] fill-[#282d3d] uppercase font-light" style={{ letterSpacing: '0.45em' }}>
                                        <textPath href="#desktopBottomPath" startOffset="51%" textAnchor="middle">
                                            LIVE YOUNG CLINIC
                                        </textPath>
                                    </text>
                                </motion.svg>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="w-[300px] h-[400px] md:w-[480px] md:h-[680px] shrink-0 mx-auto bg-brand"
                                    style={{ clipPath: 'url(#capsule-clip)' }}
                                >
                                    <img
                                        src="/images/chief_photo_optimized.jpg"
                                        className="w-full h-full object-cover scale-[1.05]"
                                        alt="리브영의원 대표원장"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* 진료 철학 텍스트 섹션 (레퍼런스 about_txt 구조 차용) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="about_txt max-w-5xl mx-auto text-center px-5 relative z-20"
                        >
                            <h4
                                className="korean-serif-title text-[24px] md:text-[42px] font-bold text-white mb-8 md:mb-12"
                            >
                                리브영의원 진료 철학
                            </h4>

                            <div
                                className="space-y-6 md:space-y-8 text-[15px] md:text-[18px] leading-[1.8] text-white break-keep"
                            >
                                <p>
                                    빠르게 처리하는 시술보다, 한 분 한 분의 얼굴이 10년 후에도 자연스럽고 고급스럽게 나이 들 수 있는 방향을 먼저 생각합니다.
                                </p>
                                <p>
                                    단 1샷의 에너지, <span className="font-semibold text-white">0.1 unit의 보톡스</span>도 정확한 위치에 주입하는 것 <br className="hidden md:block" />
                                    그 집요한 꼼꼼함이 리브영이 드릴 수 있는 가장 확실한 약속입니다.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden bg-[#F2F1ED] py-[90px] md:py-[150px]">
                <div className="mx-auto max-w-[1560px] px-5 md:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2"
                        >
                            PROCESS
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="korean-serif-title mt-2 text-[34px] font-bold leading-[1.1] text-brand md:text-[46px] tracking-[-0.04em]"
                        >
                            리브영의 맞춤 시술<br className="md:hidden" /> 프로세스
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mt-6 max-w-2xl text-[16px] md:text-[18px] font-normal leading-relaxed text-brand-muted tracking-[-0.026em]"
                        >
                            당신의 본연의 아름다움을 찾는 가장 과학적이고 체계적인 프로세스
                        </motion.p>
                    </div>

                    <div className="mt-12 md:mt-20 relative">
                        {/* 데스크탑 전용: 정밀하게 대칭되는 프리미엄 프로세스 곡선 */}
                        <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-10 hidden md:block">
                            <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none" className="overflow-visible" preserveAspectRatio="none">
                                <defs>
                                    {/* 모든 아크를 가로지르는 통합 골드 포인트 그라데이션 */}
                                    <linearGradient id="main-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#282d3d" />
                                        <stop offset="16.5%" stopColor="#bbaa68" />
                                        <stop offset="33%" stopColor="#282d3d" />
                                        <stop offset="50%" stopColor="#bbaa68" />
                                        <stop offset="66%" stopColor="#282d3d" />
                                        <stop offset="83.5%" stopColor="#bbaa68" />
                                        <stop offset="100%" stopColor="#282d3d" />
                                    </linearGradient>

                                    {/* 채우기 전용 투명 골드 그라데이션 (좌우 균형) */}
                                    <linearGradient id="fill-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#bbaa68" stopOpacity="0" />
                                        <stop offset="16.5%" stopColor="#bbaa68" stopOpacity="0.08" />
                                        <stop offset="33%" stopColor="#bbaa68" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#bbaa68" stopOpacity="0.08" />
                                        <stop offset="66%" stopColor="#bbaa68" stopOpacity="0" />
                                        <stop offset="83.5%" stopColor="#bbaa68" stopOpacity="0.08" />
                                        <stop offset="100%" stopColor="#bbaa68" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* 1. 동등한 채우기 (Step 01, 02, 03 모두 동일하게 적용) */}
                                <g>
                                    <motion.path
                                        d="M 0,200 A 200,200 0 0 0 400,200 A 200,120 0 0 1 0,200 Z 
                                           M 400,200 A 200,200 0 0 1 800,200 A 200,120 0 0 0 400,200 Z 
                                           M 800,200 A 200,200 0 0 0 1200,200 A 200,120 0 0 1 800,200 Z"
                                        fill="url(#fill-gold-grad)"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 2 }}
                                    />
                                </g>

                                {/* 2. 메인 스트로크 (3분할 골드 포인트) */}
                                <motion.path
                                    d="M 0,200 
                                       A 200,200 0 0 0 400,200 
                                       A 200,200 0 0 1 800,200 
                                       A 200,200 0 0 0 1200,200"
                                    stroke="url(#main-gold-grad)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                />
                            </svg>
                        </div>

                        <div className="relative z-0">
                            <div className="grid md:grid-cols-3 gap-0">
                                {PROCESS_STEPS.map((item, idx) => (
                                    <motion.div
                                        key={item.step}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: idx * 0.4 }}
                                        className="group relative"
                                    >
                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            className="relative flex min-h-[380px] flex-col items-center px-8 py-12 text-center transition-all duration-700 md:px-10 md:py-[60px]"
                                        >
                                            {/* 배경 숫자 */}
                                            <div className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                                                <span
                                                    className="text-[240px] font-black text-[#282d3d]/[0.02] leading-none tracking-tighter select-none transition-all duration-700 group-hover:scale-105"
                                                    style={{ fontFamily: "'Pretendard', sans-serif" }}
                                                >
                                                    {item.step}
                                                </span>
                                            </div>

                                            {/* 아이콘 컨테이너 */}
                                            <motion.div
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                                                className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/50 shadow-lg backdrop-blur-sm border border-white text-brand relative z-20 group-hover:bg-accent/5 transition-colors overflow-hidden"
                                            >
                                                <div className="w-full h-full p-4 flex items-center justify-center">
                                                    <img
                                                        src={item.icon as string}
                                                        alt={item.title}
                                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                            </motion.div>

                                            {/* 텍스트 컨텐츠 */}
                                            <div className="relative z-20">
                                                <span className="text-[12px] font-bold tracking-[0.2em] gold-gradient-text uppercase mb-3 block opacity-80">
                                                    Step {item.step}
                                                </span>
                                                <h4 className="text-[28px] md:text-[34px] font-bold leading-[1.1] tracking-[-0.05em] text-brand font-sans">
                                                    {item.title}
                                                </h4>
                                                <p className="mt-4 max-w-[280px] text-[15px] md:text-[16px] leading-7 text-brand-muted font-medium break-keep opacity-90">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* 하단 키워드 */}
                                            <div className="mt-auto pt-8 relative z-20">
                                                <div className="inline-block px-5 py-1.5 rounded-full border border-brand/10 bg-brand/5 backdrop-blur-sm transition-all duration-500 group-hover:border-accent">
                                                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand group-hover:text-accent">
                                                        {item.keyword}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden py-[60px] md:py-[100px]">
                <div className="mx-auto max-w-[1560px] px-5 md:px-8">
                    <div className="text-center">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            OUR SPACE
                        </p>
                        <h3 className="korean-serif-title mt-2 text-[34px] font-bold leading-[1.1] text-brand md:text-[46px] tracking-[-0.04em]">
                            리브영의 프리미엄 <br className="md:hidden" />공간
                        </h3>
                        <p className="mx-auto mt-6 max-w-[600px] text-[16px] md:text-[18px] font-normal leading-relaxed text-brand-muted tracking-[-0.026em]">
                            편안하고 프라이빗한 상담과 시술을 위해 설계된 리브영의원의 세련된 공간입니다.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group aspect-[16/10] overflow-hidden rounded-2xl shadow-lg"
                        >
                            <img
                                src="/images/about/9.webp"
                                alt="리브영의원 프라이빗 상담실"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group aspect-[16/10] overflow-hidden rounded-2xl shadow-lg"
                        >
                            <img
                                src="/images/about/14.webp"
                                alt="리브영의원 1:1 맞춤 시술실"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 의료진 소개 (True Full-Width Section) */}
            <section className="w-full relative overflow-hidden bg-[#1a1f2e] min-h-[500px] md:min-h-[650px] flex items-center mt-20 md:mt-32">
                {/* 배경 이미지 영역 (Portrait aligned left - Edge to Edge) */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[50%] lg:w-[45%] z-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="h-full w-full relative"
                    >
                        <img
                            src="/images/chief_photo_optimized.jpg"
                            alt="리브영의원 대표원장 송기선"
                            className="h-full w-full object-cover grayscale brightness-75 contrast-105 object-top"
                        />
                        {/* 우측 페이드 (배경 결합) */}
                        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-transparent via-[#1a1f2e]/60 to-[#1a1f2e]" />
                    </motion.div>
                </div>

                {/* 컨텐츠 오버레이 영역 (텍스트 - 중앙 정렬된 컨테이너 내부에서 오른쪽 배치) */}
                <div className="mx-auto w-full max-w-[1560px] relative z-10 px-6 md:px-12 lg:px-20">
                    <div className="flex justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-[60%] lg:w-[50%] text-white text-left py-20"
                        >
                            <span className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                                CHIEF DIRECTOR
                            </span>
                            <h3 className="korean-serif-title mt-2 text-[34px] font-bold leading-[1.1] text-white md:text-[46px] tracking-[-0.04em]">
                                의료진 소개
                            </h3>

                            <div className="space-y-8 mt-12">
                                <div className="flex items-baseline gap-5">
                                    <h4 className="text-[28px] md:text-[42px] font-bold tracking-tight text-white">
                                        {DOCTOR_INFO.name}
                                    </h4>
                                    <p className="text-[16px] md:text-[18px] font-medium text-white/40 uppercase tracking-widest">
                                        {DOCTOR_INFO.role}
                                    </p>
                                </div>

                                <p className="text-[16px] md:text-[19px] leading-[1.8] text-white/80 font-light break-keep max-w-[600px]">
                                    10년 이상의 임상 경험을 바탕으로, 미용시장이 다양해질수록<br className="hidden md:block" />
                                    중요한 것은 과한 변화가 아니라 지금 얼굴이 가진 구조와<br className="hidden md:block" />
                                    균형을 읽고 가장 자연스럽게 아름다움을 끌어내는<br className="hidden md:block" />
                                    정교한 설계라고 생각합니다.
                                </p>

                                <div className="pt-10 mt-12 border-t border-white/10">
                                    <p className="text-[16px] font-bold text-accent mb-6 uppercase tracking-wider">약력</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                        {[
                                            "고려대학교 생명과학부",
                                            "고려대학교 생명과학대학원 분자생물학과 석사",
                                            "을지대학교 의과대학",
                                            "B.S. in Biological Sciences, Korea University",
                                            "M.S. in Molecular Biology, Korea University",
                                            "M.D., Eulji University School of Medicine",
                                            "USMLE Step 1, Step 2 CS Passed"
                                        ].map((item, idx) => (
                                            <li
                                                key={`pro-final-${idx}`}
                                                className="flex items-start gap-3 text-[13.5px] md:text-[14.5px] text-white/50 font-medium leading-snug"
                                            >
                                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-[60px] md:py-[100px]">
                <div className="mx-auto max-w-[1560px] px-5 md:px-8">
                    <div className="relative overflow-hidden rounded-[40px] bg-[#282d3d] px-6 py-16 text-center shadow-[0_35px_100px_-50px_rgba(40,45,61,0.75)] md:px-10 md:py-20">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%)]"
                        />
                        <div
                            aria-hidden="true"
                            className="absolute bottom-[-30px] right-[-10px] h-48 w-48 rounded-full bg-white/5 blur-2xl"
                        />

                        <div className="relative z-10 mx-auto max-w-3xl">
                            <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                Begin With Us
                            </p>
                            <h3 className="korean-serif-title mt-1 flex items-center justify-center text-[34px] font-bold leading-[1.1] text-white md:text-[46px] md:tracking-[-0.04em]">
                                리브영의원에서 <br className="md:hidden" />시작하세요
                            </h3>
                            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-white/70 md:text-[18px]">
                                얼굴의 구조를 읽고 가장 자연스러운 방향을 제안하는 상담부터 차분하게 시작합니다.
                            </p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/contact"
                                    className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-[#282d3d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bbaa68] hover:text-white"
                                >
                                    상담 예약하기
                                </Link>
                                <a
                                    href="tel:02-517-3338"
                                    onClick={(e) => { if (window.innerWidth >= 768) e.preventDefault(); }}
                                    className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 md:cursor-default"
                                >
                                    <span className="hidden md:inline">TEL 02-517-3338</span>
                                    <span className="md:hidden">전화 상담하기</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
