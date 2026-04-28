// 시술 페이지별 상세 데이터

export interface TreatmentItem {
    name: string;
    enName: string;
    description: string;
    features: string[];
    mediaLabel: string;
    mediaSize: string;
    imageUrl?: string;
    analysisPoint?: string; // 추가: 장비 분석 포인트
    subItems?: { name: string; href?: string }[];
    backName?: string; // 추가: 카드 뒷면에 렌더링될 원래 장비/시술명
}

export interface TreatmentPageData {
    slug: string;
    /** 영문 카테고리 라벨 (영문 서브타이틀) */
    enCategory: string;
    /** 한글 페이지 제목 */
    title: string;
    /** 핵심 메시지 (히어로 영역) */
    heroMessage: string;
    /** 카테고리 설명 */
    description: string;

    // 신규 추가 필드 (1P 기획안 반영)
    subTitle?: string;
    signatureText?: string; // 추가: 필기체 시그니처 텍스트 (예: Signature, Premium 등)
    introTitle?: string;
    introDescription?: string;
    introKeywords?: string[];
    introBullets?: string[];
    targetAreas?: (string | { title: string; desc: string; img?: string })[];
    keyPoints?: { title: string; description: string }[];
    precautions?: string[];

    /** 세부 시술 목록 */
    treatments: TreatmentItem[];
    /** 추천 대상 데이터 */
    recommendTargets?: { title: string; description: string; img?: string }[];
    /** CTA 문구 */
    ctaMessage: string;
    /** 헤더 배경 이미지 URL */
    bgImage: string;
    /** 모바일 헤더 배경 이미지 URL */
    mobileBgImage?: string;
}

