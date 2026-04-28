"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { QUICK_MENU_ITEMS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function QuickMenu() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const desktopItems = [
    { label: "간편상담", icon: "ph:note-pencil-fill", href: "/contact" },
    { label: "카카오톡", icon: "ri:kakao-talk-fill", href: "http://pf.kakao.com/_SbdEX" },
    { label: "인스타그램", icon: "ri:instagram-fill", href: "https://www.instagram.com/liveyoungclinic" },
    { label: "스레드", icon: "ri:threads-fill", href: "https://www.threads.net/@liveyoungclinic" },
    { label: "네이버 블로그", icon: "ri:blogger-fill", href: "https://blog.naver.com/liveyoung_clinic" },
  ];
  const menuCircleSize = 68;
  const menuGap = 16;

  return (
    <>
      <aside className="fixed bottom-6 right-6 z-[60] hidden lg:flex">
        <div className="flex w-[96px] flex-col items-center gap-4">
          <AnimatePresence>
            {isDesktopOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
                style={{ gap: `${menuGap}px` }}
              >
                {desktopItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.22, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      className="group flex items-center justify-center rounded-full bg-black/72 text-white shadow-[0_16px_35px_rgba(0,0,0,0.28)] ring-1 ring-white/8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
                      style={{ width: `${menuCircleSize}px`, height: `${menuCircleSize}px` }}
                      aria-label={item.label}
                      title={item.href === "#" ? `${item.label} 개설 전` : item.label}
                    >
                      <Icon icon={item.icon} className="text-[30px] transition-transform duration-300 group-hover:scale-110" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsDesktopOpen((prev) => !prev)}
            className="relative z-10 flex items-center justify-center rounded-full bg-[#bbaa68] text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105"
            style={{ width: `${menuCircleSize}px`, height: `${menuCircleSize}px` }}
            aria-label={isDesktopOpen ? "퀵메뉴 닫기" : "퀵메뉴 열기"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDesktopOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  <Icon icon="ph:x-bold" className="text-[28px]" />
                </motion.span>
              ) : (
                <motion.span
                  key="quick"
                  initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[16px] font-medium tracking-[0.08em]"
                >
                  QUICK
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <motion.button
            initial={false}
            animate={{ opacity: showTopButton ? 1 : 0.55 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            className="flex h-[62px] w-[62px] items-center justify-center rounded-full border border-accent/20 bg-[#F2F1ED] text-accent shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-all hover:scale-105"
            aria-label="맨 위로"
          >
            <Icon icon="fluent:arrow-up-24-filled" className="text-[30px]" />
          </motion.button>
        </div>
      </aside>

      <aside className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden">
        <div className="flex justify-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex h-9 w-20 items-center justify-center rounded-t-2xl bg-[#282d3d] text-white shadow-[0_-4px_15px_rgba(0,0,0,0.3)] transition-all duration-300 ${isCollapsed ? "translate-y-0" : "translate-y-0.5"}`}
          >
            <Icon icon="fluent:chevron-down-24-filled" className={`text-2xl transition-transform duration-500 ${isCollapsed ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden border-t border-white/10 bg-[#282d3d] shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
        >
          <div className="grid w-full grid-cols-6 items-center px-0 pb-safe pt-3">
            {QUICK_MENU_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                className={`flex flex-col items-center gap-1.5 py-2 text-white/70 transition-colors hover:text-white active:bg-white/5 ${idx < QUICK_MENU_ITEMS.length - 1 ? "border-r border-white/10" : ""
                  }`}
              >
                <Icon icon={item.icon} className="text-[20px]" />
                <span className="whitespace-nowrap text-[9px] font-bold tracking-tighter">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showTopButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="absolute bottom-[110px] right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#282d3d] text-white shadow-2xl active:scale-90"
            >
              <Icon icon="fluent:arrow-up-24-filled" className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
