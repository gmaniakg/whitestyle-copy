'use client';

import React from 'react';
import Link from 'next/link';
import KonestArchiveSection from '@/components/KonestArchiveSection';

export default function JapaneseLandingPage() {
  return (
    <div lang="ja" className="w-full min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-amber-100 selection:text-slate-900">
      {/* 1. HERO SECTION (Editorial Navy & Warm Gold, No AI Cliché Gradients) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#091326] via-[#102347] to-[#162d59] text-white py-20 md:py-28 px-4 sm:px-8 lg:px-16 border-b-4 border-[#c5a880]">
        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Top Authority Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-300/50 text-amber-200 text-xs sm:text-sm font-extrabold">
              🏆 Yahoo! JAPAN 韓国歯科部門 3年連続 第1位（複数回達成）
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs sm:text-sm font-bold">
              📍 韓国・江南駅 徒歩2分 ｜ 日本人来院数 14,800名突破
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold">
              🛡️ 韓国健康保険審査評価院(HIRA) 口腔検診 最高「S等級」
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] mb-6">
            <span className="block text-slate-100 mb-2">15年の信頼と実績が証明する</span>
            <span className="text-[#fde68a]">韓国・江南 ホワイトスタイル歯科</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-slate-200 max-w-3xl mb-10 leading-relaxed font-medium">
            ソウル大学校歯科大学出身・臨床30年の金俊憲（キム・ジュンホン）代表院長が直接執刀。<br className="hidden sm:inline" />
            専任の日本語医療通訳スタッフ3名が常駐し、カウンセリングから日本帰国後のLINEアフターケアまで完全サポートいたします。
          </p>

          {/* Primary Contact & Archive Jump Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-14">
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-4 px-6 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all"
            >
              <span>💬 LINE日本語無料相談 (ID: whitestyle1)</span>
            </a>

            <a
              href="#konest-archive"
              className="flex-1 py-4 px-6 bg-[#c5a880] hover:bg-[#b59469] text-[#091326] font-extrabold text-base sm:text-lg rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
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
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">専任日本語通訳スタッフ3名常駐</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              受付・3D CT撮影・院長カウンセリング・診療・帰国後のLINE経過相談まで、専任の日本語医療通訳スタッフがマンツーマンで同行サポートします。
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-lg mb-5">
              02
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">ソウル大出身・臨床30年の代表院長</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              ソウル大学校歯科大学卒業・歯医学博士の金俊憲（キム・ジュンホン）代表院長が、流れ作業ではなくお一人おひとりを直接診断・執刀いたします。
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
              ソウル大学校 歯科大学卒業 ｜ 檀国大学校 歯科矯正学 歯医学博士 ｜ 臨床経験30年以上（累計62,000症例以上）
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
                href="https://whinish.com/ja"
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
                ソウル特別市 江南区 江南大路92キル 17 デスンビル 1階・2階（駅三洞 819-7）
              </p>
              <p className="text-xs text-[#1e3a8a] font-bold">
                地下鉄2号線・新盆唐線「江南（カンナム）駅」11番・12番出口より徒歩2分
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
                <li>・ <strong>LINE ID</strong>：<span className="text-emerald-700 font-extrabold">whitestyle1</span></li>
                <li>・ <strong>カカオトーク ID</strong>：<span className="text-amber-800 font-extrabold">whitestyle2</span></li>
                <li>・ <strong>日本語直通電話</strong>：+82-10-3046-5010</li>
                <li>・ <strong>Eメール</strong>：white@whitestyle.com</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