/** 1P - Lifting */
export const LIFTING_DATA: TreatmentPageData = {
    slug: "lifting",
    enCategory: "LIFTING",
    signatureText: "Signature",
    title: "리프팅",
    heroMessage: "보이는 리프팅의 차이, 정교한 설계로 당신의 숨겨진 라인을 찾습니다",
    description:
        "리브영의원의 리프팅 프로그램은 개인의 피부 상태와 처짐 정도를 정밀 분석하여, 가장 효과적인 리프팅 솔루션을 제안합니다.",

    // 1P 기획안 신규 추가 데이터
    subTitle: "보이는 리프팅의 차이, 정교한 설계로 당신의 숨겨진 라인을 찾습니다.",
    introTitle: "DESIGN",
    introDescription: "리프팅은 피부의 처짐과 라인을 정교하게 설계하여 즉각적인 리프팅 효과와 탄력 개선을 제공해 주지만 시술자의 미적 감각에 따라 완성도와 고객 만족감이 다르게 나타날 수 있습니다. 리브영의원은 원장님과의 1:1 자세한 상담을 통해 목적에 맞는 리프팅 추천 및 최적화된 커스텀 디자인 시술로 높은 완성도와 고객 만족을 제공해 드립니다.",
    introKeywords: ["보이지않는근막층", "정교한설계", "실시간영상분석", "1:1맞춤벡터"],
    introBullets: [
        "보이지 않는 근막층까지, 데이터로 증명하는 거상의 기술",
        "실시간 영상 분석을 통한 1:1 맞춤 벡터 설계"
    ],
    targetAreas: [
        {
            title: "부위별 리프팅",
            desc: "처진 볼살, 깊은 팔자주름, 눈가 처짐을\n데이터 기반으로 정밀하게 리프팅합니다.",
            img: "/images/emoji/Signature/why/lifting/부위별_리프팅.webp"
        },
        {
            title: "페이스 라인 정리",
            desc: "이중턱 지방 제거, 무너진 턱선, 옆광대 라인\n정리로 매끄러운 윤곽을 완성합니다.",
            img: "/images/emoji/Signature/why/lifting/페이스_라인_정리.webp"
        },
        {
            title: "Global Care",
            desc: "외국인 환자를 위한 원장님 직접 영어 상담 및\n1:1 맞춤형 플랜을 제공합니다.",
            img: "/images/emoji/Signature/why/lifting/Global_Care.webp"
        }
    ],
    keyPoints: [
        { title: "안전함", description: "FDA, CE 승인을 받은 검증된\n정품 장비 및 정품 팁 사용." },
        { title: "정밀 분석", description: "공장형 시술이 아닌, 원장님이\n직접 분석하는 프리미엄 진단." }
    ],
    precautions: [
        "시술 후 일시적인 부기나 얼얼함은 수일 내에 자연스럽게 사라집니다.",
        "콜라겐 재생을 위해 약 1주일간 과도한 음주나 고온의 사우나는 피해 주세요.",
        "외출 시 자외선 차단제를 꼼꼼히 발라 피부를 보호해 주세요."
    ],

    bgImage: "/images/covers/리프팅.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/리프팅_m.webp",
    recommendTargets: [
        {
            title: "처진 라인 개선",
            description: "수술 없이 정교한 리프팅으로 처진 \n라인을 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/lifting/처진 라인 개선.webp"
        },
        {
            title: "정교한 맞춤 시술",
            description: "데이터 기반의 개별 맞춤 디자인\n 리프팅을 원하시는 분",
            img: "/images/emoji/Signature/recommend/lifting/정교한 맞춤 시술.webp"
        },
        {
            title: "이중턱/턱선 고민",
            description: "이중턱을 제거하고 무너진 턱선을 \n매끄럽게 정리하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/lifting/이중턱_턱선 고민.webp"
        }
    ],
    treatments: [
        {
            name: "울쎄라피 프라임",
            enName: "Ultherapy",
            description: "FDA 승인 초음파 리프팅. SMAS층까지 정밀하게 에너지를 전달하여 피부 깊은 곳부터 탄력을 재생합니다. 시술 직후부터 효과가 나타나며, 2~3개월에 걸쳐 콜라겐이 재생됩니다.",
            imageUrl: "/images/signature_premium/lifting/울세라프라임.png",
            mediaLabel: "Ultherapy Device",
            mediaSize: "Premium Standard",
            analysisPoint: "피부 두께에 따른 맞춤형 에너지 강도 및 깊이 설정.",
            features: [
                "FDA 승인 유일한 비침습 리프팅",
                "SMAS층 깊이까지 정밀 타겟팅",
                "실시간 영상 기술(DeepSEE) 적용",
                "1:1 커스텀 맞춤 에너지 설계"
            ],
        },
        {
            name: "써마지",
            enName: "Thermage FLX",
            description: "노화된 콜라겐을 수축시키고 새로운 콜라겐 생성을 유도하여 피부 밀도를 강화합니다.",
            features: [
                "RF 고주파 콜라겐 수축·재생",
                "얼굴 전체 탄력 개선",
                "모공 축소 효과",
                "1회 시술로 장기 지속"
            ],
            mediaLabel: "Thermage FLX Device",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/lifting/써마지.png",
            analysisPoint: "시술 부위마다 매 샷마다 달라지는 피부 저항값을 실시간으로 측정하여 가장 최적화된 고주파 에너지를 진피층에 안전하고 정확하게 전달합니다.",
        },
        {
            name: "리니어지",
            enName: "LinearZ",
            description: "0.1mm 단위의 미세 조절이 가능한 선형 초음파 방식으로, 볼 패임 걱정 없이 정교한 라인 정리가 가능합니다. 빠르고 통증 적은 리프팅을 선호하시는 분들께 추천합니다.",
            features: [
                "0.1mm 단위 정밀 선형 조사",
                "볼 패임 등 부작용 최소화",
                "통증은 낮추고 시술 속도는 UP",
                "페이스라인 밀착 리프팅"
            ],
            mediaLabel: "LinearZ Device",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/lifting/리니어지.png",
            analysisPoint: "0.1mm 단위의 미세 조절로 볼 패임 없는 섬세한 라인 정리.",
        },
    ],
    ctaMessage: "리프팅 상담 예약하기",
};

