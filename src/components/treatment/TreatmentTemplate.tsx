"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import PageHeader from "@/components/layout/PageHeader";
import type { TreatmentPageData } from "@/lib/treatments";

// 애니메이션 Variants (KSY 스타일 페이드업)
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

/**
 * TreatmentCard - 개별 시술 3D 플립 카드 (내부 컴포넌트)
 */
function TreatmentCard({ item, idx, data }: { item: any; idx: number; data: TreatmentPageData }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`group w-full h-[450px] md:h-[600px] [perspective:1500px] cursor-pointer ${data.slug === "stem-cell"
                ? "max-w-[420px] md:max-w-[580px]"
                : data.treatments.length === 3 || data.treatments.length >= 5
                    ? "max-w-[420px] md:max-w-[calc(50%-20px)] lg:max-w-[380px]"
                    : data.treatments.length === 4
                        ? "max-w-[420px] md:max-w-[calc(50%-20px)] xl:max-w-[310px]"
                        : "max-w-[420px] md:max-w-[480px]"
                }`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* 3D 카드 컨테이너 */}
            <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>

                {/* 앞면: 이미지 및 시술명 */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[40px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <div className="relative w-full h-full">
                        <MediaPlaceholder
                            label={item.mediaLabel}
                            size={item.mediaSize}
                            imageUrl={item.imageUrl}
                            className="h-full w-full object-cover"
                        />
                        {/* 그라데이션 오버레이 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* 모든 카드의 하단 VIEW MORE 위치를 고정하기 위해 레이어 분리 */}
                        <div className="absolute inset-0 w-full h-full p-8 flex flex-col justify-end text-center text-white pointer-events-none">
                            {/* 시술명 및 항목 리스트 영역 - 항목 유무에 따라 최적의 높이 자동 산출 */}
                            <div className={`absolute left-0 w-full px-8 pointer-events-auto ${item.subItems && item.subItems.length > 0 ? "bottom-[110px]" : "bottom-[82px]"}`}>
                                {item.subItems && item.subItems.length > 0 ? (
                                    <div className="h-[140px] md:h-[160px] flex flex-col justify-start">
                                        <h3 className="text-2xl md:text-3xl font-bold drop-shadow-lg">{item.name}</h3>
                                        <div className="mt-5 flex flex-col items-center">
                                            <div className="flex flex-col items-start gap-2.5 text-[13px] md:text-[15px] text-white/95 font-bold drop-shadow-md">
                                                {item.subItems.map((sub: any, sIdx: number) => (
                                                    <div key={sIdx} className="flex items-center gap-2">
                                                        <span>- {sub.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <h3 className="text-2xl md:text-3xl font-bold drop-shadow-lg">{item.name}</h3>
                                )}
                            </div>

                            {/* 하단 고정 VIEW MORE 라벨 - 모든 시술 카드 일관성 유지 (bottom-10 고정) */}
                            <div className="absolute bottom-10 left-0 w-full flex justify-center">
                                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] text-white/50 uppercase">
                                    <span>View More</span>
                                    <span className="w-8 h-[1px] bg-white/30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 뒷면: 상세 설명 및 분석 포인트 */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[40px] bg-brand p-8 md:p-12 flex flex-col justify-center text-left shadow-[0_30px_60px_rgba(0,35,68,0.2)]">
                    <div className="mb-4">
                        <span className="text-brand-muted text-xs font-bold tracking-[4px] uppercase block mb-2">{item.enName || "Premium"}</span>
                        <h4 className="text-white text-xl md:text-2xl font-bold">{item.backName || item.name}</h4>
                    </div>

                    <p className="text-white/80 text-sm md:text-base leading-relaxed break-keep mb-8">
                        {item.description}
                    </p>

                    {item.analysisPoint && (
                        <div className="pt-8 border-t border-white/10">
                            <span className="text-brand-muted text-[10px] md:text-xs font-bold tracking-widest uppercase block mb-3">Analysis Point</span>
                            <p className="text-white font-medium text-sm md:text-lg leading-relaxed break-keep">
                                {item.analysisPoint}
                            </p>
                        </div>
                    )}

                    <div className="mt-auto">
                        <div className="inline-flex items-center gap-3 text-brand-muted">
                            <span className="w-10 h-[1px] bg-brand-muted" />
                            <span className="text-[10px] tracking-[2px] font-bold uppercase">Liveyoung Clinic</span>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}

/**
 * TreatmentHero - 시술 페이지 상단 히어로 배너
 */
export function TreatmentHero({ data }: { data: TreatmentPageData }) {
    return (
        <PageHeader
            title={data.title}
            subtitle={data.enCategory}
            description={data.heroMessage.replace('\n', ' ')}
            bgImage={data.bgImage}
            mobileBgImage={data.mobileBgImage}
        />
    );
}

/**
 * TreatmentIntro - 시그니처 텍스트 인트로 (신규)
 */
export function TreatmentIntro({ data }: { data: TreatmentPageData }) {
    return (
        <section className="py-[100px] md:py-[180px] bg-[#F2F1ED]">
            <div className="mx-auto max-w-[1000px] px-5 text-center md:px-8">
                {/* 기존 설명 */}
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-[20px] font-medium leading-[1.8] text-brand md:text-[32px] md:leading-[1.7] break-keep"
                >
                    {data.description}
                </motion.p>

                {/* 1P 신규 추가: 서브타이틀 및 인트로 리스트 */}
                {(data.subTitle || data.introBullets) && (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="mt-16 md:mt-24"
                    >
                        {data.subTitle && (
                            <motion.h3 variants={fadeInUp} className="text-xl md:text-2xl font-semibold text-brand mb-8 break-keep">
                                {data.subTitle}
                            </motion.h3>
                        )}
                        {data.introBullets && data.introBullets.length > 0 && (
                            <motion.ul variants={fadeInUp} className="space-y-4 inline-block text-left">
                                {data.introBullets.map((bullet, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-brand-muted md:text-lg">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand/50 shrink-0" />
                                        {bullet}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </motion.div>
                )}

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-16 md:mt-24 mx-auto w-[1px] h-[80px] bg-brand/30"
                />
            </div>
        </section>
    );
}

/**
 * TreatmentDetail - 개별 시술 상세 카드 (KSY 시그니처 스타일로 개편)
 */
export function TreatmentDetail({ data }: { data: TreatmentPageData }) {
    // 리프팅, 타이트닝, 스킨부스터, 텍스처, 보톡스&필러 페이지일 경우 프리미엄 그리드 스타일 (Image 1) 적용
    const useGridCardStyle = data.slug === "lifting" || data.slug === "tightening" || data.slug === "skin-booster" || data.slug === "texture";

    if (data.slug === "stem-cell") {
        return (
            <section className="py-[120px] md:py-[200px] relative overflow-hidden bg-[#F2F1ED]">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16 md:mb-24"
                    >
                        <motion.p variants={fadeInUp} className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">PREMIUM</motion.p>
                        <motion.h2 variants={fadeInUp} className="korean-serif-title text-[34px] md:text-[50px] font-bold text-brand tracking-[-0.04em] break-keep">
                            프리미엄 {data.title}
                        </motion.h2>
                    </motion.div>

                    <div className="flex justify-center items-center">
                        <div className="w-full flex justify-center">
                            <TreatmentCard item={data.treatments[0]} idx={0} data={data} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (useGridCardStyle) {
        return (
            <section className="py-[120px] md:py-[200px] relative overflow-hidden bg-[#F2F1ED]">

                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16 md:mb-24"
                    >
                        <motion.p
                            variants={fadeInUp}
                            className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2"
                        >
                            PREMIUM
                        </motion.p>
                        <motion.h2
                            variants={fadeInUp}
                            className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] break-keep"
                        >
                            프리미엄 {data.title === "얼굴/바디 컨투어링" ? (
                                <>얼굴/바디 <br className="md:hidden" />컨투어링</>
                            ) : data.title}
                        </motion.h2>
                    </motion.div>

                    <div className={`flex flex-wrap justify-center gap-8 ${data.treatments.length === 4 ? "xl:gap-6 md:gap-10" : "md:gap-10"}`}>
                        {data.treatments.map((item, idx) => (
                            <TreatmentCard key={item.name} item={item} idx={idx} data={data} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-[80px] md:py-[150px]">
            <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                {data.treatments.map((item, idx) => (
                    <motion.div
                        key={item.name}
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        className="mb-[120px] last:mb-0 md:mb-[200px]"
                    >
                        <div
                            className={`grid items-center gap-12 md:grid-cols-2 md:gap-[100px] ${idx % 2 === 1 ? "md:direction-rtl" : ""
                                }`}
                        >
                            {/* 이미지 영역 (Parallax 느낌의 Reveal 효과) */}
                            <motion.div
                                variants={fadeInUp}
                                className={idx % 2 === 1 ? "md:order-2" : ""}
                            >
                                <MediaPlaceholder
                                    label={item.mediaLabel}
                                    size={item.mediaSize}
                                    imageUrl={item.imageUrl}
                                    className="!rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                                    aspectRatio="4/5"
                                />
                            </motion.div>

                            {/* 텍스트 영역 (Stagger 애니메이션) */}
                            <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                                <motion.p
                                    variants={fadeInUp}
                                    className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2"
                                >
                                    {item.enName}
                                </motion.p>
                                <motion.h3 variants={fadeInUp} className="mt-4 text-[32px] font-bold tracking-tight text-brand md:text-[48px] break-keep">
                                    {item.name}
                                </motion.h3>
                                <motion.p variants={fadeInUp} className="mt-6 text-[16px] md:text-[18px] leading-[1.8] text-brand-light break-keep tracking-[-0.026em]">
                                    {item.description}
                                </motion.p>

                                {/* 장비 분석 포인트 (3번 사진 래퍼런스 반영 - 테이블 스타일) */}
                                {item.analysisPoint && (
                                    <motion.div variants={fadeInUp} className="mt-10 overflow-hidden rounded-2xl border border-brand/5 bg-white/50 backdrop-blur-sm">
                                        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] border-b border-brand/5 last:border-0">
                                            <div className="bg-brand/[0.03] px-6 py-4 flex items-center justify-center border-r border-brand/5">
                                                <span className="text-sm font-bold text-brand">구분</span>
                                            </div>
                                            <div className="px-6 py-4 flex items-center">
                                                <span className="text-sm md:text-base font-bold text-brand">{item.name} {item.enName && `(${item.enName})`}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr]">
                                            <div className="bg-brand/[0.03] px-6 py-6 flex items-center justify-center border-r border-brand/5">
                                                <span className="sub_title text-sm md:text-base text-brand">Analysis Point</span>
                                            </div>
                                            <div className="px-6 py-6 flex items-center">
                                                <p className="text-sm md:text-base text-brand-muted leading-relaxed font-medium break-keep">
                                                    {item.analysisPoint}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 특장점 리스트 (시그니처 박스 스타일) */}
                                <motion.ul variants={fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-2">
                                    {item.features.map((feature, fIdx) => (
                                        <li
                                            key={fIdx}
                                            className="flex items-start gap-4 rounded-2xl bg-surface-cool/50 p-5 transition-colors hover:bg-surface-cool"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                                                {fIdx + 1}
                                            </span>
                                            <span className="mt-1 text-sm font-medium leading-relaxed text-brand-muted md:text-base break-keep">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </motion.ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/**
 * TreatmentTargetAreas - 부위별 맞춤 솔루션 (1번 사진 래퍼런스 반영)
 */
export function TreatmentTargetAreas({ data }: { data: TreatmentPageData }) {
    if (!data.targetAreas || data.targetAreas.length === 0) return null;
    return (
        <section className="py-[100px] md:py-[150px] bg-[#F2F1ED]">
            <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="text-center mb-20"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2"
                    >
                        WHY LIVE YOUNG
                    </motion.p>
                    <motion.h2 variants={fadeInUp} className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1] break-keep">
                        {data.title === "스킨부스터" ? (
                            <>왜 리브영의원의 <br className="md:hidden" />스킨부스터일까요?</>
                        ) : `왜 리브영의원의 ${data.title}일까요?`}
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid gap-12 md:grid-cols-3 relative py-16 md:py-24"
                >
                    {/* 상하 수평 그라데이션 라인 - 선명한 구간 확대 (Reference) */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(to_right,transparent_0%,theme(colors.brand.DEFAULT/0.2)_40%,theme(colors.brand.DEFAULT/0.2)_60%,transparent_100%)]" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(to_right,transparent_0%,theme(colors.brand.DEFAULT/0.2)_40%,theme(colors.brand.DEFAULT/0.2)_60%,transparent_100%)]" />
                    {data.targetAreas.slice(0, 3).map((area, idx) => {
                        let title = '';
                        let description = '';
                        let finalIconPath = '';

                        if (typeof area === 'string') {
                            const colonIdx = area.indexOf(':');
                            title = colonIdx !== -1 ? area.substring(0, colonIdx) : area;
                            description = colonIdx !== -1 ? area.substring(colonIdx + 1) : '';
                            // 기본 아이콘 설정
                            finalIconPath = idx === 0 ? "https://api.iconify.design/lucide:sparkles.svg?color=%23002344" :
                                idx === 1 ? "https://api.iconify.design/lucide:user-round.svg?color=%23002344" :
                                    "https://api.iconify.design/lucide:languages.svg?color=%23002344";
                        } else {
                            title = area.title;
                            description = area.desc;
                            finalIconPath = area.img || '';
                        }

                        return (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="relative flex flex-col items-center text-center group px-4 md:px-8"
                            >
                                {/* 수직 분할선 및 + 아이콘 (데스크탑 뷰) */}
                                {idx < 2 && (
                                    <div className="hidden md:block absolute -right-[24px] lg:-right-[48px] top-[-10px] bottom-[-10px] w-[1px] bg-[linear-gradient(to_bottom,transparent_0%,theme(colors.brand.DEFAULT/0.2)_15%,theme(colors.brand.DEFAULT/0.2)_85%,transparent_100%)]">
                                        {/* 번짐 그림자 효과 (Glow) - 시그니처 컬러 버전 */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand/10 blur-xl" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand/5 blur-md" />

                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-brand/10 shadow-[0_4px_15px_rgba(0,35,68,0.1)] flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                                            <span className="text-brand font-medium text-xl leading-none mt-[-2px]">+</span>
                                        </div>
                                    </div>
                                )}

                                {/* 아이콘 영역 (크기 확대) */}
                                <div className="mb-10 relative">
                                    <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center border border-brand/10 bg-surface shadow-[inset_0_2px_4px_rgba(0,0,0,0.02),0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 group-hover:scale-110 overflow-hidden">
                                        <div className="w-full h-full relative flex items-center justify-center p-3">
                                            <img
                                                src={finalIconPath}
                                                alt={title}
                                                className="w-full h-full object-contain opacity-90 transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 텍스트 영역 (타이포그래피 미세 조정) */}
                                <h4 className="text-[22px] md:text-[24px] font-bold text-brand mb-5 tracking-tight">{title}</h4>
                                <p className="text-brand-muted leading-[1.8] break-keep text-sm md:text-[16px] max-w-[300px] whitespace-pre-line font-medium opacity-90">
                                    {description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

/**
 * TreatmentKeyPoints - 핵심 포인트 (5번 사진 래퍼런스 반영 - 버블 카드 스타일)
 */
/**
 * TreatmentKeyPoints - 핵심 포인트 (개선된 프리미엄 그리드 스타일)
 */
export function TreatmentKeyPoints({ data }: { data: TreatmentPageData }) {
    if (!data.keyPoints || data.keyPoints.length === 0) return null;
    return (
        <section className="py-[100px] md:py-[180px] relative overflow-hidden bg-brand">
            {/* 배경 이미지 설정 */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                style={{ backgroundImage: "url('/images/background/bg_ver2.webp')" }}
            />
            {/* 배경 장식 요소 및 어두운 오버레이 (가독성 확보) */}
            <div className="absolute inset-0 bg-brand/5 backdrop-blur-[2px] z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
            </div>

            <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                {/* 상단 타이틀 영역 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                        TECHNOLOGY
                    </p>
                    <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-white tracking-[-0.04em] leading-[1.1] break-keep">
                        {data.title === "스킨부스터" || data.title === "줄기세포" ? (
                            <>{data.title}의 <br className="md:hidden" />핵심 기술력</>
                        ) : `${data.title}의 핵심 기술력`}
                    </h2>
                </motion.div>

                {/* 하단 카드 그리드 */}
                <div className={`grid gap-6 md:gap-10 ${data.keyPoints.length === 1 ? 'max-w-[500px] mx-auto' :
                    data.keyPoints.length === 2 ? 'max-w-[1000px] mx-auto md:grid-cols-2' :
                        'lg:grid-cols-3 md:grid-cols-2'
                    }`}>
                    {data.keyPoints.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="bg-white/5 backdrop-blur-md rounded-[40px] p-10 md:p-12 border border-white/10 hover:bg-white/10 transition-all duration-500 group relative"
                        >
                            {/* 상단 아이콘 */}
                            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                <Icon icon="ph:check-bold" className="text-white text-2xl" />
                            </div>

                            <h4 className="text-2xl md:text-[26px] font-bold text-white mb-6 group-hover:text-accent transition-colors duration-300">
                                {point.title}
                            </h4>

                            <p className="text-white/60 text-base md:text-[18px] leading-[1.8] break-keep font-medium whitespace-pre-line">
                                {point.description}
                            </p>

                            {/* 미세한 넘버링 장식 */}
                            <span className="absolute top-10 right-10 text-[60px] font-bold text-white/[0.03] pointer-events-none group-hover:text-white/[0.06] transition-colors">
                                0{idx + 1}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * TreatmentRecommendTargets - 추천 대상 (5번 사진 래퍼런스 반영 - 플로팅 서클 스타일)
 */
export function TreatmentRecommendTargets({ data }: { data: TreatmentPageData }) {
    const targets = data.recommendTargets || [
        { title: "자연스러운 인상", description: "수술 없이 자연스럽게\n인상을 개선하고 싶으신 분" },
        { title: "비대칭 고민", description: "얼굴 비대칭으로 인해\n고민이 많으신 분" },
        { title: "커스텀 디자인", description: "나에게 꼭 맞는 시술 계획을\n제안받고 싶으신 분" }
    ];

    return (
        <section className="py-[120px] md:py-[180px] bg-[#F2F1ED]">
            <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="text-center mb-24"
                >
                    <motion.p
                        variants={fadeInUp}
                        className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2"
                    >
                        RECOMMEND
                    </motion.p>
                    <motion.h2 variants={fadeInUp} className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1] break-keep">
                        {data.title === "스킨부스터" || data.title === "줄기세포" ? (
                            <>{data.title}를 <br className="md:hidden" />추천 드리는 대상</>
                        ) : `${data.title}을 추천 드리는 대상`}
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="flex flex-wrap justify-center items-start gap-8 md:gap-12"
                >
                    {targets.map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="w-[280px] md:w-[320px] aspect-square rounded-full bg-white/40 backdrop-blur-sm border border-brand/5 shadow-[0_20px_50px_rgba(0,35,68,0.03)] flex flex-col items-center justify-center p-8 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 group"
                        >
                            <div className="w-[80px] h-[80px] md:w-[105px] md:h-[105px] mb-8 flex items-center justify-center rounded-full bg-surface shadow-sm border border-brand/5 overflow-hidden p-3">
                                <img
                                    src={item.img || `https://api.iconify.design/lucide:check-circle-2.svg?color=%23282d3d`}
                                    alt={item.title}
                                    className={`${item.img ? 'w-full h-full object-cover' : 'w-[30px] md:w-[40px] object-contain opacity-70'} group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`}
                                />
                            </div>
                            <h4 className="text-[20px] md:text-[24px] font-bold text-brand mb-4">{item.title}</h4>
                            <p className="text-brand-muted text-sm md:text-base leading-relaxed break-keep font-medium whitespace-pre-line">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/**
 * TreatmentFAQ - QnA / 주의사항 (BrandManifesto 스타일)
 */
export function TreatmentFAQ({ data }: { data: TreatmentPageData }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAuto, setIsAuto] = useState(true);
    const precautions = data.precautions || [];

    useEffect(() => {
        if (!isAuto || precautions.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % precautions.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isAuto, precautions.length]);

    if (precautions.length === 0) return null;

    const nextSlide = () => {
        setIsAuto(false);
        setCurrentIndex((prev) => (prev + 1) % precautions.length);
    };

    const prevSlide = () => {
        setIsAuto(false);
        setCurrentIndex((prev) => (prev - 1 + precautions.length) % precautions.length);
    };

    return (
        <section className="relative min-h-[650px] md:h-[750px] w-full overflow-hidden bg-surface">
            {/* 배경 이미지 - 시야에 들어올 때 서서히 멀어지는(Zoom-out) 애니메이션 추가 */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1.05, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute inset-x-[-5%] inset-y-0 bg-cover bg-center bg-no-repeat grayscale-[0.3]"
                style={{ backgroundImage: "url('/images/about/qna.webp')" }}
            >
                {/* 사진 위에 옅은 화이트 오버레이로 부드러움 추가 */}
                <div className="absolute inset-0 bg-white/10" />
            </motion.div>

            <div className="relative z-10 mx-auto h-full max-w-[1400px] px-5 md:px-8">
                <div className="flex h-full flex-col md:flex-row md:items-center py-20 md:py-0">
                    {/* 왼쪽 고정 타이틀 영역 */}
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2 text-left">
                                Q&A
                            </p>
                            <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand leading-[1.1] tracking-[-0.04em] text-left">
                                자주 묻는 질문
                            </h2>
                            <p className="mt-6 text-[16px] md:text-[18px] text-brand-light font-medium text-left">
                                시술에 관한 궁금증을 한곳에 모았습니다.
                            </p>
                        </motion.div>
                    </div>

                    {/* 오른쪽 슬라이드 카드 영역 */}
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <div className="w-full max-w-[500px] overflow-hidden rounded-[40px] shadow-2xl backdrop-blur-3xl border border-white/10">
                            {/* 상단 텍스트 영역 (짙은 다크 네이비) */}
                            <div className="relative h-[350px] md:h-[450px] bg-[#222736]/85">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 p-10 md:p-14 flex flex-col justify-center"
                                    >
                                        <span className="block text-[13px] font-black tracking-[0.2em] text-white/50 uppercase mb-4">
                                            Q&A
                                        </span>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="text-[28px] md:text-[34px] font-bold text-white leading-tight tracking-[-0.04em] break-keep"
                                        >
                                            시술 궁금증
                                        </motion.h3>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                            <p className="mt-8 text-[15px] md:text-[17px] font-normal leading-[1.8] text-white/70 tracking-[-0.026em] break-keep">
                                                {precautions[currentIndex]}
                                            </p>

                                            <div className="mt-10">
                                                {/* 캡처본 스타일의 View More 텍스트 링크 */}
                                                <Link
                                                    href="http://pf.kakao.com/_SbdEX"
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 group text-[15px] font-medium text-white/60 hover:text-white transition-all"
                                                >
                                                    <span className="border-b border-transparent group-hover:border-white/40 pb-0.5">카카오톡 상담</span>
                                                    <Icon
                                                        icon="ph:caret-right-fill"
                                                        width={12}
                                                        height={12}
                                                        className="mt-0.5"
                                                    />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* 하단 네비게이션 바 (약간 더 푸른 빛의 네이비로 투톤 배치) */}
                            <div className="bg-[#30374a] flex items-center justify-between px-10 py-7 md:px-14">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={prevSlide}
                                        className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/10"
                                        aria-label="Previous slide"
                                    >
                                        <Icon icon="ph:caret-left-bold" width={20} height={20} className="text-white/60 group-hover:text-white" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/10"
                                        aria-label="Next slide"
                                    >
                                        <Icon icon="ph:caret-right-bold" width={20} height={20} className="text-white/60 group-hover:text-white" />
                                    </button>
                                </div>

                                <div className="flex items-baseline gap-1.5 font-bold text-white tracking-widest">
                                    <span className="text-[26px]">{currentIndex + 1}</span>
                                    <span className="text-white/20 text-[20px]">/</span>
                                    <span className="text-white/40 text-[20px]">{precautions.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
