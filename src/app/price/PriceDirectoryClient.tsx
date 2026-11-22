'use client';

import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

export type FeeCategory = '임플란트' | '보철치료' | '레진치료' | '서류비용';

export interface OfficialFeeItem {
  id: string;
  category: FeeCategory;
  item: string;
  spec: string;
  fee: string;
  note: string;
}

export const OFFICIAL_FEE_ITEMS: OfficialFeeItem[] = [
  {
    id: 'implant-biotem-pfm',
    category: '임플란트',
    item: '임플란트 바이오템 PFM',
    spec: '바이오템 정품 픽스처 + PFM 상부 보철 (1치당)',
    fee: '800,000원',
    note: '3D CT 진단 후 뼈이식·상악동거상술·맞춤 지대주 필요 시 별도 서면 안내',
  },
  {
    id: 'implant-osstem-pfm',
    category: '임플란트',
    item: '임플란트 오스템 PFM',
    spec: '오스템 정품 픽스처 + PFM 상부 보철 (1치당)',
    fee: '900,000원',
    note: '3D CT 진단 후 뼈이식·상악동거상술·맞춤 지대주 필요 시 별도 서면 안내',
  },
  {
    id: 'implant-biotem-zirconia',
    category: '임플란트',
    item: '임플란트 바이오템 지르코니아',
    spec: '바이오템 정품 픽스처 + 지르코니아 상부 보철 (1치당)',
    fee: '800,000원',
    note: '자연치아 색상 재현 및 강도 우수 · 맞춤 지대주 적용 상담',
  },
  {
    id: 'implant-osstem-zirconia',
    category: '임플란트',
    item: '임플란트 오스템 지르코니아',
    spec: '오스템 정품 픽스처 + 지르코니아 상부 보철 (1치당)',
    fee: '900,000원',
    note: '자연치아 색상 재현 및 강도 우수 · 맞춤 지대주 적용 상담',
  },
  {
    id: 'implant-biotem-gold',
    category: '임플란트',
    item: '임플란트 바이오템 GOLD',
    spec: '바이오템 정품 픽스처 + 골드(Gold) 상부 보철 (1치당)',
    fee: '1,400,000원',
    note: '어금니 교합력·금 함량 및 보철 설계에 따라 적용',
  },
  {
    id: 'implant-osstem-gold',
    category: '임플란트',
    item: '임플란트 오스템 GOLD',
    spec: '오스템 정품 픽스처 + 골드(Gold) 상부 보철 (1치당)',
    fee: '1,500,000원',
    note: '어금니 교합력·금 함량 및 보철 설계에 따라 적용',
  },
  {
    id: 'implant-nhis-65',
    category: '임플란트',
    item: '만 65세 이상 건강보험 임플란트 (급여 참고)',
    spec: '건강보험 적용 대상자 평생 2개 (부분 무치악, 상·하악 구분 없음)',
    fee: '본인부담률 30%',
    note: '공단 방문 없이 원내 전산 등록 · 치주과 전문의 협진',
  },
  {
    id: 'prosthetic-inlay-resin',
    category: '보철치료',
    item: '인레이 - 레진',
    spec: 'Inlay (인레이) · 레진 수복',
    fee: '250,000원',
    note: '충치 범위 및 치아 삭제량에 따라 정밀 진단 후 적용',
  },
  {
    id: 'prosthetic-inlay-ceramic',
    category: '보철치료',
    item: '인레이 - 도재·세라믹',
    spec: 'Inlay (인레이) · 도재/세라믹 수복',
    fee: '350,000원',
    note: '심미성 우수 · 원내 정밀 교합 조정',
  },
  {
    id: 'prosthetic-inlay-gold',
    category: '보철치료',
    item: '골드인레이',
    spec: 'Inlay (인레이) · 골드(Gold) 수복',
    fee: '700,000원',
    note: '어금니 저작력·생체친화성 우수',
  },
  {
    id: 'prosthetic-crown-pfm',
    category: '보철치료',
    item: '크라운 - PFM',
    spec: 'Crown (크라운) · 도재금속관(PFM)',
    fee: '400,000원',
    note: '신경치료 후 치아 보호 및 보철 수복',
  },
  {
    id: 'prosthetic-crown-zirconia',
    category: '보철치료',
    item: '크라운 - 지르코니아',
    spec: 'Crown (크라운) · 올지르코니아',
    fee: '500,000원',
    note: '원내 자체 기공소 색조·교합 정밀 보정',
  },
  {
    id: 'prosthetic-crown-gold',
    category: '보철치료',
    item: '골드크라운',
    spec: 'Crown (크라운) · 골드(Gold)',
    fee: '1,200,000원',
    note: '어금니 고교합력 부위 적용',
  },
  {
    id: 'resin-rf-posterior-1',
    category: '레진치료',
    item: '레진치료 (RF) · 구치부(1면)',
    spec: '어금니(구치부) 1면 광중합 복합레진 충전',
    fee: '100,000원',
    note: '초기 충치 최소 삭제 보존 치료',
  },
  {
    id: 'resin-rf-posterior-2',
    category: '레진치료',
    item: '레진치료 (RF) · 구치부(2면)',
    spec: '어금니(구치부) 2면 광중합 복합레진 충전',
    fee: '200,000원',
    note: '인접면·교합면 복합 충치 수복',
  },
  {
    id: 'resin-rf-anterior',
    category: '레진치료',
    item: '레진치료 (RF) · 전치부',
    spec: '앞니(전치부) 심미 복합레진 충전',
    fee: '150,000원',
    note: '자연치아 색조 매칭 심미 수복',
  },
  {
    id: 'resin-ca-cervical',
    category: '레진치료',
    item: '레진치료 (CA)',
    spec: '치경부 마모증(CA) 레진 수복',
    fee: '100,000원',
    note: '잇몸 경계 패임·시림 완화 보존 치료',
  },
  {
    id: 'doc-diagnosis',
    category: '서류비용',
    item: '진단서',
    spec: '일반 진단서 발급 (제증명수수료)',
    fee: '10,000원',
    note: '보건복지부 제증명수수료 상한 기준 준수',
  },
  {
    id: 'doc-injury-diagnosis',
    category: '서류비용',
    item: '상해진단서',
    spec: '상해진단서 발급 (제증명수수료)',
    fee: '100,000원',
    note: '보건복지부 제증명수수료 상한 기준 준수',
  },
  {
    id: 'doc-confirmation',
    category: '서류비용',
    item: '진료확인서',
    spec: '통원·진료확인서 발급 (제증명수수료)',
    fee: '3,000원',
    note: '보건복지부 제증명수수료 상한 기준 준수',
  },
  {
    id: 'doc-medical-record-copy',
    category: '서류비용',
    item: '진료기록사본',
    spec: '의무기록 사본 발급 (제증명수수료)',
    fee: '1,000원',
    note: '보건복지부 상한 기준: 1~5매 1,000원 / 6매 이상 매당 100원',
  },
];

