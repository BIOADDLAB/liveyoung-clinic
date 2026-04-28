"use client";

import { motion, Variants } from "framer-motion";

interface SignatureIntroProps {
    title: string;
    description: string;
    keywords: string[];
    signatureText?: string;
    category?: string;
    introBullets?: string[];
    keyPoints?: { title: string; description: string }[];
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export default function SignatureIntro({
    keywords,
    signatureText,
    category,
    introBullets,
}: SignatureIntroProps) {
    const categoryWords = category ? category.split(" ") : [];

    return (
        <section className="overflow-hidden bg-[#F2F1ED] py-[100px] md:py-[180px]">
            <div className="relative mx-auto max-w-[1400px] px-5 text-center md:px-8">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[10px] top-[-40px] hidden text-[430px] font-bold leading-none text-brand/[0.04] lg:block"
                >
                    LY
                </div>

                <div className="relative mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center -z-10"
                    >
                        <div className="h-[300px] w-[300px] rounded-full bg-brand/5 blur-[80px] md:h-[650px] md:w-[650px]" />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.3 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <motion.span
                            variants={fadeInUp}
                            className="font-whisper text-[44px] md:text-[80px] gold-gradient-text italic leading-[1.2] px-4 py-2 md:px-6 md:py-3 mb-2 md:mb-3 drop-shadow-sm inline-block"
                        >
                            {signatureText || "Signature"}
                        </motion.span>
                        {category && (
                            <motion.h2
                                variants={fadeInUp}
                                className="mt-2 font-cormorant text-[42px] md:text-[110px] uppercase leading-[1] tracking-[0.05em] text-brand"
                            >
                                {category}
                            </motion.h2>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="relative mx-auto max-w-[1240px]"
                >
                    <div className="space-y-2">
                        {(introBullets || []).slice(0, 2).map((bullet, idx) => (
                            <p
                                key={idx}
                                className="text-[12px] font-medium leading-[1.8] tracking-[-0.03em] text-brand-light md:text-[18px] break-keep"
                            >
                                {bullet}
                            </p>
                        ))}
                    </div>

                    {keywords?.length > 0 && (
                        <div className="mx-auto mt-14 flex max-w-[860px] flex-col items-stretch overflow-hidden rounded-[22px] bg-brand/[0.03] shadow-[0_20px_50px_-38px_rgba(0,0,0,0.14)] md:mt-16 md:flex-row">
                            <div className="flex shrink-0 items-center justify-center bg-brand px-12 py- text-[15px] font-semibold text-white md:min-w-[160px]">
                                Feature of {category || "Design"}
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 py-4 text-[15px] text-brand-muted md:justify-start md:px-6">
                                {keywords.map((keyword) => (
                                    <span key={keyword} className="whitespace-nowrap">
                                        #{keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
