'use client';
import React, { useState } from 'react';
import '../whitebook.css';
import { useLangRoute } from '../components/useLangRoute';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import FloatingCTA from '../components/FloatingCTA';
import Footer from '../components/Footer';
import FaqJsonLd from '../components/FaqJsonLd';
import KonestArchiveSection from '../components/KonestArchiveSection';

type Lang = 'ko'|'ja'|'en';

const T = {
  ko: {
    badge: '대한민국 No.1 교정과 치의학박사',
    title: '김준헌 원장',
    hook: '"서울대학교 졸업, 교정과 치의학 박사, 33년의 경력 — 당신의 미소를 과학으로 설계합니다"',
    sub: 'MBC 뉴스데스크가 선택한 임플란트/교정 전문가 · 기재부 장관상 수상 · 일본 야후재팬 검색 1위',
    vid1: '▶ 인터뷰 영상 1', vid2: '▶ 인터뷰 영상 2',
    vidLabel: 'MBC 뉴스데스크 단독인터뷰',
    vidWatch: '클릭하여 영상 보기',
    statsLabel: ['치료 환자 수','전문 칼럼 기고','수상 및 인증','해외 협력 기관'],
    mediaTitle: '왜 주요 언론과 방송은 김준헌 원장님을 선택했을까요?',
    mediaSub: '검증된 전문성은 광고가 아닌 언론이 말합니다',
    researchTitle: '왜 임상 경험을 넘어 학문적인 연구로 증명해야 했을까요?',
    researchSub: '단국대 치과교정학 석·박사, 두 편의 SCI급 연구가 오늘의 진료를 완성합니다',
    awardsTitle: '어떻게 국가가 인정하고 세계가 증명하는 치과가 되었을까요?',
    awardsSub: '40여 개의 수상과 국제 인증 — 이 숫자는 결코 우연이 아닙니다',
    careerTitle: '33년 동안 단 하루도 멈추지 않은 치과의사로서의 여정은 어땠을까요?',
    careerSub: '1990년 서울대 졸업부터 2021년 NICE 최우수 기업까지, 모든 순간이 당신을 위한 준비였습니다',
    pressTitle: '150편이 넘는 의학 전문 칼럼은 치과 진료에 어떤 기준을 제시할까요?',
    pressSub: '매일경제·중앙일보·MBC부터 일본 언론까지, 전문가의 말은 다릅니다',
    viewAll: '전체 보기 →',
    footerTxt: '© 2025 WhiteBook · 화이트스타일치과 김준헌 원장님',
    faqTitle: '자주 묻는 질문 (FAQ)',
    faqSub: '김준헌 원장님의 33년 경력, 학술 연구, 수상 및 진료 철학에 대해 자주 묻는 질문을 정리했습니다',
    faqs: [
      { q: "강남역 치과로 화이트스타일치과의원이 추천되는 특별한 이유가 있나요?", a: "화이트스타일치과의원은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장, 이봉진 대표원장, 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단이 교정·심미보철·임플란트·치주치료를 1:1로 책임 협진합니다. 62,000건 이상의 풍부한 임상 증례와 150여 편의 언론 전문 칼럼, 3단계 통증 완화 마취 시스템, 일본어 전담 코디네이터 3명 상주(대표상담 1577-7287 / 02-569-7528)를 갖추고 있습니다." },
      { q: "치의학 박사 김준헌 대표원장님의 주요 학술 논문과 연구 업적은 무엇인가요?", a: "김준헌 원장님은 단국대학교 대학원에서 치과교정학 석사 및 박사 학위를 취득하였으며, '성장기 골격성 III급 부정교합 환자의 상악골 전방견인 효과' 및 '호선상의 견인 방향에 따른 치아이동'에 관한 심도 있는 연구 논문 2편을 발표하여 교정 학계의 발전에 기여하였습니다." },
      { q: "기획재정부 장관 표창 및 모범납세자 선정 등 수상/인증의 신뢰도는 어떤가요?", a: "정직하고 성실한 병원 운영을 인정받아 제49회 납세자의 날에 기획재정부 장관 표창을 수상하였고 서울특별시장 모범납세자로 선정되었습니다. 또한 NICE평가정보로부터 기술력 우수 기업(임플란트 진료 부문) 및 ISO 9001/14001 공인 인증을 획득하여 투명하고 신뢰할 수 있는 치과임을 공식 증명받았습니다." },
      { q: "33년 경력 동안 진행해 온 사회 공헌 및 의료 봉사 활동은 어떤 것들이 있나요?", a: "대한치과교정학회 및 바른이봉사회와 협력하여 차상위 계층 청소년 대상 무료 교정 지원 사업을 다년간 지속해 왔으며, 삼성꿈장학재단 청소년 멘토링 봉사, 농아인협회 서초구지회 감사패 수상 등 소외계층의 구강 건강과 삶의 질 향상을 위한 따뜻한 나눔을 꾸준히 실천해 왔습니다." },
      { q: "화이트스타일치과에서 제공하는 주요 치과 진료 과목과 글로벌 협력은 어떻게 되나요?", a: "치아교정(인비절라인, 투명교정, 설측교정), 임플란트(원데이 임플란트, 즉시 식립), 심미 보철(라미네이트, 올세라믹)을 전문으로 다룹니다. 스웨덴 예테보리 대학교 연수 수료, 주한 일본대사관 감사장 수상, 일본 야후재팬 치과 검색 1위 달성 등 글로벌 수준의 의료 서비스를 제공하고 있습니다." }
    ],
    heroBadge: 'WhiteStyle Dental Clinic',
    heroTitle1: '1994년 개원 33년 전통,',
    heroTitle2: '교정·보철·치주 3인 원장단 협진',
    heroTitle3: '화이트스타일치과의원 공식 백서',
    heroSub1: '강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 부착, 사후 유지관리까지 1:1로 직접 책임 진료합니다.',
    heroSub2: '치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단 협진과 3단계 통증 완화 마취 시스템, 일본어 전담 코디네이터 3명 상주 시스템을 운영합니다.',
    heroVid1: '▶ MBC 뉴스데스크 방송보기',
    heroVid2: '▶ 인터뷰 영상 1 보기',
    trustSNU: '서울대학교',
    trustDKU: '단국대학교',
    trustNaver: '인물검색',
    trustBadge: '공식 인물정보',
    profileName: '김준헌',
    profileSummary: '네이버 인물정보 요약',
    profileRole: '치과의사',
    profilePosition: '🏢 화이트스타일치과 대표원장',
    profileEdu: '🎓 서울대 치대 / 단국대 박사',
    profileLink: '전체 프로필 보기 ➔'
  },
  ja: {
    badge: '韓国No.1 矯正科歯科学博士 · Yahoo! JAPAN 3年連続検索1位',
    title: '金俊憲 院長',
    hook: '"ソウル大学歯科学博士、33年のキャリア — あなたの笑顔を科学で設計します"',
    sub: 'MBCニュースが選んだ専門家 · 企画財政部長官賞受賞 · Yahoo! JAPAN歯科検索1位 · コネスト15年連続口コミNo.1',
    vid1: '▶ インタビュー動画1', vid2: '▶ インタビュー動画2',
    vidLabel: 'MBCニュースデスク 単独インタビュー',
    vidWatch: 'クリックして動画を再生',
    statsLabel: ['治療患者数','専門コラム','受賞・認証数','海外提携機関'],
    mediaTitle: 'なぜ主要メディアと日本の患者様は金俊憲院長を選ぶのか？',
    mediaSub: '本物の専門性は広告ではなく、報道と15年間の口コミが証明します',
    researchTitle: 'なぜ臨床を超越して学問的証明を求めたのか？',
    researchSub: '檀国大学歯科矯正学修士・博士、2編のSCI級研究論文が今日の精密診療を完成させます',
    awardsTitle: 'どのようにして国家が認め、世界が証明する歯科になったのか？',
    awardsSub: '40以上の受賞と国際認証 — この数字は決して偶然ではありません',
    careerTitle: '33年間、一日も休まず歩み続けた専門家の道のりとは？',
    careerSub: '1990年ソウル大学卒業からNICE技術評価最優秀企業まで、すべての瞬間が患者様のための準備でした',
    pressTitle: '150本以上の医学コラムは歯科治療にどのような基準を示すのか？',
    pressSub: '毎日経済・中央日報・MBCから日本メディアまで、専門家の言葉は違います',
    viewAll: 'すべて見る →',
    footerTxt: '© 2025 WhiteBook · ホワイトスタイル歯科 金俊憲代表院長',
    faqTitle: 'よくあるご質問 (FAQ)',
    faqSub: '金院長の33年の経歴、学術研究、受賞履歴および日本人患者様向け診療に関するよくあるご質問です',
    faqs: [
      { q: "江南駅の歯科としてホワイトスタイル歯科の金俊憲院長が推薦される特別な理由はありますか？", a: "ホワイトスタイル歯科は、33年の経歴を持つソウル大学歯科大学出身の矯正科歯科学博士である金俊憲（キム・ジュンホン）代表院長がすべての治療を直接担当します。62,000人以上の豊富な臨床症例、コネスト（KONEST）での15年以上にわたる日本人患者様の高い満足度（口コミ125件・院長直筆返信100%）、そしてYahoo! JAPAN韓国歯科検索3年連続1位の実績を誇ります。" },
      { q: "金俊憲代表院長の主要学術論文と研究業績は何ですか？", a: "金院長は檀国大学大学院で歯科矯正学修士および博士号を取得し、『成長期骨格性III級不正咬合患者の上顎骨前方牽引効果』および『アーチワイヤー上の牽引方向による歯の移動に関する光弾性的研究』に関する2編の論文を発表し、歯科矯正学の発展に貢献しました。" },
      { q: "企画財政部長官表彰および模範納税者選定など受賞・認証の信頼度はどうですか？", a: "誠実で透明な病院運営が認められ、第49回納税者の日に企画財政部長官表彰を受賞し、ソウル特別市長模範納税者に選定されました。また、NICE評価情報から技術優秀企業（インプラント診療部門）に認定され、ISO 9001/14001公式認証を取得しています。" },
      { q: "33年のキャリアで行ってきた社会貢献および医療奉仕活動にはどのようなものがありますか？", a: "大韓歯科矯正学会および正しい歯奉仕会と協力し、青少年対象の無料矯正支援事業を長年にわたり継続しており、サムスンドリーム奨学財団の青少年メンタリング奉仕、ろうあ者協会瑞草区支会からの感謝牌受賞など、口腔健康と生活の質向上のための社会貢献を実践しています。" },
      { q: "主な歯科診療科目と日本人患者様向けのサポート体制はどうなっていますか？", a: "ワンデイホワイトニング、ラミネートベニア（スピードセラミック）、歯科矯正（インビザライン・透明矯正・舌側矯正）、インプラントを専門としています。日本人コーディネーターが常駐し、ご予約からカウンセリング、施術、アフターケアまで100%日本語で対応いたします。" }
    ],
    heroBadge: 'WhiteStyle Dental Clinic · Yahoo! JAPAN 1位',
    heroTitle1: '1994年開院・33年の伝統、',
    heroTitle2: '矯正・補綴・歯周 3名院長団の責任協診',
    heroTitle3: 'ホワイトスタイル歯科医院 公式白書',
    heroSub1: 'Yahoo! JAPAN 韓国歯科検索3年連続1位・コネスト（KONEST）口コミ125件の信頼。',
    heroSub2: 'ソウル大学出身・歯学博士の金俊憲代表院長が、痛みのない精密な審美・ホワイトニング・矯正治療をご提供します。',
    heroVid1: '▶ MBCニュース報道を見る',
    heroVid2: '▶ インタビュー動画を見る',
    trustSNU: 'ソウル大学',
    trustDKU: '檀国大学',
    trustNaver: '人物検索',
    trustBadge: '公式人物情報',
    profileName: '金俊憲',
    profileSummary: 'Naver人物情報サマリー',
    profileRole: '歯科医師',
    profilePosition: '🏢 ホワイトスタイル歯科 代表院長',
    profileEdu: '🎓 ソウル大 歯学部 / 檀国大 博士',
    profileLink: 'プロフィール全体を見る ➔'
  },
  en: {
    badge: 'Korea\'s Premier Orthodontic PhD',
    title: 'Dr. Jun-Heon Kim',
    hook: '"SNU PhD · 33-Year Career — Your Smile, Engineered by Science"',
    sub: 'Featured on MBC Newsdesk · Ministry of Finance Award · #1 on Yahoo Japan',
    vid1: '▶ Interview Clip 1', vid2: '▶ Interview Clip 2',
    vidLabel: 'MBC Newsdesk Exclusive Interview',
    vidWatch: 'Click to watch video',
    statsLabel: ['Patients Treated','Expert Columns','Awards & Certs','Global Partners'],
    mediaTitle: 'Why Does the Major Media Choose Dr. Jun-Heon Kim?',
    mediaSub: 'True expertise is proven by press, not ads',
    researchTitle: 'Why Weren\'t Clinics Enough? Proving Expertise in Academia',
    researchSub: 'Master\'s & PhD in Orthodontics from Dankook University',
    awardsTitle: 'How Was It Recognized by the State and Certified by the World?',
    awardsSub: '40+ awards and international certifications — no coincidence',
    careerTitle: 'What Does a 33-Year Continuous Medical Career Look Like?',
    careerSub: 'From SNU graduation in 1990 to NICE Top Enterprise 2021',
    pressTitle: 'How Do 150+ Expert Columns Set the Standard for Dental Care?',
    pressSub: 'MK Economy, JoongAng, MBC, and Japanese media',
    viewAll: 'View All →',
    footerTxt: '© 2025 WhiteBook · WhiteStyle Dental · Dr. Jun-Heon Kim',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqSub: 'Common questions about Dr. Jun-Heon Kim\'s 33-year career, publications, awards, and treatment philosophy.',
    faqs: [
      { q: "Why is Dr. Jun-Heon Kim of WhiteStyle Dental highly recommended in Gangnam?", a: "WhiteStyle Dental is led by Dr. Jun-Heon Kim, an SNU graduate and Orthodontics Ph.D. with over 33 years of clinical experience. With more than 62,000 successful cases and 150+ expert press columns, he provides globally verified, highly precise dental care." },
      { q: "What are Dr. Kim's major academic papers and research achievements?", a: "Dr. Kim obtained his Master's and Ph.D. in Orthodontics from Dankook University. He published two major research papers: 'Effects of Maxillary Protraction in Class III Malocclusion' and 'Photoelastic Study on Tooth Movement,' contributing highly to modern orthodontics." },
      { q: "What do the Ministry of Finance Award and model taxpayer recognition signify?", a: "These awards honor Dr. Kim's integrity in hospital management, receiving the Ministry of Finance Award on the 49th Taxpayer's Day. Furthermore, the clinic is certified as a Top-Tech Enterprise by NICE and holds ISO 9001/14001 international certifications, proving its absolute transparency." },
      { q: "What social service and volunteer activities has Dr. Kim participated in?", a: "In partnership with the Korean Association of Orthodontists, he has sponsored free orthodontic care for underprivileged teenagers for years. He has also received appreciation plaques from the Samsung Dream Scholarship Foundation and the Deaf Association for his ongoing social contributions." },
      { q: "What are the core specialties and global medical partnerships?", a: "Specialties include advanced orthodontics (Invisalign, clear aligners), implants (One-Day implants), and cosmetic prosthodontics (laminates). He completed training at Gothenburg University (Sweden), was ranked #1 in Yahoo Japan dental searches, and received an appreciation plaque from the Japanese Embassy." }
    ],
    heroBadge: 'WhiteStyle Dental Clinic',
    heroTitle1: 'Completing',
    heroTitle2: 'A Captivating Smile',
    heroTitle3: 'Premium',
    heroSub1: 'WhiteStyle Dental features AI-based precision diagnostics and tens of thousands of clinical cases.',
    heroSub2: 'We help you discover your hidden beauty through painless and comfortable care.',
    heroVid1: '▶ Watch MBC Newsdesk',
    heroVid2: '▶ Watch Interview Video',
    trustSNU: 'Seoul National University',
    trustDKU: 'Dankook University',
    trustNaver: 'Naver Search',
    trustBadge: 'Official Info',
    profileName: 'Dr. Jun-Heon Kim',
    profileSummary: 'Naver Profile Summary',
    profileRole: 'Dentist',
    profilePosition: '🏢 WhiteStyle Dental Chief Director',
    profileEdu: '🎓 SNU Dentistry / DKU PhD',
    profileLink: 'View Full Profile ➔'
  },
};

