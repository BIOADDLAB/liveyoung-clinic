"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { DOCTOR_INFO } from "@/lib/constants";
import { Icon } from "@iconify/react";

/**
 * About 섹션 (의료진 & 클리닉 소개)
 * 리뉴얼 포인트:
 * 1. 이미지 형태 개선: 정형화된 아치형을 벗어나 부드럽고 세련된 라운드 디자인 적용
 * 2. 톤앤매너: 칙칙함 제거를 위해 밝은 배경광과 세련된 인디케이터 활용
 * 3. 가독성: 텍스트 레이아웃을 여유 있게 배치하여 전문성 강조
 */
export default function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-[#F2F1ED] py-[80px] md:py-[130px]"
        >
            {/* 아주 은은한 배경 원형 레이어 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-[100%] bg-brand/[0.02] -z-10" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8">
                <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-28">

                    {/* 좌측: 의료진 프로필 (텍스트 높이에 맞춰 크기 확대) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="group relative w-full max-w-[520px]">
                            {/* 초기 디자인 스타일 유지하며 크기 최적화 */}
            <div className="relative overflow-hidden rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.06)] bg-brand/[0.02] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:shadow-[0_40px_90px_rgba(0,0,0,0.1)] aspect-[4/5.2]">
                <Image
                    src="/images/chief_photo_optimized.jpg"
                    alt="리브영의원 대표원장님"
                    fill
                    priority // 메인 섹션 첫 이미지이므로 최우선 로드
                    unoptimized // 원본 화질 유지
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                                {/* 사진 내부 캡슐 네임태그 (균형에 맞게 폰트 확대) */}
                                <div className="absolute bottom-10 left-8 right-8 rounded-[24px] bg-surface/90 p-6 backdrop-blur-md shadow-lg border border-brand/5 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[12px] font-bold text-brand/40 uppercase tracking-[2px]">{DOCTOR_INFO.role}</span>
                                        <span className="text-[24px] font-bold text-brand tracking-tight leading-none">{DOCTOR_INFO.name}</span>
                                        <div className="ml-auto h-2 w-2 rounded-full bg-brand shadow-[0_0_10px_rgba(var(--brand-rgb),0.5)]" />
                                    </div>
                                </div>
                            </div>

                            {/* 미세한 후광 효과 */}
                            <div className="absolute -bottom-12 -left-12 -z-10 h-48 w-48 rounded-full bg-brand/5 blur-[100px]" />
                        </div>
                    </motion.div>

                    {/* 우측: 분석 시스템 소개 (간격 및 폰트 최적화) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="space-y-4">
                            <span className="block text-[14px] font-black tracking-[0.1em] gold-gradient-text uppercase mb-2">
                                LIVE YOUNG CLINIC
                            </span>
                            <h3 className="korean-serif-title text-[32px] font-bold leading-[1.1] tracking-[-0.04em] text-brand md:text-[46px]">
                                우리는 시술을 팔지 않고
                                <br />
                                당신의 얼굴을 분석합니다
                            </h3>
                        </div>

                        {/* 브랜드 철학 설명글 */}
                        <div className="mt-8 md:mt-10 max-w-[580px]">
                            <p className="text-[14px] md:text-[18px] leading-[1.75] text-brand-muted font-normal tracking-[-0.026em] break-keep">
                                가만히 있을 때와 웃을 때의 차이까지 읽어내고, 개인의 골격과 피부 두께를 고려하여 꼭 필요한 변화만을 제안합니다. 과한 시술이 아닌, 당시의 얼굴이 본래 가진 아름다움을 가장 자연스럽게 이끌어내는 것. 그것이 리브영의 방향입니다.
                            </p>
                        </div>

                        {/* 액션 버튼 (KSY Clinic 스타일 - 슬림 & 심플 호버) */}
                        <div className="mt-10 md:mt-14">
                            <Link
                                href="/about"
                                className="group relative inline-flex items-center gap-10 rounded-full border border-accent/40 px-8 py-3.5 transition-all duration-300 hover:bg-accent"
                            >
                                <span className="text-[14px] font-semibold tracking-wider text-accent transition-colors duration-300 group-hover:text-white uppercase">
                                    View More
                                </span>
                                <div className="flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-accent transition-all duration-300 group-hover:bg-white" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
