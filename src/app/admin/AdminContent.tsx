"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

/**
 * 통합 관리자 대시보드
 * 구성: 팝업 관리, 전후사진 관리, 상담 현황 탭
 */

type AdminTab = "popups" | "gallery" | "inquiries";

interface PopupItem {
    id: number;
    title: string;
    image_url: string;
    link_url: string | null;
    is_active: boolean;
    created_at: string;
}

interface GalleryItem {
    id: number;
    category: string;
    treatment: string;
    description: string;
    before_image_url: string;
    after_image_url: string;
    created_at: string;
}

interface InquiryItem {
    id: number;
    name: string;
    phone: string;
    treatment: string;
    preferred_date: string | null;
    content: string;
    status: "pending" | "completed";
    created_at: string;
}

export default function AdminContent() {
    const { isLoggedIn, isAdmin, logout, isInitialized, userRole } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const [activeTab, setActiveTab] = useState<AdminTab>("popups");
    const [loading, setLoading] = useState(true);

    // 데이터 상태
    const [popups, setPopups] = useState<PopupItem[]>([]);
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [inquiries, setInquiries] = useState<InquiryItem[]>([]);

    // 편집 모달 상태
    const [editingPopup, setEditingPopup] = useState<Partial<PopupItem> | null>(null);
    const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (isInitialized && userRole !== "admin") {
            router.push("/login");
        }
    }, [isInitialized, userRole, router]);

    useEffect(() => {
        if (isLoggedIn && userRole === "admin") {
            fetchData();
        }
    }, [isLoggedIn, userRole, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "popups") {
                const { data } = await supabase.from("popups").select("*").order("created_at", { ascending: false });
                setPopups(data || []);
            } else if (activeTab === "gallery") {
                const { data } = await supabase.from("galleries").select("*").order("created_at", { ascending: false });
                setGalleries(data || []);
            } else if (activeTab === "inquiries") {
                const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
                setInquiries(data || []);
            }
        } catch (error) {
            console.error("Data fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // 이미지 업로드 로직
    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('admin-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('admin-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            alert("이미지 업로드 실패!");
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    // 팝업 저장
    const savePopup = async () => {
        if (!editingPopup?.title || !editingPopup?.image_url) {
            alert("제목과 이미지를 모두 입력해 주세요.");
            return;
        }

        const payload = {
            title: editingPopup.title,
            image_url: editingPopup.image_url,
            link_url: editingPopup.link_url || null,
            is_active: editingPopup.is_active ?? true
        };

        try {
            const { error } = editingPopup.id
                ? await supabase.from("popups").update(payload).eq("id", editingPopup.id)
                : await supabase.from("popups").insert([payload]);
            if (error) throw error;
            setEditingPopup(null);
            fetchData();
        } catch {
            alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    // 갤러리 저장
    const saveGallery = async () => {
        if (!editingGallery?.treatment || !editingGallery?.before_image_url || !editingGallery?.after_image_url) {
            alert("시술명과 Before/After 이미지를 모두 등록해 주세요.");
            return;
        }

        const payload = {
            category: editingGallery.category || "얼굴/바디 컨투어링",
            treatment: editingGallery.treatment,
            description: editingGallery.description || "",
            before_image_url: editingGallery.before_image_url,
            after_image_url: editingGallery.after_image_url
        };

        try {
            const { error } = editingGallery.id
                ? await supabase.from("galleries").update(payload).eq("id", editingGallery.id)
                : await supabase.from("galleries").insert([payload]);
            if (error) throw error;
            setEditingGallery(null);
            fetchData();
        } catch {
            alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const deleteItem = async (table: string, id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            const { error } = await supabase.from(table).delete().eq("id", id);
            if (error) throw error;
            fetchData();
        } catch {
            alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const toggleStatus = async (table: string, id: number, current: boolean) => {
        try {
            const { error } = await supabase.from(table).update({ is_active: !current }).eq("id", id);
            if (error) throw error;
            fetchData();
        } catch {
            alert("상태 변경 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const updateInquiryStatus = async (id: number, status: string) => {
        try {
            const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
            if (error) throw error;
            fetchData();
        } catch {
            alert("상태 변경 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    if (!isInitialized || userRole !== "admin") {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-brand/40">인증 확인 중...</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-surface px-5 py-20">
            <div className="mx-auto max-w-[1200px]">
                {/* 상단 바 */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-brand">관리자 대시보드</h1>
                    </div>
                    <button
                        onClick={logout}
                        className="rounded-full border border-brand/10 bg-white px-6 py-2.5 text-sm font-medium transition-all hover:bg-brand/[0.02] text-brand"
                    >
                        로그아웃
                    </button>
                </div>

                {/* 탭 네비게이션 */}
                <div className="mb-8 flex gap-2 border-b border-brand/10">
                    {[
                        { id: "popups", label: "팝업 공지" },
                        { id: "gallery", label: "전후 사진 갤러리" },
                        { id: "inquiries", label: "상담 신청 내역" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as AdminTab)}
                            className={`px-6 py-3 text-sm font-bold transition-all ${activeTab === tab.id
                                ? "border-b-2 border-brand text-brand"
                                : "text-brand/40 hover:text-brand"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 탭 콘텐츠 영역 */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex h-40 items-center justify-center">
                            <p className="text-brand/40">데이터를 불러오는 중...</p>
                        </div>
                    ) : (
                        <>
                            {activeTab === "popups" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold">팝업 목록</h2>
                                        <button
                                            onClick={() => setEditingPopup({ title: "", image_url: "", is_active: true })}
                                            className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/20"
                                        >
                                            + 새 팝업 등록
                                        </button>
                                    </div>
                                    <div className="grid gap-4">
                                        {popups.map(p => (
                                            <div key={p.id} className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 rounded-2xl border border-brand/5 bg-white p-6 shadow-sm">
                                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-brand/[0.03]">
                                                    <img src={p.image_url} className="h-full w-full object-cover" alt="" />
                                                </div>
                                                <div className="flex-1 text-center sm:text-left">
                                                    <div className="mb-1 flex items-center justify-center sm:justify-start gap-2">
                                                        <span className={`h-2 w-2 rounded-full ${p.is_active ? "bg-accent" : "bg-brand/20"}`} />
                                                        <h3 className="text-lg font-bold text-brand">{p.title}</h3>
                                                    </div>
                                                    <p className="text-sm text-brand/40 break-all">{p.link_url || '링크 없음'}</p>
                                                </div>
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <button
                                                        onClick={() => toggleStatus("popups", p.id, p.is_active)}
                                                        className="flex-1 sm:flex-none rounded-lg border px-4 py-2 text-xs font-bold hover:bg-brand/[0.02] transition-all"
                                                    >
                                                        {p.is_active ? "숨기기" : "보이기"}
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingPopup(p)}
                                                        className="flex-1 sm:flex-none rounded-lg bg-brand/[0.03] px-4 py-2 text-xs font-bold text-brand-muted hover:bg-brand/[0.06] transition-all"
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        onClick={() => deleteItem("popups", p.id)}
                                                        className="flex-1 sm:flex-none rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-100 transition-all"
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {popups.length === 0 && <p className="py-20 text-center text-brand/40">등록된 팝업이 없습니다.</p>}
                                    </div>
                                </div>
                            )}

                            {activeTab === "gallery" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold">전후 사진 갤러리</h2>
                                        <button
                                            onClick={() => setEditingGallery({ category: "얼굴/바디 컨투어링", treatment: "", description: "" })}
                                            className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/20"
                                        >
                                            + 새 갤러리 등록
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {galleries.map(g => (
                                            <div key={g.id} className="overflow-hidden rounded-2xl border border-brand/5 bg-white shadow-sm">
                                                <div className="grid aspect-[4/3] grid-cols-2">
                                                    <img src={g.before_image_url} loading="lazy" className="h-full w-full border-r border-brand/[0.03] object-cover" alt="Before" />
                                                    <img src={g.after_image_url} loading="lazy" className="h-full w-full object-cover" alt="After" />
                                                </div>
                                                <div className="p-5">
                                                    <span className="text-xs font-bold text-brand">{g.category}</span>
                                                    <h3 className="mt-1 text-lg font-bold text-brand">{g.treatment}</h3>
                                                    <p className="mt-2 line-clamp-2 text-sm text-brand-muted">{g.description}</p>
                                                    <div className="mt-5 flex gap-2">
                                                        <button
                                                            onClick={() => setEditingGallery(g)}
                                                            className="flex-1 rounded-lg bg-brand/[0.05] py-2.5 text-xs font-bold text-brand/60 hover:bg-brand/10 transition-all"
                                                        >
                                                            수정
                                                        </button>
                                                        <button
                                                            onClick={() => deleteItem("galleries", g.id)}
                                                            className="flex-1 rounded-lg bg-red-50 py-2.5 text-xs font-bold text-red-500 hover:bg-red-100 transition-all"
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {galleries.length === 0 && <p className="col-span-full py-20 text-center text-brand/40">등록된 갤러리가 없습니다.</p>}
                                    </div>
                                </div>
                            )}

                            {activeTab === "inquiries" && (
                                <div className="space-y-4">
                                    {/* 모바일: 데스크톱 테이블과 동일한 디자인의 카드 */}
                                    <div className="grid grid-cols-1 gap-4 md:hidden">
                                        {inquiries.map(i => (
                                            <div key={i.id} className="overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-sm">
                                                {/* 카드 헤더 (데스크톱 표 헤더 스타일과 동기화) */}
                                                <div className="bg-brand/[0.02] px-5 py-4 border-b border-brand/5 flex justify-between items-center">
                                                    <div>
                                                        <div className="font-bold text-brand text-[16px]">{i.name}</div>
                                                        <div className="text-[12px] text-brand/40 font-medium">{i.phone}</div>
                                                    </div>
                                                    <select
                                                        value={i.status}
                                                        onChange={(e) => updateInquiryStatus(i.id, e.target.value)}
                                                        className={`rounded-full border-none px-3 py-1.5 text-xs font-bold outline-none cursor-pointer ${
                                                            i.status === 'completed'
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-orange-100 text-orange-600'
                                                            }`}
                                                    >
                                                        <option value="pending">접수 대기</option>
                                                        <option value="completed">상담 완료</option>
                                                    </select>
                                                </div>

                                                {/* 카드 바디 (상세 데이터) */}
                                                <div className="p-5 space-y-4">
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <div>
                                                            <span className="text-[11px] font-bold text-brand/30 block mb-1">신청 항목</span>
                                                            <p className="text-[14px] text-brand font-medium">{i.treatment}</p>
                                                        </div>
                                                        <div className="flex justify-between border-t border-brand/5 pt-4">
                                                            <div>
                                                                <span className="text-[11px] font-bold text-brand/30 block mb-1">희망 일시</span>
                                                                <p className="text-[13px] text-brand">{i.preferred_date || '-'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="text-[11px] font-bold text-brand/30 block mb-1">신청일</span>
                                                                <p className="text-[13px] text-brand/40">{new Date(i.created_at).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="border-t border-brand/5 pt-4">
                                                            <span className="text-[11px] font-bold text-brand/30 block mb-1">상담 내용</span>
                                                            <p className="text-[14px] text-brand-muted leading-relaxed whitespace-pre-wrap">{i.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 데스트톱: 기존 테이블 레이아웃 */}
                                    <div className="hidden md:block overflow-hidden rounded-2xl border border-brand/5 bg-white shadow-sm">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-brand/5 bg-brand/[0.02]">
                                                    <th className="px-6 py-4 text-sm font-bold text-brand-muted">이름/연락처</th>
                                                    <th className="px-6 py-4 text-sm font-bold text-brand-muted">신청 항목</th>
                                                    <th className="px-6 py-4 text-sm font-bold text-brand-muted">희망 일시</th>
                                                    <th className="px-6 py-4 text-sm font-bold text-brand-muted">상담 내용</th>
                                                    <th className="px-6 py-4 text-sm font-bold text-brand-muted">상태</th>
                                                    <th className="px-6 py-4 text-sm font-bold text-brand-muted">신청일</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-brand/5">
                                                {inquiries.map(i => (
                                                    <tr key={i.id} className="transition-all hover:bg-brand/[0.01]">
                                                        <td className="px-6 py-5 text-nowrap">
                                                            <div className="font-bold">{i.name}</div>
                                                            <div className="mt-1 text-xs text-brand/40">{i.phone}</div>
                                                        </td>
                                                        <td className="px-6 py-5 text-sm">{i.treatment}</td>
                                                        <td className="px-6 py-5 text-sm font-medium text-brand">{i.preferred_date || '-'}</td>
                                                        <td className="max-w-[300px] truncate px-6 py-5 text-sm text-brand-muted">{i.content}</td>
                                                        <td className="px-6 py-5">
                                                            <select
                                                                value={i.status}
                                                                onChange={(e) => updateInquiryStatus(i.id, e.target.value)}
                                                                className={`rounded-full border-none px-3 py-1.5 text-xs font-bold outline-none ${i.status === 'completed'
                                                                    ? 'bg-green-100 text-green-600'
                                                                    : 'bg-orange-100 text-orange-600'
                                                                    }`}
                                                            >
                                                                <option value="pending">접수 대기</option>
                                                                <option value="completed">상담 완료</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-5 text-xs text-brand/40">
                                                            {new Date(i.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {inquiries.length === 0 && (
                                        <div className="py-20 text-center text-brand/40 bg-white rounded-2xl border border-brand/5">
                                            접수된 상담 내역이 없습니다.
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* 팝업 모달 */}
            {editingPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
                    <div className="w-full max-w-[500px] rounded-[32px] bg-white p-10 shadow-2xl">
                        <h2 className="mb-8 text-2xl font-bold">팝업 공지 설정</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-bold">팝업 제목</label>
                                <input
                                    type="text"
                                    value={editingPopup.title || ""}
                                    onChange={e => setEditingPopup({ ...editingPopup, title: e.target.value })}
                                    className="w-full rounded-xl border border-brand/10 px-4 py-3 outline-none focus:border-brand"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold">이미지 (실제 파일 업로드)</label>
                                <div className="flex flex-col gap-3">
                                    {editingPopup.image_url && (
                                        <div className="relative aspect-video overflow-hidden rounded-xl bg-brand/[0.05]">
                                            <img src={editingPopup.image_url} className="h-full w-full object-cover" alt="" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={async e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const url = await handleFileUpload(file);
                                                if (url) setEditingPopup({ ...editingPopup, image_url: url });
                                            }
                                        }}
                                        className="text-sm file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand/20"
                                    />
                                    {isUploading && <p className="text-xs text-brand animate-pulse">업로드 중입니다...</p>}
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold">클릭 시 이동 링크 (선택)</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={editingPopup.link_url || ""}
                                    onChange={e => setEditingPopup({ ...editingPopup, link_url: e.target.value })}
                                    className="w-full rounded-xl border border-brand/10 px-4 py-3 outline-none focus:border-brand"
                                />
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={editingPopup.is_active ?? true}
                                        onChange={e => setEditingPopup({ ...editingPopup, is_active: e.target.checked })}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-brand/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                    <span className="ml-3 text-sm font-medium text-brand">사용 여부</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-10 flex gap-3">
                            <button onClick={() => setEditingPopup(null)} className="flex-1 py-4 font-bold text-brand/40">취소</button>
                            <button
                                onClick={savePopup}
                                disabled={isUploading}
                                className="flex-1 rounded-xl bg-brand py-4 font-bold text-white shadow-lg shadow-brand/20 disabled:opacity-50"
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 갤러리 모달 */}
            {editingGallery && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-[32px] bg-white p-10 shadow-2xl">
                        <h2 className="mb-8 text-2xl font-bold">갤러리 정보 설정</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-bold">카테고리</label>
                                    <select
                                        value={editingGallery.category || "얼굴/바디 컨투어링"}
                                        onChange={e => setEditingGallery({ ...editingGallery, category: e.target.value })}
                                        className="w-full rounded-xl border border-brand/10 px-4 py-3 outline-none"
                                    >
                                        {["얼굴/바디 컨투어링", "스킨부스터", "리프팅", "미백/모공/흉터", "줄기세포"].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-bold">시술명</label>
                                    <input
                                        type="text"
                                        value={editingGallery.treatment || ""}
                                        onChange={e => setEditingGallery({ ...editingGallery, treatment: e.target.value })}
                                        className="w-full rounded-xl border border-brand/10 px-4 py-3 outline-none focus:border-brand"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-bold">Before 이미지</label>
                                    <div className="flex flex-col gap-2">
                                        {editingGallery.before_image_url && (
                                            <img src={editingGallery.before_image_url} className="aspect-square rounded-xl object-cover" alt="" />
                                        )}
                                        <input
                                            type="file"
                                            onChange={async e => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const url = await handleFileUpload(file);
                                                    if (url) setEditingGallery({ ...editingGallery, before_image_url: url });
                                                }
                                            }}
                                            className="text-[10px] file:mr-2 file:rounded-full file:border-0 file:bg-brand/[0.05] file:px-3 file:py-1 file:font-semibold file:text-brand/60 hover:file:bg-brand/10"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-bold">After 이미지</label>
                                    <div className="flex flex-col gap-2">
                                        {editingGallery.after_image_url && (
                                            <img src={editingGallery.after_image_url} className="aspect-square rounded-xl object-cover" alt="" />
                                        )}
                                        <input
                                            type="file"
                                            onChange={async e => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const url = await handleFileUpload(file);
                                                    if (url) setEditingGallery({ ...editingGallery, after_image_url: url });
                                                }
                                            }}
                                            className="text-[10px] file:mr-2 file:rounded-full file:border-0 file:bg-brand/[0.05] file:px-3 file:py-1 file:font-semibold file:text-brand/60 hover:file:bg-brand/10"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold">상세 설명</label>
                                <textarea
                                    rows={3}
                                    value={editingGallery.description || ""}
                                    onChange={e => setEditingGallery({ ...editingGallery, description: e.target.value })}
                                    className="w-full resize-none rounded-xl border border-brand/10 px-4 py-3 outline-none focus:border-brand"
                                />
                            </div>
                        </div>
                        <div className="mt-10 flex gap-3">
                            <button onClick={() => setEditingGallery(null)} className="flex-1 py-4 font-bold text-brand/40">취소</button>
                            <button
                                onClick={saveGallery}
                                disabled={isUploading}
                                className="flex-1 rounded-xl bg-brand py-4 font-bold text-white shadow-lg shadow-brand/20 disabled:opacity-50"
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
