import type { Metadata } from 'next';
import KonestArchiveSection from '../../components/KonestArchiveSection';

export const metadata: Metadata = {
  title: 'コネスト(KONEST) 15年公式アーカイブ・口コミ125件 | ホワイトスタイル歯科 金俊憲院長',
  description: 'Yahoo! JAPAN 韓国歯科検索3年連続1位。韓国旅行ポータル「コネスト(KONEST)」に寄せられた日本人患者様の口コミ全125件・院長直筆返信100%・料金表12コース・院内写真21枚の公式保存アーカイブ。',
};

export default function JaKonestPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#FAF8F5' }}>
      <div style={{ background: '#0F172A', color: '#FAF8F5', padding: '1rem 1.5rem', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <a href="/ja" style={{ color: '#FDE68A', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
          ← ホワイトブック日本語トップ (/ja) へ戻る
        </a>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/konest-archive/index.html" target="_blank" rel="noopener noreferrer" style={{ color: '#FAF8F5', background: '#B4882B', padding: '0.45rem 1rem', borderRadius: '999px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>
            📂 原本アーカイブ全件 (HTML/PDF/CSV) ↗
          </a>
        </div>
      </div>
      <KonestArchiveSection />
    </main>
  );
}
