"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CLINIC_INFO } from "@/lib/constants";
import { Map, MapMarker, CustomOverlayMap, useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function Location() {
    const [loading, error] = useKakaoLoader({
        appkey: "bb7a18260cc4be1d1546a40988763147",
        libraries: ["clusterer", "drawing", "services"],
    });

    const [mapPosition, setMapPosition] = useState({ lat: 35.1542, lng: 126.8482 });

    useEffect(() => {
        if (!loading && window.kakao) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(CLINIC_INFO.address, (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const coords = {
                        lat: parseFloat(result[0].y),
                        lng: parseFloat(result[0].x),
                    };
                    setMapPosition(coords);
                }
            });
        }
    }, [loading, CLINIC_INFO.address]);

    return (
        <section id="location" className="py-[60px] md:py-[100px] bg-[#F2F1ED] text-brand">
            <div className="mx-auto max-w-[1400px] px-5 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <p className="text-[14px] font-black gold-gradient-text tracking-[0.1em] mb-2 md:text-[14px]">
                        LOCATION
                    </p>
                    <h3 className="korean-serif-title mt-1 flex items-center justify-center text-[32px] font-bold leading-[1.1] text-brand md:text-[46px] md:tracking-[-0.04em]">
                        리브영의원 오시는 길
                    </h3>
                    <p className="mx-auto mt-6 max-w-[600px] text-[14px] font-normal leading-[1.75] text-brand-muted tracking-[-0.026em]">
                        리브영의원에서 아름다운 변화를 시작하세요.
                    </p>
                </motion.div>

                {/* 1. 상단 주소/전화/팩스 (이미지 그대로 가로 일렬 배치) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-12 mb-6 flex flex-col items-center justify-center gap-y-4 md:mt-16 md:flex-row md:gap-x-12 lg:gap-x-16 md:mb-8"
                >
                    <div className="flex items-center gap-x-2 w-full md:w-auto px-4 md:px-0 justify-center">
                        <Icon icon="ph:map-pin-fill" className="text-lg md:text-xl text-brand shrink-0" />
                        <span className="font-bold text-brand shrink-0 text-[14px] md:text-base">주소</span>
                        <p className="text-[13px] md:text-[15px] text-brand-muted whitespace-nowrap">{CLINIC_INFO.address}</p>
                    </div>
                    <div className="flex items-center gap-x-2 w-full md:w-auto justify-center">
                        <Icon icon="ph:phone-fill" className="text-lg md:text-xl text-brand shrink-0" />
                        <span className="font-bold text-brand shrink-0 text-[14px] md:text-base">전화</span>
                        <p className="text-[13px] md:text-[15px] text-brand-muted whitespace-nowrap">{CLINIC_INFO.phone}</p>
                    </div>
                    <div className="flex items-center gap-x-2 w-full md:w-auto justify-center">
                        <Icon icon="ph:printer-fill" className="text-lg md:text-xl text-brand shrink-0" />
                        <span className="font-bold text-brand shrink-0 text-[14px] md:text-base">팩스</span>
                        <p className="text-[13px] md:text-[15px] text-brand-muted whitespace-nowrap">{CLINIC_INFO.fax}</p>
                    </div>
                </motion.div>

                {/* 2. 지도 영역 - 전면 배너에서 다시 안정적인 카드 데크 스타일로 원복 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-brand/5 mb-16 md:mb-20 relative group"
                >
                    <div className="h-[400px] w-full md:h-[500px]">
                        {!loading && !error && (
                            <Map center={mapPosition} style={{ width: "100%", height: "100%" }} level={3}>
                                <MapMarker position={mapPosition} />
                                <CustomOverlayMap position={mapPosition} yAnchor={2.3}>
                                    <div className="px-6 py-2.5 bg-white text-brand text-[13px] font-bold min-w-[120px] text-center rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-brand/5 whitespace-nowrap relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white">
                                        리브영의원
                                    </div>
                                </CustomOverlayMap>
                            </Map>
                        )}
                    </div>

                    {/* 지도 이동 버튼 오버레이 */}
                    <div className="absolute right-8 bottom-8 flex flex-col gap-3 z-20">
                        <MapAppButton
                            label="Naver Map"
                            icon="simple-icons:naver"
                            href={`https://map.naver.com/v5/search/${encodeURIComponent(CLINIC_INFO.name)}`}
                            color="bg-[#03C75A] text-white"
                        />
                        <MapAppButton
                            label="Kakao Map"
                            icon="ri:kakao-talk-fill"
                            href={`https://map.kakao.com/link/search/${encodeURIComponent(CLINIC_INFO.name)}`}
                            color="bg-[#FEE500] text-[#191919]"
                        />
                    </div>
                </motion.div>

                {/* 3. 교통편 안내 - 디자인 개편 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 relative">
                    {/* 중앙 수직 구분선 (데스크탑) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-brand/10 -translate-x-1/2"></div>

                    {/* 고속철도역 섹션 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:pr-10"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <Icon icon="ph:train-fill" className="text-2xl text-brand" />
                            <div className="text-[22px] font-bold text-brand font-sans tracking-tight">고속철도역에서 오시는길</div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
                            <RouteColumn title="서울역 (약 20분 소요)" steps={[
                                { name: '4', color: '#0052A4', station: '서울역' },
                                { name: '3', color: '#EF7C1C', station: '충무로역' },
                                { name: '3', color: '#EF7C1C', station: '압구정역', isLast: true }
                            ]} />
                            <RouteColumn title="용산역 (약 30분 소요)" steps={[
                                { name: '1', color: '#0052A4', station: '용산역' },
                                { name: '3', color: '#EF7C1C', station: '종로3가역' },
                                { name: '3', color: '#EF7C1C', station: '압구정역', isLast: true }
                            ]} />
                            <RouteColumn title="수서역 (약 23분 소요)" steps={[
                                { name: '3', color: '#EF7C1C', station: '수서역' },
                                { name: '3', color: '#EF7C1C', station: '압구정역', isLast: true }
                            ]} />
                        </div>
                    </motion.div>

                    {/* 고속버스터미널 섹션 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:pl-10"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <Icon icon="ph:bus-fill" className="text-2xl text-brand" />
                            <div className="text-[22px] font-bold text-brand font-sans tracking-tight">고속버스터미널에서 오시는길</div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
                            <RouteColumn title="서울고속터미널 (6분)" steps={[
                                { name: '3', color: '#EF7C1C', station: '고속터미널역' },
                                { name: '3', color: '#EF7C1C', station: '압구정역', isLast: true }
                            ]} />
                            <RouteColumn title="동서울터미널 (약 35분)" steps={[
                                { name: '2', color: '#37b42d', station: '강변역' },
                                { name: '3', color: '#EF7C1C', station: '교대역' },
                                { name: '3', color: '#EF7C1C', station: '압구정역', isLast: true }
                            ]} />
                            <RouteColumn title="김포공항 (약 45분)" steps={[
                                { name: '9', color: '#BDB092', station: '김포공항역' },
                                { name: '3', color: '#EF7C1C', station: '고속터미널역' },
                                { name: '3', color: '#EF7C1C', station: '압구정역', isLast: true }
                            ]} />
                        </div>
                    </motion.div>
                </div>



                {/* 4. 영업시간 안내 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-24 border-t border-brand/10 pt-16 pb-20"
                >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24">
                        <div className="flex items-center gap-4 shrink-0">
                            <Icon icon="ph:clock-bold" className="text-[32px] text-brand" />
                            <div className="text-[22px] font-bold text-brand font-sans tracking-tight">영업 시간안내</div>
                        </div>

                        <div className="flex flex-col gap-6 md:gap-8">
                            <div className="flex flex-col md:flex-row gap-x-16 gap-y-6">
                                {/* 왼쪽 컬럼: 월/화/목 및 금요일 */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-6">
                                        <span className="px-5 py-2 bg-brand/10 rounded-full text-[14px] font-bold min-w-[110px] text-center text-brand/70 font-sans">월 / 화 / 목</span>
                                        <span className="text-[16px] text-brand-muted font-sans">오전 10:00 ~ 오후 07:00</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="px-5 py-2 bg-brand/10 rounded-full text-[14px] font-bold min-w-[110px] text-center text-brand/70 font-sans">금요일(야간)</span>
                                        <span className="text-[16px] text-brand-muted font-sans">오전 10:00 ~ 오후 08:00</span>
                                    </div>
                                </div>

                                {/* 오른쪽 컬럼: 수/토 및 휴진일 */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-6">
                                        <span className="px-5 py-2 bg-brand/10 rounded-full text-[14px] font-bold min-w-[110px] text-center text-brand/70 font-sans">수 / 토</span>
                                        <span className="text-[16px] text-brand-muted font-sans">오전 10:00 ~ 오후 04:00</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="px-5 py-2 bg-brand/10 rounded-full text-[14px] font-bold min-w-[110px] text-center text-brand/70 font-sans">일 / 공휴일</span>
                                        <span className="text-[16px] text-brand/40 font-sans font-medium">휴진</span>
                                    </div>
                                </div>
                            </div>

                            {/* 안내 문구 */}
                            <p className="text-brand text-[13px] ml-1 font-sans">※ 점심시간은 13:00 ~ 14:00, 수/토는 점심 시간 없이 진료합니다.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function MapAppButton({ label, icon, href, color }: { label: string, icon: string, href: string, color: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} px-6 py-3 rounded-full flex items-center gap-3 font-bold text-sm shadow-xl hover:scale-105 transition-transform active:scale-95`}
        >
            <Icon icon={icon} className="text-xl" />
            {label}
        </a>
    );
}

function RouteColumn({ title, steps }: {
    title: string,
    steps: {
        color: string,
        name: string,
        station: string,
        isLast?: boolean
    }[]
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col gap-5 border-b border-brand/5 pb-5 md:border-0 md:pb-0">
            {/* 아코디언 헤더 (모바일전용 클릭 영역) */}
            <div 
                className="flex items-center justify-between cursor-pointer md:cursor-default group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-[15px] font-bold text-brand font-sans tracking-normal group-hover:text-accent transition-colors">
                    {title}
                </div>
                {/* 모바일에서만 보이는 화살표 아이콘 */}
                <div className={`text-brand/30 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}>
                    <Icon icon="ph:caret-down-bold" />
                </div>
            </div>

            {/* 상세 경로 영역 (모바일: 아코디언 / 데스크탑: 항상 노출) */}
            <AnimatePresence initial={false}>
                {(isOpen || isDesktop) && (
                    <motion.div 
                        initial={isDesktop ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden md:!h-auto md:!opacity-100" // 데스크탑에서 강제 노출
                    >
                        <div className="relative flex flex-col gap-6 pl-1 mt-2 md:mt-0">
                            {/* 배경 수직 연결선 */}
                            <div className="absolute left-[3.5px] top-[10px] bottom-[10px] w-px bg-brand/10"></div>

                            {steps.map((step, idx) => (
                                <div key={idx} className="relative flex items-center gap-4">
                                    {/* Hollow Circle */}
                                    <div
                                        className="z-10 h-[8px] w-[8px] rounded-full bg-white border-2 shrink-0"
                                        style={{ borderColor: step.color }}
                                    ></div>

                                    {/* 노선 배지 */}
                                    <div
                                        className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0"
                                        style={{ backgroundColor: step.color }}
                                    >
                                        {step.name}
                                    </div>

                                    {/* 역 명칭 */}
                                    <span className={`text-[14px] whitespace-nowrap ${step.isLast ? 'text-brand font-bold' : 'text-brand-muted font-medium'}`}>
                                        {step.station}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