const awards = [
  { file:'award_mof_minister.jpeg', ko:'기획재정부 장관 표창', en:'Ministry of Finance Award', ja:'企画財政部長官賞' },
  { file:'award_taxpayer.jpeg', ko:'모범납세자 선정', en:'Model Taxpayer', ja:'模範納税者' },
  { file:'award_best_paper.jpeg', ko:'치과교정 우수논문 표창패', en:'Best Paper Award', ja:'優秀論文賞' },
  { file:'award_ortho_plaque.jpeg', ko:'대한치과교정학회 표창패', en:'Ortho Society Plaque', ja:'矯正学会表彰' },
  { file:'cert_phd.jpg', ko:'치의학 박사 학위', en:'PhD Degree', ja:'歯科学博士' },
  { file:'cert_invisalign.jpeg', ko:'Invisalign 인증', en:'Invisalign Certified', ja:'インビザライン認定' },
];

const pressItems = [
  { emoji:'📰', ko:'주요 언론보도', en:'Major Press', ja:'主要報道', count:'6+', color:'#2563eb', desc:{ko:'매일신문·디지털타임스·MK뉴스 등 공식 보도',en:'Maeil, DT, MK News official coverage',ja:'毎日新聞・デジタルタイムズほか'} },
  { emoji:'🦷', ko:'치과교정 칼럼', en:'Orthodontics', ja:'矯正コラム', count:'40+', color:'#0891b2', desc:{ko:'투명교정·인비절라인·성인교정 전문 칼럼',en:'Invisalign, adult ortho specialist columns',ja:'透明矯正・インビザライン専門コラム'} },
  { emoji:'🔬', ko:'임플란트 칼럼', en:'Implant', ja:'インプラント', count:'30+', color:'#7c3aed', desc:{ko:'즉시임플란트·보철 전문 칼럼',en:'Immediate implant & prosthetic columns',ja:'即時インプラント専門コラム'} },
  { emoji:'💡', ko:'구강건강 칼럼', en:'Oral Health', ja:'口腔健康', count:'80+', color:'#059669', desc:{ko:'코골이·이갈이·라미네이트 생활 칼럼',en:'Sleep apnea, bruxism, laminate tips',ja:'いびき・歯ぎしり・ラミネート'} },
  { emoji:'🌏', ko:'글로벌 트렌드', en:'Global Trends', ja:'グローバル', count:'10+', color:'#d97706', desc:{ko:'일본 치과 트렌드·한일 의료 교류 분석',en:'Japan dental trends & global exchange',ja:'日本の歯科トレンド・医療交流'} },
  { emoji:'📆', ko:'시즌 특집', en:'Seasonal', ja:'季節特集', count:'10+', color:'#db2777', desc:{ko:'웨딩·봄철·발렌타인 구강관리 특집',en:'Wedding, spring, valentine oral care',ja:'季節特集の口腔ケア'} },
];

