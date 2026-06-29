"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

/**
 * 메인 팝업 공지 컴포넌트
 */

interface PopupData {
    id: number | string;
    title: string;
    image_url: string;
    link_url: string | null;
}

const POPUP_DISMISS_KEY_PREFIX = "liveyoung_popup_dismissed";

const getPopupDismissKey = (items: PopupData[]) =>
    `${POPUP_DISMISS_KEY_PREFIX}_${items.map((item) => item.id).join("_")}`;

export default function PopupNotice() {
    const [isOpen, setIsOpen] = useState(false);
    const [popups, setPopups] = useState<PopupData[]>([]);
    const [activePopupIndex, setActivePopupIndex] = useState(0);

    useEffect(() => {
        const fetchPopups = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("popups")
                .select("id, title, image_url, link_url")
                .eq("is_active", true)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Popup fetch error:", error.message);
                return;
            }

            if (data && data.length > 0) {
                const activePopups = data as PopupData[];
                setPopups(activePopups);
                setActivePopupIndex(0);

                const dismissed = localStorage.getItem(getPopupDismissKey(activePopups));
                if (dismissed) {
                    const dismissedTime = parseInt(dismissed, 10);
                    const now = Date.now();
                    if (now - dismissedTime < 86400000) return;
                }
                setTimeout(() => setIsOpen(true), 150);
            }
        };

        fetchPopups();
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDismissToday = () => {
        localStorage.setItem(getPopupDismissKey(popups), String(Date.now()));
        setIsOpen(false);
    };

    const activePopup = popups[activePopupIndex];

    if (!activePopup) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.97, opacity: 0, y: 8 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.97, opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[450px] overflow-hidden rounded-2xl bg-surface shadow-2xl border border-brand/5"
                    >
                        {/* 이미지 및 링크 영역 */}
                        <div className={`relative w-full group overflow-hidden ${activePopup.link_url ? "cursor-pointer" : ""}`}>
                            {activePopup.link_url ? (
                                <a
                                    href={activePopup.link_url}
                                    onClick={handleClose}
                                    className="block relative"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <img
                                            src={activePopup.image_url}
                                            alt={activePopup.title}
                                            className="block h-auto w-full"
                                        />
                                    </motion.div>

                                    {/* 오버레이 버튼 (이미지와 일체감 있는 다크 네이비 스타일) */}
                                    <div className="absolute bottom-6 left-0 right-0 px-8">
                                        <div className="w-full rounded-full bg-brand py-4 text-center text-[15px] font-bold text-white shadow-xl backdrop-blur-sm bg-opacity-95 transition-all hover:bg-brand-light">
                                            자세히 보기
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <img
                                    src={activePopup.image_url}
                                    alt={activePopup.title}
                                    className="block h-auto w-full"
                                />
                            )}
                        </div>

                        {popups.length > 1 && (
                            <div className="grid grid-cols-2 border-t border-brand/10 bg-white text-[13px] font-bold text-brand">
                                {popups.map((popup, index) => {
                                    const isActive = index === activePopupIndex;

                                    return (
                                        <button
                                            key={popup.id}
                                            type="button"
                                            onClick={() => setActivePopupIndex(index)}
                                            aria-pressed={isActive}
                                            className={`min-h-[50px] border-b border-r border-brand/10 px-3 py-3 transition-colors ${
                                                index % 2 === 1 ? "border-r-0" : ""
                                            } ${
                                                isActive
                                                    ? "bg-brand/[0.08] text-brand"
                                                    : "bg-white text-brand/70 hover:bg-brand/[0.03]"
                                            }`}
                                        >
                                            <span className="block truncate">{popup.title}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* 하단 푸터 (글라스모피즘 스타일 적용) */}
                        <div className="flex h-[55px] w-full bg-black/90 text-[13px] text-white/80 backdrop-blur-md">
                            <label className="flex flex-[1.2] cursor-pointer items-center justify-center gap-2.5 transition-colors hover:bg-white/5 active:bg-white/10">
                                <span className="relative flex h-4 w-4 items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="peer h-full w-full cursor-pointer appearance-none rounded-sm border border-white/30 checked:border-brand checked:bg-brand transition-all"
                                        onChange={(e) => {
                                            if (e.target.checked) handleDismissToday();
                                        }}
                                    />
                                    <svg className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                                <span className="font-medium">24시간 동안 보지 않음</span>
                            </label>
                            <div className="my-4 w-[1px] bg-white/10" />
                            <button
                                onClick={handleClose}
                                className="flex-1 font-bold tracking-tight transition-colors hover:bg-white/5 active:bg-white/10"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
