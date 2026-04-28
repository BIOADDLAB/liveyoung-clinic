"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import { createClient } from "@/utils/supabase/client";

type TabType = "id" | "pw";

export default function ForgotPasswordContent() {
    const supabase = createClient();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("id");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [foundUserData, setFoundUserData] = useState<{ login_id: string; created_at: string; email: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 아이디 마스킹 함수 (앞 3글자 제외 별표)
    const maskId = (id: string) => {
        if (id.length <= 3) return id.slice(0, 1) + "*".repeat(id.length - 1);
        return id.slice(0, 3) + "*".repeat(id.length - 3);
    };

    // 이메일 마스킹 함수
    const maskEmail = (email: string) => {
        const [local, domain] = email.split("@");
        if (local.length <= 3) return local.slice(0, 1) + "***@" + domain;
        return local.slice(0, 3) + "***@" + domain;
    };

    const handleFindId = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (!email.trim()) {
            alert("이메일주소를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setFoundUserData(null);

        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("login_id, created_at, email")
                .eq("full_name", name.trim())
                .ilike("email", email.trim())
                .single();

            if (error || !data) {
                alert("일치하는 회원 정보가 없습니다.");
            } else {
                setFoundUserData(data);
            }
        } catch (err) {
            console.error("Find ID error:", err);
            alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendIdToEmail = () => {
        if (!foundUserData) return;
        alert(`회원님의 아이디를 이메일로 보내드렸습니다.\n이메일주소 : ${foundUserData.email}`);
    };

    const handleFindPw = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (!name.trim()) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (!email.trim()) {
            alert("이메일을 입력해주세요.");
            return;
        }
        if (!verificationCode.trim()) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            // 인증번호 검증 (recovery 타입)
            const { error } = await supabase.auth.verifyOtp({
                email: email.trim(),
                token: verificationCode.trim(),
                type: 'recovery'
            });

            if (error) {
                alert(`인증번호가 올바르지 않거나 만료되었습니다: ${error.message}`);
            } else {
                alert("인증에 성공했습니다. 비밀번호 재설정 페이지로 이동합니다.");
                router.push("/reset-password");
            }
        } catch (err) {
            console.error("Verify OTP error:", err);
            alert("처리 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendCode = async () => {
        if (!userId.trim() || !name.trim() || !email.trim()) {
            alert("아이디, 이름, 이메일을 모두 입력해주세요.");
            return;
        }

        setIsLoading(true);
        try {
            // 1. 먼저 DB에서 정보가 일치하는지 확인
            const { data, error: profileError } = await supabase
                .from("profiles")
                .select("id")
                .eq("login_id", userId.trim().toLowerCase())
                .eq("full_name", name.trim())
                .ilike("email", email.trim())
                .single();

            if (profileError || !data) {
                alert("입력하신 정보와 일치하는 회원이 없습니다.");
                return;
            }

            // 2. 정보가 일치하면 인증번호(복구용) 발송
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                alert(`인증번호 전송 실패: ${error.message}`);
            } else {
                alert("입력하신 이메일로 인증번호(또는 재설정 링크)가 전송되었습니다.");
            }
        } catch (err) {
            console.error("Send reset code error:", err);
            alert("서버 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#F2F1ED] min-h-screen">
            <PageHeader
                title="회원서비스"
                subtitle="Member Service"
                description="아름다움을 향한 시작, 리브영클리닉의 회원 서비스를 이용하실 수 있습니다"
                bgImage="/images/covers/member_cover.webp"
                mobileBgImage="/images/cover_m/회원서비스/member_cover_m.webp"
            />

            <section className="py-24 md:py-32 bg-[#F2F1ED] relative">
                <div className="mx-auto max-w-[500px] px-5">
                    <div className="text-center mb-16">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            FIND ACCOUNT
                        </p>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            아이디/비밀번호 찾기
                        </h2>
                    </div>

                    <div className="mt-16 border border-brand/5 bg-white shadow-sm overflow-hidden rounded-sm">
                        {/* 탭 헤더 */}
                        <div className="flex border-b border-brand/5 bg-brand/[0.03]">
                            <button
                                onClick={() => setActiveTab("id")}
                                className={`flex-1 py-6 md:py-8 text-[15px] md:text-[16px] font-bold transition-all relative ${activeTab === "id" ? "bg-white text-brand border-r border-brand/5" : "text-brand/40 border-r border-brand/5"}`}
                            >
                                아이디 찾기
                                {activeTab === "id" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand" />}
                            </button>
                            <button
                                onClick={() => setActiveTab("pw")}
                                className={`flex-1 py-6 md:py-8 text-[15px] md:text-[16px] font-bold transition-all relative ${activeTab === "pw" ? "bg-white text-brand" : "text-brand/40"}`}
                            >
                                비밀번호 찾기
                                {activeTab === "pw" && <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand" />}
                            </button>
                        </div>

                        {/* 탭 컨텐츠 */}
                        <div className="p-8 md:p-10">
                            {activeTab === "id" ? (
                                <form onSubmit={handleFindId} className="space-y-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center p-[3px]">
                                            <div className="w-full h-full bg-brand rounded-full" />
                                        </div>
                                        <span className="text-[15px] font-medium text-brand-light">이메일로 찾기</span>
                                    </div>

                                    {foundUserData ? (
                                        <div className="bg-brand/[0.03] p-8 md:p-12 text-center border border-brand/5 rounded-sm">
                                            <p className="text-[16px] md:text-[18px] text-brand-muted mb-8 font-medium tracking-[-0.026em]">아이디 찾기 결과입니다.</p>

                                            <div className="flex items-baseline justify-center gap-2 mb-8">
                                                <span className="text-[24px] md:text-[28px] font-bold text-brand tracking-tight">
                                                    {foundUserData.login_id}
                                                </span>
                                                <span className="text-[13px] text-brand/30 font-medium">
                                                    ({new Date(foundUserData.created_at).toISOString().split('T')[0]} 가입)
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-b border-brand/5 py-6 mb-10">
                                                <span className="text-[14px] text-brand/30 font-medium">이메일</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[15px] text-brand font-bold">{foundUserData.email}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => window.location.href = '/login'}
                                                    className="bg-brand text-white py-5 font-bold text-[14px] hover:opacity-90 transition-all"
                                                >
                                                    로그인하기
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveTab("pw")}
                                                    className="bg-transparent text-brand border border-brand/10 py-5 font-bold text-[14px] hover:bg-brand/[0.02] transition-all"
                                                >
                                                    비밀번호찾기
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setFoundUserData(null)}
                                                className="block mx-auto text-brand/20 py-3 text-[12px] mt-6 hover:text-brand/40 transition-all font-medium underline underline-offset-4"
                                            >
                                                다시 찾기
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <label className="block text-[14px] font-bold text-brand">이름 *</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="이름"
                                                    className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-[14px] font-bold text-brand">이메일주소 *</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="이메일주소"
                                                    className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-brand text-white py-6 font-bold text-[16px] mt-10 hover:opacity-90 transition-all disabled:opacity-50"
                                            >
                                                {isLoading ? "조회 중..." : "아이디 찾기"}
                                            </button>
                                        </>
                                    )}
                                </form>
                            ) : (
                                <form onSubmit={handleFindPw} className="space-y-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center p-[3px]">
                                            <div className="w-full h-full bg-brand rounded-full" />
                                        </div>
                                        <span className="text-[15px] font-medium text-brand-light">이메일로 찾기</span>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[14px] font-bold text-brand">아이디 *</label>
                                        <input
                                            type="text"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            placeholder="아이디"
                                            className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[14px] font-bold text-brand">이름 *</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="이름"
                                            className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[14px] font-bold text-brand">이메일 *</label>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="이메일주소"
                                                className="flex-1 border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSendCode}
                                                className="bg-brand text-white px-6 py-4 text-[14px] font-bold hover:opacity-90 transition-all whitespace-nowrap h-[54px] sm:h-auto"
                                            >
                                                인증번호전송
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            placeholder="인증번호"
                                            className="w-full border border-brand/10 px-5 py-4 text-[14px] outline-none focus:border-brand transition-all placeholder:text-brand/20 mt-2"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-brand text-white py-6 font-bold text-[16px] mt-10 hover:opacity-90 transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? "처리 중..." : "비밀번호 찾기"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
