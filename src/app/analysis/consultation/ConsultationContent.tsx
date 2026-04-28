"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

const CURATED_PLAN_PROCESS = [
    {
        step: "01",
        title: "Medical Data Capture",
        desc: "다양한 광원을 이용한 AI 피부 분석기(Eve Muse)로 육안으로 볼 수 없는 피부 속 깊은 정보까지 수치화된 데이터로 추출합니다.",
        icon: "ph:scan-fill",
    },
    {
        step: "02",
        title: "Needs Mapping",
        desc: "고객이 말하는 주관적인 고민을 데이터와 대조하여, 실제 원인이 무엇인지 의료진의 관점에서 재해석하고 매핑하는 과정입니다.",
        icon: "ph:waveform-bold",
    },
    {
        step: "03",
        title: "Director's custom design",
        desc: "상담 실장이 아닌 대표원장이 직접 데이터를 기반으로 1:1 맞춤형 시술 순서와 강도를 정교하게 설계합니다.",
        icon: "ph:pencil-circle-fill",
    },
    {
        step: "04",
        title: "Execution Plan",
        desc: "단순한 시술 나열이 아닌, 5년 후, 10년 후의 모습까지 고려한 지속 가능한 아름다움의 이정표인 'Curated Plan'를 확정합니다.",
        icon: "ph:path-fill",
    },
];

const PROFESSIONAL_INSIGHTS = [
    {
        title: "Facial Anatomy",
        label: "해부학적 구조 분석",
        desc: "단순히 피부 겉면만 보는 것이 아니라, 근육의 움직임과 지방층의 두께, 골격의 구조를 실시간으로 분석하여 시술의 타당성을 검토합니다.",
    },
    {
        title: "Expression Analysis",
        label: "표정 근육의 메커니즘",
        desc: "말을 하거나 웃을 때 움직이는 근육의 패턴을 파악하여, 인위적이지 않고 자연스러운 결과를 도출하는 '다이나믹 밸런스'를 고려합니다.",
    },
    {
        title: "Long-term Planning",
        label: "장기적인 안티에이징 로드맵",
        desc: "오늘의 시술이 내일의 피부 건강을 해치지 않도록, 피부의 재생 주기를 고려한 건강한 노화 관리 플랜을 제안합니다.",
    },
];

