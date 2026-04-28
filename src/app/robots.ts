import type { MetadataRoute } from "next";

/**
 * robots.txt 생성
 * /admin 경로는 크롤링 차단
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/"],
        },
        sitemap: "https://www.livyoung-clinic.co.kr/sitemap.xml",
    };
}
