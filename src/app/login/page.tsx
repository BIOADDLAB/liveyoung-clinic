import type { Metadata } from "next";
import LoginContent from "./LoginContent";

export const metadata: Metadata = {
    title: "로그인 | LIV YOUNG CLINIC",
    description: "LIV YOUNG CLINIC 로그인 페이지",
};

export default function LoginPage() {
    return <LoginContent />;
}
