"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { Icon } from "@iconify/react";

const DIAGNOSTIC_INDICATORS = [
    { id: "pore", title: "모공", description: "모공의 크기, 분포와 늘어짐 정도 분석", icon: "ph:record-fill" },
    { id: "wrinkle", title: "주름", description: "잔주름부터 깊은 주름까지의 깊이와 위치", icon: "ph:waves-fill" },
    { id: "pigment", title: "색소침착", description: "기미, 잡티 등 멜라닌 색소의 깊이 파악", icon: "ph:dot-outline-fill" },
    { id: "redness", title: "붉은기", description: "홍조 및 혈관 확장 등 민감도 체크", icon: "ph:thermometer-hot-fill" },
    { id: "sebum", title: "피지", description: "U존과 T존의 유수분 밸런스 측정", icon: "ph:drop-half-bottom-fill" },
    { id: "texture", title: "피부결", description: "피부 표면의 거칠기와 탄력도 분석", icon: "ph:grid-four-fill" },
    { id: "acne", title: "트러블", description: "여드름 및 염증성 질환의 진행 상태", icon: "ph:warning-circle-fill" },
    { id: "moisture", title: "수분량", description: "피부 속 건조함과 보습 상태 정밀 측정", icon: "ph:drop-fill" },
];

const LIGHT_SOURCES = [
    { name: "RGB 일반광", desc: "모공, 주름, 피부결 가시화" },
    { name: "UV광", desc: "피지에 의한 형광 반응, 각질 분석" },
    { name: "편광 (교차/평행)", desc: "색소침착, 홍반, 혈관 상태 분석" },
    { name: "우드광 (Wood's)", desc: "심층 색소 및 피지선 분포 파악" },
];

const ANALYSIS_STEPS = [
    {
        title: "01. 스마트 촬영",
        desc: "다양한 광원으로 피부 데이터를 정밀하게 캡처합니다.",
        icon: "ph:camera-plus-fill",
    },
    {
        title: "02. AI 심층 분석",
        desc: "수천만 개의 빅데이터를 기반으로 34가지 지표를 분석합니다.",
        icon: "ph:cpu-fill",
    },
    {
        title: "03. 1:1 맞춤 상담",
        desc: "분석된 정밀 데이터를 바탕으로 대표원장이 직접 상담합니다.",
        icon: "ph:chat-teardrop-dots-fill",
    },
    {
        title: "04. 최적의 솔루션",
        desc: "분석 결과에 따른 피부 타입별 맞춤 치료 계획을 수립합니다.",
        icon: "ph:sparkle-fill",
    },
];

