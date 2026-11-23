import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '3D CT短期集中インプラント・骨移植・他院再手術 | ソウル江南 ホワイトスタイル歯科',
  description:
    '1994年開院・創業33年。3名院長団協診（矯正学博士・補綴/インプラント代表院長・保健福祉部認証歯周科専門医）による短期集中（2〜4回来院）・難症例骨移植・再手術インプラント。3段階無痛麻酔・HIRA準拠保証・日本語通訳直通 +82-10-3046-5010。',
  alternates: {
    canonical: 'https://whitestyle.com/ja/implant',
  },
  openGraph: {
    title: '3D CT短期集中インプラント・骨移植・他院再手術 | ソウル江南 ホワイトスタイル歯科',
    description:
      '最短2〜4回の渡韓スケジュールと溶ける糸活用で日本在住者も安心。3名院長団協診による3D CT精密インプラント・高難度骨造成・他院インプラント再手術。',
    url: 'https://whitestyle.com/ja/implant',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseImplantPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/ja/implant#webpage',
        url: 'https://whitestyle.com/ja/implant',
        name: 'ソウル江南 ホワイトスタイル歯科 3D CT短期集中インプラント・骨移植・再手術公式案内',
        inLanguage: 'ja',
        specialty: 'OralAndMaxillofacialSurgery',
        description:
          'ソウル江南駅ホワイトスタイル歯科医院のインプラント治療は、3D CT精密診断と3段階の痛み緩和無痛麻酔システムを基盤に、金俊憲病院長（歯学博士）・李奉珍代表院長・朴宣恵院長（保健福祉部認証 歯周科専門医）の3名院長団協診を通じて、抜歯即時・短期集中インプラントから高難度の同種骨移植（GBR・上顎洞挙上術）・他院再手術・全顎再建・術後3/6/12ヶ月定期フォローまで安全に進行します。',
        reviewedBy: [
          { '@type': 'Physician', name: '金俊憲（キム・ジュンホン）病院長', jobTitle: '矯正学博士・歯学博士' },
          { '@type': 'Physician', name: '李奉珍（イ・ボンジン）代表院長', jobTitle: '延世大歯大出身・インプラント／咬合担当' },
          { '@type': 'Physician', name: '朴宣恵（パク・ソンヘ）院長', jobTitle: '保健福祉部認証 歯周科専門医' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/ja/implant#faq',
        inLanguage: 'ja',
        mainEntity: [
          {
            '@type': 'Question',
            name: '日本からインプラントを受ける場合、何回くらい韓国へ行く必要がありますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '一般的な1〜2本インプラントでは、1次渡韓（当日の3D CT診断・植立・吸収性縫合糸活用）と骨結合後の2次渡韓（精密スキャン・最終ジルコニア補綴装着）の計2〜4回の来院で完結できるよう滞在スケジュールを最適化いたします。',
            },
          },
          {
            '@type': 'Question',
            name: '歯槽骨が薄い・少ないと言われた場合や他院インプラントの再手術も可能ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい。延世大歯大出身の李奉珍代表院長、保健福祉部認証 歯周科専門医の朴宣恵院長、歯学博士 金俊憲病院長の3名協診により、高難度の同種骨移植（GBR・上顎洞挙上術）やインプラント周囲炎による再手術、無歯顎全顎再建まで精密に対応いたします。',
            },
          },
          {
            '@type': 'Question',
            name: '手術時の痛みや腫れ、治療後のアフターケアはどうなっていますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'うがい麻酔・表面塗布麻酔・体温調節デジタル定圧無痛麻酔器の3段階無痛麻酔システムを採用し、痛みへの恐怖を和らげます。帰国後も専任日本語通訳スタッフ3名がLINE（ID: whitestyle1）および直通電話（+82-10-3046-5010）で3・6・12ヶ月の経過フォローを実施します。',
            },
          },
        ],
      },
    ],
  };

  return (
    <div
      lang="ja"
      className="w-full min-h-screen bg-[#f8fafc] text-slate-900 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#091326] via-[#102347] to-[#162d59] text-white py-16 md:py-24 px-4 sm:px-8 lg:px-16 border-b-4 border-[#c5a880]">
        <div className="max-w-5xl mx-auto text-center wb-ka wbka">
          <div className="flex flex-wrap justify-center gap-2.5 mb-6">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-extrabold">
              矯正・補綴インプラント・歯周科専門医 3名院長団協診
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-bold">
              溶ける糸活用＆最短2〜4回来院 短期集中プログラム
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold">
              3段階無痛麻酔・純正品保証
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 wb-ka wbka">
            渡韓回数を最小化する精密設計と専門医協診<br />
            <span className="text-[#fde68a]">3D CT短期集中インプラント・難症例骨移植・再手術</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-[1.9] mb-10 wb-ka wbka">
            ソウル江南駅ホワイトスタイル歯科医院のインプラント治療は、3D CT精密診断と3段階の痛み緩和無痛麻酔システムを基盤に、金俊憲病院長（歯学博士）・李奉珍代表院長・朴宣恵院長（保健福祉部認証 歯周科専門医）の3名院長団協診を通じて、抜歯即時・短期集中インプラントから高難度の同種骨移植（GBR・上顎洞挙上術）・他院再手術・全顎再建・術後3/6/12ヶ月定期フォローまで安全に進行します。
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[220px] py-3.5 px-5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all"
            >
              💬 LINE事前CT・日程相談 (ID: whitestyle1)
            </a>
            <a
              href="tel:+82-10-3046-5010"
              className="flex-1 min-w-[240px] py-3.5 px-5 bg-amber-400 hover:bg-amber-300 text-[#091326] font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all"
            >
              📞 日本語通訳直通 (+82-10-3046-5010)
            </a>
            <Link
              href="/ja"
              className="flex-1 min-w-[200px] py-3.5 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm sm:text-base rounded-2xl transition-all"
            >
              ← 日本語総合トップへ戻る
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-8 space-y-14 wb-ka wbka">
        {/* Short-Trip Schedule Table */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="bg-[#091326] text-white px-6 py-5 border-b-2 border-[#c5a880]">
            <h2 className="text-xl sm:text-2xl font-black text-[#fde68a] wb-ka wbka">
              日本在住患者様向け 短期集中インプラント標準ステップ（最短2〜4回来院）
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-extrabold w-1/4">渡韓フェーズ</th>
                  <th className="py-3.5 px-5 font-extrabold w-1/4">標準滞在・間隔</th>
                  <th className="py-3.5 px-5 font-extrabold">実施する精密処置＆日本語サポート</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">1次渡韓（精密診断・植立）</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">日帰り〜2泊3日</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    来院当日に3D CT骨密度・神経管計測と咬合診断を行い、3段階無痛麻酔下でインプラント植立（症例により抜歯即時・仮歯装着・溶ける糸の採用で抜糸来院を省略可能）。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">骨結合・治癒期間（帰国中）</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約2〜4ヶ月（上顎・骨造成時は個別案内）</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    日本へお帰りいただいた後、違和感や経過のご不安は専任日本語通訳スタッフ3名がLINE（ID: whitestyle1）または直通電話（+82-10-3046-5010）で即時サポートします。
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">2次渡韓（スキャン・最終補綴）</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">1〜3日（滞在調整可）</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    インプラントと骨の結合を確認したうえで精密スキャンを行い、歯肉ラインにフィットするカスタムアバットメントと高強度オールジルコニア上部構造を装着します。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">術後メインテナンス</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">3・6・12ヶ月周期</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    韓国健康保険審査評価院（HIRA）基準と純正保証書をお渡しし、インプラント周囲炎を予防する歯周科専門医基準の長期フォローを実施します。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross Navigation */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/ja/whitening" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">来院1回・約60分</div>
            <div className="font-black text-slate-900">1DAYオフィスホワイトニング →</div>
          </Link>
          <Link href="/ja/laminate" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">審美補綴・再治療</div>
            <div className="font-black text-slate-900">無削除・最小削除ラミネート →</div>
          </Link>
          <Link href="/ja/orthodontics" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">トータルフィー総額制</div>
            <div className="font-black text-slate-900">歯列矯正・インビザライン →</div>
          </Link>
          <Link href="/board/notice/1921" className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">2026徹底比較ガイド</div>
            <div className="font-black text-slate-900">韓国・江南 歯科おすすめ比較 →</div>
          </Link>
        </section>

        <p className="text-xs text-slate-500 leading-relaxed">
          ※ インプラント植立および骨造成術は患者様の骨量・歯周状態・全身疾患（糖尿病・服用薬等）により治癒期間や来院回数が異なり、一時的な腫れ・出血・違和感等が生じる場合があります。事前3D CT精密検査により安全性を確認したうえで治療計画をご提示いたします。
        </p>
      </main>
    </div>
  );
}
