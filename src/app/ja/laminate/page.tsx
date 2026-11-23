import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '無削除・最小削除ラミネートベニア（ゼロシェル）＆再治療 | ソウル江南 ホワイトスタイル歯科',
  description:
    '天然歯の保存を最優先とするホワイトスタイル歯科の無削除（ゼロシェル）・0.1〜0.2mm最小削除ラミネートベニア。歯周科専門医・補綴・矯正学博士3名院長団協診、最短2〜3回来院対応、日本語通訳3名常駐（直通 +82-10-3046-5010 / LINE: whitestyle1）。',
  alternates: {
    canonical: 'https://whitestyle.com/ja/laminate',
  },
  openGraph: {
    title: '無削除・最小削除ラミネートベニア＆他院再治療 | ソウル江南 ホワイトスタイル歯科',
    description:
      '歯をほとんど削らないゼロシェル無削除・0.1〜0.2mm最小削除ラミネートベニアと他院変色・破折の再治療。渡韓短期集中2〜3回対応・日本語通訳直通完備。',
    url: 'https://whitestyle.com/ja/laminate',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseLaminatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/ja/laminate#webpage',
        url: 'https://whitestyle.com/ja/laminate',
        name: 'ソウル江南 ホワイトスタイル歯科 無削除・最小削除ラミネートベニア＆他院再治療案内',
        inLanguage: 'ja',
        specialty: 'Prosthodontics',
        description:
          'ソウル江南駅ホワイトスタイル歯科医院の無削除・最小削除ラミネートベニアは、天然歯のエナメル質保存を最優先原則とし、保健福祉部認証 歯周科専門医・優秀補綴歯科医師の朴宣恵院長をはじめ3名院長団の精密咬合・歯肉ライン協診により、無削除（ゼロシェル）または0.1〜0.2mm最小削除でのオーダーメイドセラミック設計と他院ラミネート再治療・保証管理を提供します。',
        reviewedBy: [
          { '@type': 'Physician', name: '金俊憲（キム・ジュンホン）病院長', jobTitle: '矯正学博士・歯学博士' },
          { '@type': 'Physician', name: '李奉珍（イ・ボンジン）代表院長', jobTitle: '延世大歯大出身・インプラント／咬合担当' },
          { '@type': 'Physician', name: '朴宣恵（パク・ソンヘ）院長', jobTitle: '保健福祉部認証 歯周科専門医・優秀補綴歯科医師' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/ja/laminate#faq',
        inLanguage: 'ja',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'ラミネートで歯をたくさん削られて知覚過敏にならないか心配です。',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ホワイトスタイル歯科医院では天然歯のエナメル質保存を最優先とし、3D精密咬合診断と口腔スキャンを行ったうえで、削除不要なケースは無削除（ゼロシェル）、調整が必要な場合もエナメル質層内の0.1〜0.2mm最小削除のみに抑えます。',
            },
          },
          {
            '@type': 'Question',
            name: '他院で受けたラミネートの変色・欠け・歯茎の腫れの再治療もできますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい。保健福祉部認証 歯周科専門医の朴宣恵院長が歯茎の炎症や歯肉ラインの左右差をまず整え、李奉珍代表院長・金俊憲病院長と咬合の当たり方を精密に分析してから、再破折を防ぐ高強度セラミックで安全に再建します。',
            },
          },
          {
            '@type': 'Question',
            name: '日本からの渡韓でも短期間でラミネート治療を受けられますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '事前のLINE（ID: whitestyle1）相談で歯並びとご希望日程をお送りいただければ、1次来院での3D診断・精密デザインから最終装着まで最短2〜3回の来院スケジュールに合わせて計画をご案内いたします。',
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
              天然歯保存最優先・無削除ゼロシェル＆0.1〜0.2mm最小削除
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-bold">
              歯周科専門医・優秀補綴歯科医師を含む3名院長団協診
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold">
              最短2〜3回来院スケジュール対応
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 wb-ka wbka">
            天然歯を削りすぎない精密審美設計<br />
            <span className="text-[#fde68a]">無削除・最小削除ラミネートベニア＆他院再治療</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-[1.9] mb-10 wb-ka wbka">
            ソウル江南駅ホワイトスタイル歯科医院の無削除・最小削除ラミネートベニアは、天然歯のエナメル質保存を最優先原則とし、保健福祉部認証 歯周科専門医・優秀補綴歯科医師の朴宣恵院長をはじめ3名院長団の精密咬合・歯肉ライン協診により、無削除（ゼロシェル）または0.1〜0.2mm最小削除でのオーダーメイドセラミック設計と他院ラミネート再治療・保証管理を提供します。
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[220px] py-3.5 px-5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all"
            >
              💬 LINE写真事前見積り (ID: whitestyle1)
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
        {/* Lineup Comparison Matrix */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="bg-[#091326] text-white px-6 py-5 border-b-2 border-[#c5a880]">
            <h2 className="text-xl sm:text-2xl font-black text-[#fde68a] wb-ka wbka">
              歯の状態・お悩み別 セラミック補綴ラインナップ比較表
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-extrabold w-1/4">施術メニュー</th>
                  <th className="py-3.5 px-5 font-extrabold w-1/5">歯の切削量</th>
                  <th className="py-3.5 px-5 font-extrabold">向いている症例と臨床基準</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">ゼロシェル無削除ラミネート</td>
                  <td className="py-4 px-5 font-bold text-emerald-700">0mm（無削除優先）</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    前歯の隙間（すきっ歯）、矮小歯（小さい歯）、わずかな形態や色調の改善など、健康なエナメル質を削らずに極薄セラミックで自然なスマイルラインを形成する症例に適しています。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">イージーホワイト最小削除ラミネート</td>
                  <td className="py-4 px-5 font-bold text-[#1e3a8a]">0.1〜0.2mm最小削除</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    軽度の捻転や前歯の突出感がある場合、厚みが出すぎないようエナメル質層内のごくわずかな範囲のみを整えて、自然な透明感と噛み合わせの両立を図ります。
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">オールセラミッククラウン</td>
                  <td className="py-4 px-5 font-bold text-slate-700">全周精密形成</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    過去の神経治療による濃い変色や広範囲なレジン修復・破折がある歯に対して、内側からしっかり補強しながら天然歯に近い色調を再現します。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">他院ラミネート再治療・歯肉整形</td>
                  <td className="py-4 px-5 font-bold text-amber-700">咬合・歯肉原因別調整</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    他院施術後の欠け・脱落・境目の変色・歯茎の腫れに対し、歯周科専門医の朴宣恵院長が歯周炎と歯肉ラインを先に治療し、3名院長団の咬合分析のもとで再建いたします。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Short-Trip Schedule & Whitening Combo */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 wb-ka wbka">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 wb-ka wbka">
            渡韓スケジュール（最短2〜3回来院モデル）＆3段階無痛ケア
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#faf8f4] border border-[#e5dec9]">
              <div className="text-xs font-extrabold text-[#1e3a8a] mb-2">STEP 01 · 来院1回目</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">3D診断・咬合設計・最小調整</h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                3D CTと口腔スキャンでエナメル質の厚みや噛み合わせを精密計測。必要に応じて同日に1DAYホワイトニングや歯肉ライン整形も連携します。
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#faf8f4] border border-[#e5dec9]">
              <div className="text-xs font-extrabold text-[#1e3a8a] mb-2">STEP 02 · 製作期間</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">オーダーメイド精密セラミック作製</h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                患者様のお顔立ち・リップライン・天然歯の透明感に合わせて色調と切縁の微細なグラデーションを設計し、仮歯による生活快適性も確保します。
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#faf8f4] border border-[#e5dec9]">
              <div className="text-xs font-extrabold text-[#1e3a8a] mb-2">STEP 03 · 最終来院</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">試適・最終接着・3/6/12ヶ月経過管理</h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                光と角度による色味や咬合バランスを最終微調整して強固に接着します。ご帰国後もLINE（ID: whitestyle1）を通じたアフターケアを継続します。
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 wb-ka wbka">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 wb-ka wbka">
            ラミネートベニアに関するよくあるご質問（FAQ）
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 mb-2">
                Q1. どの歯でも無削除（ゼロシェル）ラミネートにできますか？
              </h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                歯が大きく前方に傾いている場合や叢生（ガタガタ）が強いケースで無理に無削除で行うと、出っ歯感が出たり歯茎との境目に段差が生じて歯周病の原因になります。当院では3D精密分析のうえ、無削除が適しているか、0.1〜0.2mm最小削除または短期部分矯正との併用が安全かを誠実にご説明いたします。
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 mb-2">
                Q2. 施術時の痛みはありますか？
              </h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                無削除ケースでは原則麻酔不要です。微細調整や歯肉整形が必要な場合も、うがい麻酔・表面塗布麻酔・体温対応デジタル定圧無痛麻酔器の3段階痛み緩和システムで負担を抑えます。
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
            ※ 歯の神経位置やエナメル質厚・咬合状態によって施術方法や来院回数に個人差があり、稀に一時的な知覚過敏や補綴物のチッピング等が生じる可能性があります。
          </p>
        </section>

        {/* Cross Navigation */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/ja/whitening" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">来院1回・約60分</div>
            <div className="font-black text-slate-900">1DAYオフィスホワイトニング →</div>
          </Link>
          <Link href="/ja/orthodontics" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">トータルフィー総額制</div>
            <div className="font-black text-slate-900">歯列矯正・インビザライン →</div>
          </Link>
          <Link href="/ja/implant" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">3名院長団協診・短期集中</div>
            <div className="font-black text-slate-900">3D CTインプラント・骨移植 →</div>
          </Link>
          <Link href="/board/notice/1921" className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">2026徹底比較ガイド</div>
            <div className="font-black text-slate-900">韓国・江南 歯科おすすめ比較 →</div>
          </Link>
        </section>
      </main>
    </div>
  );
}
