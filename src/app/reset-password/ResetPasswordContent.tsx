"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PageHeader from "@/components/layout/PageHeader";

export default function ResetPasswordContent() {
    const supabase = createClient();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // 비밀번호 재설정 페이지는 인증 세션이 있어야 함
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                alert("인증 세션이 만료되었습니다. 다시 시도해주세요.");
                router.push("/forgot-password");
            }
        };
        checkSession();
    }, [supabase, router]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!password) {
            setError("비밀번호를 입력해주세요.");
            return;
        }
        if (password.length < 6) {
            setError("비밀번호는 6자 이상이어야 합니다.");
            return;
        }
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) {
                setError(`비밀번호 변경 실패: ${error.message}`);
            } else {
                alert("비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인해주세요.");
                router.push("/login");
            }
        } catch (err) {
            console.error("Password update error:", err);
            setError("오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F2F1ED] min-h-screen">
            <PageHeader
                title="비밀번호 재설정"
                subtitle="Reset Password"
                description="안전한 계정 사용을 위해 새로운 비밀번호를 설정해주세요."
                bgImage="/images/covers/member_cover.webp"
                mobileBgImage="/images/cover_m/회원서비스/member_cover_m.webp"
            />

            <section className="py-24 md:py-32">
                <div className="mx-auto max-w-[500px] px-5">
                    <div className="text-center mb-16">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            RESET PASSWORD
                        </p>
                        <h2 className="text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            새 비밀번호 설정
                        </h2>
                    </div>

                    <form onSubmit={handleReset} className="mt-12 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[14px] font-bold text-brand">새 비밀번호 *</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                placeholder="최소 6자 이상"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[14px] font-bold text-brand">비밀번호 확인 *</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                placeholder="비밀번호 재입력"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 font-medium">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand text-white py-6 font-bold text-[16px] mt-6 hover:opacity-90 transition-all disabled:opacity-50"
                        >
                            {isLoading ? "변경 중..." : "비밀번호 변경 완료"}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
