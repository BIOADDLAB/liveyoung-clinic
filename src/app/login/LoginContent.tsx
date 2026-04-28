"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";

export default function LoginContent() {
    const { login } = useAuth();
    const router = useRouter();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await login(id, password);

        if (result.success) {
            // 관리자와 일반 사용자 페이지 구분
            if (result.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            setError(result.error || "아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <>
            {/* 상단 히어로 섹션 */}
            <PageHeader
                title="회원서비스"
                subtitle="Member Service"
                description="아름다움을 향한 시작, 리브영클리닉의 회원 서비스를 이용하실 수 있습니다"
                bgImage="/images/covers/member_cover.webp"
                mobileBgImage="/images/cover_m/회원서비스/member_cover_m.webp"
            />

            {/* 단순화된 로그인 폼 섹션 */}
            <section className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden">
                <div className="mx-auto max-w-[500px] px-5 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            LOGIN
                        </p>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            로그인
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-12 space-y-3">
                        <div className="space-y-1">
                            <input
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className="w-full border border-brand/10 bg-white px-5 py-4 text-sm outline-none transition-all focus:border-brand"
                                placeholder="아이디"
                                autoComplete="username"
                            />
                        </div>

                        <div className="space-y-1">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-brand/10 bg-white px-5 py-4 text-sm outline-none transition-all focus:border-brand"
                                placeholder="비밀번호"
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <p className="text-xs font-bold text-red-500 mt-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="mt-4 w-full bg-brand py-5 text-[15px] font-bold text-white transition-all hover:bg-brand-light active:scale-[0.98]"
                        >
                            로그인
                        </button>
                    </form>

                    {/* 하단 보조 링크 */}
                    <div className="mt-10 flex items-center justify-center gap-6 text-[14px] font-medium text-brand-muted">
                        <Link href="/signup" className="hover:text-brand transition-colors">
                            회원가입
                        </Link>
                        <span className="h-3 w-[1px] bg-brand/10" />
                        <Link href="/forgot-password" className="hover:text-brand transition-colors">
                            아이디/비밀번호 찾기
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
