"use client";

import { motion } from "framer-motion";

/**
 * BrandManifesto 섹션 (Point 01, 02)
 */
export default function BrandManifesto() {
    return (
        <section className="relative w-full overflow-hidden bg-[#F2F1ED] py-24 md:py-40">
            {/* 컨텐츠 레이어 (z-10) */}
            <div className="relative z-10 mx-auto w-full max-w-[1560px] px-5 md:px-8">
                {/* 섹션 타이틀 (애니메이션 추가 및 색상 최적화) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center md:mb-28"
                >
                    <p className="text-[12px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                        Why
                    </p>
                    <h3 className="korean-serif-title mt-1 flex items-center justify-center text-[32px] font-bold leading-[1.1] text-brand md:text-[46px] md:tracking-[-0.04em]">
                        LIVE YOUNG CLINIC
                    </h3>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-10">
                    {/* POINT 01 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="group relative flex flex-col overflow-hidden rounded-[40px] border border-white/5 bg-[#282d3d]/90 p-8 backdrop-blur-2xl md:p-14 transition-all duration-500 hover:bg-[#282d3d] hover:shadow-2xl"
                    >
                        <div className="relative z-10 flex h-full flex-col">
                            <span className="text-[10px] md:text-[14px] font-black tracking-[0.15em] text-[#bbaa68] uppercase">POINT 01</span>
                            <h4 className="mt-5 text-[26px] md:text-[42px] font-bold text-white leading-tight tracking-[-0.04em]">
                                맞춤형 분석 <span className="block text-[16px] md:text-[24px] font-normal text-white/50 md:mt-2 tracking-[0.05em]">(The Analysis)</span>
                            </h4>
                            <div className="mt-8 space-y-4 text-[15px] md:text-[18px] font-normal leading-[1.75] text-white/80 md:mt-10 tracking-[-0.026em]">
                                <p className="break-keep">
                                    가만히 있을 때와 웃을 때의 차이까지 읽어내는 분석력으로 어색함 없는 자연스러움을 완성합니다.
                                </p>
                                <p className="break-keep">
                                    개인의 골격과 피부 두께를 고려하여 최적의 에너지를 설계합니다.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* POINT 02 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="group relative flex flex-col overflow-hidden rounded-[40px] border border-white/5 bg-[#282d3d]/90 p-8 backdrop-blur-2xl md:p-14 transition-all duration-500 hover:bg-[#282d3d] hover:shadow-2xl"
                    >
                        <div className="relative z-10 flex h-full flex-col">
                            <span className="text-[10px] md:text-[14px] font-black tracking-[0.15em] text-[#bbaa68] uppercase">POINT 02</span>
                            <h4 className="mt-5 text-[26px] md:text-[42px] font-bold text-white leading-tight tracking-[-0.04em]">
                                집요한 꼼꼼함 <span className="block text-[16px] md:text-[24px] font-normal text-white/50 md:mt-2 tracking-[0.05em]">(The Meticulousness)</span>
                            </h4>
                            <div className="mt-8 space-y-4 text-[15px] md:text-[19px] font-normal leading-[1.75] text-white/80 md:mt-10 tracking-[-0.026em]">
                                <p className="break-keep">
                                    공장형의 속도 경쟁을 거부합니다.
                                </p>
                                <p className="break-keep">
                                    단 1샷의 에너지, 0.1 unit의 보톡스도 정확한 위치에 주입하는 원장님의 고집을 경험하세요.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 배경 이미지 레이어 (앞으로 배치 및 스크롤 등장 애니메이션 추가) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 0.15, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[500px] bg-brand"
                style={{
                    maskImage: "url(/images/about/about.background.webp)",
                    maskSize: "100% auto",
                    maskPosition: "bottom",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: "url(/images/about/about.background.webp)",
                    WebkitMaskSize: "100% auto",
                    WebkitMaskPosition: "bottom",
                    WebkitMaskRepeat: "no-repeat"
                }}
            />
        </section>
    );
}
