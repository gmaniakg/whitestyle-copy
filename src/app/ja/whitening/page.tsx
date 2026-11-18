import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '1DAYオフィスホワイトニング＆スケーリング | ソウル江南 ホワイトスタイル歯科',
  description:
    '1994年開院・創業33年。江南駅徒歩1分・日本語通訳3名常駐のホワイトスタイル歯科1DAYオフィスホワイトニング。パノラマ検診・歯石除去・歯肉保護・KFDA承認ホワイトニング3回連続照射が約60分で完結。直通 +82-10-3046-5010 / LINE: whitestyle1。',
  alternates: {
    canonical: 'https://whitestyle.com/ja/whitening',
  },
  openGraph: {
    title: '1DAYオフィスホワイトニング＆スケーリング | ソウル江南 ホワイトスタイル歯科',
    description:
      '渡韓当日の約60分で完了する1DAYホワイトニングプログラム。パノラマ精密検診＋スケーリング＋しみ緩和ケア＋特殊光線3回照射。日本語通訳3名常駐。',
    url: 'https://whitestyle.com/ja/whitening',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function JapaneseWhiteningPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/ja/whitening#webpage',
        url: 'https://whitestyle.com/ja/whitening',
        name: 'ソウル江南 ホワイトスタイル歯科 1DAYオフィスホワイトニング＆スケーリング公式案内',
        inLanguage: 'ja',
        specialty: 'Dentistry',
        description:
          '1994年開院・創業33年のソウル江南駅ホワイトスタイル歯科医院の1DAYオフィスホワイトニングは、1回の来院（約60分）でパノラマ検診、スケーリング、歯肉保護、KFDA承認薬剤による3回連続光照射まで完結する短期渡韓対応プログラムです。',
        reviewedBy: [
          { '@type': 'Physician', name: '金俊憲（キム・ジュンホン）病院長', jobTitle: '矯正学博士・歯学博士' },
          { '@type': 'Physician', name: '李奉珍（イ・ボンジン）代表院長', jobTitle: '延世大歯大出身・補綴／咬合担当' },
          { '@type': 'Physician', name: '朴宣恵（パク・ソンヘ）院長', jobTitle: '保健福祉部認証 歯周科専門医' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/ja/whitening#faq',
        inLanguage: 'ja',
        mainEntity: [
          {
            '@type': 'Question',
            name: '韓国旅行の合間に1日（1回）だけでホワイトニングは完了しますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい、1DAYオフィスホワイトニングは1回の来院（所要時間約60分）で、パノラマ検診・スケーリング（歯石除去）・歯肉保護・KFDA承認ホワイトニング剤3回連続照射までワンストップで完了するため、1泊2日や日帰り渡韓でも安心して受けられます。',
            },
          },
          {
            '@type': 'Question',
            name: '歯がしみる・痛みが出ないか心配です。対策はありますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '施術前に歯の表面・知覚過敏部位・歯茎の状態を細かくチェックし、専用の歯肉保護バリア剤と知覚過敏緩和ケアを併用したうえでKFDA承認薬剤を使用するため、しみや痛みの負担を最小限に抑えます。',
            },
          },
          {
            '@type': 'Question',
            name: 'ラミネートベニアの前にホワイトニングを受けた方が良いですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'はい。無削除・最小削除ラミネートをご検討の場合でも、事前に1DAYホワイトニングで天然歯全体のベースカラーを明るく整えることで、周囲の天然歯と調和する透明感の高い仕上がりを設計しやすくなります。',
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
              創業33年（1994年開院）・江南駅11・12番出口 徒歩1分
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-bold">
              来院1回・約60分で完結する1DAYプログラム
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold">
              専任日本語通訳スタッフ3名常駐
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 wb-ka wbka">
            渡韓当日の約60分で自然な白さへ<br />
            <span className="text-[#fde68a]">1DAYオフィスホワイトニング＆スケーリング</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-[1.9] mb-10 wb-ka wbka">
            1994年開院・創業33年のソウル江南駅ホワイトスタイル歯科医院の1DAYオフィスホワイトニングは、ご旅行やご出張の合間（1回の来院・約60分）に、パノラマ・口腔精密検診、スケーリング（歯石除去）、歯肉保護、KFDA承認ホワイトニング剤と特殊光線3回連続照射までをワンストップで行います。
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[220px] py-3.5 px-5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all"
            >
              💬 LINE日本語予約 (ID: whitestyle1)
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-8 space-y-14 wb-ka wbka">
        {/* Step-by-Step 1DAY Package Table */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="bg-[#091326] text-white px-6 py-5 border-b-2 border-[#c5a880]">
            <h2 className="text-xl sm:text-2xl font-black text-[#fde68a] wb-ka wbka">
              1DAYオフィスホワイトニング パッケージ構成・所要時間（約60分）
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-extrabold w-1/4">施術ステップ</th>
                  <th className="py-3.5 px-5 font-extrabold w-1/6">目安時間</th>
                  <th className="py-3.5 px-5 font-extrabold">ホワイトスタイル歯科医院の精密ケア基準</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">1. 精密検診・シェード測定</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約10分</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    デジタルパノラマX線および口腔内チェックを行い、虫歯・知覚過敏部位・レジン補綴物の有無を確認のうえ、施術前の基準シェードを測定します。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">2. スケーリング＆研磨</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約15分</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    歯石・コーヒーや紅茶・喫煙による表面ステインを丁寧に除去し、ホワイトニング薬剤が歯面全体へ均一に浸透する清潔な状態へ整えます。
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">3. 歯肉保護＆しみ緩和ケア</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約5分</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    薬剤による刺激を防ぐ専用の歯肉保護バリアを歯茎のラインに沿って精密に塗布し、知覚過敏が心配な方にも配慮した安全処置を実施します。
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900">4. KFDA承認薬剤・3回連続照射</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">約30分</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    韓国食品医薬品安全処（KFDA）承認の純正ホワイトニング剤と専用特殊光線を使用し、同日内に計3サイクルの集中照射を行います。
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">5. 仕上がり確認・アフター案内</td>
                  <td className="py-4 px-5 font-semibold text-[#1e3a8a]">完了後すぐ</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">
                    専任の日本語通訳スタッフが同席し、トーンアップ後の色味確認と施術後48時間の飲食ケア・色戻り予防ガイドを日本語でお渡しします。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Treatment Comparison Box */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 wb-ka wbka">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 wb-ka wbka">
            1DAYホワイトニングと無削除ラミネート、どちらが向いている？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#faf8f4] border border-[#e5dec9] wb-ka wbka">
              <h3 className="text-lg font-extrabold text-[#1e3a8a] mb-3">
                ✨ 1DAYホワイトニングがおすすめの方
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700 leading-[1.9]">
                <li>・ 歯の形や並びはそのままで、全体の黄ばみ・着色だけを自然に明るくしたい方</li>
                <li>・ 歯を一切削らず、渡韓初日や帰国前の約60分でスピーディーに施術を終えたい方</li>
                <li>・ 今後ラミネートやセラミック治療を検討しており、まずベースの色調を整えておきたい方</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 wb-ka wbka">
              <h3 className="text-lg font-extrabold text-slate-900 mb-3">
                💎 無削除・最小削除ラミネートがおすすめの方
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700 leading-[1.9]">
                <li>・ 色だけでなく、前歯の隙間（すきっ歯）・欠け・サイズ・左右差までトータルで整えたい方</li>
                <li>・ 神経治療後の濃い変色や、ホワイトニングでは上がりにくい先天的な変色をお持ちの方</li>
                <li>・ <Link href="/ja/laminate" className="text-[#1e3a8a] font-bold underline">無削除・最小削除ラミネート詳細ページを見る →</Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 wb-ka wbka">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 wb-ka wbka">
            1DAYホワイトニングに関するよくあるご質問（FAQ）
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 mb-2">
                Q1. 1回の来院（約60分）だけで本当に完了しますか？
              </h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                はい。来院当日のパノラマ検診・スケーリングから3回連続照射、終了後のアフター説明まで約60分で完了いたします。ご帰国前日やショッピングの合間にも組み込みやすいスケジュールです。
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 mb-2">
                Q2. 差し歯や詰め物（レジン・セラミック）も白くなりますか？
              </h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                ホワイトニング薬剤は天然歯のエナメル質・象牙質に作用するため、人工の補綴物や詰め物の色は変わりません。前歯に過去の補綴物がある場合は、3名院長団の診断のもと全体の調和を考えた計画をご案内します。
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 mb-2">
                Q3. 予約方法と休診日・アクセスを教えてください。
              </h3>
              <p className="text-sm text-slate-700 leading-[1.9]">
                LINE（ID: whitestyle1）または日本語通訳スタッフ直通電話（+82-10-3046-5010）にて、ご希望の渡韓日時をお知らせください。地下鉄2号線・新盆唐線 江南駅11番・12番出口より徒歩1分（月〜水・金 10:00〜19:00／土曜 10:00〜14:00／木・日・韓国祝日休診）です。
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
            ※ 歯質や着色原因によってトーンアップの程度には個人差があり、施術後48時間は一時的な知覚過敏が生じる場合があります。診察の結果、虫歯や歯周炎がある場合は安全を優先した治療順をご案内いたします。
          </p>
        </section>

        {/* Cross Navigation */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/ja/laminate" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">審美補綴・再治療</div>
            <div className="font-black text-slate-900">無削除・最小削除ラミネート →</div>
          </Link>
          <Link href="/ja/orthodontics" className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] shadow-sm transition-all">
            <div className="text-xs font-extrabold text-[#1e3a8a] mb-1">トータルフィー総額制</div>
            <div className="font-black text-slate-900">歯列矯正・インビザライン →</div>
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
