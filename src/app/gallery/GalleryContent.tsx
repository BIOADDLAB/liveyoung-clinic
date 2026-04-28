"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import SectionTitle from "@/components/ui/SectionTitle";
import PageHeader from "@/components/layout/PageHeader";

/**
 * 전후사진 게시판
 * 카테고리 필터 + 그리드 갤러리 + 모달 확대 보기
 */

interface GalleryItem {
    id: number;
    category: string;
    treatment: string;
    description: string;
    beforeLabel: string;
    afterLabel: string;
    beforeImage: string;
    afterImage: string;
    created_at: string;
}

const CATEGORIES = ["전체", "얼굴/바디 컨투어링", "스킨부스터", "리프팅", "미백/모공/흉터", "줄기세포"];

export default function GalleryContent() {
    const { isLoggedIn, isInitialized } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("전체");
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const scrollTargetRef = useRef<HTMLDivElement>(null);
    const alertShown = useRef(false);

    useEffect(() => {
        if (isInitialized && !isLoggedIn && !alertShown.current) {
            alertShown.current = true;
            window.alert("로그인 후 이용 가능합니다.");
            router.push("/login");
        }
    }, [isInitialized, isLoggedIn, router]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchGallery();
        }
    }, [isLoggedIn]);

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("galleries")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            if (data) {
                const mappedData: GalleryItem[] = data.map((item: any) => ({
                    id: item.id,
                    category: item.category,
                    treatment: item.treatment,
                    description: item.description,
                    beforeLabel: "시술 전",
                    afterLabel: "시술 후",
                    beforeImage: item.before_image_url,
                    afterImage: item.after_image_url,
                    created_at: item.created_at
                }));
                setGalleryData(mappedData);
            }
        } catch (error) {
            console.error("Gallery fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isInitialized || !isLoggedIn) {
        return null;
    }

    // 카테고리 필터링
    const filtered =
        activeCategory === "전체"
            ? galleryData
            : galleryData.filter((item) => item.category === activeCategory);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    const scrollToGallery = () => {
        if (scrollTargetRef.current) {
            const yOffset = -150;
            const y = scrollTargetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setTimeout(scrollToGallery, 100);
    };

    return (
        <>
            {/* 히어로 */}
            <PageHeader
                title="전후사진"
                subtitle="BEFORE & AFTER"
                description="분석으로 완성되는 변화, 리브영클리닉의 정교한 시술 결과를 확인하세요"
                bgImage="/images/covers/gallery_cover.webp"
                mobileBgImage="/images/cover_m/전후사진/gallery_cover_m.webp"
            />

            {/* 카테고리 필터 + 갤러리 */}
            <section className="py-[60px] md:py-[100px]" ref={scrollTargetRef}>
                <div className="mx-auto max-w-[1560px] px-5 md:px-8">
                    <div className="text-center mb-16">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            GALLERY
                        </p>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            시술 결과 갤러리
                        </h2>
                        <p className="mx-auto mt-6 max-w-[600px] text-[16px] md:text-[18px] font-normal leading-relaxed text-brand-muted tracking-[-0.026em]">
                            리브영의 정교한 분석과 숙련된 노하우로 완성된 시술 결과를 확인하세요.
                        </p>
                    </div>

                    {/* 카테고리 탭 */}
                    <div className="mt-10 flex justify-center">
                        <div className="inline-flex flex-wrap justify-center gap-2 bg-[#F2F1ED] p-2 rounded-[30px]">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`rounded-full px-6 py-3 text-[15px] font-semibold transition-all ${activeCategory === cat
                                        ? "bg-brand text-white shadow-lg"
                                        : "text-brand/40 hover:text-brand"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 갤러리 그리드 */}
                    <div className="mt-16 relative min-h-[800px]">
                        {loading ? (
                            <div className="flex h-60 items-center justify-center">
                                <p className="text-brand/40">시술 결과를 불러오는 중...</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeCategory}-${currentPage}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
                                >
                                    {currentItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className="group cursor-pointer overflow-hidden rounded-[40px] bg-white/40 border border-brand/5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_30px_60px_rgba(40,45,61,0.08)] hover:-translate-y-1"
                                        >
                                            {/* Before / After 비교 영역 */}
                                            <div className="grid grid-cols-2 relative">
                                                <div className="relative aspect-[4/5] bg-brand/[0.02] overflow-hidden">
                                                    <img
                                                        src={item.beforeImage}
                                                        alt="Before"
                                                        loading="lazy"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

                                                    <span className="sub_title absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 backdrop-blur-md px-4 py-1 text-sm text-white tracking-widest">
                                                        Before
                                                    </span>
                                                </div>
                                                <div className="relative aspect-[4/5] bg-brand/[0.04] overflow-hidden border-l border-white/20">
                                                    <img
                                                        src={item.afterImage}
                                                        alt="After"
                                                        loading="lazy"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

                                                    <span className="sub_title absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-sm text-white tracking-widest shadow-lg">
                                                        After
                                                    </span>
                                                </div>
                                            </div>

                                            {/* 정보 영역 */}
                                            <div className="p-8 md:p-10">
                                                <div className="flex flex-col gap-3">
                                                    <span className="text-brand text-sm font-bold tracking-tight">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-[22px] md:text-[26px] font-bold text-brand tracking-tight leading-tight">
                                                        {item.treatment} 시술 결과
                                                    </h3>
                                                    <div className="mt-4 flex items-center gap-2 text-brand/30">
                                                        <img
                                                            src="https://api.iconify.design/lucide:clock.svg?color=currentColor"
                                                            className="w-4 h-4"
                                                            alt="date"
                                                        />
                                                        <span className="text-sm font-medium">
                                                            {new Date(item.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {currentItems.length === 0 && (
                                        <div className="col-span-full py-20 text-center text-brand/30">
                                            해당 카테고리의 시술 결과가 아직 없습니다.
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>

                    {/* 페이지네이션 컨트롤 */}
                    {!loading && totalPages > 1 && (
                        <div className="mt-20 flex justify-center items-center gap-3">
                            <button
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-brand/10 text-brand/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand hover:text-brand transition-all"
                            >
                                <img src="https://api.iconify.design/lucide:chevron-left.svg?color=currentColor" className="w-5 h-5" alt="prev" />
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-12 h-12 rounded-full text-sm font-bold transition-all ${currentPage === i + 1
                                            ? "bg-brand text-white shadow-lg shadow-brand/20"
                                            : "bg-white/50 text-brand/40 hover:text-brand border border-brand/5"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-brand/10 text-brand/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand hover:text-brand transition-all"
                            >
                                <img src="https://api.iconify.design/lucide:chevron-right.svg?color=currentColor" className="w-5 h-5" alt="next" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* 모달 (확대 보기) */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[800px] overflow-hidden rounded-2xl bg-[#F2F1ED]"
                        >
                            {/* 비교 이미지 */}
                            <div className="grid grid-cols-2">
                                <div className="relative aspect-[4/5] bg-brand/[0.02] overflow-hidden">
                                    <img
                                        src={selectedItem.beforeImage}
                                        alt="Before"
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute left-3 top-3 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs text-white">
                                        {selectedItem.beforeLabel}
                                    </span>
                                </div>
                                <div className="relative aspect-[4/5] bg-brand/[0.02] overflow-hidden border-l border-white/20">
                                    <img
                                        src={selectedItem.afterImage}
                                        alt="After"
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-xs text-white shadow-lg">
                                        {selectedItem.afterLabel}
                                    </span>
                                </div>
                            </div>

                            {/* 정보 */}
                            <div className="p-6">
                                <div className="flex items-center gap-3">
                                    <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                                        {selectedItem.category}
                                    </span>
                                    <span className="text-sm text-brand/40">
                                        {selectedItem.treatment}
                                    </span>
                                </div>
                                <p className="mt-3 text-base text-brand-muted">
                                    {selectedItem.description}
                                </p>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="mt-4 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white"
                                >
                                    닫기
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