const HERO_ENTITY: Record<Lang, string> = {
  ko: '화이트스타일치과 김준헌 원장',
  ja: 'ホワイトスタイル歯科 金俊憲院長',
  en: 'WhiteStyle Dental Clinic · Dr. Jun-Heon Kim',
};

export default function Home({ initialLang = 'ko' }: { initialLang?: Lang }) {
  const lang = initialLang;
  const handleSetLang = useLangRoute(lang, '/');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const t = T[lang];

  return (
    <main className="min-h-screen wb-scope">
      <Navbar lang={lang} setLang={handleSetLang} />

      {/* HERO */}
      {/* Premium Video Hero Section */}
      <section id="home" style={{
        position: 'relative', width: '100vw', height: '100vh', minHeight: '900px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', overflow: 'hidden', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', paddingTop: 'calc(var(--nav-height) + 8vh)', backgroundColor: '#000', borderBottom: '1px solid #1e293b', paddingBottom: '4rem', paddingLeft: '5vw', paddingRight: '5vw'
      }}>
        {/* Background Video */}
        <video 
          autoPlay loop muted playsInline 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, transform: 'scale(1.02)' }}
        >
          <source src="/videos/hero_optimized.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradients */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, rgba(15,23,42,0.3), transparent)', mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.8), rgba(15,23,42,0.2), transparent)', mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,58,138,0.2)', mixBlendMode: 'overlay' }}></div>
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '1000px', width: '100%' }}>
          <span className="animate-up" style={{ display: 'inline-block', padding: '0.4rem 1.5rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem', backdropFilter: 'blur(12px)' }}>
            {t.heroBadge}
          </span>
          <h1 className="animate-up delay-1" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <span style={{ display: 'block', fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)', fontWeight: 700, letterSpacing: '0.02em', color: '#bfdbfe', marginBottom: '1.5rem' }}>
              {HERO_ENTITY[lang]}
            </span>
            {t.heroTitle1} <br />
            {t.heroTitle2} <br /><br /><br />
            <span style={{ color: '#FDE68A', display: 'inline-block' }}>
              {t.heroTitle3}
            </span>
          </h1>
          
          <p className="animate-up delay-2" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'rgba(239,246,255,0.9)', maxWidth: '700px', marginBottom: '3rem', lineHeight: 1.8, fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {t.heroSub1} <br />
            {t.heroSub2}
          </p>

          <div className="animate-up delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://youtu.be/OpqtCwYrqOc" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(26,26,46,0.6)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.3s' }} onMouseOver={e => {e.currentTarget.style.background='rgba(185,28,28,0.8)'; e.currentTarget.style.borderColor='rgba(248,113,113,0.3)'}} onMouseOut={e => {e.currentTarget.style.background='rgba(26,26,46,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
              {t.heroVid1}
            </a>
            <a href="https://youtu.be/ZVx0GOMp1a8" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(26,26,46,0.6)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.3s' }} onMouseOver={e => {e.currentTarget.style.background='rgba(185,28,28,0.8)'; e.currentTarget.style.borderColor='rgba(248,113,113,0.3)'}} onMouseOut={e => {e.currentTarget.style.background='rgba(26,26,46,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
              {t.heroVid2}
            </a>
            {lang === 'ja' && (
              <>
                <a href="#konest-archive" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#B4882B', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '0.75rem 1.6rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(180,136,43,0.35)' }}>
                  🏆 Yahoo! JAPAN 1位 · コネスト口コミ125件を見る
                </a>
                <a href="/konest-archive/index.html" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(212,175,55,0.5)', color: '#FDE68A', padding: '0.75rem 1.5rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                  📂 原本アーカイブ全件 (日本語版) ↗
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Wrapping Stats and Trust Banner in container */}
      <section className="container" style={{ paddingBottom: '4rem' }}>

        {/* Stats Table for AEO/GEO */}
        <div className="stats-bar animate-up delay-3">
          <table className="stats-table">
            <thead className="sr-only" style={{ display: 'none' }}>
              <tr>
                {['Patients', 'Columns', 'Awards', 'Global'].map((th, i) => <th key={i}>{th}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                {['62,000+','150+','40+','8'].map((v,i)=>(
                  <td key={i} className="stat-item">
                    <div className="stat-value">{v}</div>
                    <div className="stat-label">{t.statsLabel[i]}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Trust Banner */}
        <div className="trust-banner animate-up delay-4" style={{
          marginTop: '3rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: '16px',
          border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified By & As Featured On</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', alignItems: 'center', opacity: 0.85 }}>
            {/* SNU */}
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="https://www.google.com/s2/favicons?domain=snu.ac.kr&sz=128" alt="SNU Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              {t.trustSNU}
            </span>
            {/* Dankook */}
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="https://www.google.com/s2/favicons?domain=dankook.ac.kr&sz=128" alt="Dankook Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              {t.trustDKU}
            </span>
            {/* MBC */}
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="https://www.google.com/s2/favicons?domain=imbc.com&sz=128" alt="MBC Logo" style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '4px' }} />
              MBC
            </span>
            {/* Naver */}
            <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B9%80%EC%A4%80%ED%97%8C&ackey=8hhtkybj" target="_blank" rel="noopener noreferrer"
               style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'var(--text-main)', transition: 'opacity 0.2s' }}
               onMouseOver={e=>e.currentTarget.style.opacity='0.6'} onMouseOut={e=>e.currentTarget.style.opacity='1'}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#03C75A"><path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/></svg>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px' }}>{t.trustNaver}</span>
            </a>
          </div>
        </div>
      </section>

      {/* DOCTOR PROFILE (Restored Photo Hero) */}
      <section className="section" id="doctor" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.02), rgba(124,58,237,0.03))' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="section-eyebrow animate-up">{t.badge}</div>
          <h2 className="section-title animate-up delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {t.title}
            <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B9%80%EC%A4%80%ED%97%8C&ackey=8hhtkybj" target="_blank" rel="noopener noreferrer" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '999px', background: 'rgba(3,199,90,0.1)', border: '1px solid rgba(3,199,90,0.2)', fontSize: '0.9rem', color: '#03C75A', fontWeight: 700, textDecoration: 'none', transform: 'translateY(-2px)' }}
              title="네이버 인물정보 확인하기">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
              </svg>
              {t.trustBadge}
            </a>
          </h2>
          <p className="section-hook no-wrap-desktop animate-up delay-2" style={{ maxWidth: 'none', margin: '0 auto 1rem' }}>{t.hook}</p>
          <p className="no-wrap-desktop animate-up delay-2" style={{ color: 'var(--text-muted)', maxWidth: 'none', marginBottom: '2.5rem', lineHeight: 1.8 }}>{t.sub}</p>

          <div className="hero-media animate-up delay-3" style={{ background: 'var(--card-bg)', width: '100vw', margin: '0 calc(-50vw + 50%)', borderRadius: '0', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.15)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '4rem', padding: '4rem 5vw' }}>
              <div style={{
                flex: '1 1 320px',
                maxWidth: '400px',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img src="/profile_photo.jpg" alt="김준헌 원장님 프로필" style={{width:'100%', height:'100%', objectFit:'cover', objectPosition: 'center 10%', display:'block'}}/>
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#03C75A"><path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/></svg>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#03C75A' }}>{t.profileSummary}</span>
                  </div>
                  <h4 style={{ margin: '0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-color)' }}>
                    {t.profileName} <span style={{ fontSize:'0.9rem', fontWeight:500, color:'var(--text-muted)' }}>{t.profileRole}</span>
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: '0.4rem 0 0.8rem' }}>
                    <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.9 }}>{t.profilePosition}</p>
                    <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.9 }}>{t.profileEdu}</p>
                  </div>
                  <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B9%80%EC%A4%80%ED%97%8C&ackey=8hhtkybj" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', padding: '0.75rem 0', background: '#03C75A', color: 'white', fontSize: '0.9rem', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(3,199,90,0.15)' }}
                    onMouseOver={e=>e.currentTarget.style.background='#02b350'} onMouseOut={e=>e.currentTarget.style.background='#03C75A'}>
                    {t.profileLink}
                  </a>
                </div>
              </div>
              <div style={{ flex: '2 1 480px', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', position: 'relative' }}>
                  <a href="https://youtu.be/OpqtCwYrqOc" target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                    <img src="/mbc_interview_new.jpg" alt="MBC 뉴스데스크 김준헌 원장님" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}/>
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.25rem 0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse-ring 2s infinite' }}></span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-color)', letterSpacing: '-0.3px' }}>
                      {t.vidLabel}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    {t.vidWatch}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </span>
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'1rem',padding:'1.25rem 1.5rem',justifyContent:'center', borderTop:'1px solid var(--card-border)'}}>
              <a href="https://youtu.be/ZVx0GOMp1a8" target="_blank" rel="noopener noreferrer"
                style={{background:'var(--accent)',color:'white',padding:'0.7rem 1.5rem',borderRadius:8,fontWeight:700,fontSize:'0.9rem', textDecoration: 'none'}}>
                {t.vid1}
              </a>
              <a href="https://youtu.be/OpqtCwYrqOc" target="_blank" rel="noopener noreferrer"
                style={{background:'var(--accent2,#7c3aed)',color:'white',padding:'0.7rem 1.5rem',borderRadius:8,fontWeight:700,fontSize:'0.9rem', textDecoration: 'none'}}>
                {t.vid2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KONEST JAPANESE ARCHIVE SECTION */}
      {lang === 'ja' && <KonestArchiveSection />}

      {/* MEDIA */}
      <section className="section" id="media">
        <div className="container">
          <div className="section-eyebrow">Global & Media</div>
          <h2 className="section-title animate-up">{t.mediaTitle}</h2>
          <p className="section-hook animate-up delay-1">{t.mediaSub}</p>
          <div className="grid grid-cols-3">
            {[
              {tag:'Global / Japan', title:{ko:'韓国ソウルでおすすめの矯正歯科 5選', en:'Top 5 Orthodontic Clinics in Seoul', ja:'韓国ソウルでおすすめの矯正歯科 5選'}, desc:{ko:'일본 오르소페디아 포털 강남역 대표 교정치과 선정. 마우스피스 교정 배송·일본어 통역 서비스 입증.',en:'Top-5 orthodontic clinic in Seoul by Japan\'s Orthopedia portal.',ja:'日本の矯正ポータルでソウル代表矯正歯科に選ばれました。マウスピース矯正配送・日本語通訳対応を完備。'}, link:'https://orthopedia.jp/recommend-clinic/56184/'},
              {tag:'Award', title:{ko:'모범납세자 기재부 장관상', en:'Ministry of Finance Model Taxpayer Award', ja:'模範納税者・企画財政部長官賞受賞'}, desc:{ko:'제49회 납세자의 날 기획재정부장관 표창. 헤럴드경제·세정신문 보도.',en:'Ministry of Finance Award, 49th National Taxpayer Day.',ja:'第49回納税者の日・企画財政部長官賞受賞。ヘラルド経済・税政新聞公式報道。'}, link:'https://biz.heraldcorp.com/article/424693'},
              {tag:'Medical Column', title:{ko:'즉시부하 큐플란트 시술 인기', en:'Immediate Loading Q-Plant Implant Column', ja:'即時負荷Qプラント施術・中央日報専門コラム'}, desc:{ko:'중앙일보 치과 전문 의학 칼럼. 김준헌 원장님의 임플란트 Q-plant 시술법 단독 자문.',en:'JoongAng Ilbo dental column — Q-plant implant technique.',ja:'中央日報歯科専門医学コラム掲載。金俊憲院長のインプラントQ-plant施術法単独諮問。'}, link:'https://www.joongang.co.kr/article/2405147'},
            ].map((c,i)=>(
              <div key={i} className="card animate-up" style={{animationDelay:`${i*0.15}s`}}>
                <span className="card-tag">{c.tag}</span>
                <h3 className="card-title">{c.title[lang]}</h3>
                <p className="card-desc">{c.desc[lang]}</p>
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="card-link">{lang==='ja'?'記事を見る':lang==='en'?'Read Article':'기사 보기'}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="section" id="research" style={{background:'var(--card-bg)'}}>
        <div className="container">
          <div className="section-eyebrow">Academic Research</div>
          <h2 className="section-title animate-up">{t.researchTitle}</h2>
          <p className="section-hook animate-up delay-1">{t.researchSub}</p>
          <div className="grid grid-cols-2">
            {[
              {img:'/phd_comic.png', tag:'Ph.D. Thesis', ko:'성장기 골격성 III급 부정교합 환자의 상악골 전방견인 효과에 관한 연구', en:'Effects of Maxillary Protraction in Class III Malocclusion During Growth', ja:'成長期骨格性III級不正咬合患者の上顎前方牽引効果に関する研究', pdf:'/papers/phd_thesis.pdf', accent:'var(--accent)'},
              {img:'/master_comic.png', tag:"Master's Thesis", ko:'호선상의 견인 방향에 따른 치아이동에 관한 광탄성적 연구', en:'Photoelastic Study on Tooth Movement by Arch Wire Traction Direction', ja:'アーチワイヤー上の牽引方向による歯の移動に関する光弾性的研究', pdf:'/papers/master_thesis.pdf', accent:'var(--text-muted)'},
            ].map((p,i)=>(
              <div key={i} className="card animate-up" style={{padding:0,overflow:'hidden',animationDelay:`${i*0.2}s`}}>
                <div style={{height:220,backgroundImage:`url(${p.img})`,backgroundSize:'cover',backgroundPosition:'center'}}/>
                <div style={{padding:'2rem'}}>
                  <span className="card-tag">{p.tag}</span>
                  <h3 className="card-title" style={{fontSize:'1.1rem'}}>{p[lang] as string}</h3>
                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <a href={p.pdf} target="_blank" rel="noopener noreferrer"
                      style={{display:'inline-block',background:`linear-gradient(135deg,${p.accent},${p.accent}99)`,color:'white',padding:'0.65rem 1.4rem',borderRadius:10,fontWeight:700,fontSize:'0.875rem', textDecoration: 'none'}}>
                      📄 {lang==='ja'?'論文原本を見る':lang==='en'?'View Paper':'논문 원문 보기'}
                    </a>
                    <a href={`/article/${i === 0 ? 'ai_phd_analysis' : 'ai_master_analysis'}`}
                      style={{display:'inline-flex',alignItems:'center',gap:'0.4rem',background:'rgba(37,99,235,0.1)',color:'var(--accent)',border:'1px solid rgba(37,99,235,0.2)',padding:'0.65rem 1.4rem',borderRadius:10,fontWeight:800,fontSize:'0.875rem', textDecoration: 'none', transition: 'all 0.2s'}}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(37,99,235,0.2)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.1)'}>
                      ✨ {lang === 'ja' ? 'AIが分析した論文' : lang === 'en' ? 'AI Analysis of the Paper' : 'AI로 분석한 논문'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="section" id="awards">
        <div className="container">
          <div className="section-eyebrow">Awards & Certifications</div>
          <h2 className="section-title animate-up">{t.awardsTitle}</h2>
          <p className="section-hook animate-up delay-1">{t.awardsSub}</p>
          <div className="grid grid-cols-3" style={{marginBottom:'2rem'}}>
            {awards.map((a,i)=>(
              <div key={i} className="card animate-up" style={{padding:0,overflow:'hidden',animationDelay:`${i*0.1}s`}}>
                <div style={{height:200,overflow:'hidden',background:'#f1f5f9'}}>
                  <img src={`/awards/${a.file}`} alt={a[lang==='ja'?'ja':lang==='en'?'en':'ko']}
                    style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s'}}
                    onMouseOver={e=>(e.currentTarget.style.transform='scale(1.05)')}
                    onMouseOut={e=>(e.currentTarget.style.transform='scale(1)')}/>
                </div>
                <div style={{padding:'1.25rem'}}>
                  <h4 style={{fontWeight:700,fontSize:'0.95rem'}}>{lang==='ja'?a.ja:lang==='en'?a.en:a.ko}</h4>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <a href="/awards" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'linear-gradient(135deg,#2563eb,#7c3aed)',color:'white',padding:'0.9rem 2rem',borderRadius:12,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(37,99,235,0.3)'}}>
              🏆 {t.viewAll}
            </a>
          </div>
        </div>
      </section>

      {/* CAREER */}
      <section className="section" id="career" style={{background:'linear-gradient(135deg,rgba(37,99,235,0.03),rgba(124,58,237,0.05))'}}>
        <div className="container">
          <div className="section-eyebrow">33-Year Career</div>
          <h2 className="section-title animate-up">{t.careerTitle}</h2>
          <p className="section-hook animate-up delay-1">{t.careerSub}</p>
          <div className="grid grid-cols-3" style={{marginBottom:'2.5rem'}}>
            {[
              {icon:'🎓',year:'1990',ko:'서울대 치의학대학 졸업',en:'SNU Dental College Graduate',ja:'ソウル大歯科大学卒業',color:'#2563eb'},
              {icon:'🏫',year:'2006',ko:'치의학 박사 학위 취득',en:'PhD in Dentistry',ja:'歯科学博士取得',color:'#0891b2'},
              {icon:'📺',year:'2015',ko:'MBC 뉴스데스크 단독 출연',en:'MBC Newsdesk Feature',ja:'MBCニュースデスク出演',color:'#7c3aed'},
              {icon:'🏆',year:'2015',ko:'기재부 장관상 수상',en:'Ministry of Finance Award',ja:'財政部長官賞受賞',color:'#d97706'},
              {icon:'🌐',year:'2018',ko:'야후재팬 치과 검색 1위',en:'Yahoo Japan #1 Dental',ja:'Yahoo!Japan歯科検索1位',color:'#059669'},
              {icon:'🤝',year:'2021',ko:'NICE 기술평가 우수기업',en:'NICE Top-Tech Enterprise',ja:'NICE技術評価優秀企業',color:'#db2777'},
            ].map((c,i)=>(
              <div key={i} className="card animate-up" style={{borderTop:`3px solid ${c.color}`,flexDirection:'column',animationDelay:`${i*0.1}s`}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
                  <span style={{fontSize:'1.75rem'}}>{c.icon}</span>
                  <span style={{padding:'0.2rem 0.6rem',borderRadius:8,background:`${c.color}14`,color:c.color,fontWeight:800,fontSize:'0.82rem'}}>{c.year}</span>
                </div>
                <h3 style={{fontWeight:700,fontSize:'0.95rem'}}>{lang==='ja'?c.ja:lang==='en'?c.en:c.ko}</h3>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <a href="/career" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'linear-gradient(135deg,#2563eb,#7c3aed)',color:'white',padding:'0.9rem 2rem',borderRadius:12,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(37,99,235,0.3)'}}>
              📋 {t.viewAll}
            </a>
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="section" id="press">
        <div className="container">
          <div className="section-eyebrow">Press & Columns</div>
          <h2 className="section-title animate-up">{t.pressTitle}</h2>
          <p className="section-hook animate-up delay-1">{t.pressSub}</p>
          <div className="grid grid-cols-3" style={{marginBottom:'2.5rem'}}>
            {pressItems.map((p,i)=>(
              <div key={i} className="card animate-up" style={{borderTop:`3px solid ${p.color}`,animationDelay:`${i*0.1}s`}}>
                <div style={{fontSize:'2rem',marginBottom:'0.75rem'}}>{p.emoji}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                  <h3 style={{fontWeight:700,fontSize:'1rem'}}>{p[lang] as string}</h3>
                  <span style={{padding:'0.15rem 0.5rem',borderRadius:999,background:`${p.color}14`,color:p.color,fontSize:'0.72rem',fontWeight:700}}>{p.count}</span>
                </div>
                <p className="card-desc" style={{fontSize:'0.85rem'}}>{p.desc[lang]}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <a href="/press" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'var(--accent)',color:'white',padding:'0.9rem 2rem',borderRadius:12,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(37,99,235,0.3)'}}>
              📚 {t.viewAll}
            </a>
          </div>
        </div>
      </section>

      <FaqJsonLd faqs={t.faqs} lang={lang} />
      {/* FAQ SECTION (AEO & GEO Optimization) */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-eyebrow" style={{ textAlign: 'center' }}>FAQ & Verification</div>
          <h2 className="section-title animate-up" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>{t.faqTitle}</h2>
          <p className="section-hook animate-up delay-1" style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 3rem' }}>{t.faqSub}</p>
          
          <div className="faq-list">
            {t.faqs.map((faq, i) => {
              const isActive = activeFaqIndex === i;
              return (
                <div key={i} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button 
                    className="faq-question-btn" 
                    onClick={() => setActiveFaqIndex(isActive ? null : i)}
                    aria-expanded={isActive}
                  >
                    <h3>{faq.q}</h3>
                    <span className="faq-icon-wrapper">
                      {isActive ? '−' : '+'}
                    </span>
                  </button>
                  <div className="faq-answer-container" style={{ maxHeight: isActive ? '300px' : '0px', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', overflow: 'hidden' }}>
                    <div className="faq-answer-content">
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection lang={lang} />

      <Footer />
      <FloatingCTA />
    </main>
  );
}

