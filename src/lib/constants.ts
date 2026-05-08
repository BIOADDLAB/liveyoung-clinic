// 리브영의원 전역 상수 데이터

/** 네비게이션 메뉴 구조 */
export const NAV_MENUS = [
    {
        label: "LY Clinic",
        href: "/about",
        subMenus: [
            { label: "병원소개", href: "/about" },
            { label: "오시는길", href: "/location" },
        ],
    },
    {
        label: "Signature 분석",
        href: "/analysis/skin",
        subMenus: [
            { label: "피부진단기", href: "/analysis/skin" },
            { label: "1:1 원장상담", href: "/analysis/consultation" },
        ],
    },
    {
        label: "Signature 시술",
        href: "/treatment/tightening",
        subMenus: [
            { label: "얼굴/바디 컨투어링", href: "/treatment/tightening" },
            { label: "스킨부스터", href: "/treatment/skin-booster" },
            { label: "리프팅", href: "/treatment/lifting" },
            { label: "미백/모공", href: "/treatment/texture" },
        ],
    },
    {
        label: "Tailored 프로그램",
        href: "/program/special",
        subMenus: [
            { label: "LY Special", href: "/program/special" },
        ],
    },
    {
        label: "전후사진",
        href: "/gallery",
        subMenus: [
            { label: "전후사진", href: "/gallery" },
        ],
    },
    {
        label: "상담문의",
        href: "/contact",
        subMenus: [
            { label: "상담문의", href: "/contact" },
        ],
    },
    {
        label: "회원서비스",
        href: "/login",
        subMenus: [
            { label: "로그인", href: "/login" },
            { label: "회원가입", href: "/signup" },
            { label: "아이디/비밀번호 찾기", href: "/forgot-password" },
            { label: "회원정보수정", href: "/profile" },
            { label: "회원탈퇴", href: "/withdraw" },
        ],
    },
] as const;

/** 히어로 슬라이더 데이터 */
export const HERO_SLIDES = [
    {
        id: 1,
        subtitle: "Beauty that feels young",
        title: "우리는 시술을 팔지 않고\n당신의 얼굴을 분석합니다",
        description: "원장님 직접 상담 · 1:1 맞춤 분석",
        mediaType: "video" as const,
        mediaUrl: "/videos/hero1.mp4",
        mediaLabel: "메인 영상 #1",
        mediaSize: "1920 × 1080px",
    },
    {
        id: 2,
        subtitle: "Beauty that feels young",
        title: "당신만을 위한\n맞춤 시술 프로그램",
        description: "시그니처 큐레이티드 플랜 프로그램",
        mediaType: "video" as const,
        mediaUrl: "/videos/hero2.mp4",
        mediaLabel: "메인 영상 #2",
        mediaSize: "1920 × 1080px",
    },
    {
        id: 3,
        subtitle: "Beauty that feels young",
        title: "아름다움은\n분석에서 시작됩니다",
        description: "당신의 본질을 찾는 정밀 분석 리프팅",
        mediaType: "video" as const,
        mediaUrl: "/videos/hero3.mp4",
        mediaLabel: "메인 영상 #3",
        mediaSize: "1920 × 1080px",
    },
];

/** 시그니처 시술 카드 데이터 (메인 페이지 대표 3종) */
export const SIGNATURE_TREATMENTS = [
    {
        id: "lifting",
        enTitle: "LIFTING",
        koTitle: "리프팅",
        description: "보이는 리프팅의 차이, 정교한 설계로 당신의 숨겨진 라인을 찾습니다.",
        href: "/treatment/lifting",
        imageUrl: "/images/signature_card/lifting_card.webp",
        mediaLabel: "리프팅 시술 이미지",
        mediaSize: "600 × 720px",
    },
    {
        id: "skin-booster",
        enTitle: "SKIN BOOSTER",
        koTitle: "스킨부스터",
        description: "피부 속부터 차오르는 생기, 분석으로 완성하는 맞춤형 영양 레시피입니다.",
        href: "/treatment/skin-booster",
        imageUrl: "/images/signature_card/skin_booster_card.webp",
        mediaLabel: "스킨부스터 시술 이미지",
        mediaSize: "600 × 720px",
    },
    {
        id: "tightening",
        enTitle: "CONTOURING",
        koTitle: "얼굴/바디 컨투어링",
        description: "피부 밀도를 채우는 고밀도 탄력으로 변함없는 탄탄함을 완성합니다.",
        href: "/treatment/tightening",
        imageUrl: "/images/signature_card/contouring_card.webp",
        mediaLabel: "얼굴/바디 컨투어링 시술 이미지",
        mediaSize: "600 × 720px",
    },
];

