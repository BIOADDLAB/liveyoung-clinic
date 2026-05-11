import type { MetadataRoute } from "next";

/**
 * 사이트맵 생성
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.livyoung-clinic.co.kr";

    return [
        // 메인
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        // 클리닉 소개
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        // 시술 페이지
        { url: `${baseUrl}/treatment/lifting`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/treatment/tightening`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/treatment/skin-booster`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/treatment/pore`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/treatment/pigmentation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/treatment/stem-cell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        // 전후사진
        { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        // 상담문의
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ];
}
