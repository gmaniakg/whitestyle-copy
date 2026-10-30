import type { Metadata } from 'next';
import { PRIVACY_DATA } from '@/app/api/_lib/privacy-data';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 화이트스타일치과의원',
  description: '화이트스타일치과의원 개인정보처리방침',
};

export default function PrivacyPage() {
  const d = PRIVACY_DATA;
  return (
    <main className="max-w-3xl mx-auto px-5 py-16 text-slate-800">
      <h1 className="text-2xl font-bold mb-2">{d.title}</h1>
      <p className="text-sm text-slate-500 mb-8">시행·최종 수정일: {d.lastUpdated} (버전 {d.version})</p>

      <section className="mb-8 text-sm leading-relaxed">
        <p>{d.hospital.name} / {d.hospital.representative}</p>
        <p>{d.hospital.address}</p>
        <p>대표전화: {d.hospital.phone}</p>
        <p>개인정보 보호책임자: {d.hospital.privacyOfficer}</p>
      </section>

      {d.sections.map((s) => (
        <section key={s.heading} className="mb-8">
          <h2 className="text-lg font-semibold mb-2">{s.heading}</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-slate-700">{s.content}</p>
        </section>
      ))}
    </main>
  );
}