export default function SkinAnalysisContent() {
    return (
        <div className="bg-surface">
            {/* 1. Device Introduction */}
            <section className="relative overflow-hidden py-[100px] md:py-[180px]">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <SectionTitle
                                subtitle="THE PINNACLE OF SCIENCE"
                                title="피부 진단의 정점, EVE MUSE"
                                description="리브영의원은 세계적인 AI 피부진단기 '이브뮤즈'를 도입하여 최상의 진료 환경을 제공합니다. 육안으로 확인하기 어려운 피부 속 숨은 고민까지 3D 데이터로 완벽하게 시각화합니다."
                                center={false}
                            />
                            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-6 border-t border-brand/5 pt-10">
                                <div>
                                    <p className="text-[13px] font-bold text-brand/30 uppercase tracking-widest">Database</p>
                                    <p className="mt-2 text-[24px] font-bold text-brand">3,584만+</p>
                                    <p className="text-[14px] text-brand-muted">피부 빅데이터 학습</p>
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-brand/30 uppercase tracking-widest">Indicators</p>
                                    <p className="mt-2 text-[24px] font-bold text-brand">34가지 이상</p>
                                    <p className="text-[14px] text-brand-muted">정밀 진단 지표</p>
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-brand/30 uppercase tracking-widest">Fast Scan</p>
                                    <p className="mt-2 text-[24px] font-bold text-brand">8가지 광원</p>
                                    <p className="text-[14px] text-brand-muted leading-snug">20초의 짧은 시간 속,<br className="hidden sm:block" /> 피부 깊숙한 곳까지 탐색</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative flex justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent blur-3xl" />
                            <div className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[40px] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.3)] group">
                                <img
                                    src="/images/EVE_MUSE.png"
                                    alt="EVE MUSE Device"
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                {/* 호버 시 은은한 하이라이트 효과 */}
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. 8-Spectral Analysis */}
            <section className="relative py-[100px] md:py-[150px] text-white overflow-hidden">
                {/* 배경 이미지 설정 */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/background/bg_ver2.webp')" }}
                />
                {/* 배경 장식 요소 및 어두운 오버레이 (가독성 확보) */}
                <div className="absolute inset-0 bg-brand/5 backdrop-blur-[2px] z-0"></div>

                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-[14px] font-black gold-gradient-text tracking-[0.2em] uppercase mb-4"
                        >
                            Spectral Light Sources
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="korean-serif-title text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.04em]"
                        >
                            다양한 광원, 층별 피부 진단
                        </motion.h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {LIGHT_SOURCES.map((light, idx) => (
                            <motion.div
                                key={light.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                                className="group rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all hover:bg-white/10 hover:border-white/20"
                            >
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent transition-transform group-hover:scale-110">
                                    <Icon icon="ph:sun-dim-fill" className="text-[28px]" />
                                </div>
                                <h3 className="text-[20px] font-bold tracking-[-0.02em] leading-[1.3]">{light.name}</h3>
                                <p className="mt-3 text-[15px] md:text-[16px] leading-[1.7] tracking-[-0.026em] text-white/60 break-keep">{light.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. 3D Modeling Section */}
            <section className="py-[100px] md:py-[150px]">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex-1"
                        >
                            <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase">3D Analysis</span>
                            <h2 className="mt-4 korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em]">
                                입체적인 진찰,<br />
                                3D 안면 모델링
                            </h2>
                            <p className="mt-8 text-[16px] md:text-[18px] leading-[1.75] tracking-[-0.026em] text-brand-muted break-keep">
                                정면과 좌우 측면을 동시에 촬영하여 얼굴의 굴곡과 깊이를 3D로 재현합니다. 얼굴 볼륨의 비대칭, 주름의 깊이, 팔자주름의 각도 등을 입체적으로 분석하여 시술 전후의 시술 변화를 정밀하게 예측합니다.
                            </p>
                            <ul className="mt-10 space-y-4">
                                {[
                                    "얼굴 윤곽선 및 처짐 각도 측정",
                                    "얼굴 부위별 볼륨 및 비대칭 분석",
                                    "Professor Baumann 기준 16가지 피부 타입 분류"
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-brand">
                                        <Icon icon="ph:check-circle-fill" className="text-accent text-[20px]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex-1 relative"
                        >
                            <div className="aspect-square w-full max-w-[540px] mx-auto bg-[#F2F1EC] rounded-full flex items-center justify-center relative overflow-hidden ring-1 ring-brand/5 shadow-2xl">
                                <img
                                    src="/images/face_mapping.webp"
                                    alt="3D 안면 모델링 분석"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand/20" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Diagnostic Indicators Grid - Spacing Standardized */}
            <section className="bg-surface py-[100px] md:py-[150px]">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="text-center mb-16 md:mb-24">
                        <SectionTitle
                            subtitle="DIAGNOSTIC CATEGORIES"
                            title="8가지 핵심 피부 고민 지표"
                            description="피부의 겉과 속을 넘나들며 현재 상태를 다각도로 정밀하게 분석합니다."
                        />
                    </div>

                    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {DIAGNOSTIC_INDICATORS.map((indicator, idx) => (
                            <motion.div
                                key={indicator.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                                className="group relative"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] bg-brand/[0.03] text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,35,68,0.15)]">
                                        <Icon icon={indicator.icon} className="text-[28px]" />
                                    </div>
                                    <h3 className="text-[18px] font-bold leading-[1.3] tracking-[-0.02em] text-brand">{indicator.title}</h3>
                                    <p className="mt-3 text-[14px] md:text-[15px] leading-[1.7] tracking-[-0.026em] text-brand-muted/80 break-keep">{indicator.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Process Workflow - Spacing Standardized */}
            <section className="py-[120px] md:py-[180px] bg-surface">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="mb-16 md:mb-24 text-center">
                        <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">Precision Workflow</span>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.04em] text-brand">진단 프로세스</h2>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-brand/10" />

                        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                            {ANALYSIS_STEPS.map((step, idx) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                                    className="text-center"
                                >
                                    <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white shadow-[0_15px_35px_rgba(0,0,0,0.06)] ring-1 ring-brand/5 relative">
                                        <Icon icon={step.icon} className="text-[32px] text-accent" />
                                        <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white shadow-lg">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-[18px] md:text-[20px] font-bold leading-[1.3] tracking-[-0.02em] text-brand">{step.title}</h3>
                                    <p className="mt-4 text-[15px] leading-[1.7] tracking-[-0.026em] text-brand-muted px-4 break-keep">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
