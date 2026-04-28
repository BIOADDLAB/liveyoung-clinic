"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { NAV_MENUS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

/**
 * SubPageNav - 서브페이지 히어로 하단 네비게이션 바
 * 스크롤이 발생했을 때만 나타나도록 처리
 */
export default function SubPageNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [openSelect, setOpenSelect] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const selectRef1 = useRef<HTMLDivElement>(null);
    const selectRef2 = useRef<HTMLDivElement>(null);

    // 현재 경로를 기반으로 메뉴 찾기
    const findCurrentMenu = () => {
        // NAV_MENUS를 복사하여 로그인 상태에 따라 회원서비스 메뉴를 가공
        const processedMenus = NAV_MENUS.map(menu => {
            if (menu.label === "회원서비스") {
                if (isLoggedIn) {
                    return {
                        ...menu,
                        label: "마이페이지",
                        subMenus: menu.subMenus.filter(s => 
                            s.label === "회원정보수정" || s.label === "회원탈퇴"
                        )
                    };
                } else {
                    return {
                        ...menu,
                        subMenus: menu.subMenus.filter(s => 
                            s.label === "로그인" || s.label === "회원가입" || s.label === "아이디/비밀번호 찾기"
                        )
                    };
                }
            }
            return menu;
        });

        for (const menu of processedMenus) {
            const sub = menu.subMenus.find(s => s.href === pathname);
            if (sub) return { main: menu, sub, all: processedMenus };

            if (menu.href === pathname) return { main: menu, sub: null, all: processedMenus };
        }
        return { main: null, sub: null, all: processedMenus };
    };

    const { main: currentMain, sub: currentSub, all: menus } = findCurrentMenu();

    // 스크롤 감지: 일정 거리(예: 50px) 이상 내려오면 노출
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // 초기 상태 체크
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef1.current && !selectRef1.current.contains(event.target as Node) &&
                selectRef2.current && !selectRef2.current.contains(event.target as Node)
            ) {
                setOpenSelect(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!currentMain) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 z-30 h-[60px] md:h-[80px] bg-black/20 backdrop-blur-md border-t border-white/10"
                >
                    <div className="mx-auto flex h-full max-w-[1560px] items-center justify-between px-5 md:px-8">

                        {/* 왼쪽: 브레드크럼 (데스크탑에서만 노출) */}
                        <div className="hidden md:flex items-center gap-4 text-white/80 text-[15px] font-semibold">
                            <Link href="/" className="hover:text-white transition-colors">
                                <Icon icon="ph:house-fill" width={18} height={18} />
                            </Link>
                            <Icon icon="ph:caret-right-bold" width={10} height={10} className="opacity-40" />
                            <span className="opacity-80">{currentMain.label}</span>
                            {currentSub && (
                                <>
                                    <Icon icon="ph:caret-right-bold" width={10} height={10} className="opacity-40" />
                                    <span className="text-white font-semibold">{currentSub.label}</span>
                                </>
                            )}
                        </div>

                        {/* 모바일: 홈 버튼만 심플하게 노출 */}
                        <div className="flex md:hidden items-center">
                            <Link href="/" className="text-white/80 hover:text-white transition-colors p-2">
                                <Icon icon="ph:house-fill" width={22} height={22} />
                            </Link>
                        </div>

                        {/* 오른쪽: 드롭다운 메뉴 (모바일에서는 너비 확장) */}
                        <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none justify-end md:justify-start">

                            {/* Select 1: 대메뉴 */}
                            <div className="relative" ref={selectRef1}>
                                <button
                                    onClick={() => setOpenSelect(openSelect === 1 ? null : 1)}
                                    className="flex items-center justify-between w-[130px] md:w-[220px] h-[38px] md:h-[48px] px-3 md:px-6 bg-white/10 border border-white/20 rounded-sm text-white text-[13px] md:text-[15px] text-left hover:bg-white/20 transition-all font-semibold"
                                >
                                    <span className="truncate">{currentMain.label}</span>
                                    <Icon
                                        icon="ph:caret-down-fill"
                                        className={`transition-transform duration-300 ${openSelect === 1 ? "rotate-180" : ""}`}
                                        width={12}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openSelect === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute bottom-full mb-2 left-0 right-0 bg-[#222736] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
                                        >
                                            {menus.map((menu) => (
                                                <Link
                                                    key={menu.label}
                                                    href={menu.href}
                                                    className={`block px-5 py-3 text-[13px] md:text-[14px] transition-colors hover:bg-white/10 ${currentMain.label === menu.label ? "text-accent font-bold" : "text-white/70"
                                                        }`}
                                                    onClick={() => setOpenSelect(null)}
                                                >
                                                    {menu.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Select 2: 소메뉴 */}
                            {currentMain.subMenus.length > 0 && (
                                <div className="relative" ref={selectRef2}>
                                    <button
                                        onClick={() => setOpenSelect(openSelect === 2 ? null : 2)}
                                        className="flex items-center justify-between w-[130px] md:w-[220px] h-[38px] md:h-[48px] px-3 md:px-6 bg-white/10 border border-white/20 rounded-sm text-white text-[13px] md:text-[15px] text-left hover:bg-white/20 transition-all font-semibold"
                                    >
                                        <span className="truncate">{currentSub?.label || currentMain.label}</span>
                                        <Icon
                                            icon="ph:caret-down-fill"
                                            className={`transition-transform duration-300 ${openSelect === 2 ? "rotate-180" : ""}`}
                                            width={12}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openSelect === 2 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full mb-2 left-0 right-0 bg-[#222736] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
                                            >
                                                {currentMain.subMenus.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        className={`block px-5 py-3 text-[13px] md:text-[14px] transition-colors hover:bg-white/10 ${currentSub?.label === sub.label ? "text-accent font-bold" : "text-white/70"
                                                            }`}
                                                        onClick={() => setOpenSelect(null)}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
