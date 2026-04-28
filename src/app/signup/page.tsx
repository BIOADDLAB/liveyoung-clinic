import type { Metadata } from "next";
import SignupContent from "./SignupContent";

export const metadata: Metadata = {
    title: "회원가입 | LIV YOUNG CLINIC",
    description: "LIV YOUNG CLINIC 회원가입 페이지",
};

export default function SignupPage() {
    return <SignupContent />;
}
