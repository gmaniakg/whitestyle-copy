import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '歯列矯正・インビザライン・裏側矯正（トータルフィー総額制） | ソウル江南 ホワイトスタイル歯科',
  description:
    '1994年開院・創業33年。ソウル大卒・檀国大外来教授・矯正学博士の金俊憲病院長が主治医変更なしで1対1担当。月々の調整料・保定装置費・精密診断費を含む明朗トータルフィー制度（総額制）。日本語通訳直通 +82-10-3046-5010 / LINE: whitestyle1。',
  alternates: {
    canonical: 'https://whitestyle.com/ja/orthodontics',
  },
  openGraph: {
    title: '歯列矯正・インビザライン（トータルフィー総額制） | ソウル江南 ホワイトスタイル歯科',
    description:
      '月々の調整料・精密診断費・リテーナー代込みのトータルフィー制度。ソウル大卒・矯正学博士 金俊憲病院長の1対1責任診療＆日本在住者向けインビザライン遠隔管理対応。',
    url: 'https://whitestyle.com/ja/orthodontics',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseOrthodonticsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/ja/orthodontics#webpage',
        url: 'https://whitestyle.com/ja/orthodontics',
        name: 'ソウル江南 ホワイトスタイル歯科 歯列矯正・インビザライン・トータルフィー総額制公式案内',
        inLanguage: 'ja',
        specialty: 'Orthodontics',
        description:
          'ソウル江南駅ホワイトスタイル歯科医院の歯列矯正は、1994年開院（創業33年）以来、ソウル大学校歯科大学卒・檀国大外来教授・矯正学博士の金俊憲（キム・ジュンホン）病院長が、3D CT・Quick-Ceph精密診断から装置装着、毎月の調整、保定管理まで主治医変更なしで1対1で直接担当し、月々の調整料・保定装置費・精密診断費を含む明朗なトータルフィー制度（総額制）を採用しています。',
        reviewedBy: {
          '@type': 'Physician',
          name: '金俊憲（キム・ジュンホン）病院長',
          jobTitle: 'ソウル大卒・檀国大外来教授・矯正学博士・歯学博士',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/ja/orthodontics#faq',
        inLanguage: 'ja',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'トータルフィー制度（総額制）には何が含まれますか？追加費用はかかりますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ホワイトスタイル歯科医院の矯正トータルフィー制度（総額制）には、3D CT・Quick-Ceph精密診断費、矯正装置費、月々の調整料・処置費、治療終了後の保定装置（リテーナー）費まで含まれており、治療途中で予期せぬ追加調整料が発生しない明朗会計を原則としています。',
            },
          },
          {
            '@type': 'Question',
            name: '日本に住んでいても韓国で歯列矯正（インビザライン等）を受けられますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい。特に透明マウスピース矯正（インビザライン）は、金俊憲病院長の3D精密設計のもと複数ステージ分のアライナーをまとめてお渡しし、LINEでの定期チェックと2〜4ヶ月ごとの来院点検を組み合わせることで、日本在住の患者様も無理なく矯正を継続いただけます。',
            },
          },
          {
            '@type': 'Question',
            name: '他院矯正後の後戻りや、抜歯後の口元引っ込みすぎ（内傾）の再矯正も可能ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい。3D CTで歯根と歯槽骨の厚みを精査したうえで、歯周科専門医の朴宣恵院長とも協診し、歯根吸収や歯茎下がりに配慮した安全な再矯正プランを立案いたします。',
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
              ソウル大卒・檀国大外来教授・矯正学博士 金俊憲病院長 1対1専任
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-bold">
              月治療費・保定装置費・診断費込み トータルフィー総額制
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold">
              専任日本語通訳3名常駐・帰国後LINE管理
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 wb-ka wbka">
            主治医が一切変わらない創業33年の信頼<br />
            <span className="text-[#fde68a]">トータルフィー総額制 歯列矯正・インビザライン</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-[1.9] mb-10 wb-ka wbka">
            ソウル江南駅ホワイトスタイル歯科医院の歯列矯正は、1994年開院（創業33年）以来、ソウル大学校歯科大学卒・檀国大外来教授・矯正学博士の金俊憲（キム・ジュンホン）病院長が、3D CT・Quick-Ceph精密診断から装置装着、毎月の調整、保定管理まで主治医変更なしで1対1で直接担当し、月々の調整料・保定装置費・精密診断費を含む明朗なトータルフィー制度（総額制）を採用しています。
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[220px] py-3.5 px-5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all"
            >
              💬 LINE矯正相談 (ID: whitestyle1)
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
        {/* Total Fee Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="bg-[#091326] text-white px-6 py-5 border-b-2 border-[#c5a880]">
            <h2 className="text-xl sm:text-2xl font-black text-[#fde68a] wb-ka wbka">
              追加費用の心配を抑えた「トータルフィー制度（総額制）」包含項目表
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-extrabold w-1/3">費用確認項目</th>
                  <th className="py-3.5 px-5 font-extrabold w-1/4">ホワイトスタイル歯科基準</th>
                  <th className="py-3.5 px-5 font-extrabold">詳細説明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">1. 3D CT・Quick-Ceph精密診断費</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700">総額に含む</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    骨格・顎関節・歯根形態の立体精密検査および非抜歯／抜歯シミュレーション診断費を当初ご提示する総額に含みます。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">2. 矯正装置費一式</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700">総額に含む</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    インビザライン、裏側（舌側）矯正、クリッピーC、部分矯正など、ご選択いただいた純正装置の製作・装着費を含みます。
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">3. 月々の処置・調整料</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700">総額に含む（追加なし）</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    毎回の来院チェックやワイヤー・アタッチメント調整のたびにかかる処置料を別途請求いたしません。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">4. 保定装置（リテーナー）＆アフター点検</td>
                  <td className="py-4 px-5 font-extrabold text-emerald-700">総額に含む</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    後戻りを防ぐ初回保定装置（固定式・可徹式）の製作および治療完了後3・6・12ヶ月周期の経過点検を含みます。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Device & Travel Compatibility Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="px-6 py-5 bg-slate-900 text-white">
            <h2 className="text-xl sm:text-2xl font-black text-white wb-ka wbka">
              ライフスタイル・渡韓頻度別の矯正装置セレクト基準
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-extrabold w-1/4">装置タイプ</th>
                  <th className="py-3.5 px-5 font-extrabold w-1/5">通院間隔の目安</th>
                  <th className="py-3.5 px-5 font-extrabold">特徴・おすすめの対象</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">インビザライン（透明マウスピース）</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約2〜4ヶ月ごと＋LINE遠隔</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    目立たず取り外し可能。日本在住の患者様でも数ステージ分のマウスピースを同時にお渡しし、来院頻度を最小化しながら計画通りに進められます。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">裏側（舌側）矯正・コンビ矯正</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約4〜6週間ごと</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    歯の裏側に装着するため周囲に気づかれにくく、出っ歯や抜歯症例でも精密な歯の移動制御が可能です（韓国滞在者・留学・駐在員の方に人気）。
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">クリッピーC（セルフライゲーション）</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約4〜6週間ごと</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    摩擦抵抗を抑えたキャップ構造により歯の移動時痛みを緩和し、効率的な治療進行と清掃性の高さを両立します。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">部分矯正＆高難度再矯正</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">3〜6ヶ月（部分）〜個別設計</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    前歯の軽度な乱れを3〜6ヶ月で整える部分矯正から、他院矯正後の後戻り・咬合違和感・歯周組織配慮が必要な再矯正まで歯周科専門医と協診します。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross Navigation */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/ja/whitening" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">来院1回・約60分</div>
            <div className="font-black text-slate-900">1DAYオフィスホワイトニング →</div>
          </Link>
          <Link href="/ja/laminate" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">審美補綴・再治療</div>
            <div className="font-black text-slate-900">無削除・最小削除ラミネート →</div>
          </Link>
          <Link href="/ja/implant" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">3名院長団協診・短期集中</div>
            <div className="font-black text-slate-900">3D CTインプラント・骨移植 →</div>
          </Link>
        </section>
      </main>
    </div>
  );
}
