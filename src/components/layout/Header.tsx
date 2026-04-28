"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { NAV_MENUS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, LogOut, LayoutDashboard } from "lucide-react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Header 컴포넌트
 * 네비게이션 드롭다운(메가메뉴) + 모바일 햄버거 메뉴 포함
 */
export default function Header() {
    const isScrolled = useScrollHeader(50);
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, isAdmin, logout } = useAuth();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    // 관리자 페이지 등 히어로 배너가 없는 곳에서는 헤더를 상시 노출
    const isAdminPage = pathname?.startsWith("/admin");
    const isSolid = isScrolled || isMobileMenuOpen || isHovered || isAdminPage;

    // 페이지 이동 시 모바일 메뉴 자동 닫기
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // 모바일 메뉴 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const toggleAccordion = (label: string) => {
        setActiveAccordion((prev) => (prev === label ? null : label));
    };

    const [currentLang, setCurrentLang] = useState("Ko");

    // 구글 번역기 초기화 및 스타일 (가장 안정적인 쿠키 방식)
    useEffect(() => {
        // 현재 언어 상태 감지 함수 (쿠키에서 추출)
        const updateLangLabel = () => {
            try {
                const cookies = document.cookie.split('; ');
                const googtrans = cookies.find(row => row.startsWith('googtrans='));
                if (googtrans) {
                    const langValue = decodeURIComponent(googtrans.split('=')[1]);
                    const lang = langValue.split('/').pop();

                    switch (lang) {
                        case 'en': setCurrentLang('En'); break;
                        case 'ja': setCurrentLang('Ja'); break;
                        case 'zh-CN': setCurrentLang('Ch'); break;
                        case 'zh-TW': setCurrentLang('Tw'); break;
                        default: setCurrentLang('Ko');
                    }
                } else {
                    setCurrentLang('Ko');
                }
            } catch (e) {
                console.error("Language detection error:", e);
                setCurrentLang('Ko');
            }
        };

        updateLangLabel();

        const existingScript = document.getElementById('google-translate-script');
        if (!existingScript) {
            const addScript = document.createElement('script');
            addScript.id = 'google-translate-script';
            addScript.setAttribute('src', 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            document.body.appendChild(addScript);
        }

        (window as any).googleTranslateElementInit = () => {
            if (!(window as any).google?.translate?.TranslateElement) return;
            new (window as any).google.translate.TranslateElement({
                pageLanguage: 'ko',
                autoDisplay: false
            }, 'google_translate_element');
        };

        if (!document.getElementById('google-translate-style')) {
            const style = document.createElement('style');
            style.id = 'google-translate-style';
            style.innerHTML = `
                iframe.goog-te-banner-frame { display: none !important; }
                body { top: 0px !important; }
                #google_translate_element { display: none !important; }
                .skiptranslate { display: none !important; }
                .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
            `;
            document.head.appendChild(style);
        }
    }, [pathname]);

    // 동일 페이지 클릭 시 최상단 즉시 이동 함수
    const handleSamePageScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsHovered(false); // 항목 클릭 시 메가메뉴 즉시 닫기
        if (pathname === href) {
            window.scrollTo(0, 0);
        }
    };

    // 번역 실행 함수 (가장 안정적인 쿠키 방식 원복: 새로고침을 통해 전체 번역 적용)
    const handleTranslate = (langCode: string) => {
        if (langCode === 'ko') {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        } else {
            const cookieValue = `/ko/${langCode}`;
            document.cookie = `googtrans=${cookieValue}; path=/`;
            document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
        }
        window.location.reload();
    };

    return (
        <>
            {/* 번역용 엔진 엘리먼트 (숨김) */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>

            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid
                    ? "bg-[#F2F1ED] shadow-sm border-b border-black/5 isSolid"
                    : "bg-transparent"
                    }`}
            >
                <div className="mx-auto flex h-[100px] max-w-[1560px] items-center justify-between px-5 md:px-8">
                    {/* 로고 */}
                    <Link
                        href="/"
                        className="flex items-center"
                        onClick={(e) => handleSamePageScroll(e, "/")}
                    >
                        <img
                            src={isSolid ? "/images/logo/logo_dark1.webp" : "/images/logo/logo_white1.webp"}
                            alt="Live Young Clinic"
                            className="h-auto w-[120px] md:w-[170px] transition-all duration-300"
                        />
                    </Link>

                    {/* 데스크탑 네비게이션 */}
                    <nav
                        onMouseEnter={() => {
                            if (window.innerWidth >= 1024) setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                            if (window.innerWidth >= 1024) setIsHovered(false);
                        }}
                        className="hidden h-full items-center lg:flex"
                    >
                        {NAV_MENUS.filter(m => m.label !== "회원서비스").map((menu) => (
                            <div
                                key={menu.label}
                                className="relative flex h-full items-center px-6 group"
                            >
                                <Link
                                    href={menu.href}
                                    onClick={(e) => handleSamePageScroll(e, menu.href)}
                                    className={`relative text-[16px] font-semibold tracking-[-0.42px] transition-colors py-2 ${isSolid
                                        ? "text-brand group-hover:text-accent"
                                        : "text-white/90 group-hover:text-white"
                                        }`}
                                >
                                    {menu.label}
                                    <span className={`absolute bottom-[-28px] left-1/2 h-[3px] w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full ${isSolid ? "bg-accent" : "bg-white"}`} />
                                </Link>

                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, x: "-50%", y: -5 }}
                                            animate={{ opacity: 1, x: "-50%", y: 0 }}
                                            exit={{ opacity: 0, x: "-50%", y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-1/2 top-[100px] pt-10"
                                        >
                                            <div className="flex flex-col gap-4 items-center">
                                                {menu.subMenus.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={(e) => handleSamePageScroll(e, sub.href)}
                                                        className="group/sub relative text-[14px] font-semibold text-brand-muted transition-colors hover:text-accent whitespace-nowrap py-1 px-1"
                                                    >
                                                        {sub.label}
                                                        <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover/sub:w-full" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "320px" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute left-[-100vw] top-[100px] w-[300vw] bg-[#F2F1ED]/98 border-t border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.1)] -z-10"
                                />
                            )}
                        </AnimatePresence>
                    </nav>

                    {/* 유틸리티 영역 */}
                    <div className="flex items-center gap-6">
                        {/* 언어 선택 드롭다운 (고급형 - 지구본 + 국기 방식) */}
                        <div className="hidden items-center md:flex group relative px-1 py-4 cursor-pointer notranslate">
                            <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-full transition-all ${isSolid ? "border-black/10 text-brand/80" : "border-white/20 text-white/90"} group-hover:border-accent group-hover:text-accent`}>
                                <Icon icon="ph:globe-light" width={18} height={18} />
                                <span className="text-[13px] font-semibold uppercase min-w-[18px] text-center">{currentLang}</span>
                                <Icon icon="ph:caret-down-fill" width={10} height={10} className="transition-transform group-hover:rotate-180" />
                            </div>

                            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="bg-[#2a2a2a] shadow-2xl min-w-[100px] overflow-hidden rounded-xl py-2 mt-2 border border-white/5">
                                    <div className="flex flex-col">
                                        {[
                                            { code: 'ko', label: 'Ko', flag: 'twemoji:flag-south-korea' },
                                            { code: 'zh-CN', label: 'Ch', flag: 'twemoji:flag-china' },
                                            { code: 'ja', label: 'Ja', flag: 'twemoji:flag-japan' },
                                            { code: 'en', label: 'En', flag: 'twemoji:flag-united-states' },
                                            { code: 'zh-TW', label: 'Tw', flag: 'twemoji:flag-taiwan' }
                                        ].map((lang) => (
                                            <button
                                                key={lang.code}
                                                type="button"
                                                onClick={() => handleTranslate(lang.code)}
                                                className="w-full flex items-center gap-3 px-5 py-2.5 text-[14px] font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap"
                                            >
                                                <Icon icon={lang.flag} width={20} height={20} className="shrink-0" />
                                                <span className="tracking-tight">{lang.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 로그인/가입 */}
                        <div className="flex items-center gap-5 md:gap-6">
                            {!isLoggedIn ? (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={(e) => handleSamePageScroll(e, "/login")}
                                        className={`flex items-center gap-1.5 transition-all hover:scale-105 ${isSolid ? "text-brand/80 hover:text-accent" : "text-white/90 hover:text-white"}`}
                                    >
                                        <Lock size={16} strokeWidth={2.5} />
                                        <span className="text-[14px] font-semibold hidden md:block">로그인</span>
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={(e) => handleSamePageScroll(e, "/signup")}
                                        className={`flex items-center gap-1.5 transition-all hover:scale-105 ${isSolid ? "text-brand/80 hover:text-accent" : "text-white/90 hover:text-white"}`}
                                    >
                                        <User size={18} strokeWidth={2.5} />
                                        <span className="text-[14px] font-semibold hidden md:block">회원가입</span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            onClick={(e) => handleSamePageScroll(e, "/admin")}
                                            className={`transition-all hover:scale-110 ${isSolid ? "text-brand/70 hover:text-accent" : "text-white/80 hover:text-white"}`}
                                            title="관리자 대시보드"
                                        >
                                            <LayoutDashboard size={18} strokeWidth={2.5} className="md:w-[20px] md:h-[20px]" />
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            logout().then(() => router.push("/"));
                                        }}
                                        className={`flex items-center gap-1.5 transition-all hover:scale-105 ${isSolid ? "text-brand/80 hover:text-accent" : "text-white/90 hover:text-white"}`}
                                    >
                                        <LogOut size={16} strokeWidth={2.5} />
                                        <span className="text-[14px] font-semibold hidden md:block">로그아웃</span>
                                    </button>
                                    <Link
                                        href="/profile"
                                        onClick={(e) => handleSamePageScroll(e, "/profile")}
                                        className={`flex items-center gap-1.5 transition-all hover:scale-105 ${isSolid ? "text-brand/80 hover:text-accent" : "text-white/90 hover:text-white"}`}
                                    >
                                        <User size={18} strokeWidth={2.5} />
                                        <span className="text-[14px] font-semibold hidden md:block">마이페이지</span>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* 모바일 햄버거 */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex flex-col gap-1.5 p-2 lg:hidden"
                            aria-label="메뉴 열기"
                        >
                            <span
                                className={`h-0.5 w-6 transition-all ${isMobileMenuOpen
                                    ? "translate-y-2 rotate-45 bg-brand"
                                    : isSolid
                                        ? "bg-brand"
                                        : "bg-white"
                                    }`}
                            />
                            <span
                                className={`h-0.5 w-6 transition-all ${isMobileMenuOpen
                                    ? "opacity-0"
                                    : isSolid
                                        ? "bg-brand"
                                        : "bg-white"
                                    }`}
                            />
                            <span
                                className={`h-0.5 w-6 transition-all ${isMobileMenuOpen
                                    ? "-translate-y-2 -rotate-45 bg-brand"
                                    : isSolid
                                        ? "bg-brand"
                                        : "bg-white"
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* 모바일 메뉴 */}
            <div
                className={`fixed inset-0 z-40 bg-[#F2F1ED] pt-[90px] transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
            >
                <div className="flex h-full flex-col overflow-y-auto pb-safe">
                    <nav className="flex-1 px-6 py-8">
                        {NAV_MENUS.filter(m => m.label !== "회원서비스").map((menu) => (
                            <div key={menu.label} className="border-b border-brand/5">
                                {menu.subMenus.length > 0 ? (
                                    <button
                                        onClick={() => toggleAccordion(menu.label)}
                                        className="flex h-full w-full items-center justify-between py-5 text-left text-[20px] font-semibold text-brand"
                                    >
                                        <span>{menu.label}</span>
                                        <span className={`text-xl font-light transition-transform duration-300 ${activeAccordion === menu.label ? "rotate-180" : ""}`}>
                                            ↓
                                        </span>
                                    </button>
                                ) : (
                                    <Link
                                        href={menu.href}
                                        onClick={(e) => handleSamePageScroll(e, menu.href)}
                                        className="block py-5 text-[20px] font-semibold text-brand"
                                    >
                                        {menu.label}
                                    </Link>
                                )}

                                {menu.subMenus.length > 0 && (
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${activeAccordion === menu.label ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="flex flex-col gap-1 pb-6 pl-4 pt-1">
                                            {menu.subMenus.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    onClick={(e) => handleSamePageScroll(e, sub.href)}
                                                    className="py-2.5 text-[15px] font-semibold text-brand-muted"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
