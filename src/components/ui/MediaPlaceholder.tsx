import Image from "next/image";

interface MediaPlaceholderProps {
    label: string;
    size?: string;
    className?: string;
    aspectRatio?: string;
    imageUrl?: string;
    priority?: boolean;
}

export default function MediaPlaceholder({
    label,
    size,
    className = "",
    aspectRatio = "16/9",
    imageUrl,
    priority = false, // 기본값 false
}: MediaPlaceholderProps) {
    if (imageUrl) {
        return (
            <div
                className={`relative overflow-hidden w-full ${className}`}
                style={{ aspectRatio }}
            >
                <Image
                    src={imageUrl}
                    alt={label}
                    fill
                    priority={priority}
                    unoptimized // 원본 화질 유지
                    className="h-full w-full object-cover transition-transform duration-[1.5s] ease-in-out hover:scale-105"
                />
            </div>
        );
    }

    return (
        <div
            className={`media-placeholder ${className}`}
            style={{ aspectRatio }}
        >
            <span className="text-sm font-medium text-brand-muted">
                ※ {label}
            </span>
            {size && (
                <span className="text-xs text-brand/40">
                    권장: {size}
                </span>
            )}
            <span className="text-xs text-brand/40">
                내부 팀 전달 후 교체 예정
            </span>
        </div>
    );
}
