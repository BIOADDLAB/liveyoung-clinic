"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

export default function WithdrawContent() {
    const router = useRouter();
    const { isLoggedIn, isInitialized, logout } = useAuth();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isInitialized && !isLoggedIn && !isComplete) {
            alert("로그인 후 이용 가능합니다.");
            router.push("/login");
        }
    }, [isInitialized, isLoggedIn, isComplete, router]);

    const handleWithdraw = async () => {
        if (!message.trim()) {
            alert("남기실 말씀을 입력해주세요.");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase.rpc("delete_user");
            if (error) throw error;
            await logout();
            setIsComplete(true);
            window.scrollTo(0, 0);
        } catch (error: any) {
            alert(`탈퇴 처리 중 오류가 발생했습니다: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isInitialized || (!isLoggedIn && !isComplete)) return null;

    return (
        <>
            <PageHeader
                title="회원서비스"
                subtitle="Member Service"
                description="아름다움을 향한 시작, 리브영클리닉의 회원 서비스를 이용하실 수 있습니다"
                bgImage="/images/covers/member_cover.webp"
                mobileBgImage="/images/cover_m/회원서비스/member_cover_m.webp"
            />

            <section className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden">
                <div className="mx-auto max-w-[1200px] px-5 relative z-10">
                    {!isComplete && (
                        <div className="text-center mb-16">
                            <h2 className="text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                                회원탈퇴
                            </h2>
                        </div>
                    )}

                    {!isComplete && (
                        <div className="bg-white border border-brand/5 p-8 md:p-12 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                                <div className="font-bold text-[15px] text-brand">탈퇴사유</div>
                                <input
                                    type="text"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors bg-brand/[0.01]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-start gap-4">
                                <div className="pt-2 font-bold text-[15px] text-brand">남기실 말씀 *</div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full h-40 md:h-60 p-6 border border-brand/10 bg-brand/[0.01] outline-none focus:border-brand transition-colors text-[14px]"
                                />
                            </div>
                        </div>
                    )}

                    {!isComplete ? (
                        <div className="mt-12 flex justify-center gap-4 max-w-[500px] mx-auto">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 py-4 bg-white border border-brand/10 text-brand font-bold transition-all hover:bg-brand/[0.02]"
                            >
                                탈퇴취소
                            </button>
                            <button
                                onClick={handleWithdraw}
                                disabled={isLoading}
                                className="flex-1 py-4 bg-brand text-white font-bold transition-all hover:opacity-90 disabled:opacity-50"
                            >
                                {isLoading ? "처리 중..." : "탈퇴완료"}
                            </button>
                        </div>
                    ) : (
                        <div className="py-20 text-center space-y-8">
                            <div className="w-20 h-20 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-10">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-[28px] md:text-[36px] font-bold text-brand">탈퇴가 완료되었습니다.</h3>
                            <p className="text-[16px] md:text-[18px] text-brand-muted leading-relaxed font-medium">
                                그동안 리브영클리닉을 이용해 주셔서 감사합니다.<br />
                                더 좋은 모습으로 다시 만나뵙겠습니다.
                            </p>
                            <div className="pt-10">
                                <Link
                                    href="/"
                                    className="inline-block px-12 py-5 bg-brand text-white font-bold transition-all hover:opacity-90"
                                >
                                    홈으로 가기
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