/** 2P - Tightening */
export const TIGHTENING_DATA: TreatmentPageData = {
    slug: "tightening",
    enCategory: "CONTOURING",
    signatureText: "Premium",
    title: "얼굴/바디 컨투어링",
    heroMessage: "피부 밀도를 채우는 고밀도 탄력, 시간이 흘러도 변함없는 탄탄함을 완성합니다",
    description:
        "피부 밀도를 채우는 고밀도 탄력, 시간이 흘러도 변함없는 탄탄함을 완성합니다.",

    subTitle: "피부 밀도를 채우는 고밀도 탄력, 시간이 흘러도 변함없는 탄탄함을 완성합니다.",
    introTitle: "DESIGN",
    introDescription: "컨투어링 시술은 단순히 처진 곳을 올리는 것을 넘어, 얼굴의 불필요한 지방을 정리하고 비어있는 곳을 채워 입체적인 윤곽을 완성하는 고도의 디자인 작업입니다. 리브영클리닉은 해부학적 구조 분석을 통해 당신이 가진 본연의 라인을 유려하게 조각합니다.",
    introKeywords: ["얼굴윤곽조각", "입체적볼륨디자인", "불필요한지방정리", "유려한페이스라인"],
    introBullets: [
        "숨겨진 페이스 라인을 찾아주는 정교함, 리브영만의 컨투어링 미학을 제시합니다.",
        "1:1 입체 분석을 통해 꺼진 부위와 처진 부위를 정밀하게 맵핑하여 시술합니다."
    ],
    targetAreas: [
        {
            title: "Deep Reconstruction",
            desc: "전반적인 피부 노화 및 탄력 저하 개선",
            img: "/images/emoji/Signature/why/contouring/Deep_Reconstruction.webp"
        },
        {
            title: "Barrier Repair",
            desc: "무너진 피부 장벽 및 만성적인 예민함 치료",
            img: "/images/emoji/Signature/why/contouring/Barrier_Repair.webp"
        },
        {
            title: "Texture Refinement",
            desc: "거친 피부 결, 늘어진 모공, 칙칙한 안색의 개선",
            img: "/images/emoji/Signature/why/contouring/Texture_Refinement.webp"
        }
    ],
    keyPoints: [
        {
            title: "미적 디자인",
            description: "단순히 조이는 것이 아니라, 전체적인 얼굴 조화를 고려하여 탄력이 필요한 부위를 입체적으로 디자인합니다."
        },
        {
            title: "글로벌 스탠다드",
            description: "원장님과 영어 상담이 가능한 스태프가 상주하여 외국인 환자의 세밀한 니즈까지 반영합니다."
        }
    ],
    precautions: [
        "시술 후 피부가 일시적으로 건조할 수 있으니 보습제를 충분히 사용해 주세요.",
        "시술 시 발생하는 미세한 붉은 기는 보통 1~3일 내로 자연스럽게 호전됩니다.",
        "세안 및 화장은 시술 다음 날부터 가볍게 가능하며, 자외선 차단제를 반드시 발라주세요."
    ],

    bgImage: "/images/covers/컨투어링.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/컨투어링_m.webp",
    recommendTargets: [
        {
            title: "모공 및 결 개선",
            description: "넓어진 모공과 거친 피부 결을\n쫀쫀하게 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/contouring/모공 및 결 개선.webp"
        },
        {
            title: "피부 밀도 강화",
            description: "느슨해진 피부 장벽을 조여\n고밀도 탄력을 원하시는 분",
            img: "/images/emoji/Signature/recommend/contouring/피부 밀도 강화.webp"
        },
        {
            title: "미세 주름 완화",
            description: "눈가나 입가의 잔주름을\n효과적으로 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/contouring/미세 주름 완화.webp"
        }
    ],
    treatments: [
        {
            name: "얼굴",
            backName: "얼굴 컨투어링 큐레이션",
            enName: "Contouring Curation",
            description:
                "개인의 얼굴 윤곽과 비율을 분석하여 필러, 보톡스, 레이저를 결합한 맞춤형 컨투어링 솔루션을 제공합니다. 인위적이지 않은 자연스러운 입체감을 완성합니다.",
            features: [
                "1:1 페이스 라인 정밀 분석",
                "부위별 맞춤형 복합 시술",
                "자연스러운 볼륨 및 라인 교정",
                "숙련된 핸드 스킬의 디테일 케어"
            ],
            mediaLabel: "Contouring",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/contouring/얼굴.png",
            analysisPoint: "얼굴의 황금 비율을 분석하여 꺼진 부위는 채우고 불필요한 라인은 정리하는 리브영만의 시그니처 디자인 프로토콜을 적용합니다.",
            subItems: [
                { name: "필러" },
                { name: "보톡스" },
                { name: "지방분해주사" },
                { name: "레이저", href: "/treatment/lifting" }
            ]
        },
        {
            name: "바디",
            backName: "바디 컨투어링 큐레이션",
            enName: "Body Contouring Curation",
            description:
                "무너진 바디 라인을 정교하게 다듬어 슬림하고 탄력 있는 실루엣을 만듭니다. 지방 분해와 탄력 개선을 동시에 고려한 큐레이션 플랜을 제안합니다.",
            features: [
                "체형별 맞춤형 라인 설계",
                "지방 분해 및 탄력 동시 개선",
                "고민 부위 집중 타겟팅 시술",
                "일상 복귀가 빠른 비수술적 요법"
            ],
            mediaLabel: "Body Contouring",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/contouring/바디 .webp",
            analysisPoint: "개별 체형과 피부 탄력을 고려하여 가장 효과적인 약물 배합과 에너지 강도를 설정, 매끄러운 바디 라인을 완성합니다.",
            subItems: [
                { name: "보톡스" },
                { name: "지방분해주사" }
            ]
        },
    ],
    ctaMessage: "타이트닝 상담 예약하기",
};

