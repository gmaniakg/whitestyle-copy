'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const TREATMENTS = [
  '치아교정 + 전문가 치아미백 1회 무료',
  '무삭제·최소삭제 라미네이트 + 치아미백 1회 무료',
  '지르코니아·세라믹 보철 + 치아미백 1회 무료',
  '3D CT 임플란트 + 치아미백 1회 무료',
  '기타 비급여 진료 + 치아미백 1회 무료',
];

export default function SuneungConsultForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState(TREATMENTS[0]);
  const [memo, setMemo] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedSensitive, setAgreedSensitive] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [doneId, setDoneId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setDoneId('');

    if (!name.trim()) {
      setErrorMsg('수험생 성함을 입력해 주세요.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setErrorMsg('연락 가능한 휴대폰 번호를 정확히 입력해 주세요.');
      return;
    }
    if (!agreedPrivacy || !agreedSensitive) {
      setErrorMsg('개인정보 수집·이용 및 민감정보 처리 필수 항목에 동의해 주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          treatment,
          memo: memo.trim() || '2027 수능 수험표 지참 혜택 문의',
          agreedPrivacy: true,
          agreedSensitive: true,
          agreedMarketing,
          source: 'suneung_2027_event',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || '상담 접수 중 오류가 발생했습니다.');
      } else {
        setDoneId(String(data?.data?.id || '접수완료'));
        setName('');
        setPhone('');
        setMemo('');
      }
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 대표전화 1577-7287로 연락해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="se-form-shell">
      {errorMsg && (
        <div role="alert" className="se-alert se-alert-error">
          {errorMsg}
        </div>
      )}

      {doneId && (
        <div role="status" className="se-alert se-alert-ok">
          수험생 상담 신청이 정상 접수되었습니다 (접수번호: {doneId}). 내원 시 2027 수능 수험표를 지참해 주세요.
        </div>
      )}

      <div className="se-form-grid">
        <div>
          <label htmlFor="se-name">수험생 성함</label>
          <input
            id="se-name"
            type="text"
            className="se-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={40}
            placeholder="예: 김수험"
          />
        </div>
        <div>
          <label htmlFor="se-phone">휴대폰 번호</label>
          <input
            id="se-phone"
            type="tel"
            className="se-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, '').slice(0, 20))}
            required
            placeholder="010-0000-0000"
          />
        </div>
      </div>

      <div className="se-field">
        <label htmlFor="se-tx">관심 비급여 진료 항목</label>
        <select
          id="se-tx"
          className="se-input"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        >
          {TREATMENTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="se-field">
        <label htmlFor="se-memo">희망 내원 일정 또는 궁금한 점 (선택)</label>
        <textarea
          id="se-memo"
          className="se-input"
          rows={3}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          maxLength={600}
          placeholder="예: 수험표 지참하여 이번 주 토요일 오전 교정·미백 상담 희망합니다."
        />
      </div>

      <div className="se-consent-list">
        <label className="se-check">
          <input
            type="checkbox"
            checked={agreedPrivacy}
            onChange={(e) => setAgreedPrivacy(e.target.checked)}
          />
          <span>
            <strong>(필수)</strong> 개인정보 수집·이용 동의: 수험생 상담 확인 및 회신을 위해 성함과 연락처를 수집·이용합니다. (
            <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">
              개인정보처리방침 보기
            </Link>
            )
          </span>
        </label>

        <label className="se-check">
          <input
            type="checkbox"
            checked={agreedSensitive}
            onChange={(e) => setAgreedSensitive(e.target.checked)}
          />
          <span>
            <strong>(필수)</strong> 민감정보(건강정보) 처리 동의: 희망 진료 과목 및 상담 메모를 상담 안내 목적으로 처리합니다.
          </span>
        </label>

        <label className="se-check">
          <input
            type="checkbox"
            checked={agreedMarketing}
            onChange={(e) => setAgreedMarketing(e.target.checked)}
          />
          <span>
            <strong>(선택)</strong> 병원 안내·마케팅 및 홍보 정보 수신 동의: 동의하지 않아도 상담 접수는 정상 진행됩니다.
          </span>
        </label>
      </div>

      <button type="submit" disabled={submitting} className="se-btn se-btn-primary">
        {submitting ? '접수 중...' : '수험생 상담 및 미백 혜택 신청하기'}
      </button>
    </form>
  );
}
