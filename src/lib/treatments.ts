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
    precautionGroups?: { title: string; items: string[] }[];
    faqs?: { question: string; answer: string }[];

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

const PRECAUTION_GUIDES = {
    pigmentationLaser: {
        title: "색소레이저",
        items: [
            "레이저 직후에는 약간의 붉음증, 따끔거림이 일시적으로 있을 수 있습니다. 자연스럽게 호전됩니다.",
            "레이저 후 일시적으로 피부가 건조하고 당기는 느낌이 있을 수 있어서 보습제나 재생크림은 충분히 발라주는 것이 좋습니다.",
            "외출 시에는 자외선 차단제를 꼭 발라주시고, 시술 후 예민해진 피부를 위해 강한 자외선 노출은 피해주시는 것이 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다."
        ]
    },
    liftingLaser: {
        title: "울쎄라 / 리니어지",
        items: [
            "시술 직후에는 얼굴이 약간 붉어지거나 붓고, 뻐근한 느낌이나 미세한 통증, 당김이 있을 수 있습니다. 이런 반응은 대부분 수일에서 수주에 걸쳐 자연스럽게 완화됩니다.",
            "피부를 강하게 문지르거나 마사지, 경락처럼 압력을 주는 행동은 피하는 것이 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다."
        ]
    },
    tighteningDevice: {
        title: "써마지 / 올타이트",
        items: [
            "시술 후 얼굴이 일시적으로 열감, 붉어질 수 있으나 보통은 수 시간~1일 내 자연스럽게 완화됩니다.",
            "일시적으로 피부가 예민하거나 건조한 느낌이 들 수 있어 보습제를 충분히 자주 발라 피부가 건조해지지 않도록 관리해 주시는 것이 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다."
        ]
    },
    lephton: {
        title: "레프톤",
        items: [
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다.",
            "보습제와 재생에 도움이 될 수 있는 제품을 충분히 발라주시는 게 좋습니다."
        ]
    },
    co2Laser: {
        title: "CO2 레이저",
        items: [
            "시술 후 1~2주 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다.",
            "시술 후 초반 1~3일은 재생되는 과정에서 재생 테이프 안에 진물이 차오르며 흐를 수 있습니다. 이 경우 시술 부위에 오염되지 않게 깨끗한 손으로 재생테이프(듀오덤)를 교체해 주시면 됩니다.",
            "재생테이프(듀오덤)는 14일 유지 권장하나, 병변이 작거나 얕은 경우 때에 따라 1~2주 유지해 주셔도 됩니다.",
            "시술 부위는 시술 후 몇 개월 동안은 붉거나 색소침착이 보일 수 있습니다.",
            "재생테이프(듀오덤) 사용이 끝난 이후에는 자외선 차단 관리가 중요합니다. 외출 시 자외선 차단에 신경 써주셔야 합니다.",
            "몸에 있는 병변을 제거한 경우 얼굴보다 재생이 더딜 수 있습니다. 관리에 더 신경 써주세요.",
            "한 번에 제거가 안될 가능성이 높은 시술입니다. 동일 부위 재시술은 3~6개월 이상 지나시고 권장 드립니다."
        ]
    },
    potenza: {
        title: "포텐자",
        items: [
            "시술 후 당일은 화끈거리는 느낌, 붉음증, 붓기가 발생하실 수 있으나 수일 내로 사라지게 됩니다.",
            "세안과 화장은 가급적 다음날부터 권장드립니다. 미온수로 가볍게 세안하시는 것이 좋습니다.",
            "얼굴 각질이 일어나는 경우 억지로 세게 밀어 제거하는 것은 좋지 않고, 보습제와 재생에 도움이 될 수 있는 제품을 충분히 발라주시는 게 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다.",
            "시술 후에는 피부가 예민해진 상태일 수 있어서 외출 시에 자외선 차단제를 발라주시는 것이 좋습니다."
        ]
    },
    juvelook: {
        title: "쥬베룩",
        items: [
            "시술 직후 붓기, 멍, 약간의 통증, 주사 부위의 작은 뭉침이나 단단한 느낌이 있을 수 있습니다. 이는 약물이 자리 잡는 과정에서 나타날 수 있는 자연스러운 반응으로 대부분 시간이 지나면서 서서히 완화됩니다.",
            "시술한 부위를 강하게 문지르는 행동은 피해주시고, 마사지나 경락처럼 압력이 크게 가해지는 관리는 일주일 정도 피해주시는 게 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다.",
            "세안과 화장은 가급적 다음날부터 권장 드립니다. 보습제와 재생크림은 충분히 발라주시는 게 좋습니다."
        ]
    },
    skinBooster: {
        title: "스킨부스터",
        items: [
            "시술 후 붉음증, 붓기, 멍, 주삿바늘 자국이 동반될 수 있으며, 피부 표면이 엠보싱처럼 살짝 볼록하게 올라와 보일 수 있습니다. 이는 약물이 주입되면서 나타나는 자연스러운 반응으로, 대부분 수시간에서 2~3일 이내에 점차 가라앉습니다.",
            "시술 후 일시적으로 피부가 예민해진 상태이므로 스크럽·필링 등 자극적인 제품 사용은 당분간 피해주시기 바랍니다.",
            "세안과 화장은 가급적 다음날부터 권장 드립니다. 보습제와 재생크림은 충분히 발라주시는 게 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다."
        ]
    },
    filler: {
        title: "필러",
        items: [
            "시술 후에는 붓기, 붉은기, 멍, 약간의 통증이나 이물감이 일시적으로 나타날 수 있으며 대부분 며칠 내 자연스럽게 호전됩니다.",
            "시술 후 모양이 자리 잡는 동안 일시적으로 울퉁불퉁한 느낌이 있을 수 있으나 대부분 시간이 지나면서 자연스럽게 안정됩니다.",
            "시술 부위를 과하게 만지거나 누르지 않도록 주의해주시고, 시술 후 일주일 정도는 강한 마사지나 경락은 피해주시는 것이 좋습니다.",
            "세안과 가벼운 화장은 보통 다음날부터 가능하며, 시술 부위에 자극이 가지 않도록 관리해주시는 것이 좋습니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과격한 운동, 음주, 흡연은 피하시는 것이 좋습니다.",
            "시술 부위에 재생테이프(듀오덤)를 붙여드리는 경우 하루 정도 붙이고 다음날 제거 해주시면 됩니다.",
            "입술 필러 시술을 한 경우 빨대 사용은 1~2주 피해 주셔야 합니다."
        ]
    },
    botox: {
        title: "보톡스",
        items: [
            "시술 부위에 따라 일시적으로 뻐근함, 멍, 붓기, 묵직한 느낌이 있을 수 있으며 대부분 수일 내 자연스럽게 호전됩니다. 효과는 빠르면 수일만에 느껴질 수는 있으나 보통 1~2주부터 나타납니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과도한 운동, 음주, 흡연은 피하시는 것이 좋습니다.",
            "턱 보톡스 시술 후 일주일 정도 질기거나 딱딱한 음식을(껌, 오징어 등) 피하는 것이 좋습니다."
        ]
    },
    skinBotox: {
        title: "스킨보톡스",
        items: [
            "시술 후에는 엠보싱 현상이나 약간의 붓기, 멍, 주삿바늘 자국이 일시적으로 나타날 수 있으며 대부분 수시간에서 수일 내 자연스럽게 호전됩니다.",
            "시술 부위는 일시적으로 표정 어색함이 나타날 수 있으나 점점 호전됩니다.",
            "일주일 정도는 사우나, 찜질방 등 지나치게 더운 환경과 과격한 운동, 음주, 흡연은 피하시는 것이 좋습니다."
        ]
    }
} satisfies Record<string, { title: string; items: string[] }>;

