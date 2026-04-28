/**
 * Marquee 띠배너 섹션
 * CSS animation으로 구현 (JavaScript 불필요)
 */
export default function Marquee() {
    const repeatCount = 8;

    return (
        <section className="overflow-hidden py-[40px] md:py-[80px]">
            {/* 1번째 줄: 왼쪽으로 흐름 */}
            <div className="marquee-track animate-marquee">
                {[...Array(repeatCount)].map((_, i) => (
                    <span
                        key={`row1-${i}`}
                        className="mx-3 whitespace-nowrap text-[50px] font-bold text-brand/30 md:mx-6 md:text-[90px]"
                    >
                        LIVE YOUNG CLINIC{" "}
                        <span className="text-accent/40">✦</span>{" "}
                    </span>
                ))}
            </div>
        </section>
    );
}
