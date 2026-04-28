"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionTitle from "@/components/ui/SectionTitle";

const TAILORED_PROCESS = [
    {
        step: "01",
        title: "Precision Diagnosis",
        koTitle: "정밀 진단",
        desc: "세계적인 AI 피부진단기 Eve Muse로 다양한 광원을 이용해 34가지 이상의 피부 지표를 정밀하게 수치화합니다.",
        icon: "/images/emoji/Tailored/LY Special/custom/LY_정밀 진단.webp"
    },
    {
        step: "02",
        title: "Facial Analysis",
        koTitle: "얼굴 분석",
        desc: "단순히 피부 겉면만 보는 것이 아니라 근육의 움직임, 지방층의 두께, 골격의 구조를 심층 분석합니다.",
        icon: "/images/emoji/Tailored/LY Special/custom/LY_얼굴분석.webp"
    },
    {
        step: "03",
        title: "Custom Design",
        koTitle: "원장 커스텀 설계",
        desc: "상담 실장이 아닌 대표원장이 직접 데이터를 기반으로 1:1 맞춤형 시술 순서와 강도를 정교하게 설계합니다.",
        icon: "/images/emoji/Tailored/LY Special/custom/LY_원장 커스텀 설계.webp"
    },
    {
        step: "04",
        title: "Tailored Treatment",
        koTitle: "맞춤 시술",
        desc: "천편일률적인 시술이 아닌, 개인의 피부 타입과 구조에 가장 알맞은 최적의 커스텀 시술 조합을 시행합니다.",
        icon: "/images/emoji/Tailored/LY Special/custom/LY_맞춤 시술.webp"
    }
];

const CURATION_DETAILS = [
    {
        id: "01",
        label: "NEEDS MAPPING",
        title: "해부학적 니즈 매핑",
        desc: "얼굴은 가만히 있을 때와 움직일 때(웃거나 말할 때)의 표정 근육 쓰임이 모두 다릅니다. 리브영은 단순히 겉으로 보이는 피부뿐만 아니라 지방층의 두께, 근육의 움직임, 골격의 구조까지 해부학적으로 분석하여 가장 자연스러운 변화를 위한 포인트를 짚어냅니다.",
        image: "/images/LY Special/curation/needs mapping/needs_mapping2.webp",
        tags: ["근육 움직임 분석", "지방층 두께 측정", "골격 구조 파악"]
    },
    {
        id: "02",
        label: "CURATED PLAN",
        title: "데이터 기반 1:1 큐레이션",
        desc: "천편일률적인 공장형 시술이 아닌, Eve Muse 정밀 진단 데이터와 대표원장의 임상 경험을 결합하여 오직 단 한 사람만을 위한 솔루션을 제안합니다. 시술 장비의 종류부터 샷 수, 침투 깊이, 시술 간격까지 정교하게 큐레이션 된 마스터 플랜을 수립합니다.",
        image: "/images/LY Special/curation/curated plan/curated_plan5.webp",
        tags: ["Eve Muse 정밀데이터", "샷 수/깊이 개별 설계", "복합 시술 레이어링"]
    }
];

const SPECIAL_FEATURES = [
    {
        id: "01",
        title: "AI 정밀 진단 시스템 연계",
        desc: "하이엔드 피부진단기 Eve Muse를 통해 육안으로 확인하기 어려운 피부 속 고민까지 확인합니다. 느낌이 아닌, 데이터에 기반한 체계적인 플랜으로 피부를 분석합니다.",
        icon: "/images/emoji/Tailored/LY Special/quality/LY_AI 정밀 진단 시스템 연계.webp"
    },
    {
        id: "02",
        title: "대표원장 1:1 직접 설계",
        desc: "상담 실장의 획일화된 안내를 거부합니다. 해부학적 지식을 깊이 이해하는 대표원장이 직접 확인하고, 노화의 원인과 구조적인 문제점을 파악하여 시술을 매핑합니다.",
        icon: "/images/emoji/Tailored/LY Special/quality/LY_대표원장 일대일 직접 설계.webp"
    },
    {
        id: "03",
        title: "프리미엄 정품 하이엔드 장비",
        desc: "울쎄라, 써마지, 포텐자 등 효과가 검증된 프리미엄 장비와 스킨부스터 정품을 기반으로 시술합니다. 최상의 디바이스가 최상의 테크닉과 만나 결과의 차이를 만듭니다.",
        icon: "/images/emoji/Tailored/LY Special/quality/LY_프리미엄 정품 하이엔드 장비.webp"
    },
    {
        id: "04",
        title: "레이어링 기반 복합 시술 조합",
        desc: "피부 문제는 단 한 가지만 나타나는 경우가 거의 없습니다. 리프팅, 스킨부스터 자가줄기세포 시술 등을 유기적으로 결합하여 가장 효율적인 시너지를 냅니다.",
        icon: "/images/emoji/Tailored/LY Special/quality/LY_레이어링 기반 복합 시술 조합.webp"
    }
];