export default function ConsultationContent() {
    return (
        <div className="bg-surface">

            {/* 2. Professionalism Highlights - Spacing Optimized */}
            <section className="py-[80px] md:py-[130px] overflow-hidden">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-20 items-start">
                        <div className="flex-1 lg:sticky lg:top-40">
                            <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">Professional Insight</span>
                            <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em] mb-8">
                                한 차원 높은 전문성,<br />
                                데이터를 읽는 눈
                            </h2>
                            <p className="text-[16px] md:text-[18px] leading-[1.75] tracking-[-0.026em] text-brand-muted mb-10 max-w-[500px] break-keep">
                                AI가 주는 수치는 누구나 얻을 수 있지만, 그 데이터 사이의 연관성을 찾아내고 시술의 해답을 제시하는 것은 의료진의 몫입니다. 리브영은 정밀한 데이터와 풍부한 임상 경험의 결합으로 만족하는 결과를 약속합니다.
                            </p>
                        </div>
                        <div className="flex-1 space-y-12">
                            {PROFESSIONAL_INSIGHTS.map((insight, idx) => (
                                <motion.div
                                    key={insight.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                                    className="p-10 rounded-[40px] bg-white border border-brand/5 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:border-accent/30 transition-all group"
                                >
                                    <span className="text-[12px] font-black tracking-[0.2em] text-accent/40 uppercase block mb-4 group-hover:text-accent transition-colors">{insight.title}</span>
                                    <h3 className="text-[20px] md:text-[22px] font-bold leading-[1.3] tracking-[-0.02em] text-brand mb-4">{insight.label}</h3>
                                    <p className="text-[15px] md:text-[16px] leading-[1.7] tracking-[-0.026em] text-brand-muted/80 break-keep font-medium">
                                        {insight.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Comparison - Spacing Optimized */}
            <section className="relative py-[80px] md:py-[130px] text-white overflow-hidden">
                {/* 배경 이미지 설정 */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/background/bg_ver2.webp')" }}
                />
                {/* 배경 장식 요소 및 어두운 오버레이 (가독성 확보) */}
                <div className="absolute inset-0 bg-brand/5 backdrop-blur-[2px] z-0"></div>

                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <div className="text-center mb-20 md:mb-32">
                        <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">LIVE YOUNG'S LEGACY</span>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.04em]">
                            리브영의 상담이<br />
                            유일한 차별점이 되는 이유
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
                        {/* Common Clinic */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="p-12 rounded-[50px] bg-white/5 border border-white/10 opacity-60 grayscale"
                        >
                            <h3 className="text-[15px] font-black tracking-[0.2em] text-white/40 uppercase mb-8">Common Clinic</h3>
                            <ul className="space-y-6 text-[16px] md:text-[17px] leading-[1.7] tracking-[-0.026em] font-medium text-white/50 break-keep">
                                <li className="flex items-start gap-4">
                                    <Icon icon="ph:x-circle-fill" className="text-[24px] mt-1 shrink-0" />
                                    <span>상담 실장 위주의 프로그램 안내 및 결제 유도</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Icon icon="ph:x-circle-fill" className="text-[24px] mt-1 shrink-0" />
                                    <span>정해진 패키지 시술 위주의 획일화된 제안</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Icon icon="ph:x-circle-fill" className="text-[24px] mt-1 shrink-0" />
                                    <span>짧은 상담 시간과 원장과의 소통 부재</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* LY Signature */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="p-12 rounded-[50px] bg-accent/10 border border-accent/30 shadow-[0_40px_100px_rgba(206,173,115,0.15)] relative"
                        >
                            <div className="absolute -top-6 left-12 bg-accent text-brand font-black text-[12px] px-6 py-2 rounded-full tracking-widest uppercase shadow-lg">LY Signature</div>
                            <h3 className="text-[15px] font-black tracking-[0.2em] text-accent uppercase mb-8">1:1 PRIVATE DIRECTOR CONSULTING</h3>
                            <ul className="space-y-6 text-[16px] md:text-[18px] leading-[1.7] tracking-[-0.026em] font-bold text-white break-keep">
                                <li className="flex items-start gap-4">
                                    <Icon icon="ph:check-circle-fill" className="text-[24px] text-accent mt-1 shrink-0" />
                                    <span>대표원장의 1:1 비스포크 Needs Mapping</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Icon icon="ph:check-circle-fill" className="text-[24px] text-accent mt-1 shrink-0" />
                                    <span>개인별 추구미 맞춤 Curated Plan</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Icon icon="ph:check-circle-fill" className="text-[24px] text-accent mt-1 shrink-0" />
                                    <span>맞춤 상담을 통한 고차원의 소통 진행</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Signature Curated Plan Process - Spacing Optimized */}
            <section className="py-[80px] md:py-[130px]">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="text-center mb-20 md:mb-32">
                        <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">Curated Plan Journey</span>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.04em] text-brand">
                            진료의 완성도를<br />
                            결정하는 상담 <br className="md:hidden" />프로세스
                        </h2>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
                        {CURATED_PLAN_PROCESS.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                                className="group relative flex flex-col h-full"
                            >
                                {/* Step Card - Signature Brand Palette Design */}
                                <div className="w-full h-full bg-white rounded-[48px] border border-brand/5 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_45px_120px_rgba(206,173,115,0.18)] transition-all duration-700 overflow-hidden group/card flex flex-col">

                                    {/* 1. Header Tile (Signature Beige - Brand Warmth) */}
                                    <div className="p-10 pb-4 flex flex-col items-center justify-center text-center lg:min-h-[160px] transition-colors duration-500 bg-[#FAF9F5] group-hover/card:bg-[#F8F7F2]">
                                        <h3 className="korean-serif-title text-[26px] md:text-[30px] font-bold text-brand leading-[1.3] break-keep max-w-[240px] mx-auto relative z-10 transition-transform duration-700 group-hover/card:scale-[1.02]">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* 2. Brand Divider - Gold Gradient (Expands from Center) */}
                                    <div className="px-10 flex justify-center -mt-[1px]">
                                        <div className="w-10 h-[3px] gold-gradient-bg rounded-full transition-all duration-1000 ease-out group-hover/card:w-32" />
                                    </div>

                                    {/* 3. Body (Pure White - Clean Contrast) */}
                                    <div className="p-10 pt-10 flex-1 flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-500 bg-white">
                                        <p className="text-[15px] md:text-[16px] leading-[1.7] tracking-[-0.026em] text-brand-muted/80 break-keep font-medium lg:min-h-[120px] transition-colors duration-500 group-hover/card:text-brand-muted">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Director's Philosophical Message - Spacing Optimized */}
            <section className="py-[100px] md:py-[160px] bg-surface text-center">
                <div className="mx-auto max-w-[1000px] px-5 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <Icon icon="ph:quotes-fill" className="text-[60px] text-brand/5 mx-auto mb-10" />
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em] mb-12">
                            "진심을 담아 듣지 않으면,<br className="hidden md:block" />
                            결과도 만족스러울 수 없습니다."
                        </h2>
                        <p className="text-[16px] md:text-[18px] text-brand-muted leading-[1.75] tracking-[-0.026em] mb-16 font-medium break-keep italic opacity-80">
                            리브영을 선택해주신 그 소중한 마음을 누구보다 잘 알기에,<br className="hidden md:block" />
                            상담 한 번에도 의료진으로서의 모든 역량과 진심을 쏟아붓습니다.<br className="hidden md:block" />
                            당신이 가장 빛나는 Curated Plan를 찾을 때까지 리브영이 함께하겠습니다.
                        </p>
                        <div className="flex flex-col items-center">
                            <span className="text-[13px] font-black tracking-[0.4em] text-accent uppercase mb-3">CHIEF DIRECTOR</span>
                            <h3 className="text-[30px] font-bold text-brand">송기선 <span className="text-[17px] font-medium text-brand-muted ml-1">대표원장</span></h3>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 6. Premium CTA Card (About 페이지와 동일한 디자인) */}
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
                                    href="http://pf.kakao.com/_SbdEX"
                                    target="_blank"
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
        </div>
    );
}
