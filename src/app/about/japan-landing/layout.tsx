import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "韓国・江南 ホワイトスタイル歯科 | 日本人向けインプラント・歯列矯正・審美治療 (韓国歯科 おすすめ)",
  description: "ソウル江南역 徒歩2分。ソウル大学出身・臨床30年の専門医によるプレミアム인플란트, 월 관리비 0엔의 치열교정, 1일 완료의 심미 미백(화이트닝)까지, 일본어 통역 상주로 안심하고 진료를 받으실 수 있습니다.",
  keywords: [
    "韓国 歯科",
    "韓国 歯科 おすすめ",
    "韓国 歯列矯正",
    "韓国 インプラント",
    "韓国 ラミネート",
    "韓国 ホワイトニング",
    "江南 歯科",
    "韓国 審美歯科",
    "韓国 虫紙治療",
    "韓國齒科",
    "韓国歯科"
  ],
  openGraph: {
    title: "韓国・江南 ホワイトスタイル歯科 | 日本인向け인플란트・치열교정・심미치료",
    description: "서울 강남역 도보 2분. 임상 30년 서울대 출신 원장님의 안심·고품질 치과 치료. 일본어 통역 상주 지원.",
    url: "https://whitestyle.com/about/japan-landing",
    locale: "ja_JP",
    type: "website"
  }
};

export default function JapaneseLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
