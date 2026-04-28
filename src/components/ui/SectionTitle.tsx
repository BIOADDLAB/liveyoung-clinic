// 섹션 제목 패턴 컴포넌트

interface SectionTitleProps {
    /** 영문 서브타이틀 (예: SIGNATURE, LOCATION) */
    subtitle: string;
    /** 한글 메인 제목 */
    title: string | React.ReactNode;
    /** 설명 텍스트 (선택) */
    description?: string | React.ReactNode;
    /** 중앙 정렬 여부 */
    center?: boolean;
    /** 라이트 테마 (다크 배경 위에서 사용) */
    light?: boolean;
}

export default function SectionTitle({
    subtitle,
    title,
    description,
    center = true,
    light = false,
}: SectionTitleProps) {
    return (
        <div className={center ? "text-center" : "text-left"}>
            {/* 영문 서브타이틀: 브랜드 컬러 + 대문자 + 강한 자간 + 14px */}
            <p
                className={`text-[14px] font-black uppercase tracking-[0.1em] mb-3 ${light ? "text-white/50" : "gold-gradient-text"
                    }`}
            >
                {subtitle}
            </p>

            {/* 한글 메인 제목: Bold + 시그니처 음수 자간 + 46px */}
            <h3
                className={`korean-serif-title text-[34px] md:text-[46px] font-bold leading-[1.15] tracking-[-0.04em] ${light ? "text-white" : "text-brand"
                    }`}
            >
                {title}
            </h3>

            {/* 설명 텍스트: 표준 18px + 부드러운 행간 */}
            {description && (
                <p
                    className={`mx-auto mt-6 max-w-4xl text-[16px] md:text-[18px] font-normal leading-[1.75] tracking-[-0.026em] ${light ? "text-white/70" : "text-brand-muted"
                        }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
