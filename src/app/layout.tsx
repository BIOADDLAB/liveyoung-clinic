import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import ConditionalSections from "@/components/layout/ConditionalSections";

// --- 리브영의원 SEO 메타데이터 ---
export const metadata: Metadata = {
  title: "리브영의원 | Live Young Clinic",
  description:
    "당신의 고민과 얼굴을 정밀하게 분석합니다. Needs Mapping → Curated Plan → 맞춤 시술.",
  keywords: [
    "리브영의원",
    "피부과",
    "리프팅",
    "보톡스",
    "필러",
    "스킨부스터",
    "압구정피부과",
  ],
  openGraph: {
    title: "리브영의원 | Live Young Clinic",
    description: "당신의 고민과 얼굴을 정밀하게 분석합니다. Needs Mapping → Curated Plan → 맞춤 시술.",
    type: "website",
    locale: "ko_KR",
  },
};

import Providers from "./providers";
import QuickMenu from "@/components/layout/QuickMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <head>
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <ConditionalSections />
          <QuickMenu />
        </Providers>
      </body>
    </html>
  );
}