/** 3P - Skin Booster */
export const SKIN_BOOSTER_DATA: TreatmentPageData = {
    slug: "skin-booster",
    enCategory: "SKIN BOOSTER",
    signatureText: "Signature",
    title: "스킨부스터",
    heroMessage: "피부 속부터 차오르는 생기, 분석으로 완성하는 맞춤형 영양 레시피입니다",
    description:
        "피부 속부터 차오르는 생기, 분석으로 완성하는 맞춤형 영양 레시피입니다.",

    subTitle: "피부 속부터 차오르는 생기, 분석으로 완성하는 맞춤형 영양 레시피입니다.",
    introTitle: "DESIGN",
    introDescription: "스킨부스터는 피부 본연의 힘을 길러주는 근본적인 안티에이징의 기초입니다. 리브영클리닉은 일시적 수분 공급을 넘어, 피부 컨디션과 장벽 상태를 체크하여 진피층 깊숙이 콜라겐 재생을 돕는 커스텀 스킨부스터 플랜을 디자인합니다.",
    introKeywords: ["세포재생부스팅", "커스텀약물믹싱", "수분과콜라겐결합", "투명한광채"],
    introBullets: [
        "겉도는 광채가 아닌, 세포 속부터 건강한 아름다움을 설계합니다.",
        "피부 컨디션 정밀 분석을 통한 성분 커스터마이징 및 원장님이 직접 시술합니다."
    ],
    targetAreas: [
        {
            title: "Natural Volume",
            desc: "옆볼, 팔자, 앞광대 등 꺼진 부위 개선",
            img: "/images/emoji/Signature/why/skin booster/Natural Volume.webp"
        },
        {
            title: "Deep Recovery",
            desc: "얼굴 전체 재생 및 장벽 강화",
            img: "/images/emoji/Signature/why/skin booster/Deep_Recovery.webp"
        },
        {
            title: "Glass Skin",
            desc: "나비존 모공, 피부 표면 결 개선 및 광채 형성",
            img: "/images/emoji/Signature/why/skin booster/Glass_Skin.webp"
        }
    ],
    keyPoints: [
        {
            title: "미적 디자인",
            description: "인위적인 볼륨이 아닌, 본연의 얼굴 라인과 조화를 이루는 자연스러운 입체감을 추구합니다."
        },
        {
            title: "섬세한 시술",
            description: "기계 주입보다 시간이 더 걸리더라도 약물 손실을 최소화하고 타겟 층에 정확히 전달하는 원장님만의 숙련된 시술법을 적용합니다."
        },
        {
            title: "글로벌 스탠다드",
            description: "원장님과 영어 상담이 가능한 스태프가 상주하여 외국인 환자의 미세한 니즈까지 완벽히 반영합니다."
        }
    ],
    precautions: [
        "시술 후 발생하는 미세한 엠보싱 현상이나 멍은 보통 3~7일 내에 자연스럽게 사라집니다.",
        "시술 당일 세안과 화장은 가능하나, 가급적 피부에 자극을 주지 않도록 주의해 주세요.",
        "효과 극대화를 위해 시술 후 충분한 수분 섭취와 자외선 차단제 사용을 권장합니다."
    ],
    bgImage: "/images/covers/스킨부스터.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/스킨부스터_m.webp",
    recommendTargets: [
        {
            title: "속건조 해결",
            description: "피부 속부터 차오르는 수분감과\n근본적인 갈증 해결을 원하시는 분",
            img: "/images/emoji/Signature/recommend/skin booster/속건조 해결.webp"
        },
        {
            title: "장벽 강화 및 재생",
            description: "손상된 피부 장벽을 복구하고 세포부터\n 건강한 피부를 원하시는 분",
            img: "/images/emoji/Signature/recommend/skin booster/장벽 강화 및 재생.webp"
        },
        {
            title: "투명한 물광 안색",
            description: "인위적이지 않은 본연의 맑은 광채와 \n 안색을 찾고 싶으신 분",
            img: "/images/emoji/Signature/recommend/skin booster/투명한 물광 안색.webp"
        }
    ],
    treatments: [
        {
            name: "리쥬란",
            enName: "Rejuran Healer",
            description:
                "연어 유래 DNA(PN) 성분이 손상된 피부 세포의 재생을 돕고 장벽을 강화합니다. 예민해진 피부를 건강하게 복구하고 근본적인 탄력을 살려줍니다.",
            features: [
                "DNA 재생 성분 (PN) 함유",
                "피부 재생 및 장벽 강화",
                "예민한 피부 컨디션 복구",
                "잔주름 및 모공 축소"
            ],
            mediaLabel: "Rejuran",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/skin_booster/리쥬란.png",
            analysisPoint: "피부 장벽의 손상도와 두께를 정밀 분석하여 리쥬란의 최적 주입 깊이와 간격을 1:1 커스텀 디자인합니다.",
        },
        {
            name: "레티젠",
            enName: "Retigen",
            description:
                "순수 콜라겐을 진피층에 직접 보충하여 느슨해진 피부 조직을 단단하게 조여줍니다. 즉각적인 타이트닝 효과와 오랜 시간 지속되는 밀도감을 선사합니다.",
            features: [
                "순수 콜라겐 직접 주입",
                "즉각적인 타이트닝 효과",
                "피부 조직 밀도 강화",
                "자연스러운 탄력 개선"
            ],
            mediaLabel: "Retigen",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/skin_booster/레티젠.png",
            analysisPoint: "콜라겐이 소실된 부위를 집중적으로 파악하여 가장 필요한 곳에 정교하게 분산 주입하는 프로토콜을 적용합니다.",
        },
        {
            name: "리바이브",
            enName: "Belotero Revive",
            description:
                "HA 성분과 글리세린이 촘촘하게 수분을 채워주어 속갈증을 완벽하게 해결합니다. 인위적인 느낌 없이 맑고 투명한 물광 안색을 연출합니다.",
            features: [
                "HA + 글리세린 듀얼 포뮬러",
                "강력한 심층 수분 공급",
                "투명한 물광 피부 완성",
                "빠른 안색 개선 효과"
            ],
            mediaLabel: "Revive",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/skin_booster/리바이브.png",
            analysisPoint: "개개인의 진피층 수분 유지력을 맵핑하여 가장 건조한 부위에 수분 부스터 층을 균일하게 설계합니다.",
        },
        {
            name: "리투오",
            enName: "Retuo",
            description:
                "세포 본연의 회복력을 끌어올려 노화된 피부를 정화하고 재생합니다. 피부 에너지를 활성화하여 생기 넘치는 건강한 피부 결을 만들어 줍니다.",
            features: [
                "피부 정화 및 세포 재생",
                "지친 피부 에너지 활성화",
                "매끄러운 결 케어 효과",
                "토탈 안티에이징 재생"
            ],
            mediaLabel: "Retuo",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/skin_booster/리투오.png",
            analysisPoint: "피부의 활성 산소와 노화 척도를 분석하여 맞춤형 재생 에너지를 부여하는 레시피를 제안합니다.",
        },
        {
            name: "쥬베룩",
            enName: "Juvelook",
            description:
                "자가 콜라겐 재생을 촉진하는 PLA 성분이 시간이 지날수록 자연스러운 볼륨감을 형성합니다. 결절 걱정 없이 모공과 흉터를 정교하게 개선합니다.",
            features: [
                "자가 콜라겐 재생 유도",
                "시간이 흐를수록 차오르는 볼륨",
                "모공 및 흉터 집중 개선",
                "부드러운 입자 조형 기법"
            ],
            mediaLabel: "Juvelook",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/skin_booster/쥬베룩.png",
            analysisPoint: "볼륨이 필요한 페이스 라인을 입체적으로 분석하여 조화롭고 자연스러운 라인을 디자인합니다.",
        },
    ],
    ctaMessage: "스킨부스터 상담 예약하기",
};

