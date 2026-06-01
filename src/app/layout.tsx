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
    images: [
      {
        url: "/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "리브영의원 Live Young Clinic",
      },
    ],
  },
  icons: {
    icon: "/images/favicon-16x16.png",
  },
  verification: {
    google: "H3GTuKql_2W98_-nCK2VQk8ce6SCH5vOr80SPGAFdWo",
    other: {
      "naver-site-verification": "6d5afdafbd383569502bd45003e7a594c4bde6cf",
    },
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
