'use client';

import React, { useState, useMemo } from 'react';
import archiveData from '../konest-archive-ja.json';

type TabKey = 'reviews' | 'gallery' | 'menu' | 'info' | 'proof';

export default function KonestArchiveSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('reviews');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(10);
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
    <section
      id="konest-archive"
      className="section"
      style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        color: '#0f172a',
      }}
    >
      <div className="container">
        {/* Editorial Navy & Gold Authority Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #091326 0%, #13284c 55%, #1e3a8a 100%)',
            color: '#ffffff',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid rgba(197, 168, 128, 0.45)',
            boxShadow: '0 20px 45px rgba(9, 19, 38, 0.16)',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '999px',
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid rgba(252, 211, 77, 0.5)',
                color: '#fde68a',
                fontSize: '0.8rem',
                fontWeight: 800,
              }}
            >
              🏆 Yahoo! JAPAN 韓国歯科部門 3年連続 第1位（複数回達成）
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#e0f2fe',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              ★ 韓国最大ポータル「コネスト(KONEST)」公式掲載 15年アーカイブ
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.9rem',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(110, 231, 183, 0.4)',
                color: '#a7f3d0',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              🛡️ HIRA 口腔検診 最高ランク「S等級」取得
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
              fontWeight: 900,
              lineHeight: 1.25,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            日本人患者様が証明した15年の信頼と圧倒的実績
            <br />
            <span style={{ color: '#fde68a' }}>
              コネスト(KONEST) 公式掲載レコード＆日本人患者様口コミ全125件
            </span>
          </h2>

          <p
            style={{
              fontSize: '0.98rem',
              color: '#cbd5e1',
              lineHeight: 1.75,
              maxWidth: '900px',
              marginBottom: '1.75rem',
            }}
          >
            2011年から2026年まで日本最大の韓国旅行・医療観光ポータル「コネスト」に蓄積された日本人患者様のリアルな口コミ・Q&amp;A（全125件）、公式定額料金表（12メニュー）、院内高解像度ギャラリー（全21枚）、および当時の掲載画面を100%証明する公式PDF・フルスクリーンショットをすべて日本語で公開しています。
          </p>

          {/* Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              background: 'rgba(9, 19, 38, 0.5)',
              border: '1px solid rgba(197, 168, 128, 0.35)',
              borderRadius: '16px',
              padding: '1.25rem',
            }}
          >
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24' }}>第1位</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                Yahoo! JAPAN 韓国歯科検索
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24' }}>125件</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                コネスト口コミ＆公式回答全集
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24' }}>4.8 / 5.0</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                日本人患者様 総合満足度
              </div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fbbf24' }}>14,800名+</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                日本人患者様 累計来院実績
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Interpreter Spotlight: Manager Lee Hyun-ho (室長 イ・ヒョンホ) */}
        <div
          className="wb-ka wbka"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid rgba(197, 168, 128, 0.6)',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
            padding: '1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.75rem',
            wordBreak: 'keep-all',
          }}
        >
          <div
            style={{
              flex: '0 0 340px',
              maxWidth: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              background: '#faf8f4',
            }}
          >
            <img
              src="/images/leehyunho_ameba_card_heritage.jpg"
              alt="ホワイトスタイル歯科 室長 イ・ヒョンホ 名刺記録・直通電話番号"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ flex: '1 1 320px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  background: '#091326',
                  color: '#fde68a',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                }}
              >
                日本の高校・大学野球出身 ｜ 専任日本語通訳リーダー
              </span>
              <span
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  color: '#78350f',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              >
                アメーバ実体験＆コネスト15年実名対応
              </span>
            </div>
            <h3
              style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              室長 イ・ヒョンホ（イヒョンホ）—— 125件の口コミを支え続けた1対1日本語コーディネーター
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.85, margin: 0 }}>
              日本の高校野球・大学野球部で培った礼儀作法と現場対応力を基盤に、コネスト公式掲示板で「こんにちは＾＾ ホワイトスタイル歯科の相談を担当しているイヒョンホです＾＾」（
              <a
                href="https://comm.konest.com/topic/379497"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1e3a8a', fontWeight: 700, textDecoration: 'underline' }}
              >
                相談記録
              </a>
              ）として長年日本人患者様に向き合い、アメーバブログの体験談（
              <a
                href="https://ameblo.jp/jmatk-tohojj/entry-12341708257.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1e3a8a', fontWeight: 700, textDecoration: 'underline' }}
              >
                名刺掲載記事
              </a>
              ・
              <a
                href="https://ameblo.jp/otonaseoul/entry-12788048958.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1e3a8a', fontWeight: 700, textDecoration: 'underline' }}
              >
                診察同行レポ
              </a>
              ）でも称賛された誠実なサポート体制。現在も専任日本語通訳スタッフ3名体制の中核として直通お電話を承っております。
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', paddingTop: '0.25rem', fontSize: '0.85rem' }}>
              <a
                href="tel:+82-10-3046-5010"
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '12px',
                  background: '#fbbf24',
                  color: '#091326',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                📞 日本語通訳直通 +82-10-3046-5010
              </a>
              <span
                style={{
                  padding: '0.55rem 0.9rem',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#047857',
                  fontWeight: 700,
                }}
              >
                💬 LINE ID: whitestyle1
              </span>
              <a
                href="/board/notice/1901"
                style={{ color: '#1e3a8a', fontWeight: 700, textDecoration: 'underline', padding: '0.5rem 0.25rem' }}
              >
                特集ストーリーを見る →
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            borderBottom: '2px solid #cbd5e1',
            marginBottom: '1.75rem',
            paddingBottom: '2px',
          }}
        >
          {[
            { key: 'reviews', label: `🗣️ 患者様の口コミ全集 (${archiveData.reviews.length}件)` },
            { key: 'gallery', label: `📸 院内・症例ギャラリー (${archiveData.photos.length}枚)` },
            { key: 'menu', label: `💳 公式施術メニュー＆料金表 (${archiveData.menu.length}種)` },
            { key: 'info', label: '🏥 公式登録プロフィール' },
            { key: 'proof', label: '📜 原本エビデンス資料室 (PDF/PNG)' },
          ].map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabKey)}
                style={{
                  padding: '0.85rem 1.25rem',
                  borderRadius: '12px 12px 0 0',
                  border: 'none',
                  borderBottom: active ? '3px solid #1e3a8a' : '3px solid transparent',
                  background: active ? '#ffffff' : 'transparent',
                  color: active ? '#091326' : '#475569',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: REVIEWS */}
        {activeTab === 'reviews' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            }}
          >
            {/* Filter & Search Bar */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setVisibleCount(10);
                      }}
                      style={{
                        padding: '0.45rem 0.95rem',
                        borderRadius: '999px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: active ? '1px solid #091326' : '1px solid #cbd5e1',
                        background: active ? '#091326' : '#f8fafc',
                        color: active ? '#ffffff' : '#334155',
                        cursor: 'pointer',
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(10);
                }}
                placeholder="口コミ検索 (例: 日本語, LINE, 矯正, CT)..."
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  width: '280px',
                  maxWidth: '100%',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
                color: '#64748b',
                fontWeight: 600,
              }}
            >
              <span>
                表示中: {displayedReviews.length}件 / 該当 {filteredReviews.length}件（全
                {archiveData.reviews.length}件）
              </span>
              <a
                href="/konest-archive/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}
              >
                フルスクリーン・アーカイブ画面を開く ↗
              </a>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {displayedReviews.map((r, idx) => (
                <article
                  key={r.topic_id || idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.35rem',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.6rem',
                        fontSize: '0.78rem',
                        color: '#64748b',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.2rem 0.65rem',
                          borderRadius: '6px',
                          background: '#eff6ff',
                          color: '#1e40af',
                          fontWeight: 800,
                        }}
                      >
                        {r.category}
                      </span>
                      <span style={{ fontWeight: 700 }}>{r.date ? `20${r.date}` : '公式案内'}</span>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.02rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        marginBottom: '0.65rem',
                      }}
                    >
                      {r.title}
                    </h3>

                    {r.content && (
                      <div
                        style={{
                          fontSize: '0.88rem',
                          color: '#334155',
                          lineHeight: 1.65,
                          whiteSpace: 'pre-line',
                          marginBottom: '0.85rem',
                        }}
                      >
                        {r.content}
                      </div>
                    )}

                    {r.reply_content && (
                      <div
                        style={{
                          background: '#faf8f5',
                          border: '1px solid #e5dec9',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          marginBottom: '0.85rem',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            color: '#1e3a8a',
                            marginBottom: '0.35rem',
                          }}
                        >
                          🏥 ホワイトスタイル歯科からの公式回答
                        </div>
                        <div
                          style={{
                            fontSize: '0.82rem',
                            color: '#475569',
                            lineHeight: 1.6,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {r.reply_content}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      borderTop: '1px dashed #e2e8f0',
                      paddingTop: '0.65rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      color: '#64748b',
                    }}
                  >
                    <span>
                      投稿者: <strong style={{ color: '#334155' }}>{r.author}</strong>
                    </span>
                    {r.reply_count > 0 && (
                      <span style={{ color: '#15803d', fontWeight: 800 }}>✓ クリニック回答済</span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {visibleCount < filteredReviews.length && (
              <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 20)}
                  style={{
                    padding: '0.9rem 1.8rem',
                    borderRadius: '12px',
                    background: '#091326',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  さらに口コミを表示する（残り {filteredReviews.length - visibleCount}件）
                </button>
                <button
                  onClick={() => setVisibleCount(filteredReviews.length)}
                  style={{
                    padding: '0.9rem 1.5rem',
                    borderRadius: '12px',
                    background: '#f1f5f9',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer',
                  }}
                >
                  全125件を一括表示
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              コネスト公式登録 院内施設・3D CT設備・症例ギャラリー（全21枚）
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
              写真をクリックすると高解像度原本画像を拡大表示します。
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem',
              }}
            >
              {archiveData.photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setLightboxImg({
                      src: `/konest-archive/photos/${photo.localFilename}`,
                      caption: photo.caption,
                    })
                  }
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    background: '#0f172a',
                    position: 'relative',
                    aspectRatio: '4/3',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={`/konest-archive/photos/${photo.localFilename}`}
                    alt={photo.caption}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(15, 23, 42, 0.84)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      padding: '0.4rem 0.65rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {photo.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MENU & PRICING */}
        {activeTab === 'menu' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              コネスト公式掲載 施術メニュー＆定額料金表（明朗会計）
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
              事前カウンセリング時に日本語で明確な費用内訳をご案内し、ご同意のない追加請求は一切ございません。
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 800 }}>
                      診療カテゴリー
                    </th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 800 }}>
                      施術メニュー名
                    </th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 800 }}>
                      公式掲載費用 (KRW)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {archiveData.menu.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#1e3a8a' }}>
                        {item.category}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#b45309' }}>
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BASIC INFO */}
        {activeTab === 'info' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              コネスト公式登録 クリニック基本情報（ID: 4403 / POI: 101761666）
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                {Object.entries(archiveData.shopData).map(([key, val]) => (
                  <tr key={key} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th
                      style={{
                        width: '28%',
                        padding: '0.85rem 1rem',
                        background: '#f8fafc',
                        textAlign: 'left',
                        fontWeight: 800,
                        color: '#091326',
                      }}
                    >
                      {key}
                    </th>
                    <td style={{ padding: '0.85rem 1rem', whiteSpace: 'pre-line' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: PROOF DOCUMENTS */}
        {activeTab === 'proof' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '1.75rem',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              視覚的・法的 原本エビデンス資料室（フルページキャプチャ＆公式印刷PDF）
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
              コネストに掲載された実際の画面をピクセル単位で100%保存した原本ファイルをご確認いただけます。
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {archiveData.proofDocuments.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.85rem',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                      {doc.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{doc.desc}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={doc.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        background: '#091326',
                        color: '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      📄 公式PDFを開く
                    </a>
                    <a
                      href={doc.png}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        background: '#ffffff',
                        color: '#0f172a',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      🖼️ 全体キャプチャ
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              maxWidth: '900px',
              width: '100%',
            }}
          >
            <div
              style={{
                background: '#091326',
                color: '#ffffff',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{lightboxImg.caption}</span>
              <button
                onClick={() => setLightboxImg(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '1rem', background: '#020617', textAlign: 'center' }}>
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                style={{ maxHeight: '75vh', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
