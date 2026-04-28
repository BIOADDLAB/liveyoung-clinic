"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import PageHeader from "@/components/layout/PageHeader";
import { CLINIC_INFO } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";

/**
 * 상담문의 페이지 콘텐츠
 */
export default function ContactContent() {
    const supabase = createClient();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        treatment: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
        privacyAccepted: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.privacyAccepted) {
            alert("개인정보 활용동의에 체크해 주세요.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from("inquiries")
                .insert([
                    {
                        name: formData.name,
                        phone: formData.phone,
                        treatment: formData.treatment,
                        preferred_date: `${formData.preferredDate} ${formData.preferredTime}`.trim(),
                        content: formData.message,
                        status: "pending"
                    },
                ]);

            if (error) throw error;
            setIsSubmitted(true);
        } catch (error) {
            console.error("Inquiry submission error:", error);
            alert("상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const treatmentOptions = [
        "얼굴/바디 컨투어링 (써마지, 포텐자, 레프톤)",
        "스킨부스터 (쥬베룩, 리쥬란, 스킨바이브)",
        "리프팅 (울쎄라, 리니어지)",
        "미백/모공/흉터 (피코 토닝, 프락셀)",
        "줄기세포 (손상 피부 재생, 근본 케어)",
        "기타 / 잘 모르겠어요",
    ];

    const timeOptions = [
        "오전 10:00", "오전 11:00", "오후 12:00",
        "오후 02:00", "오후 03:00", "오후 04:00", "오후 05:00", "오후 06:00"
    ];

    return (
        <>
            {/* 히어로 */}
            < PageHeader
                title="상담문의"
                subtitle="CONSULTATION"
                description="당신만을 위한 맞춤형 아름다움을 위해 세심하게 상담해 드립니다"
                bgImage="/images/covers/contact_cover.jpg"
                mobileBgImage="/images/covers/contact_cover.jpg"
            />

            {/* 문의 폼 + 연락처 */}
            <section className="py-[60px] md:py-[120px] bg-[#F2F1ED] text-brand">
                <div className="mx-auto max-w-[1240px] px-5">
                    <div className="text-center mb-16 md:mb-24">
                        <p className="text-[14px] font-black gold-gradient-text uppercase tracking-[0.1em] mb-2">
                            CONSULTATION
                        </p>
                        <h2 className="korean-serif-title text-[34px] md:text-[46px] font-bold text-brand tracking-[-0.04em] leading-[1.1]">
                            상담 신청하기
                        </h2>
                        <p className="mx-auto mt-6 max-w-[600px] text-[16px] md:text-[18px] font-normal leading-relaxed text-brand-muted tracking-[-0.026em]">
                            궁금하신 점을 남겨주시면 정성을 다해 답변해 <br className="md:hidden" />드리겠습니다.
                        </p>
                    </div>
                    <div className="text-right mb-4 text-[13px] text-brand/40">
                        <span className="text-brand font-bold">*</span> 표시는 필수입력사항 입니다.
                    </div>

                    <div className="border-t-2 border-brand">
                        {isSubmitted ? (
                            <div className="py-24 text-center">
                                <p className="text-5xl mb-6">✅</p>
                                <h3 className="text-2xl font-bold mb-4">상담 신청이 완료되었습니다.</h3>
                                <p className="text-brand-muted mb-8">영업시간 내에 확인 후 신속하게 연락드리겠습니다.</p>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({ name: "", phone: "", treatment: "", preferredDate: "", preferredTime: "", message: "", privacyAccepted: false });
                                    }}
                                    className="px-10 py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-all"
                                >
                                    추가 문의하기
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* 이름 */}
                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                    <div className="bg-surface-cool px-6 py-6 flex items-center font-bold text-[15px] text-brand border-r border-brand/10 h-full">
                                        이름 <span className="text-brand ml-1">*</span>
                                    </div>
                                    <div className="px-6 py-4 flex items-center">
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full md:max-w-[400px] h-[50px] border border-brand/10 px-4 outline-none focus:border-brand"
                                            placeholder="이름을 입력해 주세요"
                                        />
                                    </div>
                                </div>

                                {/* 연락처 */}
                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                    <div className="bg-surface-cool px-6 py-6 flex items-center font-bold text-[15px] text-brand border-r border-brand/10 h-full">
                                        연락처 <span className="text-brand ml-1">*</span>
                                    </div>
                                    <div className="px-6 py-4 flex items-center">
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full md:max-w-[400px] h-[50px] border border-brand/10 px-4 outline-none focus:border-brand"
                                            placeholder="010-0000-0000"
                                        />
                                    </div>
                                </div>

                                {/* 상담분류 */}
                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                    <div className="bg-surface-cool px-6 py-6 flex items-center font-bold text-[15px] text-brand border-r border-brand/10 h-full">
                                        상담분류 <span className="text-brand ml-1">*</span>
                                    </div>
                                    <div className="px-6 py-4 flex items-center">
                                        <select
                                            required
                                            value={formData.treatment}
                                            onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                                            className="w-full md:max-w-[400px] h-[50px] border border-brand/10 px-4 outline-none focus:border-brand"
                                        >
                                            <option value="">시술 항목 선택</option>
                                            {treatmentOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* 상담희망날짜 */}
                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                    <div className="bg-surface-cool px-6 py-6 flex items-center font-bold text-[15px] text-brand border-r border-brand/10 h-full">
                                        상담희망일시 <span className="text-brand ml-1">*</span>
                                    </div>
                                    <div className="px-6 py-4 space-y-3">
                                        <div className="flex flex-wrap gap-3">
                                            <input
                                                type="date"
                                                required
                                                value={formData.preferredDate}
                                                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                                className="h-[50px] border border-brand/10 px-4 outline-none focus:border-brand min-w-[200px]"
                                            />
                                            <select
                                                required
                                                value={formData.preferredTime}
                                                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                                className="h-[50px] border border-brand/10 px-4 outline-none focus:border-brand min-w-[150px]"
                                            >
                                                <option value="">시간 선택</option>
                                                {timeOptions.map((time) => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="text-[12px] text-brand/30 font-medium">* 실제 확정 예약은 상담을 통해 결정됩니다.</p>
                                    </div>
                                </div>

                                {/* 상담내용 */}
                                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b border-brand/5">
                                    <div className="bg-surface-cool px-6 py-6 flex items-center font-bold text-[15px] text-brand border-r border-brand/10 h-full">
                                        상담내용 <span className="text-brand ml-1">*</span>
                                    </div>
                                    <div className="px-6 py-6">
                                        <textarea
                                            rows={8}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full resize-none border border-brand/10 p-6 outline-none focus:border-brand"
                                            placeholder="문의하실 내용을 자유롭게 입력해 주세요."
                                        />
                                    </div>
                                </div>

                                {/* 개인정보동의 */}
                                <div className="mt-12">
                                    <div className="bg-brand/[0.03] p-6 text-center border border-brand/5">
                                        <label className="flex items-center justify-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={formData.privacyAccepted}
                                                onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                                                className="w-5 h-5 accent-brand cursor-pointer"
                                            />
                                            <span className="text-[14px] font-bold text-brand-muted">상담문의를 위한 개인정보 활용을 동의합니다.</span>
                                            <button
                                                type="button"
                                                onClick={() => setShowPrivacyDetail(!showPrivacyDetail)}
                                                className="text-[14px] text-brand/30 underline underline-offset-4 ml-2 hover:text-brand"
                                            >
                                                {showPrivacyDetail ? "자세히보기 닫기" : "자세히보기"}
                                            </button>
                                        </label>
                                    </div>

                                    {showPrivacyDetail && (
                                        <div className="mt-4 p-8 border border-brand/5 text-[13px] leading-relaxed text-brand-muted max-h-[200px] overflow-y-auto bg-brand/[0.02] whitespace-pre-wrap">
                                            {`■ 수집하는 개인정보 항목

회사는 상담 신청을 위해 아래와 같은 개인정보를 수집하고 있습니다.

◇ 수집항목 : 이름, 연락처, 상담분류, 상담희망일시, 상담내용
◇ 개인정보 수집방법 : 홈페이지(상담신청)

■ 개인정보의 수집 및 이용목적
회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.

◇ 상담 및 예약 서비스 제공, 본인 확인, 안내 고지 사항 전달

■ 개인정보의 보유 및 이용기간
원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 일정한 기간 동안 회원정보를 보관합니다.
- 보존 항목 : 이름, 연락처 상담분류, 상담내용
- 보존 근거 : 서비스 이용의 혼선 방지
- 보존 기간 : 5년 상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.

- 계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)
- 대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)
- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법률)
- 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년 (신용정보의 이용 및 보호에 관한 법률)`}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-16 flex justify-center pb-20">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative flex items-center justify-center h-[70px] px-20 border border-brand rounded-full text-brand font-bold text-[18px] hover:bg-brand hover:text-white transition-all overflow-hidden"
                                    >
                                        <span className="relative z-10">{isSubmitting ? "전송 중..." : "상담 신청하기"}</span>
                                        <span className="ml-3 text-[24px] group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
