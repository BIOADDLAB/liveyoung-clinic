"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import DaumPostcodeEmbed from "react-daum-postcode";
import { createClient } from "@/utils/supabase/client";

/**
 * 회원가입 단계 타입
 */
type SignupStep = "agreement" | "input" | "complete";

export default function SignupContent() {
    const router = useRouter();
    const [step, setStep] = useState<SignupStep>("agreement");
    const supabase = createClient();

    // 1단계: 약관 동의 상태
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    // 주소 관련 상태
    const [zonecode, setZonecode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    // 입력 필드 상태
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("2024");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [isSolar, setIsSolar] = useState(true);
    const [phoneFirst, setPhoneFirst] = useState("");
    const [phoneMiddle, setPhoneMiddle] = useState("");
    const [phoneLast, setPhoneLast] = useState("");
    const [emailId, setEmailId] = useState("");
    const [emailDomain, setEmailDomain] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");

    // 자동등록방지 코드 상태
    const [captchaCode, setCaptchaCode] = useState("");

    // 자동등록방지 코드 생성 함수
    const generateCaptcha = useCallback(() => {
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCaptchaCode(randomCode);
    }, []);

    // 초기 렌더링 시 캡차 코드 생성
    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    const handleAgreeAll = (checked: boolean) => {
        setAgreeAll(checked);
        setAgreeTerms(checked);
        setAgreePrivacy(checked);
    };

    const handleCompletePostcode = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setZonecode(data.zonecode);
        setAddress(fullAddress);
        setIsPostcodeOpen(false);
    };

    const nextStep = () => {
        if (step === "agreement") {
            if (!agreeTerms || !agreePrivacy) {
                alert("필수 약관에 모두 동의해주세요.");
                return;
            }
            setStep("input");
            window.scrollTo(0, 0);
        } else if (step === "input") {
            // 정규표현식 정의
            const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{3,12}$/; // 영문, 숫자 포함 3~12자
            const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/; // 영문, 숫자 포함 6~12자

            // 필수 필드 유효성 검사
            if (!id.trim()) { alert("아이디를 입력해주세요."); return; }
            if (!idRegex.test(id)) { alert("아이디는 영문과 숫자를 조합하여 3~12자 사이여야 합니다."); return; }

            if (!password) { alert("비밀번호를 입력해주세요."); return; }
            if (!pwRegex.test(password)) { alert("비밀번호는 영문과 숫자를 조합하여 6~12자리여야 합니다."); return; }
            if (password !== passwordConfirm) { alert("비밀번호가 일치하지 않습니다."); return; }

            if (!name.trim()) { alert("이름을 입력해주세요."); return; }

            if (!phoneFirst || !phoneMiddle || !phoneLast) { alert("휴대폰 번호를 모두 입력해주세요."); return; }

            const finalEmailDomain = emailInput || emailDomain;
            if (!emailId || !finalEmailDomain) { alert("이메일을 입력해주세요."); return; }

            // 캡차 검증
            if (!captchaInput) { alert("자동등록방지 코드를 입력해주세요."); return; }
            if (captchaInput !== captchaCode) {
                alert("자동등록방지 숫자가 일치하지 않습니다. 다시 확인해주세요.");
                generateCaptcha();
                setCaptchaInput("");
                return;
            }

            // Supabase 회원가입 진행
            const performSignup = async () => {
                const searchId = id.trim().toLowerCase();

                // 1. 아이디 중복 체크 및 admin 방지
                if (searchId === "admin") {
                    alert("사용할 수 없는 아이디입니다.");
                    return;
                }

                const { data: existingUser, error: checkError } = await supabase
                    .from("profiles")
                    .select("login_id")
                    .eq("login_id", searchId)
                    .maybeSingle();

                if (checkError) {
                    alert(`아이디 중복 확인 중 오류가 발생했습니다: ${checkError.message}`);
                    return;
                }

                if (existingUser) {
                    alert("이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
                    return;
                }

                const finalEmailDomain = emailInput || emailDomain;
                const fullEmail = `${emailId}@${finalEmailDomain}`;

                const { data, error } = await supabase.auth.signUp({
                    email: fullEmail,
                    password: password,
                    options: {
                        data: {
                            user_name: name,
                            phone: `${phoneFirst}-${phoneMiddle}-${phoneLast}`,
                            address: `${address} ${detailAddress}`,
                            birth_date: birthYear && birthMonth && birthDay ? `${birthYear}-${birthMonth}-${birthDay}` : null,
                            is_solar: isSolar,
                        }
                    }
                });

                if (error) {
                    alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
                    return;
                }

                if (data.user) {
                    // 2. profiles 테이블에 ID 매핑 정보 저장 (소문자로 정규화)
                    const { error: profileError } = await supabase
                        .from("profiles")
                        .insert([
                            {
                                id: data.user.id,
                                login_id: id.trim().toLowerCase(),
                                email: fullEmail.trim().toLowerCase(),
                                full_name: name.trim(), // 이름 추가 저장
                                birth_date: birthYear && birthMonth && birthDay ? `${birthYear}-${birthMonth}-${birthDay}` : null,
                            }
                        ]);

                    if (profileError) {
                        alert(`프로필 생성 오류: ${profileError.message}`);
                        return;
                    }
                }

                // 3. 자동 로그인 방지 및 로그아웃 처리
                await supabase.auth.signOut();

                // 모든 검사 통과 시 완료 단계로 이동
                setStep("complete");
                window.scrollTo(0, 0);
            };

            performSignup();
        }
    };

    return (
        <>
            {/* 상단 히어로 섹션 (로그인과 동일한 이미지 적용) */}
            <PageHeader
                title="회원서비스"
                subtitle="Member Service"
                description="아름다움을 향한 시작, 리브영클리닉의 회원 서비스를 이용하실 수 있습니다"
                bgImage="/images/covers/member_cover.webp"
                mobileBgImage="/images/cover_m/회원서비스/member_cover_m.webp"
            />

            <section className="py-24 md:py-32 bg-[#F2F1ED] relative overflow-hidden">
                <div className="mx-auto max-w-[1200px] px-5 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            JOIN US
                        </p>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            회원가입
                        </h2>
                    </div>

                    {/* 단계 표시 인디케이터 */}
                    <div className="mt-16 flex items-center justify-center gap-2 md:gap-8 mb-16">
                        {[
                            { id: "agreement", label: "회원구분" },
                            { id: "agreement", label: "약관동의" },
                            { id: "input", label: "정보입력" },
                            { id: "complete", label: "가입완료" },
                        ].map((s, idx) => (
                            <div key={`${s.id}-${idx}`} className="flex items-center">
                                <span className={`text-[12px] min-[375px]:text-[12px] md:text-[14px] font-medium tracking-tight whitespace-nowrap ${step === s.id ? "text-brand font-bold" : "text-brand/20"}`}>
                                    {idx + 1 >= 10 ? idx + 1 : `0${idx + 1}`} {s.label}
                                </span>
                                {idx < 3 && (
                                    <span className="ml-2 md:ml-8 text-brand/10">
                                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {step === "agreement" && (
                        <div className="space-y-10">
                            {/* 전체동의 */}
                            <div className="p-6 bg-brand/[0.03] border border-brand/5 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="agreeAll"
                                    checked={agreeAll}
                                    onChange={(e) => handleAgreeAll(e.target.checked)}
                                    className="w-5 h-5 accent-brand cursor-pointer"
                                />
                                <label htmlFor="agreeAll" className="text-[15px] font-bold text-brand cursor-pointer">
                                    모든 약관을 확인하고 전체 동의합니다.
                                </label>
                            </div>

                            {/* 이용약관 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="agreeTerms"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="w-4 h-4 accent-brand cursor-pointer"
                                    />
                                    <label htmlFor="agreeTerms" className="text-[14px] font-semibold text-brand-light cursor-pointer">
                                        (필수) 이용약관
                                    </label>
                                </div>
                                <div className="h-40 overflow-y-auto border border-brand/10 p-4 text-[13px] leading-relaxed text-brand-muted bg-brand/[0.02] whitespace-pre-wrap">
                                    {`제 1조 (목적)
이 약관은 리브영의원(이하 "병원"이라 합니다)이 운영하는 인터넷 홈페이지 서비스(이하 "서비스"라 합니다)의 이용조건 및 절차, 병원과 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제 2조 (약관의 효력과 개정)
1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공시함으로써 효력을 발생합니다.
2. 병원은 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있으며, 개정된 약관은 제1항과 같은 방법으로 공지함으로써 효력을 발생합니다.
3. 회원은 개정된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 개정된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.

제 3조 (약관 외 준칙)
이 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.

제 4조 (용어의 정의)
1. 회원: 서비스에 개인정보를 제공하여 회원 등록을 한 자로서, 서비스의 정보를 지속적으로 제공받으며 이용할 수 있는 자를 말합니다.
2. 이용자: 본 약관에 따라 병원이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
3. 아이디(ID): 회원 식별과 서비스 이용을 위하여 회원이 선정하고 병원이 승인하는 문자와 숫자의 조합을 말합니다.
4. 비밀번호: 회원이 통신상의 자신의 비밀을 보호하기 위해 선정한 문자와 숫자의 조합을 말합니다.
5. 해지: 병원 또는 회원이 서비스 이용 계약을 종료시키는 의사표시를 말합니다.

제 5조 (서비스의 제공 및 변경)
1. 병원이 제공하는 서비스는 병원 홍보, 시술 정보 안내, 각종 건강 정보 제공, 상담 및 회원 서비스 등을 포함합니다.
2. 병원은 필요한 경우 서비스의 내용을 추가 또는 변경하여 제공할 수 있습니다.

제 6조 (서비스의 중단)
1. 병원은 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
2. 제1항에 의한 서비스 중단의 경우 병원은 공지사항 등을 통해 이용자에게 통지합니다.

제 7조 (회원가입)
1. 이용자는 병원이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
2. 이용자는 반드시 실명으로 가입하여야 하며, 타인의 정보를 도용할 경우 관계 법령에 따라 처벌받을 수 있습니다.

제 8조 (회원 탈퇴 및 자격 상실)
1. 회원은 언제든지 탈퇴를 요청할 수 있으며, 병원은 즉시 이를 처리합니다.
2. 회원이 다음 각 호의 사유에 해당하는 경우, 병원은 회원자격을 제한 및 정지시킬 수 있습니다.
   1) 가입 신청 시 허위 내용을 등록한 경우
   2) 타인의 서비스 이용을 방해하거나 정보를 도용하는 경우
   3) 서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 하는 경우

제 9조 (병원의 의무)
1. 병원은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.
2. 병원은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보 보호를 위한 보안 시스템을 갖추어야 합니다.

제 10조 (회원의 의무)
1. 회원은 자신의 ID 및 비밀번호를 관리할 책임이 있으며, 이를 제3자가 이용하게 해서는 안 됩니다.
2. 회원은 관계 법령, 본 약관의 규정, 이용안내 및 주의사항을 준수하여야 합니다.
3. 회원은 병원의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없습니다.

제 11조 (저작권의 귀속 및 이용제한)
1. 병원이 작성한 저작물에 대한 저작권 및 기타 지적재산권은 병원에 귀속합니다.
2. 이용자는 서비스를 이용함으로써 얻은 정보를 병원의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 해서는 안 됩니다.

제 12조 (분쟁 해결)
1. 병원과 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위해 필요한 모든 노력을 하여야 합니다.
2. 발생한 분쟁에 대해 소송이 제기될 경우 병원 소재지 관할 법원을 관할 법원으로 합니다.

부칙
이 약관은 2026년 4월 16일부터 시행합니다.`}
                                </div>
                            </div>

                            {/* 개인정보 처리방침 */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="agreePrivacy"
                                        checked={agreePrivacy}
                                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                                        className="w-4 h-4 accent-brand cursor-pointer"
                                    />
                                    <label htmlFor="agreePrivacy" className="text-[14px] font-semibold text-brand-light cursor-pointer">
                                        (필수) 개인정보 수집 및 이용
                                    </label>
                                </div>
                                <div className="h-40 overflow-y-auto border border-brand/10 p-4 text-[13px] leading-relaxed text-brand-muted bg-brand/[0.02] whitespace-pre-wrap">
                                    {`리브영의원은 귀하의 개인정보를 소중하게 취급하며, 『개인정보 보호법』 및 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』을 준수하고 있습니다.

■ 1. 수집하는 개인정보 항목
의원은 회원가입, 원활한 고객 상담, 각종 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.
- 수집항목: 이름, 로그인ID, 비밀번호, 생년월일, 휴대전화번호, 이메일, 주소(우편번호 포함)
- 수집방법: 홈페이지 회원가입 및 상담 신청 양식

■ 2. 개인정보의 수집 및 이용목적
수집한 개인정보는 다음의 목적을 위해 활용됩니다.
- 회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 민원 처리, 고지사항 전달
- 서비스 제공: 진료 예약 및 상담 서비스 제공, 시술 정보 안내, 콘텐츠 제공, 맞춤형 의료 서비스 구성
- 마케팅 및 광고에 활용: 신규 서비스 및 이벤트 정보 안내 (별도 마케팅 동의 시)

■ 3. 개인정보의 보유 및 이용기간
의원은 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 일정 기간 보관합니다.
- 보존 항목: 이름, 로그인ID, 연락처 등 가입 정보
- 보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률 (계약 또는 청약철회 등에 관한 기록: 5년)
- 기타 의료법 등 관련 법령에서 정한 진료기록부 보존 연한 준수

■ 4. 개인정보의 파기절차 및 방법
의원은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
- 파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 사유에 따라 일정 기간 저장된 후 파기됩니다. 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되는 목적 이외의 다른 용도로 이용되지 않습니다.
- 파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통해 파기합니다.

※ 귀하는 개인정보 수집 및 이용에 거부할 권리가 있습니다. 다만, 필수 항목 수집에 거부하실 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.`}
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="mt-16 flex gap-3">
                                <button
                                    onClick={() => router.back()}
                                    className="flex-1 py-5 border border-brand/10 text-brand-muted font-bold transition-all hover:bg-brand/[0.02]"
                                >
                                    가입취소
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="flex-1 py-5 bg-brand text-white font-bold transition-all hover:opacity-90"
                                >
                                    다음단계
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "input" && (
                        <div className="space-y-12">
                            <div className="border-t-2 border-[#a58b6e]">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center py-6 border-b border-brand/5 gap-2 md:gap-0">
                                    <h3 className="text-[17px] font-bold text-brand whitespace-nowrap">기본정보입력</h3>
                                    <p className="text-[12px] text-brand/40 font-medium">* 는 필수 입력사항으로 회원가입시 반드시 필요한 항목입니다.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                    <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">아이디 *</div>
                                    <div className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                            className="w-full md:w-[450px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                            placeholder="영문+숫자조합으로 3~12자. 가입후 ID 변경 불가"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                    <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">비밀번호 *</div>
                                    <div className="px-6 py-4">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full md:w-[450px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                            placeholder="영문+숫자조합으로 6~12자리"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                    <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">비밀번호 확인 *</div>
                                    <div className="px-6 py-4">
                                        <input
                                            type="password"
                                            value={passwordConfirm}
                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                            className="w-full md:w-[450px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand"
                                            placeholder="영문+숫자조합으로 6~12자리"
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
                                    <div className="px-6 py-6 space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <select
                                                value={birthYear}
                                                onChange={(e) => setBirthYear(e.target.value)}
                                                className="border border-brand/10 px-2 py-3 text-[14px] outline-none w-full focus:border-brand transition-colors"
                                            >
                                                <option value="">::년::</option>
                                                {Array.from({ length: 100 }, (_, i) => 2024 - i).map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={birthMonth}
                                                onChange={(e) => setBirthMonth(e.target.value)}
                                                className="border border-brand/10 px-2 py-3 text-[14px] outline-none w-full focus:border-brand transition-colors"
                                            >
                                                <option value="">::월::</option>
                                                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={birthDay}
                                                onChange={(e) => setBirthDay(e.target.value)}
                                                className="border border-brand/10 px-2 py-3 text-[14px] outline-none w-full focus:border-brand transition-colors"
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
                                            <option value="">::번호::</option>
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="018">018</option>
                                            <option value="019">019</option>
                                        </select>
                                        <span className="text-brand/20">-</span>
                                        <input
                                            type="text"
                                            value={phoneMiddle}
                                            onChange={(e) => setPhoneMiddle(e.target.value)}
                                            className="flex-1 min-w-0 md:max-w-[150px] border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                        />
                                        <span className="text-brand/20">-</span>
                                        <input
                                            type="text"
                                            value={phoneLast}
                                            onChange={(e) => setPhoneLast(e.target.value)}
                                            className="flex-1 min-w-0 md:max-w-[150px] border border-brand/10 px-2 md:px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                    <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">이메일 *</div>
                                    <div className="px-4 md:px-6 py-6 space-y-4">
                                        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={emailId}
                                                    onChange={(e) => setEmailId(e.target.value)}
                                                    className="flex-1 md:w-[150px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                                />
                                                <span className="text-brand/20">@</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <input
                                                    type="text"
                                                    value={emailInput || emailDomain}
                                                    onChange={(e) => setEmailInput(e.target.value)}
                                                    className="w-full sm:w-[150px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                                    readOnly={!!emailDomain && emailDomain !== ""}
                                                />
                                                <select
                                                    value={emailDomain}
                                                    onChange={(e) => {
                                                        setEmailDomain(e.target.value);
                                                        setEmailInput("");
                                                    }}
                                                    className="w-full sm:w-[150px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                                >
                                                    <option value="">::직접입력::</option>
                                                    <option value="naver.com">naver.com</option>
                                                    <option value="gmail.com">gmail.com</option>
                                                    <option value="daum.net">daum.net</option>
                                                    <option value="hanmail.net">hanmail.net</option>
                                                    <option value="nate.com">nate.com</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-[13px] text-brand/60">
                                            <span>이메일을 받으시겠습니까?</span>
                                            <div className="flex gap-3">
                                                <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="email_opt" className="w-4 h-4 accent-brand" /> 예</label>
                                                <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="email_opt" className="w-4 h-4 accent-brand" /> 아니오</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                    <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand pt-8">주소</div>
                                    <div className="px-6 py-4 space-y-2">
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
                                            className="w-full border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                            readOnly
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

                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5 items-center">
                                    <div className="bg-brand/[0.03] px-6 py-6 font-bold text-[14px] text-brand">자동등록방지 *</div>
                                    <div className="px-6 py-4 flex flex-wrap gap-4 items-center">
                                        <div className="relative group cursor-pointer" onClick={generateCaptcha}>
                                            <div className="bg-brand text-white px-6 py-3 font-display tracking-[4px] text-xl italic select-none relative overflow-hidden h-[50px] flex items-center justify-center min-w-[120px]">
                                                {captchaCode}
                                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, white 2px, white 4px)' }}></div>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                            className="w-[300px] border border-brand/10 px-4 py-3 text-[14px] outline-none focus:border-brand transition-colors"
                                        />
                                        <div className="w-full mt-2">
                                            <p className="text-[12px] text-brand/40">
                                                * 왼쪽의 자동등록방지 코드를 입력하세요.
                                                <button onClick={generateCaptcha} className="ml-2 text-brand-muted underline hover:text-brand font-medium">[새로고침]</button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="mt-16 flex justify-center gap-1 max-w-[450px] mx-auto">
                                <button
                                    onClick={() => router.back()}
                                    className="flex-1 py-5 border border-brand/10 text-brand font-medium transition-all hover:bg-brand/[0.02]"
                                >
                                    가입취소
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="flex-1 py-5 bg-brand text-white font-bold transition-all hover:opacity-90"
                                >
                                    가입하기
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "complete" && (
                        <div className="py-20 text-center space-y-8">
                            <div className="w-20 h-20 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-10">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="text-[28px] md:text-[36px] font-bold text-brand">회원가입이 완료되었습니다!</h3>
                            <p className="text-[16px] md:text-[18px] text-brand-muted leading-relaxed font-medium">
                                리브영클리닉의 회원이 되신 것을 진심으로 환영합니다.<br />
                                이제 로그인하여 다양한 서비스를 이용하실 수 있습니다.
                            </p>
                            <div className="pt-10">
                                <Link
                                    href="/login"
                                    className="inline-block px-12 py-5 bg-brand text-white font-bold transition-all hover:opacity-90"
                                >
                                    로그인하러 가기
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 우편번호 검색 팝업 모달 */}
            {isPostcodeOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden relative">
                        <div className="p-4 border-b border-brand/5 flex justify-between items-center bg-white">
                            <h4 className="font-bold text-lg">우편번호 검색</h4>
                            <button
                                onClick={() => setIsPostcodeOpen(false)}
                                className="text-brand/40 hover:text-brand"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="h-[450px]">
                            <DaumPostcodeEmbed
                                onComplete={handleCompletePostcode}
                                style={{ height: "100%" }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
