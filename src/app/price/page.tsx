import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비급여 진료비 안내 | 화이트스타일치과의원',
  description: '화이트스타일치과의원 비급여 진료항목 및 진료비 안내',
};

// 가격 데이터 확정 전까지는 빈 배열로 두고 안내 틀만 표시합니다.
// 항목 추가 형식: { name: '진료항목명', price: '금액(원)', note: '비고(범위/조건 등)' }
const PRICE_ITEMS: { name: string; price: string; note?: string }[] = [];

export default function PricePage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-16 text-slate-800">
      <h1 className="text-2xl font-bold mb-2">비급여 진료비 안내</h1>
      <p className="text-sm text-slate-500 mb-8">「의료법」 제45조에 따라 비급여 진료비용을 안내합니다.</p>

      {PRICE_ITEMS.length === 0 ? (
        <div className="border border-slate-200 rounded-lg p-6 text-sm leading-relaxed bg-slate-50">
          <p className="font-semibold mb-2">[병원 확인 필요]</p>
          <p>비급여 진료항목별 금액 정보가 아직 등록되지 않았습니다. 병원에서 확정한 항목명·금액·기준일을 입력해 주세요.</p>
          <p className="mt-2">정확한 비용은 대표전화 02-569-7528로 문의해 주세요.</p>
        </div>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-300 text-left">
              <th className="py-2 pr-4">진료항목</th>
              <th className="py-2 pr-4">금액</th>
              <th className="py-2">비고</th>
            </tr>
          </thead>
          <tbody>
            {PRICE_ITEMS.map((it) => (
              <tr key={it.name} className="border-b border-slate-100">
                <td className="py-2 pr-4">{it.name}</td>
                <td className="py-2 pr-4">{it.price}</td>
                <td className="py-2">{it.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ul className="mt-8 text-xs text-slate-500 space-y-1 list-disc pl-4">
        <li>기준일: [병원 확인 필요]</li>
        <li>실제 진료비는 환자의 구강 상태 및 치료 계획에 따라 달라질 수 있으며, 진단 후 안내됩니다.</li>
        <li>부가가치세 등 세금 포함 여부: [병원 확인 필요]</li>
      </ul>
    </main>
  );
}
