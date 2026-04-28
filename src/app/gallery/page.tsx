import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
    title: "전후사진 | 리브영클리닉",
    description: "리브영클리닉의 시술 전후 결과를 확인해 보세요.",
};

export default function GalleryPage() {
    return (
        <div>
            <GalleryContent />
        </div>
    );
}
