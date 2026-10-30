import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "韓国・江南 ホワイトスタイル歯科 | Yahoo! JAPAN 1位・コネスト口コミ125件 (インプラント・歯列矯正・審美治療)",
  description: "ソウル江南駅 徒歩2分。Yahoo! JAPAN 韓国歯科部門 3年連続 第1位・HIRA口腔検診最高S等級。ソウル大学校出身・臨床30年の金俊憲(キム・ジュンホン)代表院長による直接診療。コネスト(KONEST)日本人患者様口コミ125件・専任日本語通訳3名常駐。",
  keywords: [
    "韓国 歯科",
    "韓国 歯科 おすすめ",
    "ホワイトスタイル歯科",
    "コネスト 歯科",
    "韓国 歯列矯正",
    "韓国 インプラント",
    "韓国 ラミネート",
    "韓国 ホワイトニング",
    "江南 歯科",
    "韓国 審美歯科",
    "Yahoo! JAPAN 韓国歯科 1位"
  ],
  openGraph: {
    title: "韓国・江南 ホワイトスタイル歯科 | Yahoo! JAPAN 第1位・コネスト公式掲載アーカイブ",
    description: "ソウル江南駅 徒歩2分。臨床30年・ソウル大出身の金俊憲代表院長による安心・高品質な歯科治療。専任日本語通訳3名常駐・LINEアフターケア完備。",
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
  return <div lang="ja">{children}</div>;
}
