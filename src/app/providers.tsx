"use client";

import { AuthProvider } from "@/contexts/AuthContext";

/**
 * 클라이언트 Providers 래퍼
 * 서버 컴포넌트(layout) ↔ 클라이언트 컴포넌트 브릿지
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
