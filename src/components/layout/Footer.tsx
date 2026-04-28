import Link from "next/link";
import { NAV_MENUS, CLINIC_INFO, DOCTOR_INFO } from "@/lib/constants";
import { Icon } from "@iconify/react";

/**
 * Footer 컴포넌트
 */
export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#282d3d] pb-20 pt-16 md:pb-12 md:pt-30 text-white/60">
            {/* 배경 무한 루프 마키 애니메이션 */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 pointer-events-none select-none overflow-hidden">
                <div className="marquee-track animate-marquee">
                    {[...Array(8)].map((_, i) => (
                        <span
                            key={`bg-marquee-${i}`}
                            className="mx-3 whitespace-nowrap text-[50px] font-medium text-white/[0.04] md:mx-6 md:text-[90px] uppercase"
                        >
                            LIVE YOUNG CLINIC{" "}
                        </span>
                    ))}
                </div>
            </div>

            {/* 메인 풋터 콘텐츠 */}
            <div className="relative z-10 mx-auto max-w-[1700px] px-5 md:px-12">
                {/* 데스크탑 레이아웃 (정보-로고-메뉴 3컬럼 집중형) */}
                <div className="hidden md:grid md:grid-cols-3 md:items-start md:gap-20">
                    {/* 좌: 클리닉 정보 */}
                    <div className="text-left py-4">
                        <h4 className="text-xl font-bold text-[#F2F1ED] font-sans tracking-tight">
                            {CLINIC_INFO.name}
                        </h4>
                        <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-2 text-[14px] font-medium text-white/60 leading-snug break-keep">
                                <span className="inline-block w-4 h-4 mt-0.5 text-[#bbaa68] shrink-0">
                                    <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                </span>
                                {CLINIC_INFO.address}
                            </div>
                            <div className="space-y-1 text-[13.5px] font-medium text-white/50">
                                <p>대표자. {DOCTOR_INFO.name}</p>
                                <p>사업자등록번호. {CLINIC_INFO.registrationNumber}</p>
                                <p>
                                    TEL. {CLINIC_INFO.phone} &nbsp; FAX. {CLINIC_INFO.fax}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 중: 로고 */}
                    <div className="flex flex-col items-center justify-center pt-2">
                        <img
                            src="/images/logo/logo_white1.webp"
                            alt="Live Young Clinic"
                            className="h-auto w-[300px]"
                        />
                    </div>

                    {/* 우: 네비게이션 */}
                    <div className="flex flex-col items-end py-4">
                        <nav className="flex flex-col items-end gap-3.5">
                            {NAV_MENUS.map((menu) => (
                                <Link
                                    key={menu.label}
                                    href={menu.href}
                                    className="text-[14px] font-bold tracking-tight text-white/60 transition-colors hover:text-[#bbaa68] font-sans"
                                >
                                    {menu.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* 모바일 레이아웃 (사진 스타일 적용 - 여백 축소) */}
                <div className="flex flex-col items-center text-center space-y-8 md:hidden">
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-[#F2F1ED] tracking-tight">{CLINIC_INFO.name}</h4>
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-1.5 text-[14px] font-medium text-white/60 leading-snug break-keep">
                                <span className="inline-block w-4 h-4 text-[#bbaa68]">
                                    <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                </span>
                                {CLINIC_INFO.address}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5 text-[14px] font-medium text-white/50 tracking-tight">
                        <p>대표자. {DOCTOR_INFO.name}</p>
                        <p>사업자등록번호. {CLINIC_INFO.registrationNumber}</p>
                        <p>
                            TEL. {CLINIC_INFO.phone} &nbsp; FAX. {CLINIC_INFO.fax}
                        </p>
                    </div>

                </div>

                {/* 하부 공통 영역 (구분선 + SNS + 저작권 + 정책링크) */}
                <div className="mt-12 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
                    {/* 1단: SNS 아이콘 */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start mb-5">
                        <Link href={CLINIC_INFO.social.kakao} target="_blank" className="flex items-center gap-1.5 group">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-[#FAE100]">
                                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.312 6.095l-.81 2.973c-.066.241.144.454.364.308l3.493-2.31c.532.096 1.08.149 1.641.149 4.97 0 9-3.185 9-7.115S16.97 3 12 3z" /></svg>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 transition-colors group-hover:text-[#bbaa68]">KAKAO</span>
                        </Link>
                        <Link href={CLINIC_INFO.social.instagram} target="_blank" className="flex items-center gap-1.5 group">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-[#E4405F]">
                                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 transition-colors group-hover:text-[#bbaa68]">INSTAGRAM</span>
                        </Link>
                        <Link href="https://www.threads.net/@liveyoungclinic" target="_blank" className="flex items-center gap-1.5 group">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-black">
                                <Icon icon="ri:threads-fill" className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 transition-colors group-hover:text-[#bbaa68]">THREADS</span>
                        </Link>
                        <Link href={CLINIC_INFO.social.blog} target="_blank" className="flex items-center gap-1.5 group">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-[#03C75A]">
                                <span className="text-[8px] font-black text-white leading-none">b</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 transition-colors group-hover:text-[#bbaa68]">BLOG</span>
                        </Link>
                    </div>

                    {/* 2단: 저작권(좌) + 정책링크(우) */}
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-[11px] font-medium tracking-tight text-white/30">
                            Copyright ⓒ {CLINIC_INFO.name}. All rights reserved. Design By shinnong.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
