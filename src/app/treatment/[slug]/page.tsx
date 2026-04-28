import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SignatureIntro from "@/components/treatment/SignatureIntro";
import InteriorGallery from "@/components/sections/InteriorGallery";
import {
    TreatmentHero,
    TreatmentDetail,
    TreatmentTargetAreas,
    TreatmentKeyPoints,
    TreatmentRecommendTargets,
    TreatmentFAQ,
} from "@/components/treatment/TreatmentTemplate";
import { TREATMENT_DATA_MAP } from "@/lib/treatments";

// generateStaticParams to statically generate the treatment pages at build time
export function generateStaticParams() {
    return Object.keys(TREATMENT_DATA_MAP).map((slug) => ({
        slug,
    }));
}

// Generate dynamic metadata based on slug
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const data = TREATMENT_DATA_MAP[resolvedParams.slug];
    if (!data) return { title: "Not Found" };
    return {
        title: `${data.title} | 리브영클리닉`,
        description: data.description,
    };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const data = TREATMENT_DATA_MAP[resolvedParams.slug];

    // If slug doesn't exist in our map, return 404
    if (!data) {
        notFound();
    }

    return (
        <div>
            <TreatmentHero data={data} />
            <SignatureIntro
                title={data.introTitle || ""}
                description={data.introDescription || ""}
                keywords={data.introKeywords || []}
                signatureText={data.signatureText}
                category={data.enCategory}
                introBullets={data.introBullets}
                keyPoints={data.keyPoints}
            />
            <InteriorGallery />
            <TreatmentDetail data={data} />
            <TreatmentTargetAreas data={data} />
            <TreatmentKeyPoints data={data} />
            <TreatmentRecommendTargets data={data} />
            <TreatmentFAQ data={data} />
        </div>
    );
}
