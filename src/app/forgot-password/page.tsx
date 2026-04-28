import type { Metadata } from "next";
import ForgotPasswordContent from "./ForgotPasswordContent";

export const metadata: Metadata = {
    title: "아이디/비밀번호 찾기 | LIV YOUNG CLINIC",
    description: "LIV YOUNG CLINIC 아이디 및 비밀번호 찾기 페이지",
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordContent />;
}
