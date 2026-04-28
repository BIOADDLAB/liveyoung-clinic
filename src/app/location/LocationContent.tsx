"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { CustomOverlayMap, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import SectionTitle from "@/components/ui/SectionTitle";
import { CLINIC_INFO } from "@/lib/constants";

const visitHighlights = [
    { label: "Station", value: "압구정역 2번 출구 도보 1분" },
    { label: "Building", value: "본경빌딩 2층" },
];

const transferRoutes = [
    {
        category: "고속철도역\n(Train Station)",
        icon: "ph:train-fill",
        routes: [
            { title: "서울역", time: "약 20분", details: "서울역(4호선) → 충무로역(3호선 환승) → 압구정역(3호선)" },
            { title: "용산역", time: "약 30분", details: "용산역(1호선) → 종로3가역(3호선 환승) → 압구정역(3호선)" },
            { title: "수서역", time: "약 23분", details: "수서역(3호선) → 압구정역 (3호선)" },
        ]
    },
    {
        category: "터미널 & 공항\n(Terminal & Airport)",
        icon: "ph:bus-fill",
        routes: [
            { title: "고속터미널", time: "6분", details: "고속터미널역(3호선) → 압구정역 (3호선)" },
            { title: "동서울터미널", time: "약 35분", details: "강변역(2호선) → 교대역(3호선 환승) → 압구정역(3호선)" },
            { title: "김포공항", time: "약 45분", details: "김포공항역(9호선) → 고속터미널역(3호선 환승) → 압구정역(3호선)" },
        ]
    }
];

const subwayItems = [
    "압구정역 2번 출구에서 직진 후 약 100m 이동",
    "본경빌딩 2층에서 리브영의원을 찾으실 수 있습니다.",
];

const busItems = ["143", "147", "148", "240", "301", "463", "472", "4211", "6800"];