/** 4P - Texture (미백/모공/흉터) */
export const TEXTURE_DATA: TreatmentPageData = {
    slug: "texture",
    enCategory: "TEXTURE",
    signatureText: "Premium",
    title: "미백/모공/흉터",
    heroMessage: "결점 너머의 투명함, 피부 재생의 메커니즘을 정밀하게 재건합니다",
    description:
        "지우는 것을 넘어, 건강한 피부 바탕의 본연을 되찾아 드립니다.",

    subTitle: "결점 너머의 투명함, 피부 재생의 메커니즘을 정밀하게 재건합니다.",
    introTitle: "DESIGN",
    introDescription: "매끄럽고 깨끗한 피부결은 모든 아름다움의 기본 바탕이 됩니다. 리브영클리닉은 표피성의 얕은 색소부터 도달하기 힘든 진피층의 난치성 기미, 깊이 파인 흉터까지 피부 병변을 정확히 파악하여 깨끗한 톤과 결을 찾아주는 레이저 플랜을 디자인합니다.",
    introKeywords: ["듀얼복합레이저", "색소지우개", "난치성기미치료", "피부톤업"],
    introBullets: [
        "지우는 것을 넘어, 건강한 피부 바탕의 본연을 되찾아 드립니다.",
        "색소의 뿌리와 흉터의 깊이를 파악하는 심층분석 및 피부 타입별 맞춤 파라미터 세팅"
    ],
    targetAreas: [
        {
            title: "Tone Correction",
            desc: "난치성 기미, 잡티, 흐릿한 안색 개선",
            img: "/images/emoji/Signature/why/texture/Tone_Correction.webp"
        },
        {
            title: "Scar Reconstruction",
            desc: "여드름 흉터, 수술 흉터, 패인 자국 재생",
            img: "/images/emoji/Signature/why/texture/Scar_Reconstruction.webp"
        },
        {
            title: "Pore Tightening",
            desc: "나비존 모공, 늘어진 세로 모공 및 결 개선",
            img: "/images/emoji/Signature/why/texture/Pore_Tightening.webp"
        }
    ],
    keyPoints: [
        {
            title: "미적 디자인",
            description: "단순히 흉터를 메우는 것이 아니라, 전체적인 피부 결의 조화와 매끄러운 텍스처를 구현합니다."
        },
        {
            title: "정교한 레이어링",
            description: "색소의 깊이에 따라 레이저를 다르게 배분하는 원장님만의 복합 치료 프로토콜을 적용합니다."
        },
        {
            title: "글로벌 스탠다드",
            description: "원장님과 영어 상담이 가능한 스태프가 상주하여 외국인 환자의 미세한 피부 고민까지 완벽히 소통합니다."
        }
    ],
    precautions: [
        "시술 후 발생하는 붉은 기나 미세한 딱지는 재생 과정의 일부이며 보통 3~7일 내에 탈락됩니다.",
        "딱지를 억지로 떼지 마시고, 피부 재생을 위해 보습제와 재생 크림을 충분히 사용해 주세요.",
        "시술 부위가 자외선에 노출되지 않도록 자외선 차단제를 꼼꼼히 바르는 것이 중요합니다."
    ],
    bgImage: "/images/covers/미백_모공_흉터.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/미백_모공_흉터_m.webp",
    recommendTargets: [
        {
            title: "색소 고민 해결",
            description: "기미, 잡티 등 얼룩덜룩한 피부 톤을 \n맑게 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/texture/색소 고민 해결.webp"
        },
        {
            title: "매끄러운 피부 결",
            description: "여드름 흉터나 패인 자국 등 거친 \n피부 텍스처가 고민이신 분",
            img: "/images/emoji/Signature/recommend/texture/매끄러운 피부 결.webp"
        },
        {
            title: "투명한 피부 완성",
            description: "색소의 뿌리부터 치료하여 투명한\n 피부 바탕을 원하시는 분",
            img: "/images/emoji/Signature/recommend/texture/투명한 피부 완성.webp"
        }
    ],
    treatments: [
        {
            name: "피코",
            enName: "Pico Toning",
            description:
                "초강력 파장으로 타겟 색소 입자를 잘게 파괴합니다. 주변 조직 손상을 최소화하며 기미, 잡티 등 색소만을 선택적으로 제거하여 투명한 안색을 선사합니다.",
            features: [
                "기미, 잡티 선택적 제거",
                "초강력 파장 색소 입자 파괴",
                "주변 정상 조직 손상 최소화",
                "맑고 투명한 피부톤 개선"
            ],
            mediaLabel: "Pico Toning",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/texture/피코.png",
            analysisPoint: "색소 병변의 종류와 깊이를 분석하여 기미의 뿌리까지 확실하게 타겟팅하는 정밀 토닝 플랜을 설계합니다.",
        },
        {
            name: "포텐자",
            enName: "Potenza",
            description:
                "마이크로 니들을 통해 피부 진피층에 고주파(RF) 에너지를 전달합니다. 모공, 흉터, 탄력을 동시에 개선하고 피부 재생을 강력하게 유도합니다.",
            features: [
                "10가지 이상 맞춤형 팁 사용",
                "모공, 흉터, 탄력 동시 개선",
                "진피층 고주파 에너지 전달",
                "개인별 피부 상태 맞춤 시술"
            ],
            mediaLabel: "Potenza",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/texture/포텐자.png",
            analysisPoint: "흉터의 깊이와 모공의 크기에 따라 니들의 깊이와 에너지 강도를 0.1mm 단위로 미세 조절합니다.",
        },
        {
            name: "레프톤",
            enName: "Lephton",
            description:
                "피부 톤업과 미세 탄력 개선에 최적화된 레이저입니다. 통증을 낮추면서도 안색 개선 효과가 뛰어나 맑고 건강한 피부 바탕을 완성합니다.",
            features: [
                "즉각적인 안색 개선 효과",
                "피부 톤업 및 미세 탄력 강화",
                "통증과 자극을 최소화한 시술",
                "맑음의 미학을 담은 톤 케어"
            ],
            mediaLabel: "Lephton",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/texture/레프톤.png",
            analysisPoint: "전체적인 피부 톤의 균일도를 분석하여 칙칙한 부위를 집중 밝혀주는 커스텀 화이트닝 프로토콜을 적용합니다.",
        },
        {
            name: "CO2 레이저",
            enName: "CO2 Laser",
            description:
                "수분에 잘 흡수되는 파장을 이용해 점, 검버섯, 한관종 등 피부 병변을 정밀하게 제거합니다. 강력한 에너지로 깔끔한 제거와 빠른 회복을 돕습니다.",
            features: [
                "점, 검버섯, 비립종 정밀 제거",
                "고출력 에너지 병변 타겟팅",
                "주변 조직 손상 최소화",
                "깨끗한 피부 바탕 완성"
            ],
            mediaLabel: "CO2 Laser",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/texture/co2.webp",
            analysisPoint: "제거할 병변의 크기와 뿌리 깊이를 파악하여 흉터를 최소화하는 방향으로 섬세하게 레이저를 분사합니다.",
        },
    ],
    ctaMessage: "색소 & 흉터 모공 상담 예약하기",
};

