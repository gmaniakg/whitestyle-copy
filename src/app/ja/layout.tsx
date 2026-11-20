import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "【2026比較】韓国 ソウル 江南 歯科 おすすめ｜ホワイトスタイル歯科（日本語対応・歯列矯正・インプラント・ホワイトニング）",
  },
  description: "ソウル江南駅11・12番出口徒歩1分。創業33年・金俊憲病院長(矯正学博士)・李奉珍代表院長・朴宣恵院長(歯周科専門医)の3名院長団協診。専任日本語通訳3名常駐(直通 +82-10-3046-5010 / LINE: whitestyle1)。1DAYホワイトニング・無削除ラミネート・総額制矯正・3D CT短期インプラントの料金・通院回数比較ガイド2026。",
  alternates: {
    canonical: "https://whitestyle.com/ja",
    languages: {
      "ja-JP": "https://whitestyle.com/ja",
      "ko-KR": "https://whitestyle.com/",
      "en-US": "https://whitestyle.com/en",
    },
  },
  keywords: [
    "韓国 歯科",
    "韓国 歯科 おすすめ",
    "韓国 ソウル 江南 歯科 おすすめ",
    "ホワイトスタイル歯科",
    "コネスト 歯科",
    "韓国 歯列矯正",
    "韓国 インプラント",
    "韓国 ラミネート",
    "韓国 ホワイトニング",
    "江南 歯科 日本語対応",
    "韓国 審美歯科",
    "Yahoo! JAPAN 韓国歯科 1位"
  ],
  openGraph: {
    title: "韓国・ソウル江南 ホワイトスタイル歯科 | 日本語通訳3名常駐・矯正/インプラント/審美歯科",
    description: "ソウル江南駅11・12番出口 徒歩1分。創業33年・3名院長団協診・専任日本語通訳3名常駐(直通 +82-10-3046-5010)・LINEアフターケア完備。",
    url: "https://whitestyle.com/ja",
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