const CATEGORIES: Array<'전체' | FeeCategory> = [
  '전체',
  '임플란트',
  '보철치료',
  '레진치료',
  '서류비용',
];

function normalizeSearch(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '');
}

export default function PriceDirectoryClient() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'전체' | FeeCategory>('전체');

  const categoryCounts = useMemo(() => {
    const counts: Record<'전체' | FeeCategory, number> = {
      전체: OFFICIAL_FEE_ITEMS.length,
      임플란트: 0,
      보철치료: 0,
      레진치료: 0,
      서류비용: 0,
    };
    for (const row of OFFICIAL_FEE_ITEMS) {
      counts[row.category] += 1;
    }
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim();
    const tokens = trimmed ? trimmed.toLowerCase().split(/\s+/).filter(Boolean) : [];
    const compactQuery = normalizeSearch(trimmed);

    return OFFICIAL_FEE_ITEMS.filter((row) => {
      if (selectedCategory !== '전체' && row.category !== selectedCategory) {
        return false;
      }
      if (!trimmed) return true;
      const haystack = `${row.category} ${row.item} ${row.spec} ${row.fee} ${row.note}`.toLowerCase();
      const compactHaystack = normalizeSearch(haystack);
      return tokens.every((tk) => haystack.includes(tk)) || compactHaystack.includes(compactQuery);
    });
  }, [query, selectedCategory]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('전체');
  };

  return (
    <section
      aria-labelledby="official-fee-directory-heading"
      className="mb-12 bg-white border border-ws-rule rounded-2xl overflow-hidden shadow-sm wb-ka wbka"
    >
      <div className="bg-ws-navy text-white px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 id="official-fee-directory-heading" className="text-lg md:text-xl font-bold wb-ka wbka">
            1. 공식 비급여 진료비용 기준표 (항목명 검색 / 분야별 필터)
          </h2>
          <span className="text-xs font-semibold text-ws-gold">
            총 {OFFICIAL_FEE_ITEMS.length}개 항목 고지 (표시 {filteredItems.length}건)
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-5 bg-ws-mist border-b border-ws-rule space-y-4">
        <div className="relative">
          <label htmlFor="noncovered-fee-search" className="sr-only">
            비급여 항목명 검색
          </label>
          <Search
            className="w-4 h-4 text-ws-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="noncovered-fee-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="항목명 검색 (예: 오스템, 바이오템, 지르코니아, 인레이, 크라운, 레진, 진단서)"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-ws-rule text-sm text-ws-ink placeholder:text-ws-muted focus:outline-none focus:border-ws-navy focus:ring-2 focus:ring-ws-navy/20 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="검색어 지우기"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-ws-muted hover:text-ws-ink hover:bg-ws-panel active:bg-ws-rule disabled:opacity-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="진료 분야별 필터">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors active:bg-ws-navy-deep disabled:opacity-50 ${
                  isActive
                    ? 'bg-ws-navy text-white border-ws-navy'
                    : 'bg-white text-ws-body border-ws-rule hover:bg-ws-panel hover:text-ws-ink'
                }`}
              >
                {cat} ({categoryCounts[cat]})
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Output (Full 21 rows SSR on initial render) */}
      {filteredItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-ws-mist border-b border-ws-rule text-left text-ws-ink">
                <th scope="col" className="py-3.5 px-5 font-bold w-28">
                  구분
                </th>
                <th scope="col" className="py-3.5 px-5 font-bold w-56">
                  고지 항목명
                </th>
                <th scope="col" className="py-3.5 px-5 font-bold">
                  세부 규격 · 재료
                </th>
                <th scope="col" className="py-3.5 px-5 font-bold w-40">
                  고지 비용
                </th>
                <th scope="col" className="py-3.5 px-5 font-bold">
                  비고 · 확인 기준
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ws-rule">
              {filteredItems.map((row) => (
                <tr key={row.id} className="hover:bg-ws-mist transition-colors">
                  <td className="py-4 px-5 align-top">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-ws-panel text-ws-ink text-xs font-bold whitespace-nowrap">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-ws-ink align-top wb-ka wbka">
                    {row.item}
                  </td>
                  <td className="py-4 px-5 text-ws-body align-top wb-ka wbka">{row.spec}</td>
                  <td className="py-4 px-5 font-extrabold text-ws-navy tabular-nums whitespace-nowrap align-top">
                    {row.fee}
                  </td>
                  <td className="py-4 px-5 text-ws-muted align-top wb-ka wbka">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-12 text-center bg-white">
          <p className="text-base font-bold text-ws-ink mb-2 wb-ka wbka">
            &ldquo;{query}&rdquo;에 해당하는 비급여 항목을 찾지 못했습니다.
          </p>
          <p className="text-sm text-ws-muted mb-5 wb-ka wbka">
            다른 검색어로 찾으시거나 전체 항목 보기에서 전체 21개 기준표를 확인하실 수 있습니다.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2.5 rounded-lg bg-ws-navy text-white text-sm font-bold hover:bg-ws-navy-hover active:bg-ws-navy-deep disabled:opacity-50 transition-colors"
          >
            전체 항목 보기
          </button>
        </div>
      )}

      {/* Compliance Footer */}
      <div className="px-6 py-4 bg-ws-mist border-t border-ws-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-ws-body">
        <p className="font-semibold wb-ka wbka">
          비급여 고지 기준일: 2026-10-14 / 최종 의료진 검토일: 2026-11-21
        </p>
        <a
          href="https://www.hira.or.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-ws-navy hover:underline active:text-ws-navy-deep whitespace-nowrap"
        >
          심평원 비급여 포털 확인 ↗
        </a>
      </div>
    </section>
  );
}