const TARGET_AUDIENCES = [
    "피부의 복합적인 문제(모공, 색소, 탄력 등)를 한 번에 해결하고 싶으신 분",
    "수술 없이 부작용을 최소화하면서 자연스러운 주름 개선과 피부결 변화를 원하시는 분",
    "공장형 시술이 아닌 프라이빗하고 디테일한 맞춤형 프리미엄 관리를 원하시는 분",
    "기존 시술로 만족스러운 결과를 얻지 못해 정확한 원인 분석이 필요하신 분",
    "단기적인 효과를 넘어 5년 후, 10년 후의 피부 건강을 위한 마스터플랜이 필요하신 분"
];

export default function SpecialProgramContent() {
    return (
        <div className="bg-surface">
            {/* 1. Hero / About Section */}
            <section className="py-[80px] md:py-[130px] overflow-hidden relative">
                {/* 메인 페이지(홈페이지)와 동일한 은은한 배경 원형 레이어 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-[100%] bg-brand/[0.02] -z-10" />

                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-full max-w-[1000px]"
                        >
                            <span className="text-[14px] font-black tracking-[0.4em] text-accent uppercase mb-6 block">
                                LIVE YOUNG SIGNATURE
                            </span>
                            <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em] mb-10">
                                리브영은 당신의 피부<br className="md:hidden" />에 맞춰 <br className="hidden md:block" />가장 완벽한 <br className="md:hidden" />조합을 설계합니다
                            </h2>

                            <div className="w-[80px] h-[1px] bg-accent/50 mx-auto mb-10" />

                            <div className="space-y-6">
                                <p className="text-[16px] md:text-[18px] font-medium text-brand-muted leading-[1.75] tracking-[-0.026em] break-keep">
                                    &quot;남들이 좋다고 하는 명품 레이저가 당신에게도 좋은 해결책일까요?&quot;
                                </p>
                                <p className="text-[16px] md:text-[18px] text-brand-muted/80 leading-[1.75] tracking-[-0.026em] font-normal break-keep">
                                    피부 문제는 단 한 가지만 나타나는 경우가 거의 없습니다. 나이가 들며 얼굴은 칙칙해지고, 콜라겐 소실로 탄력은 떨어집니다.<br className="hidden md:block" />
                                    리브영은 단순히 정해진 패키지를 권유하지 않습니다. 개인의 피부 두께, 부위별 상태, 노화 진행 정도를 정밀 검사하여<br className="hidden md:block" />
                                    <span className="font-semibold text-brand">맞춤형 시술 계획을 수립하고, 다양한 하이엔드 장비를 결합하여 복합적인 피부 문제를 해결</span>합니다.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. LY Tailored Process (4 Steps) */}
            <section className="py-[80px] md:py-[130px] bg-surface">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="text-center mb-16 md:mb-24">
                        <SectionTitle
                            subtitle="CUSTOM DESIGN PROCESS"
                            title={<>리브영의 시그니처<br className="md:hidden" /> 커스텀 프로세스</>}
                            description="어떤 시술도 당신의 피부 분석 없이 시작되지 않습니다. 안전하고 확실한 결과를 위한 4단계 과정을 약속합니다."
                        />
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-brand/10 z-0" />

                        {TAILORED_PROCESS.map((item, idx) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                                className="relative z-10 flex flex-col h-full items-center text-center group"
                            >
                                <div className="mb-8 relative">
                                    <div className="w-[120px] h-[120px] bg-white rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex items-center justify-center border border-brand/5 relative z-10 group-hover:border-accent/30 transition-colors duration-500 overflow-hidden">
                                        <img
                                            src={item.icon}
                                            alt={item.koTitle}
                                            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-brand text-white text-[13px] font-bold px-3 py-1 rounded-full shadow-lg z-20">
                                        STEP {item.step}
                                    </div>
                                </div>
                                <div className="bg-white rounded-[32px] p-8 w-full border border-brand/5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex-1 group-hover:shadow-[0_20px_50px_rgba(206,173,115,0.08)] transition-all duration-500">
                                    <h3 className="text-[14px] font-bold tracking-[0.2em] text-accent uppercase mb-2">
                                        {item.title}
                                    </h3>
                                    <h4 className="text-[22px] font-bold text-brand mb-5">
                                        {item.koTitle}
                                    </h4>
                                    <p className="text-[15px] leading-relaxed text-brand-muted break-keep">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. 리브영만의 정교한 분석 시스템 (Needs Mapping & Curated Plan) */}
            <section className="py-[100px] md:py-[150px] bg-surface relative overflow-hidden">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <div className="text-center mb-20 md:mb-28">
                        <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">THE SCIENCE OF CURATION</span>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em] mb-8">
                            우리는 단순히 시술하<br className="md:hidden" />지 않고 당신의 얼굴<br className="md:hidden" />
                            을 큐레이션 합니다
                        </h2>
                        <p className="max-w-[750px] mx-auto text-[16px] md:text-[18px] text-brand-muted leading-[1.75] tracking-[-0.026em] font-medium break-keep">
                            리브영은 상담 실장이 아닌 대표원장이 직접 얼굴의 구조적 문제와 피부 상태를 분석합니다.<br className="hidden md:block" />
                            공장형 시술의 한계를 넘어, 당신 본연의 아름다움을 극대화하는 정교한 설계를 경험해보세요.
                        </p>
                    </div>

                    <div className="space-y-[60px] md:space-y-[110px]">
                        {CURATION_DETAILS.map((detail, idx) => (
                            <motion.div
                                key={detail.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: idx * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-10 md:gap-24 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* 이미지 영역 */}
                                <div className="w-full lg:w-[50%]">
                                    <div className="relative group overflow-hidden rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.1)] aspect-[16/10]">
                                        <img
                                            src={detail.image}
                                            alt={detail.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-brand/5">
                                            <span className="text-[13px] font-bold text-brand tracking-widest uppercase">{detail.label}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 텍스트 영역 */}
                                <div className="w-full lg:w-[50%]">
                                    <div className="space-y-8">
                                        <div className="inline-flex items-center gap-3">
                                            <span className="text-[44px] font-black gold-gradient-text leading-none">{detail.id}</span>
                                            <div className="w-12 h-[1px] bg-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-[24px] md:text-[32px] font-bold text-brand mb-6 leading-[1.3] tracking-[-0.02em] font-sans break-keep">
                                                {detail.title}
                                            </h3>
                                            <p className="text-[16px] md:text-[18px] text-brand-muted/90 leading-[1.7] tracking-[-0.026em] font-medium break-keep mb-8">
                                                {detail.desc}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {detail.tags.map(tag => (
                                                <span key={tag} className="px-5 py-2.5 rounded-full bg-white border border-brand/5 shadow-sm text-[14px] md:text-[15px] font-bold text-brand-muted hover:border-accent hover:text-accent transition-colors duration-300">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. LY Special 4가지 특별함 */}
            <section className="py-[100px] md:py-[150px] bg-surface relative overflow-hidden">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="text-center mb-16 md:mb-24">
                        <SectionTitle
                            subtitle="HIGH-END QUALITY"
                            title={<>리브영의원만의<br className="md:hidden" /> 4가지 특별함</>}
                            description="어느 하나 소홀히 할 수 없는 피부와 안면 윤곽, 최고의 환경에서 가장 안전하게 다룹니다."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
                        {SPECIAL_FEATURES.map((feature, idx) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                                className="group bg-white rounded-[40px] p-10 lg:p-12 border border-brand/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_45px_100px_rgba(206,173,115,0.15)] hover:border-accent/30 transition-all duration-700 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-start lg:items-center"
                            >
                                {/* Background Accent on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] shrink-0 bg-brand/[0.03] rounded-3xl flex items-center justify-center text-brand group-hover:bg-accent/[0.08] transition-all duration-500 relative z-10 group-hover:-translate-y-2 overflow-hidden">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="flex-1 relative z-10">
                                    <div className="text-[13px] font-bold text-accent mb-2 tracking-widest block">KEY POINT {feature.id}</div>
                                    <h3 className="text-[22px] lg:text-[24px] font-bold text-brand mb-4 break-keep">{feature.title}</h3>
                                    <p className="text-[15.5px] lg:text-[16px] leading-[1.7] text-brand-muted/80 break-keep font-medium">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. 추천 대상 */}
            <section className="py-[80px] md:py-[130px] bg-surface">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-[45%] text-center lg:text-left"
                        >
                            <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">FOR YOU</span>
                            <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em] mb-8 break-keep">
                                LY Special,<br />
                                이런 분들께 추천합니다
                            </h2>
                            <p className="text-[16px] md:text-[18px] leading-[1.75] tracking-[-0.026em] text-brand-muted mb-10 max-w-[500px] break-keep mx-auto lg:mx-0">
                                획일화된 공장형 시술에 지치셨나요? 개개인의 피부가 모두 다르듯, 가장 아름다워지는 정답도 모두 다릅니다. 리브영만의 정교한 맞춤 솔루션을 경험해보세요.
                            </p>
                        </motion.div>

                        <div className="w-full lg:w-[55%]">
                            <ul className="space-y-6">
                                {TARGET_AUDIENCES.map((audience, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: idx * 0.15 }}
                                        className="flex items-start gap-5 p-6 md:p-8 bg-white rounded-3xl border border-brand/5 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="mt-1 w-[32px] h-[32px] shrink-0 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                            <Icon icon="ph:check-bold" className="text-[18px]" />
                                        </div>
                                        <p className="text-[16px] md:text-[17px] text-brand-muted font-medium leading-[1.7] tracking-[-0.026em] break-keep pt-1">
                                            {audience}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Our Commitment (리브영의 4가지 약속 섹션) */}
            <section className="py-[100px] md:py-[150px] bg-surface relative overflow-hidden">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <span className="text-[13px] font-black tracking-[0.3em] gold-gradient-text uppercase block mb-4">OUR COMMITMENT</span>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.15] tracking-[-0.04em] mb-6">
                            리브영이 드리는<br className="md:hidden" /> 4가지 약속
                        </h2>
                        <p className="mx-auto text-[16px] md:text-[18px] font-normal leading-[1.75] tracking-[-0.026em] text-brand-muted">
                            진심을 담은 진료로 고객 한 분 한 분과의 인연을 소중히 여깁니다.
                        </p>
                    </div>

                    <div className="max-w-[1100px] mx-auto mt-20">
                        {[
                            "고객의 니즈를 존중합니다",
                            "고객의 시간과 비용을 존중합니다",
                            "원장님의 미적인 감각과 분석을 바탕으로 최적의 변화를 설계합니다",
                            "한 번 인연을 맺으면, 끝까지 함께합니다"
                        ].map((promise, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                className="group relative border-b border-brand/5 last:border-0"
                            >
                                <div className="py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 transition-all duration-700 group-hover:bg-brand/[0.01]">
                                    {/* 고유 번호 디자인 */}
                                    <div className="flex items-center justify-center gap-6 shrink-0">
                                        <div className="w-12 h-12 rounded-full border border-brand/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-500">
                                            <span className="text-[15px] font-black text-brand group-hover:text-white transition-colors duration-500">
                                                0{idx + 1}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 메인 텍스트 */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-[22px] md:text-[28px] font-bold text-brand leading-tight tracking-[-0.03em] break-keep transition-all duration-500 group-hover:text-accent md:group-hover:translate-x-3">
                                            {promise}
                                        </h3>
                                    </div>

                                    {/* 장식용 아이콘 */}
                                    <div className="hidden md:block shrink-0 px-8">
                                        <div className="w-14 h-[1px] bg-brand/10 group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
                                    </div>
                                    
                                    {/* 하단 투명 그라데이션 라인 (호버 시 활성화) */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. 원장 메시지 */}
            <section className="py-[100px] md:py-[150px] bg-surface text-center">
                <div className="mx-auto max-w-[1000px] px-5 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-[32px] md:text-[46px] font-bold text-brand leading-[1.15] mb-12 tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                            &quot;Highly Skin, High-End Life&quot;
                        </h2>
                        <h3 className="korean-serif-title text-[24px] md:text-[34px] font-bold text-brand leading-[1.3] tracking-[-0.04em] mb-8 break-keep">
                            리브영에서만 경험할 수 있는 확실한 변화
                        </h3>
                        <p className="text-[16px] md:text-[18px] text-brand-muted leading-[1.75] tracking-[-0.026em] font-medium break-keep opacity-80 mb-16">
                            리브영은 피부의 건강과 본연의 아름다움을 이끌어내기 위한 1:1 맞춤 치료를 지향합니다.<br className="hidden md:block" />
                            내 가족에게 안심하고 할 수 있는, 데이터에 기반한 정직한 시술과 치료만을 약속드립니다.<br className="hidden md:block" />
                            공장형이 아닌 프리미엄 클리닉의 차이를 리브영에서 느껴보세요.
                        </p>
                        <div className="flex flex-col items-center">
                            <span className="text-[13px] font-black tracking-[0.4em] text-accent uppercase mb-3">CHIEF DIRECTOR</span>
                            <h3 className="text-[26px] font-bold text-brand">송기선 <span className="text-[16px] font-medium text-brand-muted ml-1">대표원장</span></h3>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
