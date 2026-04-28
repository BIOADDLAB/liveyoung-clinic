import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminContent from "./AdminContent";

export const metadata: Metadata = {
    title: "관리자 페이지 | 리브영클리닉",
    description: "리브영클리닉 관리자 대시보드",
};

export default function AdminPage() {
    return (
        <main className="pt-[70px]">
            <AdminContent />
        </main>
    );
}