export const ALL_PRECAUTION_GROUPS = Object.values(PRECAUTION_GUIDES);

const POTENZA_TREATMENT: TreatmentItem = {
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
};

const BRIGHTON_TREATMENT: TreatmentItem = {
    name: "브라이톤",
    enName: "Brighton",
    description:
        "색소 병변과 칙칙한 피부톤을 정밀하게 타겟팅하여 맑고 균일한 피부 바탕을 완성하는 미백·색소 케어 장비입니다.",
    features: [
        "기미, 잡티 등 색소 고민 개선",
        "칙칙한 안색과 피부톤 정리",
        "개인별 색소 깊이 맞춤 시술",
        "맑고 투명한 피부 바탕 완성"
    ],
    mediaLabel: "Brighton",
    mediaSize: "Premium Standard",
    imageUrl: "/images/signature_premium/texture/브라이톤.jpeg",
    analysisPoint: "색소의 종류와 깊이, 피부톤의 균일도를 함께 분석하여 맞춤 미백·색소 프로토콜을 설계합니다.",
};

const LEPHTON_TREATMENT: TreatmentItem = {
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
    analysisPoint: "전체적인 피부 톤의 균일도와 탄력 저하 부위를 분석하여 커스텀 톤업·타이트닝 프로토콜을 적용합니다.",
};