/** Curated Plan 프로그램 데이터 */
export const CURATED_PLAN_PROGRAMS = [
    {
        id: "lifting-program",
        enSubtitle: "LIFTING PROGRAM",
        title: "리프팅 프로그램",
        description: "울쎄라 + 리니어지 조합으로 즉각적인 리프팅 효과와 장기적인 콜라겐 재생을 동시에.",
        href: "/treatment/lifting",
        mediaLabel: "리프팅 프로그램 이미지",
        mediaSize: "800 × 600px",
    },
    {
        id: "tightening-program",
        enSubtitle: "TIGHTENING PROGRAM",
        title: "타이트닝 프로그램",
        description: "써마지, 포텐자로 피부 깊숙이 열에너지를 전달하여 콜라겐을 재생, 탄력을 되찾습니다.",
        href: "/treatment/tightening",
        mediaLabel: "타이트닝 프로그램 이미지",
        mediaSize: "800 × 600px",
    },
    {
        id: "booster-program",
        enSubtitle: "BOOSTER PROGRAM",
        title: "부스터 프로그램",
        description: "스킨부스터로 피부 속 수분과 영양을 극대화하여 촉촉하고 탄력 있는 피부를 완성합니다.",
        href: "/treatment/skin-booster",
        mediaLabel: "부스터 프로그램 이미지",
        mediaSize: "800 × 600px",
    },
    {
        id: "texture-program",
        enSubtitle: "TEXTURE PROGRAM",
        title: "텍스처 개선 프로그램",
        description: "피코 토닝, 프락셀로 모공, 색소, 흉터를 동시에 개선하여 매끈한 피부결을 만들어드립니다.",
        href: "/treatment/texture",
        mediaLabel: "텍스처 프로그램 이미지",
        mediaSize: "800 × 600px",
    },
];

/** 클리닉 정보 */
export const CLINIC_INFO = {
    name: "리브영의원",
    nameEn: "Live Young Clinic",
    address: "서울특별시 강남구 압구정로 208, 본경빌딩 2층",
    phone: "02-517-3338",
    fax: "02-2088-7321",
    registrationNumber: "392-16-02849",
    hours: [
        { day: "월/화/목", time: "10:00 ~ 19:00" },
        { day: "금", time: "10:00 ~ 20:00" },
        { day: "수/토", time: "10:00 ~ 16:00" },
    ],
    closed: "일요일 및 공휴일",
    social: {
        kakao: "http://pf.kakao.com/_SbdEX",
        instagram: "https://www.instagram.com/liveyoungclinic",
        blog: "https://blog.naver.com/liveyoung_clinic",
    },
};

/** 대표원장 약력 */
export const DOCTOR_INFO = {
    name: "송기선",
    role: "대표원장",
    history: [
        "고려대학교 생명과학부",
        "고려대학교 생명과학대학원 분자생물학과 석사",
        "을지대학교 의과대학",
        "B.S. in Biological Sciences, Korea University",
        "M.S. in Molecular Biology, Korea University",
        "M.D., Eulji University School of Medicine",
        "USMLE Step 1, Step 2 CS Passed",
    ],
};

/** Quick Menu 항목 */
export const QUICK_MENU_ITEMS = [
    { label: "간편상담", icon: "ph:note-pencil-fill", href: "/contact" },
    { label: "카카오톡", icon: "ri:kakao-talk-fill", href: "http://pf.kakao.com/_SbdEX" },
    { label: "인스타그램", icon: "ri:instagram-fill", href: "https://www.instagram.com/liveyoungclinic" },
    { label: "스레드", icon: "ri:threads-fill", href: "https://www.threads.net/@liveyoungclinic" },
    { label: "블로그", icon: "ri:blogger-fill", href: "https://blog.naver.com/liveyoung_clinic" },
    { label: "전화상담", icon: "fluent:call-24-filled", href: "tel:02-517-3338" },
];
