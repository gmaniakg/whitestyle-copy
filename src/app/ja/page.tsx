'use client';

import React from 'react';
import Link from 'next/link';
import KonestArchiveSection from '@/components/KonestArchiveSection';

export default function JapaneseLandingPage() {
  const jaMedicalWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/ja#webpage',
        name: 'ソウル江南 ホワイトスタイル歯科 公式日本語案内（創業33年・3名院長協診・日本語通訳3名常駐）',
        url: 'https://whitestyle.com/ja',
        inLanguage: 'ja',
        specialty: 'Dentistry',
        description:
          '1994年開院・創業33年。日本人患者様のご予約が毎年30％以上増加し、日本人専用公式相談センター（日本語通訳3名常駐・直通 +82-10-3046-5010）を拡充。1DAYオフィスホワイトニング、無削除・最小削除ラミネート、月々の調整料・保定装置代・診断費込みのトータルフィー歯列矯正、3D CT短期集中インプラントをご案内します。',
        reviewedBy: [
          { '@type': 'Physician', name: '金俊憲（キム・ジュンホン）病院長', jobTitle: '矯正学博士・歯学博士' },
          { '@type': 'Physician', name: '李奉珍（イ・ボンジン）代表院長', jobTitle: '延世大歯大出身・インプラント／咬合担当' },
          { '@type': 'Physician', name: '朴宣恵（パク・ソンヘ）院長', jobTitle: '保健福祉部認証 歯周科専門医' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/ja#faq',
        inLanguage: 'ja',
        mainEntity: [
          {
            '@type': 'Question',
            name: '韓国・江南 ホワイトスタイル歯科の歯列矯正トータルフィー制度（総額制）には何が含まれますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '3D CT・Quick-Ceph精密診断費、矯正装置費、毎月の処置・調整料、治療終了後の保定装置（リテーナー）費まで一括して含まれる明朗会計のトータルフィー制度を採用しています。',
            },
          },
          {
            '@type': 'Question',
            name: '1泊2日・2泊3日などの短期渡韓でも受けられる施術は何がありますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '1DAYオフィスホワイトニング＆スケーリング（1回の来院・約60分で完結）、無削除ゼロシェル・最小削除ラミネートベニア（最短2〜3回来院）、溶ける糸を活用した3D CT短期集中インプラント（最短2〜4回来院）、インビザライン透明マウスピース矯正（LINE遠隔フォロー併用）に対応しています。',
            },
          },
          {
            '@type': 'Question',
            name: '日本語での事前相談や直通連絡先を教えてください。',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '院内に専任日本語医療通訳スタッフ3名が常駐しており、日本語通訳スタッフ直通電話（+82-10-3046-5010）およびLINE公式相談窓口（ID: whitestyle1）にて渡韓前のご相談からご帰国後のアフターケアまで日本語で直接対応いたします。',
            },
          },
          {
            '@type': 'Question',
            name: '他院で受けたラミネートベニアの再治療（変色・破折・歯茎の黒ずみ）や無削除ゼロシェルは可能ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '天然歯のエナメル質保存を最優先とし、3D精密咬合診断の上で無削除ゼロシェルまたは0.1〜0.2mm最小削除・CAD/CAM短期補綴（最短2〜3回来院）で他院ラミネートの変色・破折・歯肉炎症再治療に朴宣恵院長（歯周科専門医）と李奉珍代表院長が協診対応します。',
            },
          },
          {
            '@type': 'Question',
            name: '骨が足りないと言われた難症例インプラント（骨移植・サイナスリフト）・他院インプラント再手術・全顎再建にも対応していますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '3D CT骨密度・神経管精密分析と3段階無痛麻酔をもとに、3名院長団協診で他院インプラント再手術・難症例骨造成（GBR・上顎洞挙上術）・無歯顎フルマウス全顎インプラント・カスタムアバットメント補綴まで安全に実施します。',
            },
          },
          {
            '@type': 'Question',
            name: '他院での歯列矯正後の後戻り（再矯正）やインビザライン・裏側矯正は主治医が変わらず担当しますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '1994年開院以来、ソウル大卒・矯正学博士の金俊憲病院長が3D CT歯根・歯槽骨幅計測のもと、初期診断から装置装着・再矯正・保定まで主治医変更なしで1対1直接担当します。',
            },
          },
        ],
      },
    ],
  };

  return (
    <div lang="ja" className="w-full min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-amber-100 selection:text-slate-900 break-keep wb-ka wbka" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jaMedicalWebPageJsonLd) }}
      />
      {/* 1. HERO SECTION (Editorial Navy & Warm Gold, No AI Cliché Gradients) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#091326] via-[#102347] to-[#162d59] text-white py-20 md:py-28 px-4 sm:px-8 lg:px-16 border-b-4 border-[#c5a880]">
        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Top Authority Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-300/50 text-amber-200 text-xs sm:text-sm font-extrabold">
              🏆 Yahoo! JAPAN 韓国歯科部門 3年連続 第1位（複数回達成）
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-bold">
              📍 韓国・江南駅11・12番出口 徒歩1分 ｜ 日本人来院数 14,800名突破
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold">
              🛡️ 韓国健康保険審査評価院(HIRA) 口腔検診 最高「S等級」
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] mb-6">
            <span className="block text-slate-100 mb-2">1994年開院・創業33年の信頼と実績が証明する</span>
            <span className="text-[#fde68a]">韓国・江南 ホワイトスタイル歯科</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-slate-200 max-w-3xl mb-10 leading-relaxed font-medium">
            ソウル大卒・矯正学博士の金俊憲（キム・ジュンホン）病院長、延世大出身の李奉珍代表院長、保健福祉部認証 歯周科専門医の朴宣恵院長の3名院長団協診。<br className="hidden sm:inline" />
            専任の日本語医療通訳スタッフ3名が常駐し、カウンセリングから日本帰国後のLINEアフターケアまで完全サポートいたします。
          </p>

          {/* Primary Contact & Archive Jump Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 w-full max-w-4xl mb-14">
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-w-[230px] py-4 px-5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>💬 LINE日本語無料相談 (ID: whitestyle1)</span>
            </a>

            <a
              href="tel:+82-10-3046-5010"
              className="flex-1 min-w-[240px] py-4 px-5 bg-amber-400 hover:bg-amber-300 text-[#091326] font-extrabold text-sm sm:text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>📞 日本語通訳直通 (+82-10-3046-5010)</span>
            </a>

            <a
              href="#konest-archive"
              className="flex-1 min-w-[230px] py-4 px-5 bg-[#c5a880] hover:bg-[#b59469] text-[#091326] font-extrabold text-sm sm:text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>★ コネスト口コミ125件＆公式記録を見る</span>
            </a>
          </div>

          {/* Stats Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { label: 'Yahoo! JAPAN 韓国歯科検索', value: '第1位 (3年連続)' },
              { label: '日本人患者様 累計来院数', value: '14,800名+' },
              { label: 'コネスト公式口コミ＆回答', value: '125件 (★4.8)' },
              { label: '専任日本語医療通訳スタッフ', value: '3名常駐' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-950/50 border border-[#c5a880]/35 rounded-2xl p-5 text-center"
              >
                <div className="text-2xl lg:text-3xl font-black text-amber-300 mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-slate-200 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.5 JAPAN OFFICIAL CONSULTATION CENTER & 4 DEDICATED TREATMENT SUB-PAGES */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto wb-ka wbka">
        {/* Press Citation Callout (#1 Formula) */}
        <div className="bg-white rounded-3xl border-2 border-[#c5a880] shadow-md p-6 sm:p-8 mb-10 wb-ka wbka">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#091326] text-[#fde68a] text-xs font-extrabold">
              日本公式プレスリリース報道実績（NEWSCAST・AtPress・ぷれにゅー）
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
              日本人ご予約 毎年30%以上増加
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 wb-ka wbka">
            日本人専用公式相談センター拡充 ＆ トータルフィー総額制・1DAYプログラムのご案内
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-[1.95] wb-ka wbka">
            NEWSCAST・AtPress・ぷれにゅー等の日本公式プレスリリースで報道された通り、日本人患者様のご予約が毎年30％以上増加し、日本人専用公式相談センター（専任日本語医療通訳スタッフ3名常駐・室長イ・ヒョンホ直通 <a href="tel:+82-10-3046-5010" className="text-[#1e3a8a] font-extrabold underline">+82-10-3046-5010</a>）を拡充。1DAYオフィスホワイトニングおよび歯列矯正トータルフィー制度（総額制：月々の調整料・保定装置代・精密診断費を全て含む明朗会計）を公式運営しています。
          </p>
        </div>

        {/* 4 Dedicated Japanese Treatment Sub-Landing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 wb-ka wbka">
          <Link
            href="/ja/whitening"
            className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between wb-ka wbka"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-sky-50 text-[#1e3a8a] text-xs font-extrabold mb-3">
                来院1回・約60分完結
              </span>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1e3a8a] mb-2">
                1DAYオフィスホワイトニング
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.8] mb-4">
                パノラマ検診＋歯石除去＋歯肉保護＋KFDA承認薬剤3回連続照射を約60分で完結。
              </p>
            </div>
            <span className="text-xs font-extrabold text-[#1e3a8a]">詳細・所要時間を見る →</span>
          </Link>

          <Link
            href="/ja/laminate"
            className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between wb-ka wbka"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-extrabold mb-3">
                最短2〜3回来院
              </span>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1e3a8a] mb-2">
                無削除・最小削除ラミネート
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.8] mb-4">
                ゼロシェル無削除・0.1〜0.2mm最小削除・他院ラミネート再治療（歯周科専門医協診）。
              </p>
            </div>
            <span className="text-xs font-extrabold text-[#1e3a8a]">ラインナップ比較を見る →</span>
          </Link>

          <Link
            href="/ja/orthodontics"
            className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between wb-ka wbka"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-extrabold mb-3">
                トータルフィー総額制
              </span>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1e3a8a] mb-2">
                歯列矯正・インビザライン
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.8] mb-4">
                金俊憲病院長1対1専任。月治療費・保定装置代・診断費込み＆日本遠隔管理対応。
              </p>
            </div>
            <span className="text-xs font-extrabold text-[#1e3a8a]">総額制内訳を見る →</span>
          </Link>

          <Link
            href="/ja/implant"
            className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1e3a8a] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between wb-ka wbka"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-extrabold mb-3">
                最短2〜4回渡韓
              </span>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1e3a8a] mb-2">
                3D CT短期集中インプラント
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-[1.8] mb-4">
                溶ける糸活用で通院負担軽減。高難度骨移植・他院再手術・歯周科専門医3名協診。
              </p>
            </div>
            <span className="text-xs font-extrabold text-[#1e3a8a]">渡韓ステップを見る →</span>
          </Link>
        </div>

        {/* 2026 Comparison Guide Table for Japanese Patients */}
        <div id="comparison-guide-2026" className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="bg-[#091326] text-white px-6 sm:px-8 py-5 border-b-2 border-[#c5a880]">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-extrabold mb-2">
              2026年 韓国・ソウル江南 歯科比較ガイド
            </span>
            <h2 className="text-xl sm:text-2xl font-black wb-ka wbka">
              韓国・江南 ホワイトスタイル歯科 主要治療・通院回数・日本語サポート比較一覧
            </h2>
          </div>
          <div className="overflow-x-auto p-4 sm:p-6">
            <table className="w-full text-xs sm:text-sm border-collapse text-slate-800 wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300 text-left">
                  <th className="py-3 px-4 font-extrabold">治療メニュー</th>
                  <th className="py-3 px-4 font-extrabold">来院回数・期間目安</th>
                  <th className="py-3 px-4 font-extrabold">料金・保証・安心基準</th>
                  <th className="py-3 px-4 font-extrabold">日本語相談・詳細</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3.5 px-4 font-extrabold text-[#091326]">1DAYオフィスホワイトニング</td>
                  <td className="py-3.5 px-4">来院1回・約60分完結</td>
                  <td className="py-3.5 px-4">パノラマ検診＋歯石除去＋歯肉保護＋KFDA承認薬剤3回照射（観光・短期渡韓向け）</td>
                  <td className="py-3.5 px-4"><Link href="/ja/whitening" className="text-[#1e3a8a] font-extrabold underline">詳細を見る →</Link></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-extrabold text-[#091326]">無削除ゼロシェル・最小削除ラミネート</td>
                  <td className="py-3.5 px-4">最短2〜3回来院（1〜2週）</td>
                  <td className="py-3.5 px-4">エナメル質保存優先（無削除〜0.1〜0.2mm最小削除）・他院変色/破折再治療も歯周科専門医協診</td>
                  <td className="py-3.5 px-4"><Link href="/ja/laminate" className="text-[#1e3a8a] font-extrabold underline">比較を見る →</Link></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-extrabold text-[#091326]">歯列矯正・インビザライン・裏側</td>
                  <td className="py-3.5 px-4">日本遠隔管理・2〜4ヶ月毎</td>
                  <td className="py-3.5 px-4">診断費・装置費・毎月の調整料・保定装置代込みトータルフィー総額制／金俊憲病院長1対1専任</td>
                  <td className="py-3.5 px-4"><Link href="/ja/orthodontics" className="text-[#1e3a8a] font-extrabold underline">総額制を見る →</Link></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-extrabold text-[#091326]">3D CT短期インプラント・骨造成・再手術</td>
                  <td className="py-3.5 px-4">最短2〜4回渡韓（溶ける糸）</td>
                  <td className="py-3.5 px-4">3段階無痛麻酔＋難症例骨移植(GBR・サイナスリフト)＋他院再手術＋3・6・12ヶ月リコール</td>
                  <td className="py-3.5 px-4"><Link href="/ja/implant" className="text-[#1e3a8a] font-extrabold underline">手順を見る →</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50/70 px-6 py-4 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="font-bold text-slate-800">
              専任日本語通訳3名常駐（直通：<a href="tel:+82-10-3046-5010" className="text-[#1e3a8a] font-extrabold underline">+82-10-3046-5010</a> ／ LINE ID：whitestyle1）
            </span>
            <Link href="/board/notice/1907" className="text-[#1e3a8a] font-extrabold underline">
              2026年 韓日統合比較ガイド全文を読む →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. KONEST OFFICIAL ARCHIVE & 125 JAPANESE REVIEWS SECTION */}
      <KonestArchiveSection />

      {/* 3. WHY CHOOSE WHITE STYLE (ホワイトスタイル歯科が選ばれる5つの理由) */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#1e3a8a] font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 block">
            Features &amp; Strengths
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            日本の患者様にホワイトスタイル歯科が選ばれ続ける <span className="text-[#1e3a8a]">5つの理由</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center font-black text-lg mb-5">
              01
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">専任日本語通訳スタッフ3名常駐・日本語通訳直通電話</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              受付・3D CT撮影・院長カウンセリング・診療・帰国後のアフターケアまで専任の日本語医療通訳スタッフがマンツーマンで同行サポートします。日本語通訳スタッフ直通電話（+82-10-3046-5010）およびLINE（ID: whitestyle1）にて日本から直接日本語でご相談・ご予約いただけます。
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-lg mb-5">
              02
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">創業33年・矯正／補綴／歯周科専門医の3名院長団協診</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              ソウル大卒・檀国大外来教授・矯正学博士の金俊憲病院長、李奉珍代表院長、保健福祉部認証 歯周科専門医の朴宣恵院長の3名院長団が、難症例の骨移植インプラント・歯科矯正・無削除ラミネートを協診いたします。
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black text-lg mb-5">
              03
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">渡韓スケジュールに合わせた短期集中治療</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              インプラントは最短2〜4回来院（溶ける糸の活用等で調整可能）、1DAYホワイトニングや審美補綴など、日本在住の患者様の滞在日程に最適化したプランをご提案します。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black text-lg mb-5">
              04
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">事前定額制（明朗会計）・追加請求ゼロ</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              治療開始前にCT・レントゲン資料をもとに費用内訳を日本語で明確にご説明し、ご同意いただいた金額以外の不当な追加請求は一切発生いたしません。
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-black text-lg mb-5">
              05
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">純正ジルコニア＆天然歯保存（無削除ラミネート）</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              無理な抜歯や歯を削りすぎる治療を避け、歯をほとんど削らない無削除ラミネート（ゼロシェル・WHINISH）や高強度オールジルコニア補綴を採用しています。
            </p>
          </div>
        </div>

        {/* 6-POINT CONFIRMATION MATRIX FOR JAPANESE PATIENTS */}
        <div className="mt-14 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 bg-[#091326] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#fde68a]">
              日本の患者様がよく確認される6大診療条件まとめ
            </h3>
            <span className="text-xs text-slate-300 font-semibold">
              創業33年・3名院長協診・日本語通訳3名常駐
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-5 font-extrabold w-1/3">ご確認項目</th>
                  <th className="py-3.5 px-5 font-extrabold">ホワイトスタイル歯科医院（韓国・江南駅）の対応基準</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">1. 渡韓当日の精密診断・短期集中計画</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">ご来院当日の3D CT・Quick-Ceph・口腔スキャン精密診断により、1DAYホワイトニングから2〜3回集中のラミネート、インプラントまで滞在日程に合わせた治療計画をご案内します。</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-4 px-5 font-bold text-slate-900">2. 3段階無痛麻酔・痛み緩和ケア</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">うがい麻酔・表面塗布麻酔・温度調節デジタル定圧無痛麻酔器の3段階緩和システムにより、痛みに不安のある方も安心して治療を受けられます。</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">3. 3名院長団協診・他院再手術対応</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">金俊憲病院長(矯正学博士)・李奉珍代表院長(インプラント／咬合)・朴宣恵院長(歯周科専門医)の3名協診で、難症例インプラント再手術やラミネート再治療・再矯正にも対応します。</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-4 px-5 font-bold text-slate-900">4. HIRA非給与基準遵守・3/6/12ヶ月LINE定期検診</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">韓国健康保険審査評価院(HIRA)の非給与基準および純正品保証を守り、治療後も3・6・12ヶ月周期のアフターケアとLINE経過フォローを実施します。</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-bold text-slate-900">5. 専任日本語医療通訳スタッフ3名常駐・日本語通訳直通</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">受付からCT検査、院長診察、費用説明、ご帰国後フォローまで日本語医療通訳コーディネーター3名がマンツーマンでサポート。日本語通訳スタッフ直通電話（+82-10-3046-5010）およびLINE（ID: whitestyle1）にて日本から直接日本語でご相談・ご予約いただけます。</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-4 px-5 font-bold text-slate-900">6. 診療時間・休診日・アクセス</td>
                  <td className="py-4 px-5 text-slate-700 leading-[1.9]">月・火・水・金 10:00〜19:00（昼休み 13:00〜14:00）／ 土曜 10:00〜14:00（木曜・日曜・韓国祝日休診）｜ 江南駅11番・12番出口 徒歩1分</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TREATMENT SELECTION & STAY-DURATION COMPARISON MATRIX */}
        <div className="mt-14 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden wb-ka wbka">
          <div className="px-6 py-5 bg-[#091326] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b-2 border-[#c5a880]">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#fde68a] wb-ka wbka">
              お悩み・渡韓滞在日数別 治療選択ガイド比較表
            </h3>
            <span className="text-xs text-slate-300 font-semibold">
              1DAYホワイトニング・無削除ラミネート・トータルフィー矯正・短期集中インプラント
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-4 font-extrabold">施術メニュー</th>
                  <th className="py-3.5 px-4 font-extrabold">おすすめのお悩み</th>
                  <th className="py-3.5 px-4 font-extrabold">歯の削合・侵襲度</th>
                  <th className="py-3.5 px-4 font-extrabold">必要な滞在日数・来院回数</th>
                  <th className="py-3.5 px-4 font-extrabold">費用体系・含まれる項目</th>
                  <th className="py-3.5 px-4 font-extrabold">担当院長・専用詳細ページ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">1DAYホワイトニング（日帰り約60分）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">歯全体の黄ばみ・コーヒー/紅茶の着色を自然にトーンアップしたい</td>
                  <td className="py-4 px-4 font-bold text-emerald-700">削合なし（非切削・歯肉保護付）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">日帰り〜来院1回（所要時間 約60分）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">パノラマ検診＋スケーリング＋歯肉保護＋KFDA薬剤3回照射一式</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">
                    3名院長団検診連携<br />
                    <Link href="/ja/whitening" className="text-[#1e3a8a] font-extrabold underline">1DAYホワイトニング詳細 →</Link>
                  </td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-4 px-4 font-bold text-slate-900">無削除・最小削除ラミネート（最短2〜3回来院）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">前歯の色・形・すきっ歯・欠けを短期で整えたい／他院ラミネート再治療</td>
                  <td className="py-4 px-4 font-bold text-[#1e3a8a]">0mm無削除（ゼロシェル）〜0.1〜0.2mm最小削除</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">最短2〜3回来院（渡韓日程に合わせ調整）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">3D口腔スキャン＋咬合設計＋オーダーメイドセラミック＋保証管理</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">
                    朴宣恵院長（歯周科専門医）× 3名協診<br />
                    <Link href="/ja/laminate" className="text-[#1e3a8a] font-extrabold underline">ラミネート詳細ページ →</Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-900">トータルフィー歯列矯正（総額制・インビザライン遠隔管理対応）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">噛み合わせ・出っ歯・ガタつきを根本改善したい／他院後戻り再矯正</td>
                  <td className="py-4 px-4 font-bold text-emerald-700">非抜歯優先検討・天然歯保存</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">インビザラインは2〜4ヶ月毎＋LINE遠隔管理（部分3〜6ヶ月〜）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">トータルフィー総額制（3D精密診断費・装置費・月治療費・保定装置代込み）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">
                    金俊憲病院長（矯正学博士）1対1専任<br />
                    <Link href="/ja/orthodontics" className="text-[#1e3a8a] font-extrabold underline">歯列矯正・総額制詳細 →</Link>
                  </td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-4 px-4 font-bold text-slate-900">3D CT短期集中インプラント（溶ける糸活用・最短2〜4回渡韓）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">歯の欠損・骨量不足（骨移植GBR/上顎洞挙上術）・他院インプラント再手術</td>
                  <td className="py-4 px-4 font-bold text-slate-700">3D CTガイド最小侵襲＋3段階無痛麻酔</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">最短2〜4回渡韓（溶ける糸活用で抜糸来院不要化）</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">HIRA非給与基準遵守＋純正ジルコニア保証＋3/6/12ヶ月LINEフォロー</td>
                  <td className="py-4 px-4 text-slate-700 leading-[1.8]">
                    李奉珍代表院長・朴宣恵専門医・金俊憲病院長3名協診<br />
                    <Link href="/ja/implant" className="text-[#1e3a8a] font-extrabold underline">インプラント詳細ページ →</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* HIGH-DIFFICULTY LONG-TAIL INDICATION MATRIX (日本語) */}
        <div className="mt-10 bg-white rounded-3xl border border-[#c5a880]/60 shadow-sm overflow-hidden wb-ka wbka">
          <div className="px-6 py-5 bg-[#102347] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b-2 border-[#c5a880]">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#fde68a] wb-ka wbka">
              難症例・他院再治療・短期集中 6大専門適応症ガイド（日本語通訳3名常駐・直通 +82-10-3046-5010）
            </h3>
            <span className="text-xs text-slate-300 font-semibold">
              3名院長団協診・カスタム補綴・LINE長期フォロー
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm wb-ka wbka">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3.5 px-4 font-extrabold w-1/4">専門適応症（難症例・再治療）</th>
                  <th className="py-3.5 px-4 font-extrabold">ホワイトスタイル歯科の協診プロトコル</th>
                  <th className="py-3.5 px-4 font-extrabold w-1/5">関連詳細ページ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">1. 他院インプラント再手術・難症例骨造成（GBR・上顎洞挙上術）</td>
                  <td className="py-3.5 px-4 text-slate-700 leading-[1.8]">3D CT骨質分析と3段階無痛麻酔のもと、朴宣恵（歯周科専門医）×李奉珍（代表院長）×金俊憲（病院長）が炎症除去・骨造成・カスタムアバットメント補綴まで協診対応。</td>
                  <td className="py-3.5 px-4"><Link href="/ja/implant" className="text-[#1e3a8a] font-bold underline">インプラント専門案内 →</Link></td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-3.5 px-4 font-bold text-slate-900">2. 無歯顎フルマウス全顎インプラント再建＆精密咬合補綴</td>
                  <td className="py-3.5 px-4 text-slate-700 leading-[1.8]">歯がほとんど無い症例に対し、CAD/CAM精密設計と3名協診で噛む機能・発音・フェイスラインの垂直高径を同時回復。</td>
                  <td className="py-3.5 px-4"><Link href="/treatments/implant/edentulous" className="text-[#1e3a8a] font-bold underline">全顎再建詳細 →</Link></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">3. 他院ラミネート再治療・無削除ゼロシェル／0.1〜0.2mm最小削除</td>
                  <td className="py-3.5 px-4 text-slate-700 leading-[1.8]">変色・欠け・歯茎黒ずみの原因となる咬合干渉を修正し、最短2〜3回来院のCAD/CAM短期オーダーメイドセラミックへ再構築。</td>
                  <td className="py-3.5 px-4"><Link href="/ja/laminate" className="text-[#1e3a8a] font-bold underline">ラミネート専門案内 →</Link></td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-3.5 px-4 font-bold text-slate-900">4. 他院矯正後の後戻り再矯正・インビザライン・裏側矯正</td>
                  <td className="py-3.5 px-4 text-slate-700 leading-[1.8]">ソウル大卒・矯正学博士の金俊憲病院長が33年主治医変更なしで直接担当。3D CT歯根計測・歯周科協診×トータルフィー総額制。</td>
                  <td className="py-3.5 px-4"><Link href="/ja/orthodontics" className="text-[#1e3a8a] font-bold underline">矯正・総額制案内 →</Link></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">5. 渡韓1DAYオフィスホワイトニング＆スケーリング</td>
                  <td className="py-3.5 px-4 text-slate-700 leading-[1.8]">来院1回（約60分）でパノラマ検診・歯石除去・歯肉保護・KFDA承認3回照射まで完結。短期ご旅行中にも最適。</td>
                  <td className="py-3.5 px-4"><Link href="/ja/whitening" className="text-[#1e3a8a] font-bold underline">1DAY美白詳細 →</Link></td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="py-3.5 px-4 font-bold text-slate-900">6. 歯周科専門医重度歯周ケア＆3・6・12ヶ月LINE遠隔管理</td>
                  <td className="py-3.5 px-4 text-slate-700 leading-[1.8]">治療後のインプラント周囲炎や歯肉炎を防ぐため、日本語通訳スタッフ3名（室長イ・ヒョンホ直通 +82-10-3046-5010 / LINE: whitestyle1）が帰国後も定期フォロー。</td>
                  <td className="py-3.5 px-4"><Link href="/board/notice/1901" className="text-[#1e3a8a] font-bold underline">通訳サポート紹介 →</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3.5 JAPANESE INTERPRETER HERITAGE STORY (室長 イ・ヒョンホ 紹介) */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#c5a880]/60 shadow-lg overflow-hidden">
          <div className="bg-[#091326] text-white px-6 sm:px-10 py-6 border-b-2 border-[#d97706]">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[#fde68a] font-extrabold text-xs mb-3">
              AMEBA患者様実写記録 × 日本の高校・大学野球出身コーディネーター
            </span>
            <h2 className="text-xl sm:text-3xl font-black leading-snug text-white">
              日本人患者様がブログに残した「1枚の名刺」<br className="hidden sm:inline" />
              <span className="text-[#fde68a]">—— 日本の高校・大学野球出身の室長 イ・ヒョンホ（イヒョンホ）の1対1同行サポート</span>
            </h2>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-[#faf8f4]">
                <img
                  src="/images/leehyunho_ameba_card_heritage.jpg"
                  alt="ホワイトスタイル歯科 室長 イ・ヒョンホ（イヒョンホ）名刺・直通ホットライン案内"
                  className="w-full h-auto block"
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ※ 在韓日本人ブロガー様が実際の来院体験記（アメーバブログ）に掲載してくださった名刺記録をもとに、現住所（江南駅11・12番出口徒歩1分）および現在の直通電話（+82-10-3046-5010）へ最新化した案内カードです。
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-[1.9]">
              <div className="p-5 rounded-2xl bg-[#faf8f4] border border-[#e5dec9]">
                <h3 className="font-black text-slate-900 text-base sm:text-lg mb-2">
                  ⚾ 日本の高校野球・大学野球で培った「礼儀・誠実・最後まで寄り添う責任感」
                </h3>
                <p className="text-slate-700 text-sm leading-[1.9]">
                  日本語専任チームを統括する<strong>イ・ヒョンホ（イヒョンホ）室長</strong>は、<strong>日本の高校野球・大学野球の現場で培った礼儀作法とチームワーク</strong>、そして繊細な日本語ニュアンスへの深い理解をもとに、歯科治療特有の不安（「しみる」「噛み合わせの違和感」「費用への心配」）まで3名院長団へ正確に橋渡しいたします。
                </p>
              </div>

              <div className="space-y-2.5 text-sm">
                <h3 className="font-extrabold text-slate-900 text-base">
                  📝 実際の日本語患者様ブログ＆15年アーカイブに残された評価
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>
                    ・ <strong>名刺写真付き体験談：</strong>「日本語通訳の男性の方が最初から最後まで1から10まで付きっ切りで対応してくれました」
                    （<a href="https://ameblo.jp/jmatk-tohojj/entry-12341708257.html" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] font-bold underline">アメーバブログ実体験記 ↗</a>）
                  </li>
                  <li>
                    ・ <strong>診察室同行＆帰国後フォロー：</strong>「受付から個室診療まで日本語の出来る男性が横に付き、帰宅後もLINEで大丈夫かと連絡をくれて安心でした」
                    （<a href="https://ameblo.jp/otonaseoul/entry-12788048958.html" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] font-bold underline">otonaseoul様レポ ↗</a> ・ <a href="https://ameblo.jp/brilliant-50/entry-12864559828.html" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] font-bold underline">brilliant-50様レポ ↗</a>）
                  </li>
                  <li>
                    ・ <strong>15年間の直筆相談＆公認紹介：</strong>コネスト掲示板での「ホワイトスタイル歯科の相談を担当しているイヒョンホです」実名回答（<a href="https://comm.konest.com/topic/379497" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] font-bold underline">KONEST相談記録 ↗</a>）および政府公認医療観光紹介（<a href="https://ameblo.jp/kokorokorea/entry-12972857336.html" target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] font-bold underline">KOKORO KOREA特集 ↗</a>）でも確認されています。
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="tel:+82-10-3046-5010"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#091326] font-extrabold text-sm transition-colors shadow-sm"
                >
                  📞 室長 イ・ヒョンホ直通 (+82-10-3046-5010)
                </a>
                <a
                  href="https://line.me/R/ti/p/~whitestyle1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm transition-colors shadow-sm"
                >
                  💬 LINE相談 (ID: whitestyle1)
                </a>
                <Link
                  href="/board/notice/1901"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-colors border border-slate-300"
                >
                  📖 ストーリー全文を読む →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINIC DIRECTOR PROFILE (代表院長紹介) */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="bg-[#091326] text-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#c5a880]/40 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-200 font-bold text-xs mb-4 inline-block">
              代表院長・歯医学博士
            </span>
            <h2 className="text-2xl md:text-4xl font-black mb-2">
              金 俊憲（キム・ジュンホン / Dr. Jun-Heon Kim）
            </h2>
            <p className="text-amber-200 text-sm md:text-base font-semibold mb-6">
              ソウル大卒、檀国大外来教授、矯正学博士 ｜ 臨床経験33年以上（累計62,000症例以上）
            </p>

            <ul className="space-y-2 text-sm text-slate-200 leading-relaxed mb-6">
              <li>・ ソウル大学校 歯科大学 卒業</li>
              <li>・ 檀国大学校 大学院 歯科矯正学 修士・歯医学博士 取得</li>
              <li>・ スウェーデン イェーテボリ大学（Gothenburg University）口腔外科 インプラント研修修了</li>
              <li>・ Yahoo! JAPAN 韓国歯科部門 3年連続 第1位 ／ 駐韓日本大使館 感謝状受賞</li>
              <li>・ 韓国健康保険審査評価院(HIRA) 口腔検診 最高ランク（S等級）獲得</li>
              <li>・ 第49回納税者の日 企画財政部長官表彰 ／ MBCニュースデスク 単独インタビュー出演</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://whitestyle.com/whitebook/ja"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#c5a880] hover:bg-[#b59469] text-[#091326] font-extrabold text-xs sm:text-sm transition-colors"
              >
                📖 金俊憲院長 公式白書（WhiteBook 日本語版）を見る ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION & ACCESS (アクセス・日本語お問い合わせ) */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#1e3a8a] font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 block">
              Access &amp; Contact
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              アクセス・診療時間・日本語予約窓口
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">📍 所在地・アクセス</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-2">
                ソウル特別市 江南区 江南大路92キル 17 デスンビル B1・1階・2階（駅三洞 819-10 / 〒06134）
              </p>
              <p className="text-xs text-[#1e3a8a] font-bold">
                地下鉄2号線・新盆唐線「江南（カンナム）駅」11番・12番出口より徒歩1分
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">⏰ 診療時間</h3>
              <ul className="text-sm text-slate-700 space-y-1.5">
                <li>・ 月〜水・金曜：10:00 〜 19:00（昼休み 13:00〜14:00）</li>
                <li>・ 土曜日：10:00 〜 14:00（昼休みなし）</li>
                <li className="text-rose-700 font-bold">・ 休診日：木曜・日曜・韓国の祝日</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-lg mb-3">💬 日本語専用お問い合わせ</h3>
              <ul className="text-sm text-slate-700 space-y-1.5">
                <li>・ <strong>日本語通訳スタッフ直通電話</strong>：<a href="tel:+82-10-3046-5010" className="text-[#1e3a8a] font-extrabold underline">+82-10-3046-5010</a>（日本語専用ホットライン）</li>
                <li>・ <strong>LINE ID</strong>：<span className="text-emerald-700 font-extrabold">whitestyle1</span></li>
                <li>・ <strong>カカオトーク ID</strong>：<span className="text-amber-800 font-extrabold">whitestyle2</span></li>
                <li>・ <strong>院内代表電話</strong>：+82-1577-7287 / +82-2-569-7528</li>
                <li>・ <strong>Eメール</strong>：white@whitestyle.com</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