export default function LocationContent() {
    const [loading, error] = useKakaoLoader({
        appkey: "bb7a18260cc4be1d1546a40988763147",
        libraries: ["clusterer", "drawing", "services"],
    });

    const [mapPosition, setMapPosition] = useState({ lat: 37.5269, lng: 127.0298 });

    useEffect(() => {
        if (!loading && window.kakao) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(
                CLINIC_INFO.address,
                (
                    result: any[],
                    status: kakao.maps.services.Status,
                ) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setMapPosition({
                            lat: parseFloat(result[0].y),
                            lng: parseFloat(result[0].x),
                        });
                    }
                },
            );
        }
    }, [loading]);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        alert("주소가 복사되었습니다.");
    };

    return (
        <div className="bg-surface text-brand">
            {/* HER0 / INTRO SECTION */}
            <section className="relative overflow-hidden py-[100px] md:py-[160px] bg-surface">
                <div className="absolute left-1/2 top-0 -z-10 h-[620px] w-[1200px] -translate-x-1/2 rounded-full bg-brand/[0.02]" />

                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <SectionTitle
                        subtitle="LOCATION"
                        title="리브영의원 오시는 길"
                        description="당신의 아름다움이 시작되는 공간, 리브영의원으로 오시는 가장 편안하고 상세한 길을 안내해 드립니다."
                    />

                    <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="order-2 lg:order-1 lg:pr-6"
                        >
                            <p className="text-[14px] font-black uppercase tracking-[0.1em] gold-gradient-text">
                                VISIT GUIDE
                            </p>
                            <h3 className="korean-serif-title mt-4 text-[34px] md:text-[46px] font-bold leading-[1.12] tracking-[-0.04em] text-brand">
                                압구정역 인근,
                                <br />
                                본경빌딩 2층
                            </h3>
                            <p className="mt-8 max-w-[540px] text-[16px] md:text-[18px] leading-[1.8] tracking-[-0.026em] text-brand-muted">
                                리브영은 고객님의 방문이 편안한 여정이 되길 바랍니다.
                                압구정역 지하철 이용 시 도보 1분 거리의 최적의 접근성을 제공합니다.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-3">
                                {visitHighlights.map((item) => (
                                    <div
                                        key={item.label}
                                        className="min-w-[220px] rounded-full border border-brand/10 bg-white px-5 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.03)]"
                                    >
                                        <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-brand/35">
                                            {item.label}
                                        </span>
                                        <span className="mt-1 block text-[15px] font-semibold tracking-[-0.02em] text-brand">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 max-w-[540px] border-t border-brand/10 pt-7">
                                <p className="text-[15px] leading-7 text-brand-muted">
                                    주소는 <span className="font-semibold text-brand">{CLINIC_INFO.address}</span>이며,
                                    건물 외관과 층수를 확인하신 뒤 바로 방문하실 수 있습니다.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="order-1 lg:order-2"
                        >
                            <div className="relative overflow-hidden rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.08)]">
                                <div className="relative aspect-[4/4.5] md:aspect-[4/3.9]">
                                    <Image
                                        src="/images/location_building.jpg"
                                        alt="리브영의원 건물 외관"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 55vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                                        <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/70">
                                            Exterior
                                        </p>
                                        <p className="mt-3 text-[25px] md:text-[38px] font-semibold leading-[1.2] md:leading-[1.14] tracking-[-0.04em] break-keep">
                                            외관과 층수만 확인하셔도
                                            <br />
                                            찾기 어렵지 않습니다
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="relative overflow-hidden bg-brand py-[80px] md:py-[130px] text-white">
                {/* 배경 이미지 설정 */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/background/bg_ver2.webp')" }}
                />
                {/* 배경 장식 요소 및 어두운 오버레이 (가독성 확보) */}
                <div className="absolute inset-0 bg-brand/5 backdrop-blur-[2px] z-0"></div>
                <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

                <div className="mx-auto max-w-[1560px] px-5 md:px-8 relative z-10">
                    <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                MAP
                            </p>
                            <h3 className="mt-4 korean-serif-title text-[34px] md:text-[46px] font-bold leading-[1.12] tracking-[-0.04em] text-white">
                                지도에서
                                <br />
                                바로 확인하기
                            </h3>

                            <div className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
                                <div className="h-[360px] md:h-[520px]">
                                    {!loading && !error ? (
                                        <Map center={mapPosition} style={{ width: "100%", height: "100%" }} level={3}>
                                            <MapMarker position={mapPosition} />
                                            <CustomOverlayMap position={mapPosition} yAnchor={2.2}>
                                                <div className="rounded-full bg-white px-5 py-2 text-[13px] font-bold text-brand shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                                                    리브영의원
                                                </div>
                                            </CustomOverlayMap>
                                        </Map>
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-white/5 text-[15px] text-white/45">
                                            지도를 불러오는 중입니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="pt-2"
                        >
                            <div className="flex h-full flex-col justify-between rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
                                <div>
                                    <div className="border-t border-white/20 pt-8">
                                        <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                            Address
                                        </p>
                                        <p className="mt-4 text-[20px] md:text-[26px] font-semibold leading-[1.6] tracking-[-0.03em] text-white">
                                            {CLINIC_INFO.address}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(CLINIC_INFO.address)}
                                            className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-white/65 transition-colors hover:text-white"
                                        >
                                            <Icon icon="ph:copy-fill" className="text-[16px]" />
                                            주소 복사하기
                                        </button>
                                    </div>

                                    <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
                                        <div>
                                            <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                                Phone
                                            </p>
                                            <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-white">
                                                {CLINIC_INFO.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                                Fax
                                            </p>
                                            <p className="mt-3 text-[20px] font-semibold tracking-[-0.02em] text-white">
                                                {CLINIC_INFO.fax}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-10 border-t border-white/10 pt-8">
                                        <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                            Quick Link
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-3">
                                            <MapAppButton
                                                label="네이버 지도"
                                                icon="simple-icons:naver"
                                                href={`https://map.naver.com/v5/search/${encodeURIComponent(CLINIC_INFO.name)}`}
                                                variant="green"
                                            />
                                            <MapAppButton
                                                label="카카오맵"
                                                icon="ri:kakao-talk-fill"
                                                href={`https://map.kakao.com/link/search/${encodeURIComponent(CLINIC_INFO.name)}`}
                                                variant="kakao"
                                            />
                                            <MapAppButton
                                                label="카카오 상담"
                                                icon="ri:kakao-talk-fill"
                                                href={CLINIC_INFO.social.kakao}
                                                variant="outline"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 border-t border-white/10 pt-8">
                                    <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                        Visit Note
                                    </p>
                                    <p className="mt-4 text-[15px] leading-7 text-white/72">
                                        압구정역 2번 출구 기준 도보 이용 가능하며, 지도 링크를 통해 바로 경로를 확인하실 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ACCESS ROUTES SECTION (DESIGN IMPROVED) */}
            <section className="py-[80px] md:py-[130px] bg-surface relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="mx-auto max-w-[1400px] px-5 md:px-8 relative z-10">
                    <div className="mx-auto max-w-4xl text-center mb-16 md:mb-24">
                        <SectionTitle
                            subtitle="ACCESS GUIDE"
                            title={<>전국 어디서나<br className="md:hidden" /> 편리하게</>}
                            description="외부 지역에서 리브영의원으로 오시는 최적의 경로와 소요 시간을 안내해 드립니다."
                        />
                    </div>

                    <div className="space-y-24">
                        {transferRoutes.map((group, idx) => (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20 shrink-0">
                                            <Icon icon={group.icon} className="text-2xl" />
                                        </div>
                                        <div>
                                            <span className="text-[13px] font-black gold-gradient-text uppercase tracking-widest block mb-1">Route Guide</span>
                                            <h3 className="text-[25px] md:text-[34px] font-bold text-brand tracking-tight whitespace-pre-line md:whitespace-normal">{group.category}</h3>
                                        </div>
                                    </div>
                                    <div className="h-px flex-1 bg-brand/10 mx-10 hidden lg:block mb-4" />
                                    <p className="text-[14px] font-medium text-brand/40 uppercase tracking-[0.2em] mb-1">Visit Information</p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    {group.routes.map((route, rIdx) => (
                                        <div key={rIdx} className="group relative bg-white rounded-[40px] p-9 transition-all duration-500 hover:bg-brand hover:shadow-[0_40px_80px_rgba(0,35,68,0.12)] border border-brand/5 overflow-hidden">
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-8">
                                                    <span className="text-[14px] font-black text-brand transition-colors duration-500 group-hover:text-accent tracking-widest uppercase">0{rIdx + 1}</span>
                                                    <div className="px-4 py-1.5 rounded-full bg-brand/[0.04] text-[12px] font-bold text-brand transition-colors duration-500 group-hover:bg-accent group-hover:text-white uppercase tracking-tighter">
                                                        {route.time}
                                                    </div>
                                                </div>
                                                <h4 className="text-[22px] md:text-[24px] font-bold text-brand transition-colors duration-500 group-hover:text-white mb-5">
                                                    {route.title}
                                                </h4>
                                                <p className="text-[15px] md:text-[16px] leading-relaxed text-brand-muted transition-colors duration-500 group-hover:text-white/70 break-keep font-medium">
                                                    {route.details}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ADDITIONAL INFO SECTION (SUBWAY/BUS/HOURS/PARKING) */}
            <section className="py-[80px] md:py-[130px] bg-surface">
                <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                    <div className="mx-auto max-w-4xl text-center mb-16">
                        <SectionTitle
                            subtitle="TRAFFIC INFO"
                            title="방문 시 참고사항"
                            description={<>교통편과 진료시간, 주차 정보를<br className="md:hidden" /> 상세히 확인하실 수 있습니다.</>}
                        />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                        {/* 1. SUBWAY */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="overflow-hidden rounded-[40px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.04)] border border-brand/5"
                        >
                            <div className="px-8 py-8 md:px-12 md:py-10">
                                <div>
                                    <p className="text-[14px] font-black uppercase tracking-[0.1em] gold-gradient-text">
                                        SUBWAY
                                    </p>
                                    <h3 className="mt-3 korean-serif-title text-[32px] font-bold tracking-[-0.04em] text-brand md:text-[40px]">
                                        지하철 이용
                                    </h3>
                                </div>
                            </div>
                            <div className="mx-8 border-b border-brand/5 md:mx-12" />
                            <div className="pb-8">
                                {subwayItems.map((item, index) => (
                                    <div key={item}>
                                        <div className="flex min-h-[85px] items-center gap-5 px-8 md:px-12">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white shadow-lg shadow-brand/20">
                                                {index + 1}
                                            </div>
                                            <p className="text-[17px] leading-relaxed tracking-[-0.02em] text-brand-muted font-medium break-keep">
                                                {item}
                                            </p>
                                        </div>
                                        {index !== subwayItems.length - 1 && (
                                            <div className="mx-8 border-b border-brand/5 md:mx-12" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 2. BUS */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
                            className="overflow-hidden rounded-[40px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.04)] border border-brand/5"
                        >
                            <div className="px-8 py-8 md:px-12 md:py-10">
                                <div>
                                    <p className="text-[14px] font-black uppercase tracking-[0.1em] gold-gradient-text">
                                        BUS
                                    </p>
                                    <h3 className="mt-3 korean-serif-title text-[32px] font-bold tracking-[-0.04em] text-brand md:text-[40px]">
                                        버스 이용
                                    </h3>
                                </div>
                            </div>
                            <div className="mx-8 border-b border-brand/5 md:mx-12" />
                            <div className="pb-8">
                                <div className="flex min-h-[85px] items-center px-8 md:px-12">
                                    <p className="text-[16px] leading-relaxed text-brand-muted font-medium">
                                        압구정역 인근 정류장 하차 후 도보 이동이 가능합니다.
                                    </p>
                                </div>
                                <div className="mx-8 border-b border-brand/5 md:mx-12" />
                                <div className="flex min-h-[85px] items-center px-8 md:px-12">
                                    <div className="flex flex-wrap gap-2.5 py-4">
                                        {busItems.map((item) => (
                                            <span
                                                key={item}
                                                className="inline-flex items-center rounded-full border border-brand/10 bg-[#F8F7F3] px-5 py-2 text-[14px] font-semibold text-brand transition-colors hover:border-accent"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. CLINIC HOURS */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
                            className="overflow-hidden rounded-[40px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.04)] border border-brand/5"
                        >
                            <div className="px-8 py-8 md:px-12 md:py-10">
                                <div>
                                    <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2">
                                        CLINIC HOURS
                                    </p>
                                    <h3 className="mt-3 korean-serif-title text-[32px] font-bold tracking-[-0.04em] text-brand md:text-[40px]">
                                        진료 시간 안내
                                    </h3>
                                </div>
                            </div>
                            <div className="mx-8 border-b border-brand/5 md:mx-12" />
                            <div className="pb-8">
                                <div>
                                    {CLINIC_INFO.hours.map((hour) => (
                                        <div key={hour.day}>
                                            <div className="flex min-h-[85px] items-center justify-between px-8 md:px-12 transition-colors hover:bg-brand/[0.01]">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[17px] font-bold text-brand">{hour.day}</span>
                                                </div>
                                                <span className="text-[17px] text-brand-muted font-medium">{hour.time}</span>
                                            </div>
                                            <div className="mx-8 border-b border-brand/5 md:mx-12" />
                                        </div>
                                    ))}
                                    <div className="flex min-h-[85px] items-center justify-between px-8 md:px-12 bg-accent/5">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[17px] font-bold text-accent">휴진</span>
                                        </div>
                                        <span className="text-[17px] text-accent font-semibold">{CLINIC_INFO.closed}</span>
                                    </div>
                                </div>
                                <p className="mt-6 px-8 text-[14px] text-brand/40 md:px-12 font-medium">
                                    점심시간은 13:00 ~ 14:00, 수/토는 점심 시간 없이 진료합니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* 4. PARKING */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-[40px] bg-brand text-white shadow-[0_40px_100px_rgba(0,35,68,0.2)]"
                        >
                            <div className="absolute -right-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
                            <div className="relative">
                                <div className="px-8 py-8 md:px-10">
                                    <div className="ml-10 md:ml-12">
                                        <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                                            PARKING
                                        </p>
                                        <h3 className="mt-3 korean-serif-title text-[32px] font-bold tracking-[-0.04em] text-white md:text-[40px]">
                                            주차 및 방문 <br className="md:hidden" />안내
                                        </h3>
                                    </div>
                                </div>
                                <div className="mx-8 border-b border-white/10 md:mx-10" />
                                <div className="pb-8">
                                    <ul className="text-[15px] leading-relaxed text-white/78">
                                        <li>
                                            <div className="flex min-h-[80px] items-center gap-4 px-8 md:px-10">
                                                <div className="flex w-6 shrink-0 items-center justify-center text-accent md:w-8">
                                                    <Icon icon="ph:check-circle-fill" className="text-[20px]" />
                                                </div>
                                                <p className="flex-1">건물 정면 기준, 우측 통로로 진입하시면 주차장이 마련되어 있습니다. (자가주차)</p>
                                            </div>
                                            <div className="mx-8 border-b border-white/10 md:mx-10" />
                                        </li>
                                        <li>
                                            <div className="flex min-h-[80px] items-center gap-4 px-8 md:px-10">
                                                <div className="flex w-6 shrink-0 items-center justify-center text-accent md:w-8">
                                                    <Icon icon="ph:check-circle-fill" className="text-[20px]" />
                                                </div>
                                                <p className="flex-1">접수 시 차량번호를 말씀해 주시면 필요한 안내를 도와드립니다.</p>
                                            </div>
                                            <div className="mx-8 border-b border-white/10 md:mx-10" />
                                        </li>
                                        <li>
                                            <div className="flex min-h-[80px] items-center gap-4 px-8 md:px-10">
                                                <div className="flex w-6 shrink-0 items-center justify-center text-white/45 md:w-8">
                                                    <Icon icon="ph:info-fill" className="text-[20px]" />
                                                </div>
                                                <p className="flex-1 text-[14px] text-white/50">진료 일정과 건물 상황에 따라 현장 안내가 달라질 수 있어 방문 전 연락을 권장드립니다.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function MapAppButton({
    label,
    icon,
    href,
    variant,
}: {
    label: string;
    icon: string;
    href: string;
    variant: "green" | "kakao" | "outline";
}) {
    const variantClass =
        variant === "green"
            ? "bg-[#03C75A] text-white"
            : variant === "kakao"
                ? "bg-[#FEE500] text-[#191919]"
                : "border border-white/20 bg-white/5 text-white";

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-[50px] items-center gap-2 rounded-full px-5 text-[14px] font-bold transition-all hover:translate-y-[-1px] ${variantClass}`}
        >
            <Icon icon={icon} className="text-[18px]" />
            {label}
        </a>
    );
}
