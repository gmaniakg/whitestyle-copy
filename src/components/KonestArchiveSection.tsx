'use client';

import React, { useState, useMemo } from 'react';
import archiveData from '@/data/konest-archive-ja.json';

type TabKey = 'reviews' | 'gallery' | 'menu' | 'info' | 'proof';

export default function KonestArchiveSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('reviews');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null);

  const categories = [
    { id: 'all', label: 'すべて表示 (125)' },
    { id: 'インプラント', label: 'インプラント' },
    { id: '歯列矯正', label: '歯列矯正' },
    { id: 'ホワイトニング', label: 'ホワイトニング' },
    { id: 'ラミネート', label: 'ラミネート・審美補綴' },
    { id: 'スケーリング', label: 'スケーリング・検診' },
    { id: '親知らず', label: '親知らず抜歯' },
  ];

  const filteredReviews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return archiveData.reviews.filter((r) => {
      const matchCat = selectedCategory === 'all' || r.category.includes(selectedCategory);
      if (!matchCat) return false;
      if (!q) return true;
      const hay = `${r.title || ''} ${r.content || ''} ${r.reply_content || ''} ${r.author || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  return (
    <section id="konest-archive" className="py-20 px-4 sm:px-8 lg:px-16 bg-[#f8fafc] border-y border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Authority Header */}
        <div className="bg-gradient-to-br from-[#091326] via-[#13284c] to-[#1e3a8a] text-white rounded-3xl p-8 md:p-12 shadow-2xl border border-[#c5a880]/40 mb-10 relative overflow-hidden">
          <div className="flex flex-wrap gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-300/50 text-amber-200 text-xs sm:text-sm font-bold tracking-wide">
              🏆 Yahoo! JAPAN 韓国歯科部門 3年連続 第1位（複数回達成）
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-blue-100 text-xs sm:text-sm font-bold tracking-wide">
              ★ 韓国最大ポータル「コネスト(KONEST)」公式掲載 15年アーカイブ
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 text-emerald-200 text-xs sm:text-sm font-bold tracking-wide">
              🛡️ HIRA 口腔検診 最高ランク「S等級」取得
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            日本人患者様が証明した15年の信頼と圧倒的実績<br className="hidden sm:inline" />
            <span className="text-[#fde68a]">コネスト(KONEST) 公式掲載レコード＆口コミ全集</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-4xl leading-relaxed mb-8">
            2011年から2026年まで韓国旅行・医療観光最大ポータル「コネスト」に蓄積された日本人患者様のリアルな口コミ・Q&amp;A（全125件）、公式定額料金表、院内高解像度ギャラリー（全21枚）、および当時の掲載画面を100%証明する公式PDF・フルスクリーンショットをすべて日本語で公開しています。
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950/45 border border-[#c5a880]/30 rounded-2xl p-5">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">第1位</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">Yahoo! JAPAN 韓国歯科検索</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">125件</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">日本人患者様 口コミ＆公式回答</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">4.8 / 5.0</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">コネスト患者様 総合満足度</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">100%</span>
              <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">原本スクリーンショット＆PDF証明</span>
            </div>
          </div>
        </div>

        {/* 4 Core Trust Pillars from 125 Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            {
              badge: '強み 01',
              title: 'CT精密診断＆明朗会計',
              desc: '「日本では高額見積もりでしたが、CT画像を日本語で細かく説明してくれ、事前案内の金額通りで追加請求は一切ありませんでした。」',
            },
            {
              badge: '強み 02',
              title: '天然歯の保存を最優先',
              desc: '「工場型の流れ作業クリニックとは異なり、無理な抜歯や過剰診療を勧めず、ソウル大出身院長が1対1で丁寧に診てくれます。」',
            },
            {
              badge: '強み 03',
              title: '帰国後も安心のLINEケア',
              desc: '「治療後に日本へ帰国した後も、LINE（whitestyle1）で専任の日本語医療通訳スタッフにいつでも経過相談ができ安心でした。」',
            },
            {
              badge: '強み 04',
              title: '江南駅徒歩2分・緊急対応',
              desc: '「韓国出張・旅行中に詰め物が取れた際も、LINE連絡で当日予約が取れ、江南駅すぐの好立地で迅速に対応してもらえました。」',
            },
          ].map((pillar, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-[#1e3a8a] font-extrabold text-xs mb-3">
                  {pillar.badge}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b-2 border-slate-200 pb-1 mb-8">
          {[
            { key: 'reviews', label: `🗣️ 患者様の口コミ全集 (${archiveData.reviews.length}件)` },
            { key: 'gallery', label: `📸 院内・症例ギャラリー (${archiveData.photos.length}枚)` },
            { key: 'menu', label: `💳 公式施術メニュー＆料金表 (${archiveData.menu.length}種)` },
            { key: 'info', label: '🏥 公式登録プロフィール' },
            { key: 'proof', label: '📜 原本エビデンス資料室 (PDF/PNG)' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`px-5 py-3.5 rounded-xl font-extrabold text-sm sm:text-base whitespace-nowrap transition-all border ${
                activeTab === tab.key
                  ? 'bg-[#0f1e36] text-white border-[#0f1e36] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setVisibleCount(12);
                    }}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                      selectedCategory === cat.id
                        ? 'bg-[#0f1e36] text-white border-[#0f1e36]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(12);
                  }}
                  placeholder="口コミ検索 (例: 日本語, LINE, 矯正, CT)..."
                  className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-500 font-semibold">
              <span>表示中: {displayedReviews.length}件 / 該当 {filteredReviews.length}件（全{archiveData.reviews.length}件）</span>
              <a
                href="/konest-archive/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-bold"
              >
                フルスクリーン・アーカイブ画面を開く ↗
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedReviews.map((r, idx) => (
                <article
                  key={r.topic_id || idx}
                  className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                      <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-800 font-bold">
                        {r.category}
                      </span>
                      <span className="font-mono font-semibold">
                        {r.date ? `20${r.date}` : '公式案内'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-3">
                      {r.title}
                    </h3>

                    {r.content && (
                      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4">
                        {r.content}
                      </div>
                    )}

                    {r.reply_content && (
                      <div className="bg-[#faf8f5] border border-[#e5dec9] p-4 rounded-xl mb-4">
                        <div className="text-xs font-extrabold text-[#1e3a8a] mb-1.5">
                          🏥 ホワイトスタイル歯科からの公式回答
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {r.reply_content}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>投稿者: <strong className="text-slate-700">{r.author}</strong></span>
                    {r.reply_count > 0 && (
                      <span className="text-emerald-700 font-bold">✓ クリニック回答済</span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {visibleCount < filteredReviews.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 20)}
                  className="px-8 py-4 rounded-2xl bg-[#0f1e36] hover:bg-[#1e3a8a] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all"
                >
                  さらに口コミを表示する（残り {filteredReviews.length - visibleCount}件）
                </button>
                <button
                  onClick={() => setVisibleCount(filteredReviews.length)}
                  className="ml-3 px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base transition-all"
                >
                  全件を一括表示
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                コネスト公式登録 院内施設・3D CT設備・症例ギャラリー（全21枚）
              </h3>
              <p className="text-sm text-slate-600">
                画像をクリックすると高解像度原本写真を拡大表示します。
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {archiveData.photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setLightboxImg({
                      src: `/konest-archive/photos/${photo.localFilename}`,
                      caption: photo.caption,
                    })
                  }
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer shadow-sm"
                >
                  <img
                    src={`/konest-archive/photos/${photo.localFilename}`}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-white text-xs p-2.5 truncate">
                    {photo.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MENU & PRICING */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                コネスト公式掲載 施術メニュー＆定額料金表（明朗会計）
              </h3>
              <p className="text-sm text-slate-600">
                事前カウンセリングで日本語にて明確な費用内訳をご案内し、ご同意のない追加請求は一切ございません。
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 text-sm font-extrabold">
                    <th className="py-4 px-5 w-1/4">診療カテゴリー</th>
                    <th className="py-4 px-5 w-1/2">施術メニュー名</th>
                    <th className="py-4 px-5 w-1/4">公式掲載費用 (KRW)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {archiveData.menu.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-4 px-5 font-bold text-[#1e3a8a]">{item.category}</td>
                      <td className="py-4 px-5 font-semibold text-slate-800">{item.name}</td>
                      <td className="py-4 px-5 font-extrabold text-amber-700 tabular-nums">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CLINIC BASIC INFO */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6">
              コネスト公式登録 クリニック基本情報（ID: 4403 / POI: 101761666）
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <tbody className="divide-y divide-slate-200">
                  {Object.entries(archiveData.shopData).map(([key, val]) => (
                    <tr key={key}>
                      <th className="py-4 px-5 bg-slate-50 font-extrabold text-slate-900 text-left w-1/3 sm:w-1/4 border border-slate-200">
                        {key}
                      </th>
                      <td className="py-4 px-5 text-slate-700 whitespace-pre-line border border-slate-200">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PROOF DOCUMENTS */}
        {activeTab === 'proof' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                視覚的・法的 原本エビデンス資料室（フルページキャプチャ＆公式印刷PDF）
              </h3>
              <p className="text-sm text-slate-600">
                コネストに掲載された実際の画面をピクセル単位で100%保存した原本ファイルをご確認いただけます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {archiveData.proofDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-slate-200 rounded-2xl p-5 flex flex-col justify-between bg-slate-50/60"
                >
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base mb-1.5">{doc.title}</h4>
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">{doc.desc}</p>
                  </div>
                  <div className="flex gap-2.5">
                    <a
                      href={doc.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#0f1e36] hover:bg-[#1e3a8a] text-white text-xs font-bold text-center transition-colors"
                    >
                      📄 公式PDFを開く
                    </a>
                    <a
                      href={doc.png}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold text-center transition-colors"
                    >
                      🖼️ 全体キャプチャ
                    </a>
                  </div>
                </div>
              ))}

              <div className="border border-amber-300 rounded-2xl p-5 flex flex-col justify-between bg-amber-50/50">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-1.5">
                    07. 日本人患者様 口コミ全125件 原本データ＆分析レポート
                  </h4>
                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    2011年〜2026年の全口コミCSVデータおよび完全日本語ショーケース画面
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <a
                    href="/konest-archive/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold text-center transition-colors"
                  >
                    ★ 独立ショーケース
                  </a>
                  <a
                    href="/konest-archive/reviews_all.csv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold text-center transition-colors"
                  >
                    📊 全件CSV
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
          >
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm">{lightboxImg.caption}</span>
              <button
                onClick={() => setLightboxImg(null)}
                className="text-slate-300 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-950 flex justify-center">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