const CO2_LASER_TREATMENT: TreatmentItem = {
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
};

const ALLTIGHT_TREATMENT: TreatmentItem = {
    name: "올타이트",
    enName: "Alltight",
    description:
        "리프팅 장비로, 피부 탄력 저하와 무너진 라인을 정교하게 관리하는 프리미엄 타이트닝 솔루션입니다.",
    features: [
        "피부 탄력 및 라인 개선",
        "개인별 처짐 정도 맞춤 설계",
        "프리미엄 타이트닝 리프팅"
    ],
    mediaLabel: "Alltight",
    mediaSize: "Premium Standard",
    imageUrl: "/images/signature_premium/lifting/올타이트.png",
    analysisPoint: "피부 두께와 탄력 저하 정도를 분석하여 리프팅 목적에 맞는 맞춤 프로토콜로 운영됩니다.",
};

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
    precautionGroups: [
        PRECAUTION_GUIDES.liftingLaser,
        PRECAUTION_GUIDES.tighteningDevice,
        PRECAUTION_GUIDES.lephton
    ],
    faqs: [
        {
            question: "울쎄라피와 써마지의 차이점은 무엇인가요?",
            answer: "울쎄라피는 초음파를 이용해 처진 근막층(SMAS)을 끌어올리는 '윤곽 리프팅'에 효과적이며, 써마지는 고주파로 피부 표면의 탄력을 높이고 쫀쫀하게 만드는 '타이트닝'에 특화되어 있습니다.\n개인의 피부 두께, 처짐 정도, 탄력 상태에 따라 적합한 장비가 달라질 수 있으며, 보통은 두 시술을 병행하여 시너지 효과를 필요로 하는 경우가 많습니다."
        },
        {
            question: "리니어지 리프팅의 장점은 무엇인가요?",
            answer: "리니어지는 초음파 에너지를 이용해 피부 처짐과 얼굴 라인 개선에 도움을 주는 리프팅 시술입니다.\n기존 초음파 리프팅 장비들이 주로 제한된 깊이층을 공략했다면, 리니어지는 4가지 깊이층을 세분화해 시술할 수 있어 피부 두께와 처짐 정도에 따라 보다 정교한 맞춤 리프팅이 가능합니다. 또한 얼굴뿐 아니라 별도의 바디전용 팁이 있어서 복부, 팔뚝, 허벅지 등 바디 라인까지 시술범위를 넓힐 수 있습니다."
        },
        {
            question: "리프팅 시술 효과는 언제부터 나타나나요?",
            answer: "시술 직후에도 어느 정도의 탄력을 느끼실 수 있지만, 콜라겐이 재생이 진행되면서 효과가 나타나는 시기는 피부상태, 시술부위, 장비종류에 따라 달라질 수 있습니다."
        },
        {
            question: "울쎄라피,써마지 효과시기",
            answer: "시술직후 일시적인 타이트닝감을 느낄 수 있으나, 본격적인 효과는 보통 1~3개월에 걸쳐 서서히 나타나며, 3~6개월 사이 가장 뚜렷하게 체감됩니다. 유지기간은 개인차가 있지만 보통 6개월~1년 정도입니다."
        },
        {
            question: "리니어지 효과시기",
            answer: "시술직후 라인이 정리되는 느낌을 받을 수 있으며, 본격적인 효과는 보통 2~4주 후부터 서서히 나타나고, 1~3개월 사이 점차 뚜렷하게 체감됩니다.\n유지기간은 개인차가 있지만 보통 3~6개월 정도입니다."
        },
        {
            question: "얼굴 살이 없는 편인데 리프팅을 받아도 될까요?",
            answer: "얼굴 살이 적은 경우에는 무리한 리프팅 시술시 볼 꺼짐이나 얼굴이 더 마른 느낌이 생길 수 있어 신중한 접근이 필요합니다.\n리브영에서는 피부두께, 지방량, 처짐 정도를 확인하여 정확한 디자인을 통해 섬세하게 시술합니다. 경우에 따라 열에너지 부담이 적은 레프톤을 병행해 볼패임 위험은 줄이고, 리프팅효과를 더욱 높이는 맞춤 시술로 진행할 수 있습니다."
        },
        {
            question: "정품 인증이 가능한가요?",
            answer: "네 가능합니다. 리브영에서는 정품 장비와 정품 팁을 사용하고 있으며, 정품인증과 눈앞에서 직접 개봉해드리고 있습니다."
        }
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
        LEPHTON_TREATMENT,
        ALLTIGHT_TREATMENT,
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
    precautionGroups: [
        PRECAUTION_GUIDES.filler,
        PRECAUTION_GUIDES.botox,
        PRECAUTION_GUIDES.skinBotox
    ],
    faqs: [
        {
            question: "보톡스 시술 후 표정이 어색하거나 부자연스러워지지 않나요?",
            answer: "보톡스는 근육의 움직임을 조절하는 시술이라, 부위나 용량에 따라 일시적으로 표정이 어색하게 느껴질 수 있습니다. 리브영에서는 얼굴 근육의 움직임과 표정 습관을 고려해 과하지 않고, 자연스러운 변화를 목표로 시술합니다. 불편감이 오래 지속되거나 비대칭이 심하게 느껴진다면 내원상담을 권장드립니다."
        },
        {
            question: "보톡스는 언제 효과가 나타나나요?",
            answer: "보톡스 효과는 시술 부위와 개인의 근육 상태에 따라 차이가 있습니다. 주름보톡스는 보통 시술 후 2~3일 뒤부터 서서히 반응이 나타나며, 1~2주 정도에 효과를 체감하는 경우가 많습니다.\n턱/바디 보톡스처럼 근육 크기를 줄이는 시술은 변화가 조금 더 천천히 나타나 2~4주 이후부터 점차 라인이 정리될 수 있습니다."
        },
        {
            question: "보톡스 주기는 어떻게 되나요?",
            answer: "보톡스 유지기간은 부위와 개인의 근육 상태에 따라 다르지만, 보통 3~6개월 정도 지속됩니다.\n너무 짧은 간격으로 반복 시술할 경우 내성 가능성이 높아질 수 있어, 의료진 상담 후 적절한 주기로 진행하는 것이 좋습니다."
        },
        {
            question: "보톡스 내성이 생길 수 있나요?",
            answer: "보톡스를 너무 자주 맞거나 과한 용량으로 반복될 경우, 드물게 내성이 생길 수 있습니다.\n리브영에서는 내성가능성이 낮은 제품을 사용하며, 개인의 근육상태에 맞춰 적절한 용량과 시술 간격을 안내해드립니다."
        },
        {
            question: "필러 시술 후 부자연스러울까 봐 걱정돼요.",
            answer: "필러의 핵심은 '과유불급'입니다. 리브영은 고객님의 얼굴 골격과 근육 움직임을 고려하여 자연스러운 볼륨감을 구현해드립니다."
        },
        {
            question: "필러 시술 후 유지 기간은 어떻게 되나요?",
            answer: "제품의 종류와 시술 부위에 따라 상이하지만, 보통 6개월에서 1년 6개월 정도 유지됩니다.\n주기적인 리터치를 통해 더욱 오랫동안 예쁜 모양을 유지할 수 있습니다."
        },
        {
            question: "시술 후 바로 일상생활이 가능한가요?",
            answer: "네, 별도의 회복 기간 없이 즉시 일상생활이 가능합니다.\n다만 시술 부위에 강한 압박을 주거나 사우나, 과도한 음주는 1주일 정도 피해주시는 것이 좋습니다."
        }
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
                { name: "레이저" }
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
    precautionGroups: [
        PRECAUTION_GUIDES.skinBooster,
        PRECAUTION_GUIDES.juvelook
    ],
    faqs: [
        {
            question: "스킨부스터는 어떤 방식으로 시술하나요?",
            answer: "스킨부스터는 제품 종류와 시술 부위, 피부상태에 따라 손주사,인젝터,캐뉼라 등 다양한 방식으로 진행 될 수 있습니다. 피부 고민과 필요한 깊이에 맞춰 적합한 주입 방법을 선택하며, 리브영에서는 상담 후 피부 상태에 맞는 방식으로 시술을 진행합니다."
        },
        {
            question: "통증이 심하지는 않나요?",
            answer: "개인차가 있으나 리브영에서는 통증을 최소화하기 위해 충분한 마취 크림을 도포하고, 필요시 국소마취를 병행해 통증 부담을 줄입니다.\n또한 얇은 마이크로 니들을 사용해 피부 자극과 통증을 최소화하는 방식으로 시술합니다."
        },
        {
            question: "시술 후 엠보싱(올록볼록한 자국) 현상은 얼마나 가나요?",
            answer: "약물이 피부에 흡수되는 과정에서 나타나는 자연스러운 현상입니다.\n보통 1~3일 이내에 자연스럽게 사라지며, 피부상태나 시술 부위에 따라 회복기간은 달라질 수 있습니다. 필요 시 LDM등 진정관리를 병행하면 엠보싱이 남아있는 기간을 줄이는데 도움을 줄 수 있습니다."
        },
        {
            question: "몇 번 정도 받아야 효과를 볼 수 있나요?",
            answer: "1회 시술로도 효과를 어느정도 느끼실 수 있지만,\n콜라겐 생성과 피부 밀도 개선은 점진적으로 나타나기 때문에 꾸준한 시술이 효과 유지에 도움이 됩니다. 보통 3~4주 간격으로 3회이상 시술을 권장드립니다."
        },
        {
            question: "스킨부스터 종류는 어떻게 선택하나요?",
            answer: "스킨부스터는 제품마다 기대할 수 있는 효과와 적합한 피부타입이 다릅니다. 리브영에서는\n피부 진단과 상담을 통해 수분,탄력,모공,피부결,재생 등 고민에 맞는 시술을 추천드립니다."
        },
        {
            question: "시술 후 관리는 어떻게 하는게 좋을까요?",
            answer: "수분보습 및 재생관리와 자외선 차단이 제일 중요합니다.\n시술 만으로도 효과를 보실수 있지만 홈케어를 병행해주셨을때 최고의 효과를 끌어내실수있습니다."
        }
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

/** 4P - Pore */
export const PORE_DATA: TreatmentPageData = {
    slug: "pore",
    enCategory: "PORE",
    signatureText: "Premium",
    title: "모공",
    heroMessage: "넓어진 모공과 거친 피부결을 정교하게 재건합니다",
    description:
        "피부결을 정교하게 다듬어 매끄럽고 탄탄한 피부 바탕을 완성합니다.",

    subTitle: "넓어진 모공과 거친 피부결을 정교하게 재건합니다.",
    introTitle: "DESIGN",
    introDescription: "매끄럽고 탄탄한 피부결은 모든 아름다움의 기본 바탕이 됩니다. 리브영클리닉은 모공의 크기와 피부결의 거칠기, 흉터 깊이를 정밀하게 분석하여 포텐자를 중심으로 맞춤형 모공 개선 플랜을 디자인합니다.",
    introKeywords: ["포텐자", "모공타이트닝", "피부결개선", "맞춤RF"],
    introBullets: [
        "넓어진 모공과 거친 결을 정교하게 조율해 건강한 피부 바탕을 되찾아 드립니다.",
        "모공의 크기와 흉터의 깊이를 파악하는 심층 분석 및 피부 타입별 맞춤 파라미터 세팅"
    ],
    targetAreas: [
        {
            title: "Pore Tightening",
            desc: "나비존 모공, 늘어진 세로 모공 및 결 개선",
            img: "/images/emoji/Signature/why/texture/Pore_Tightening.webp"
        },
        {
            title: "Scar Reconstruction",
            desc: "여드름 흉터, 수술 흉터, 패인 자국 재생",
            img: "/images/emoji/Signature/why/texture/Scar_Reconstruction.webp"
        },
        {
            title: "Texture Refinement",
            desc: "거칠어진 피부결과 탄력 저하 동시 개선",
            img: "/images/emoji/Signature/why/texture/Tone_Correction.webp"
        }
    ],
    keyPoints: [
        {
            title: "정밀 모공 분석",
            description: "모공의 위치와 크기, 피부결의 거칠기를 함께 분석하여 필요한 부위에만 에너지를 정교하게 전달합니다."
        },
        {
            title: "맞춤 RF 설계",
            description: "피부 두께와 민감도에 맞춰 포텐자 팁과 에너지 강도를 조절하는 맞춤 프로토콜을 적용합니다."
        },
        {
            title: "글로벌 스탠다드",
            description: "원장님과 영어 상담이 가능한 스태프가 상주하여 외국인 환자의 미세한 모공 고민까지 세밀하게 소통합니다."
        }
    ],
    precautions: [
        "시술 후 발생하는 붉은 기나 미세한 딱지는 재생 과정의 일부이며 보통 3~7일 내에 탈락됩니다.",
        "딱지를 억지로 떼지 마시고, 피부 재생을 위해 보습제와 재생 크림을 충분히 사용해 주세요.",
        "시술 부위가 자외선에 노출되지 않도록 자외선 차단제를 꼼꼼히 바르는 것이 중요합니다."
    ],
    precautionGroups: [
        PRECAUTION_GUIDES.potenza
    ],
    faqs: [
        {
            question: "모공 레이저 통증과 다운타임이 어떻게 되나요?",
            answer: "포텐자는 미세니들을 사용한 시술이기 때문에 통증은 있는 시술입니다. 시술 전 마취크림을 도포해드리고 있으나 통증에 취약하신 분은 마취시간을 늘려드리고 있습니다.\n시술 후 주사자국이나 붉음증이 남을 수 있으며, 개인의 피부 재생능력에 따라 가라앉는데까지 길게는 1~2주까지 지속됩니다."
        },
        {
            question: "모공 시술 권장주기는 어떻게 되나요?",
            answer: "고객님의 피부상태에 따라 다르지만 보통 4주 간격 3회정도 권유해드리고 있습니다."
        },
        {
            question: "모공레이저 후 피부가 건조해지는 이유는 무엇인가요?",
            answer: "레이저 시술은 피부에 에너지를 조사하므로써 열을 올리는 시술이므로 건조함을 느낄 수 있습니다. 충분한 보습 관리와 수분섭취가 회복에 도움이 됩니다."
        }
    ],
    bgImage: "/images/covers/미백_모공_흉터.webp",
    mobileBgImage: "/images/cover_m/Signature 시술/미백_모공_흉터_m.webp",
    recommendTargets: [
        {
            title: "매끄러운 피부 결",
            description: "여드름 흉터나 패인 자국 등 거친 \n피부 텍스처가 고민이신 분",
            img: "/images/emoji/Signature/recommend/texture/매끄러운 피부 결.webp"
        },
        {
            title: "탄탄한 모공 케어",
            description: "늘어진 모공과 피부 탄력을 함께\n 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/texture/투명한 피부 완성.webp"
        },
        {
            title: "정교한 맞춤 시술",
            description: "피부 상태에 맞춘 포텐자 시술을\n 원하시는 분",
            img: "/images/emoji/Signature/recommend/texture/색소 고민 해결.webp"
        }
    ],
    treatments: [
        POTENZA_TREATMENT,
    ],
    ctaMessage: "모공 상담 예약하기",
};

/** 5P - Pigmentation */
export const PIGMENTATION_DATA: TreatmentPageData = {
    ...PORE_DATA,
    slug: "pigmentation",
    enCategory: "PIGMENTATION",
    title: "미백/색소",
    heroMessage: "맑고 균일한 피부톤, 색소의 깊이까지 정밀하게 케어합니다",
    description: "색소의 원인과 깊이를 분석해 밝고 투명한 피부 바탕을 완성합니다.",
    subTitle: "맑고 균일한 피부톤, 색소의 깊이까지 정밀하게 케어합니다.",
    introDescription: "깨끗하고 균일한 피부톤은 인상을 밝게 만드는 핵심입니다. 리브영클리닉은 브라이톤, 레프톤, CO2 레이저를 통해 기미, 잡티, 칙칙한 안색, 피부 병변까지 피부 상태에 맞춰 정교하게 케어합니다.",
    introKeywords: ["브라이톤", "레프톤", "CO2레이저", "미백색소케어"],
    introBullets: [
        "색소의 뿌리와 피부톤의 불균형을 함께 분석해 맑은 피부 바탕을 되찾아 드립니다.",
        "색소 종류와 깊이에 맞춘 레이저 선택 및 피부 타입별 맞춤 파라미터 세팅"
    ],
    targetAreas: [
        {
            title: "Tone Correction",
            desc: "기미, 잡티, 흐릿한 안색 개선",
            img: "/images/emoji/Signature/why/texture/Tone_Correction.webp"
        },
        {
            title: "Pigment Care",
            desc: "색소 깊이와 피부톤 불균형 맞춤 케어",
            img: "/images/emoji/Signature/why/texture/Pore_Tightening.webp"
        },
        {
            title: "Spot Removal",
            desc: "점, 검버섯, 비립종 등 병변 정밀 제거",
            img: "/images/emoji/Signature/why/texture/Scar_Reconstruction.webp"
        }
    ],
    keyPoints: [
        {
            title: "색소 깊이 분석",
            description: "표피성 색소부터 깊은 색소 병변까지 원인을 분석하여 필요한 장비와 에너지 강도를 정교하게 선택합니다."
        },
        {
            title: "복합 레이저 설계",
            description: "브라이톤, 레프톤, CO2 레이저를 피부 상태에 맞게 조합해 톤업과 병변 개선을 함께 설계합니다."
        },
        {
            title: "글로벌 스탠다드",
            description: "원장님과 영어 상담이 가능한 스태프가 상주하여 외국인 환자의 미백·색소 고민까지 세밀하게 소통합니다."
        }
    ],
    precautionGroups: [
        PRECAUTION_GUIDES.pigmentationLaser,
        PRECAUTION_GUIDES.lephton,
        PRECAUTION_GUIDES.co2Laser
    ],
    faqs: [
        {
            question: "색소레이저는 몇 회 정도 받아야하나요?",
            answer: "개인차가 있으나 1회로는 효과를 보기 어려우시고, 1~2주 간격으로 색소의 종류에 따라 다양한 횟수로 권유해드리고 있습니다."
        },
        {
            question: "색소레이저 후 색이 더 진해 보이는 이유가 뭔가요?",
            answer: "레이저 시술 후 일시적으로 색소 부위가 진해보일 수 있으나, 이는 자연스러운 치료 과정 중 하나이며 대부분 시간이 지나면서 점차 옅어집니다. 회복 기간 동안 손으로 치료 부위를 자극하지 않는 것이 중요합니다."
        },
        {
            question: "색소레이저는 여름에도 받을 수 있나요?",
            answer: "자외선 노출 관리를 잘 해주시면 가능합니다. 외출 시 자외선 차단제를 꼼꼼히 사용하는 것을 권장드립니다."
        }
    ],
    recommendTargets: [
        {
            title: "색소 고민 해결",
            description: "기미, 잡티 등 얼룩덜룩한 피부 톤을 \n맑게 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/texture/색소 고민 해결.webp"
        },
        {
            title: "투명한 피부 완성",
            description: "색소의 뿌리부터 치료하여 투명한\n 피부 바탕을 원하시는 분",
            img: "/images/emoji/Signature/recommend/texture/투명한 피부 완성.webp"
        },
        {
            title: "정밀 병변 제거",
            description: "점, 검버섯, 비립종 등 피부 병변을\n 섬세하게 개선하고 싶으신 분",
            img: "/images/emoji/Signature/recommend/texture/매끄러운 피부 결.webp"
        }
    ],
    treatments: [
        BRIGHTON_TREATMENT,
        LEPHTON_TREATMENT,
        CO2_LASER_TREATMENT,
    ],
    ctaMessage: "미백/색소 상담 예약하기",
};

export const TEXTURE_DATA = PORE_DATA;

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
    pore: PORE_DATA,
    pigmentation: PIGMENTATION_DATA,
    texture: TEXTURE_DATA,
    "stem-cell": STEM_CELL_DATA,
};
