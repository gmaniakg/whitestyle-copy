import Link from 'next/link';

const SILO_LINKS = [
  { href: '/treatments/aesthetic/zeroshell', label: '제로쉘 (무삭제 · 최소삭제)' },
  { href: '/treatments/aesthetic/compare', label: '4방식 비교 (교정 vs 라미네이트)' },
  { href: '/treatments/aesthetic/safety', label: '법랑질 보존 · 신경보호 기준' },
  { href: '/treatments/aesthetic/retreatment', label: '타 치과 라미네이트 재시술' },
  { href: '/treatments/aesthetic/shade-lab', label: '자체 기공소 · 색조·단기 완성' },
] as const;

export default function AestheticSiloNav({ activePath }: { activePath: string }) {
  return (
    <nav
      aria-label="심미보철 세부 안내 이동"
      className="wb-ka wbka mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <p className="mb-3 text-xs font-extrabold tracking-wide text-slate-500">
        화이트스타일 심미보철 세부 안내 (5개 핵심 기준)
      </p>
      <div className="flex flex-wrap gap-2">
        {SILO_LINKS.map((item) => {
          const isActive = item.href === activePath;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-500 hover:text-sky-800'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
