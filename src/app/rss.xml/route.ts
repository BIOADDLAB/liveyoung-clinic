const BASE_URL = "https://liveyoungclinic.co.kr";

const RSS_ITEMS = [
    {
        title: "리브영의원",
        path: "/",
        description: "당신의 고민과 얼굴을 정밀하게 분석하는 리브영의원입니다.",
    },
    {
        title: "병원 소개",
        path: "/about",
        description: "리브영의원의 진료 철학과 클리닉 소개를 확인하세요.",
    },
    {
        title: "Signature 분석",
        path: "/analysis/skin",
        description: "피부진단기와 1:1 원장상담을 통한 맞춤 분석 프로그램입니다.",
    },
    {
        title: "Signature 시술",
        path: "/treatment/tightening",
        description: "얼굴/바디 컨투어링, 스킨부스터, 리프팅, 모공, 미백/색소 시술 안내입니다.",
    },
    {
        title: "애프터케어",
        path: "/precautions",
        description: "시술별 회복 과정과 시술 후 주의사항을 확인하세요.",
    },
    {
        title: "상담문의",
        path: "/contact",
        description: "리브영의원 상담 및 예약 문의 페이지입니다.",
    },
];

function escapeXml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

export function GET() {
    const now = new Date().toUTCString();

    const items = RSS_ITEMS.map((item) => {
        const url = `${BASE_URL}${item.path}`;

        return `
        <item>
            <title>${escapeXml(item.title)}</title>
            <link>${url}</link>
            <guid>${url}</guid>
            <description>${escapeXml(item.description)}</description>
            <pubDate>${now}</pubDate>
        </item>`;
    }).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>리브영의원 | Live Young Clinic</title>
        <link>${BASE_URL}</link>
        <description>리브영의원 주요 페이지와 시술 안내 RSS 피드입니다.</description>
        <language>ko-KR</language>
        <lastBuildDate>${now}</lastBuildDate>
${items}
    </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