/** 5P - Stem Cell (노바스템 줄기세포) */
export const STEM_CELL_DATA: TreatmentPageData = {
    slug: "stem-cell",
    enCategory: "STEM CELL",
    signatureText: "Premium",
    title: "줄기세포",
    heroMessage: "피부 본연의 자생력을 깨우는 고농도 줄기세포, 노바스템이 선사하는 재생의 정점",
    description:
        "단순한 채움이 아닌, 세포 본연의 힘을 되살리는 근본적인 자생 솔루션입니다.",

    subTitle: "피부 근본의 자생력을 깨우는 고농도 줄기세포, 노바스템이 선사하는 재생의 정점.",
    introTitle: "NOVASTEM",
    introDescription: "노바스템 줄기세포 치료는 분화 능력이 뛰어난 줄기세포의 강력한 재생 에너지를 피부 진피층에 직접 전달하는 리브영만의 하이엔드 안티에이징 프로토콜입니다. 무너진 피부 장벽을 재건하고 콜라겐과 엘라스틴의 자생을 유도하여, 시간이 흐를수록 더 건강하고 탄탄해지는 근본적인 피부의 변화를 실현합니다.",
    introKeywords: ["고농도줄기세포", "세포재생의정점", "피부자생력강화", "노화역전"],
    introBullets: [
        "세포 속부터 차오르는 젊음의 에너지, 노바스템이 피부 시계를 되돌립니다.",
        "정밀 분석을 통한 커스텀 주입 및 숙련된 핸드 스킬을 통한 유효 성분 전달 극대화"
    ],
    targetAreas: [
        {
            title: "Deep Reconstruction",
            desc: "전반적인 피부 노화 및 탄력 저하 개선",
            img: "/images/emoji/Signature/why/stem cell/Deep_Reconstruction.webp"
        },
        {
            title: "Barrier Repair",
            desc: "무너진 피부 장벽 및 만성적인 예민함 치료",
            img: "/images/emoji/Signature/why/stem cell/Barrier_Repair.webp"
        },
        {
            title: "Texture Refinement",
            desc: "거친 피부 결, 늘어진 모공, 칙칙한 안색의 개선",
            img: "/images/emoji/Signature/why/stem cell/Texture_Refinement.webp"
        }
    ],
    keyPoints: [
        {
            title: "미적 디자인",
            description: "인위적인 볼륨 형성이 아닌, 본연의 예쁜 얼굴 라인을 유지하면서 피부 밀도만을 단단하게 채웁니다."
        },
        {
            title: "세포 과학 시술",
            description: "검증된 노바스템 배양액을 최적의 활성 상태에서 시술하여 줄기세포 특유의 재생 효율을 극대화합니다."
        },
        {
            title: "글로벌 스탠다드",
            description: "프리미엄 줄기세포 시술을 원하는 글로벌 고객님들을 위해 원장님의 영어 상담 및 맞춤 케어를 제공합니다."
        }
    ],
    precautions: [
        "시술 후 며칠간은 시술 부위가 미세하게 붉어지거나 부을 수 있으나 자연스럽게 사라집니다.",
        "세포 재생이 활발히 일어나는 기간이므로 숙면과 충분한 수분 섭취를 권장합니다.",
        "줄기세포 성분의 정착을 위해 시술 직후 과도한 자극이나 경락 마사지는 피해주세요."
    ],
    bgImage: "/images/covers/줄기세포.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/줄기세포_m.webp",
    recommendTargets: [
        {
            title: "근본적 재생 원함",
            description: "일시적인 효과가 아닌 피부 본연의\n재생력을 얻고 싶으신 분",
            img: "/images/emoji/Signature/recommend/stem cell/근본적 재생 원함.webp"
        },
        {
            title: "심한 노화/탄력 고민",
            description: "노화가 진행되어 탄력이 전체적으로\n떨어지고 피부가 얇아진 분",
            img: "/images/emoji/Signature/recommend/stem cell/심한 노화_탄력 고민.webp"
        },
        {
            title: "고급 안티에이징",
            description: "프리미엄 줄기세포를 통해 피부 결, 톤, \n탄력을 올인원 케어하고 싶은 분",
            img: "/images/emoji/Signature/recommend/stem cell/고급 안티에이징.webp"
        }
    ],
    treatments: [
        {
            name: "노바스템 줄기세포",
            enName: "Novastem Cell",
            description:
                "고농축 줄기세포 배양액과 고함량 히알루론산을 결합하여 노화된 피부를 정화하고 세포 단위를 리프팅하며, 피부 겉면의 수분 광채와 속 피부의 재생력을 동시에 잡는 리브영의 핵심 재생 솔루션입니다.",
            features: [
                "고농축 줄기세포 배양액 및 HA 복합 포뮬러",
                "세포 재생 및 콜라겐 자생 유도",
                "피부 장벽 재건 및 항염 효과",
                "속건조 해결 및 표면 수분 광채 형성"
            ],
            mediaLabel: "Novastem",
            mediaSize: "Premium Standard",
            imageUrl: "/images/signature_premium/stem_cell/노바스템 줄기세포 복사.webp",
            analysisPoint: "현재 피부의 노화 수준과 자생 능력, 수분 보유력을 정밀하게 체크하여 최적의 맞춤형 재생 범위를 설계합니다.",
        },
    ],
    ctaMessage: "노바스템 줄기세포 상담 예약하기",
};

/** 모든 시술 페이지 데이터 맵핑 (slug → data) */
export const TREATMENT_DATA_MAP: Record<string, TreatmentPageData> = {
    lifting: LIFTING_DATA,
    tightening: TIGHTENING_DATA,
    "skin-booster": SKIN_BOOSTER_DATA,
    texture: TEXTURE_DATA,
    "stem-cell": STEM_CELL_DATA,
};
