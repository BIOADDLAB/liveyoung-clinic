"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

export default function ProfileContent() {
    const router = useRouter();
    const { user, isLoggedIn, isInitialized } = useAuth();
    const supabase = createClient();
    const alertShown = useRef(false);

    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);

    // 주소 관련 상태
    const [zonecode, setZonecode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    // 입력 필드 상태
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("2024");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [isSolar, setIsSolar] = useState(true);
    const [phoneFirst, setPhoneFirst] = useState("010");
    const [phoneMiddle, setPhoneMiddle] = useState("");
    const [phoneLast, setPhoneLast] = useState("");
    const [emailId, setEmailId] = useState("");
    const [emailDomain, setEmailDomain] = useState("");
    const [emailInput, setEmailInput] = useState("");

    // 1. 초기 데이터 불러오기 (DB 연동)
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                // 프로필 테이블에서 아이디 및 이름 가져오기
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("login_id, full_name, birth_date")
                    .eq("id", user.id)
                    .single();

                if (profileData) {
                    setLoginId(profileData.login_id);
                    setName(profileData.full_name || "");
                    if (profileData.birth_date) {
                        const [y, m, d] = profileData.birth_date.split("-");
                        setBirthYear(y);
                        setBirthMonth(m);
                        setBirthDay(d);
                    }
                }

                // 메타데이터에서 상세 정보 가져오기
                const meta = user.user_metadata;
                if (meta) {
                    setName(meta.user_name || name); // DB 우선, 없으면 메타데이터
                    if (meta.is_solar !== undefined) setIsSolar(meta.is_solar);

                    const phone = meta.phone || "";
                    if (phone.includes("-")) {
                        const parts = phone.split("-");
                        setPhoneFirst(parts[0] || "010");
                        setPhoneMiddle(parts[1] || "");
                        setPhoneLast(parts[2] || "");
                    }

                    const fullAddress = meta.address || "";
                    // 주소 분리 로직 (간단하게 뒤에서부터 공백 기준으로 상세주소 분리 시도)
                    setAddress(fullAddress);

                    if (user.email) {
                        const emailParts = user.email.split("@");
                        setEmailId(emailParts[0] || "");
                        setEmailDomain(emailParts[1] || "");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isInitialized && isLoggedIn) {
            fetchUserData();
        }
    }, [isInitialized, isLoggedIn, user, supabase]);

    // 인증 확인
    useEffect(() => {
        if (isInitialized && !isLoggedIn && !alertShown.current) {
            alertShown.current = true;
            window.alert("로그인 후 이용 가능합니다.");
            router.push("/login");
        }
    }, [isInitialized, isLoggedIn, router]);

    const handleCompletePostcode = (data: any) => {
        let fullAddress = data.address;
        setZonecode(data.zonecode);
        setAddress(fullAddress);
        setIsPostcodeOpen(false);
    };

    // 2. 데이터 저장하기 (DB 업데이트)
    const handleSave = async () => {
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;

        if (password) {
            if (!pwRegex.test(password)) { alert("비밀번호는 영문과 숫자를 조합하여 6~12자리여야 합니다."); return; }
            if (password !== passwordConfirm) { alert("비밀번호가 일치하지 않습니다."); return; }
        }

        if (!name.trim()) { alert("이름을 입력해주세요."); return; }
        if (!phoneMiddle || !phoneLast) { alert("휴대폰 번호를 입력해주세요."); return; }

        setIsLoading(true);

        try {
            // Supabase Auth 메타데이터 업데이트
            const { error: authError } = await supabase.auth.updateUser({
                password: password || undefined,
                data: {
                    user_name: name,
                    phone: `${phoneFirst}-${phoneMiddle}-${phoneLast}`,
                    address: `${address} ${detailAddress}`,
                    birth_date: birthYear && birthMonth && birthDay ? `${birthYear}-${birthMonth}-${birthDay}` : null,
                    is_solar: isSolar,
                }
            });

            if (authError) throw authError;

            // profiles 테이블의 이름과 생년월일도 업데이트
            await supabase
                .from("profiles")
                .update({
                    full_name: name,
                    birth_date: birthYear && birthMonth && birthDay ? `${birthYear}-${birthMonth}-${birthDay}` : null,
                })
                .eq("id", user!.id);

            alert("회원정보수정이 성공적으로 완료되었습니다.");
            router.push("/");
        } catch (error: any) {
            alert(`수정 중 오류가 발생했습니다: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isInitialized || !isLoggedIn || isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-brand/40 font-medium">회원 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title={isLoggedIn ? "마이페이지" : "회원서비스"}
                subtitle="Member Service"
                description="아름다움을 향한 시작, 리브영클리닉의 회원 서비스를 이용하실 수 있습니다"
                bgImage="/images/covers/member_cover.webp"
                mobileBgImage="/images/cover_m/회원서비스/member_cover_m.webp"
            />

            <section className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden">
                <div className="mx-auto max-w-[1200px] px-5 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            PROFILE
                        </p>
                        <h2 className="text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            회원정보수정
                        </h2>
                    </div>

                    <div className="space-y-12">
                        <div className="border-t-2 border-[#a58b6e]">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center py-6 border-b border-brand/5 gap-2 md:gap-0">
                                <h3 className="text-[17px] font-bold text-brand whitespace-nowrap">기본정보입력</h3>
                                <p className="text-[12px] text-brand/30 font-medium">* 는 필수 입력사항으로 반드시 필요한 항목입니다.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">아이디 *</div>
                                <div className="px-6 py-4">
                                    <input
                                        type="text"
                                        value={loginId}
                                        readOnly
                                        className="w-full md:w-[450px] bg-brand/[0.02] border border-brand/10 px-4 py-3 text-[14px] outline-none text-brand/40 cursor-not-allowed"
                                    />
                                    <div className="w-full mt-2">
                                        <p className="text-[12px] text-brand/40">
                                            * 고객님의 아이디는 가입 후 수정이 불가능합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">비밀번호</div>
                                <div className="px-6 py-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full md:w-[450px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                        placeholder="비밀번호를 변경하려면 입력"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">비밀번호 확인</div>
                                <div className="px-6 py-4">
                                    <input
                                        type="password"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        className="w-full md:w-[450px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">이름 *</div>
                                <div className="px-6 py-4">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full md:w-[450px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">생년월일</div>
                                <div className="px-4 md:px-6 py-6 space-y-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <select
                                            value={birthYear}
                                            onChange={(e) => setBirthYear(e.target.value)}
                                            className="border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none w-full focus:border-brand transition-colors"
                                        >
                                            <option value="">::년::</option>
                                            {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={birthMonth}
                                            onChange={(e) => setBirthMonth(e.target.value)}
                                            className="border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none w-full focus:border-brand transition-colors"
                                        >
                                            <option value="">::월::</option>
                                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map(month => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={birthDay}
                                            onChange={(e) => setBirthDay(e.target.value)}
                                            className="border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none w-full focus:border-brand transition-colors"
                                        >
                                            <option value="">::일::</option>
                                            {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map(day => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-4 text-[14px] text-brand/60">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="calendar_type"
                                                checked={isSolar}
                                                onChange={() => setIsSolar(true)}
                                                className="w-4 h-4 accent-brand"
                                            /> 양력
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="calendar_type"
                                                checked={!isSolar}
                                                onChange={() => setIsSolar(false)}
                                                className="w-4 h-4 accent-brand"
                                            /> 음력
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">휴대폰 *</div>
                                <div className="px-4 md:px-6 py-6 flex gap-1 md:gap-2 items-center">
                                    <select
                                        value={phoneFirst}
                                        onChange={(e) => setPhoneFirst(e.target.value)}
                                        className="border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none flex-1 min-w-0 md:max-w-[150px] focus:border-brand transition-colors"
                                    >
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                    </select>
                                    <span className="text-brand/40">-</span>
                                    <input
                                        type="text"
                                        value={phoneMiddle}
                                        onChange={(e) => setPhoneMiddle(e.target.value)}
                                        className="flex-1 min-w-0 md:max-w-[150px] border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                    />
                                    <span className="text-brand/40">-</span>
                                    <input
                                        type="text"
                                        value={phoneLast}
                                        onChange={(e) => setPhoneLast(e.target.value)}
                                        className="flex-1 min-w-0 md:max-w-[150px] border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">이메일</div>
                                <div className="px-4 md:px-6 py-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <input
                                            type="text"
                                            value={emailId}
                                            readOnly
                                            className="flex-1 sm:w-[200px] bg-brand/[0.03] border border-brand/10 px-4 py-3 text-[14px] outline-none text-brand-muted cursor-not-allowed"
                                        />
                                        <span className="text-brand/20">@</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={emailDomain}
                                        readOnly
                                        className="w-full sm:w-[200px] bg-brand/[0.03] border border-brand/10 px-4 py-3 text-[14px] outline-none text-brand-muted cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand pt-8">주소</div>
                                <div className="px-4 md:px-6 py-6 space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={zonecode}
                                            className="w-[120px] bg-brand/[0.02] border border-brand/10 px-4 py-3 text-[14px] outline-none"
                                            readOnly
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsPostcodeOpen(true)}
                                            className="px-6 py-3 border border-brand/20 text-[13px] font-medium text-brand hover:bg-brand/[0.03] transition-colors"
                                        >
                                            우편번호 검색
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full border border-brand/10 px-4 py-3 text-[14px] outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={detailAddress}
                                        onChange={(e) => setDetailAddress(e.target.value)}
                                        placeholder="상세주소를 입력해주세요"
                                        className="w-full border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-center gap-2 max-w-[450px] mx-auto">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 py-4 border border-brand/10 text-brand font-bold transition-all hover:bg-brand/[0.02]"
                            >
                                수정취소
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-4 bg-brand text-white font-bold transition-all hover:opacity-90"
                            >
                                정보수정 완료
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {isPostcodeOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden relative">
                        <div className="p-4 border-b border-brand/5 flex justify-between items-center">
                            <h4 className="font-bold text-lg">우편번호 검색</h4>
                            <button onClick={() => setIsPostcodeOpen(false)} className="text-brand/40 hover:text-brand">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="h-[450px]">
                            <DaumPostcodeEmbed onComplete={handleCompletePostcode} style={{ height: "100%" }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
