'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

interface MemberItem {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  handle: string | null;
  isOwner: boolean;
  hasPassword: boolean;
  providers: string[];
  agreedPrivacy: boolean;
  agreedMarketing: boolean;
  consentAt: string | null;
  createdAt: string;
  lastLoginAt: string | null;
  lastSeenAt: string | null;
  isBlocked: boolean;
  adminMemo: string | null;
  isVerifiedNonInsured: boolean;
  verifiedTreatment: string | null;
  chartNo: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  welcomeEmailSentAt: string | null;
  lastPromoEmailSentAt: string | null;
  emailCount: number;
  messageCount: number;
}

interface EmailLogItem {
  id: string;
  recipientEmail: string;
  campaignSlug: string | null;
  kind: string;
  subject: string;
  provider: string;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface CampaignItem {
  id: string;
  slug: string;
  seasonKey: string;
  title: string;
  subject: string;
  headline: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
  startMonth: number;
  endMonth: number;
  isActiveOverride: boolean;
}

interface VerificationCodeItem {
  id: string;
  code: string;
  patientName: string | null;
  chartNo: string | null;
  treatmentType: string;
  issuedBy: string;
  maxUses: number;
  usedCount: number;
  expiresAt: string | null;
  createdAt: string;
}

interface SystemStatus {
  email: {
    resendConfigured: boolean;
    smtpConfigured: boolean;
    activeProvider: 'resend' | 'smtp' | 'none';
    fromAddress: string;
  };
  blobConfigured: boolean;
  oauth: {
    google: boolean;
    kakao: boolean;
    naver: boolean;
  };
  ownerEmails: string[];
}

const TREATMENT_OPTIONS = [
  '치아교정 (클리피씨·인비절라인·설측·재교정)',
  '최소삭제 심미보철 / 라미네이트',
  '지르코니아 / 올세라믹 크라운',
  '3D CT 정밀 임플란트',
  '전문가 치아미백 프로그램',
  '턱관절 · 기타 비급여 진료',
];

export default function MembersAdminClient({ ownerEmail }: { ownerEmail: string }) {
  const [activeTab, setActiveTab] = useState<'members' | 'emails' | 'codes'>('members');
  const [items, setItems] = useState<MemberItem[]>([]);
  const [kpis, setKpis] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    marketingUsers: 0,
    blockedUsers: 0,
    totalEmailsSent: 0,
    activeCampaignSlug: 'year_end_scaling_2026',
    activeCampaignTitle: '2026 연말 건강보험 스케일링 마감 안내',
  });
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [emailLogs, setEmailLogs] = useState<EmailLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  // Filters
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified' | 'marketing' | 'social' | 'blocked'>('all');
  const [sort, setSort] = useState<'newest' | 'lastLogin'>('newest');

  // Selected member editor
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMember = useMemo(
    () => items.find((m) => m.id === selectedId) || null,
    [items, selectedId]
  );
  const [editChartNo, setEditChartNo] = useState('');
  const [editTreatment, setEditTreatment] = useState(TREATMENT_OPTIONS[0]);
  const [editMemo, setEditMemo] = useState('');
  const [editMarketing, setEditMarketing] = useState(false);
  const [savingMember, setSavingMember] = useState(false);

  // Campaigns
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [activeSlug, setActiveSlug] = useState('year_end_scaling_2026');
  const [selectedSlug, setSelectedSlug] = useState('year_end_scaling_2026');
  const [campForm, setCampForm] = useState<CampaignItem | null>(null);
  const [testEmailTo, setTestEmailTo] = useState(ownerEmail);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Verification Codes
  const [codes, setCodes] = useState<VerificationCodeItem[]>([]);
  const [newCodePatient, setNewCodePatient] = useState('');
  const [newCodeChart, setNewCodeChart] = useState('');
  const [newCodeTreatment, setNewCodeTreatment] = useState(TREATMENT_OPTIONS[0]);
  const [newCodeMaxUses, setNewCodeMaxUses] = useState(1);
  const [lastIssuedGuide, setLastIssuedGuide] = useState('');

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/members?q=${encodeURIComponent(query)}&filter=${filter}&sort=${sort}`,
        { cache: 'no-store' }
      );
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/login?callbackUrl=%2Fadmin%2Fmembers&error=AccessDenied';
        return;
      }
      const data = await res.json();
      if (data.ok) {
        setItems(data.items || []);
        if (data.kpis) setKpis(data.kpis);
        if (data.systemStatus) setSystemStatus(data.systemStatus);
        setEmailLogs(data.recentEmailLogs || []);
      }
    } finally {
      setLoading(false);
    }
  }, [query, filter, sort]);

  const fetchCampaigns = useCallback(async () => {
    const res = await fetch('/api/admin/campaigns', { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    if (data?.ok) {
      setCampaigns(data.campaigns || []);
      setActiveSlug(data.activeSlug || 'year_end_scaling_2026');
      const target =
        (data.campaigns || []).find((c: CampaignItem) => c.slug === selectedSlug) ||
        (data.campaigns || []).find((c: CampaignItem) => c.slug === data.activeSlug) ||
        data.campaigns?.[0] ||
        null;
      if (target) {
        setSelectedSlug(target.slug);
        setCampForm(target);
      }
    }
  }, [selectedSlug]);

  const fetchCodes = useCallback(async () => {
    const res = await fetch('/api/admin/verification-codes', { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    if (data?.ok) {
      setCodes(data.items || []);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [filter, sort]);

  useEffect(() => {
    fetchCampaigns();
    fetchCodes();
  }, []);

  useEffect(() => {
    if (!selectedMember) return;
    setEditChartNo(selectedMember.chartNo || '');
    setEditTreatment(selectedMember.verifiedTreatment || TREATMENT_OPTIONS[0]);
    setEditMemo(selectedMember.adminMemo || '');
    setEditMarketing(selectedMember.agreedMarketing);
  }, [selectedMember]);

  const handlePatchMember = async (
    id: string,
    payload: Record<string, unknown>,
    successMsg: string
  ) => {
    setSavingMember(true);
    setNotice('');
    try {
      const res = await fetch(`/api/admin/members/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setNotice(
          data.verificationEmailSent
            ? `${successMsg} (승인 안내 메일 발송 완료)`
            : successMsg
        );
        await fetchMembers();
      } else {
        setNotice(data.message || '처리에 실패했습니다.');
      }
    } finally {
      setSavingMember(false);
    }
  };

  const handleDeleteMember = async (member: MemberItem) => {
    if (!window.confirm(`${member.email || member.name} 회원을 완전히 삭제할까요? 이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }
    const res = await fetch(`/api/admin/members/${encodeURIComponent(member.id)}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.ok) {
      setNotice('회원 계정을 삭제했습니다.');
      if (selectedId === member.id) setSelectedId(null);
      await fetchMembers();
    } else {
      setNotice(data.message || '삭제에 실패했습니다.');
    }
  };

  const handleSendEmailAction = async (payload: Record<string, unknown>) => {
    setSendingEmail(true);
    setNotice('');
    try {
      const res = await fetch('/api/admin/members/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setNotice(data.message || '이메일 요청을 처리했습니다.');
      await fetchMembers();
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campForm) return;
    const res = await fetch('/api/admin/campaigns', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campForm),
    });
    const data = await res.json();
    if (data.ok) {
      setNotice(`시즌 캠페인 "${campForm.title}" 저장 완료`);
      await fetchCampaigns();
      await fetchMembers();
    } else {
      setNotice(data.message || '캠페인 저장에 실패했습니다.');
    }
  };

  const handleIssueCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/verification-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientName: newCodePatient.trim(),
        chartNo: newCodeChart.trim(),
        treatmentType: newCodeTreatment,
        maxUses: newCodeMaxUses,
        expiresDays: 60,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      setLastIssuedGuide(data.guideText || '');
      setNewCodePatient('');
      setNewCodeChart('');
      setNotice(`새 비보험 인증코드 ${data.item.code} 발급 완료`);
      await fetchCodes();
    } else {
      setNotice(data.message || '인증코드 발급 실패');
    }
  };

  const handleDeleteCode = async (id: string) => {
    const res = await fetch(`/api/admin/verification-codes?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.ok) {
      setNotice('인증코드를 삭제했습니다.');
      await fetchCodes();
    }
  };

  const exportCsv = () => {
    if (items.length === 0) return;
    const headers = ['가입일', '이름', '이메일', '연락처', '가입방식', '약관동의', '마케팅동의', '인증된화타펫', '진료항목', '차트번호', '최근로그인'];
    const rows = items.map((m) => [
      new Date(m.createdAt).toLocaleString('ko-KR'),
      m.name || '',
      m.email || '',
      m.phone || '',
      m.providers.length > 0 ? m.providers.join('+') : 'email',
      m.agreedPrivacy ? 'Y' : 'N',
      m.agreedMarketing ? 'Y' : 'N',
      m.isVerifiedNonInsured ? 'Y' : 'N',
      m.verifiedTreatment || '',
      m.chartNo || '',
      m.lastLoginAt ? new Date(m.lastLoginAt).toLocaleString('ko-KR') : '',
    ]);
    const csv = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `화이트스타일치과_회원목록_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const previewHtml = useMemo(() => {
    if (!campForm) return '';
    return `<!DOCTYPE html><html lang="ko"><body style="margin:0;padding:16px;font-family:sans-serif;background:#f1f5f9;word-break:keep-all;"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:#0f294a;color:#fff;padding:20px;"><div style="font-size:12px;color:#93c5fd;">1994년 개원 33년 전통 강남역 화이트스타일치과의원</div><h2 style="margin:6px 0 0;font-size:18px;">${campForm.headline}</h2></div><div style="padding:20px;font-size:14px;line-height:1.7;color:#1e293b;">${campForm.bodyHtml}<div style="margin-top:16px;"><span style="display:inline-block;padding:10px 18px;background:#03c75a;color:#fff;border-radius:8px;font-weight:700;">${campForm.ctaLabel}</span></div></div></div></body></html>`;
  }, [campForm]);

  return (
    <div className="am-shell">
      <header className="am-header">
        <div className="am-title-wrap">
          <div className="am-owner-pill">원장님 단독 접근 잠금 ({ownerEmail})</div>
          <h1 className="am-h1">화이트스타일치과 회원관리 및 화타펫 인증 센터</h1>
          <p className="am-subtitle">
            신규가입 웰컴 이메일, 연말 스케일링 시즌 캠페인, 비보험 진료 인증 화타펫 승인을 한 곳에서 관리합니다.
          </p>
        </div>
        <div className="am-header-actions">
          <Link href="/admin/consultations" className="am-btn">
            상담 접수 관리
          </Link>
          <Link href="/messenger" className="am-btn am-btn-primary">
            화타톡 메신저
          </Link>
          <button type="button" onClick={exportCsv} className="am-btn am-btn-green">
            회원 CSV 저장
          </button>
          <button type="button" onClick={() => fetchMembers()} className="am-btn">
            새로고침
          </button>
        </div>
      </header>

      {systemStatus && (
        <section className="am-status-bar" aria-label="시스템 연동 현황">
          <strong>연동 상태:</strong>
          <span
            className={`am-chip ${
              systemStatus.email.activeProvider !== 'none' ? 'am-chip-ok' : 'am-chip-warn'
            }`}
          >
            이메일: {systemStatus.email.activeProvider === 'resend'
              ? 'Resend API 활성'
              : systemStatus.email.activeProvider === 'smtp'
                ? 'Google SMTP 활성'
                : '미설정 (RESEND_API_KEY 또는 SMTP_USER/SMTP_PASS 등록 필요)'}
          </span>
          <span className={`am-chip ${systemStatus.blobConfigured ? 'am-chip-ok' : 'am-chip-warn'}`}>
            대용량 파일: {systemStatus.blobConfigured ? '클라우드 500MB + P2P 무제한' : 'DB 3.5MB + P2P 무제한'}
          </span>
          <span className={`am-chip ${systemStatus.oauth.google ? 'am-chip-ok' : 'am-chip-danger'}`}>
            Google: {systemStatus.oauth.google ? '정상' : '미설정'}
          </span>
          <span className={`am-chip ${systemStatus.oauth.kakao ? 'am-chip-ok' : 'am-chip-warn'}`}>
            카카오: {systemStatus.oauth.kakao ? '정상' : '키 등록 대기'}
          </span>
          <span className={`am-chip ${systemStatus.oauth.naver ? 'am-chip-ok' : 'am-chip-warn'}`}>
            네이버: {systemStatus.oauth.naver ? '정상' : '키 등록 대기'}
          </span>
        </section>
      )}

      {notice && (
        <div className="am-banner-msg" role="status">
          {notice}
        </div>
      )}

      <section className="am-kpi-grid" aria-label="회원 주요 지표">
        <div className="am-kpi-card">
          <div className="am-kpi-label">전체 가입 회원</div>
          <div className="am-kpi-value">{kpis.totalUsers}명</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">인증된 화타펫 (비보험 정회원)</div>
          <div className="am-kpi-value">{kpis.verifiedUsers}명</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">마케팅 이메일 동의</div>
          <div className="am-kpi-value">{kpis.marketingUsers}명</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">현재 시즌 메일 ({kpis.activeCampaignTitle})</div>
          <div className="am-kpi-value">{kpis.totalEmailsSent}건 발송</div>
        </div>
      </section>

      <nav className="am-tabs" aria-label="회원관리 메뉴">
        <button
          type="button"
          onClick={() => setActiveTab('members')}
          className={`am-tab ${activeTab === 'members' ? 'is-active' : ''}`}
        >
          회원 목록 및 비보험 인증 ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('emails')}
          className={`am-tab ${activeTab === 'emails' ? 'is-active' : ''}`}
        >
          웰컴 및 시즌 프로모션 이메일
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('codes')}
          className={`am-tab ${activeTab === 'codes' ? 'is-active' : ''}`}
        >
          원내 비보험 인증코드 발급 ({codes.length})
        </button>
      </nav>

      {activeTab === 'members' && (
        <section className="am-panel">
          <div className="am-filter-row">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchMembers();
              }}
              style={{ display: 'flex', gap: '8px', flex: '1 1 280px' }}
            >
              <input
                type="text"
                className="am-input"
                style={{ flex: 1 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="이름, 이메일, 전화번호, 차트번호, 핸들 검색..."
              />
              <button type="submit" className="am-btn am-btn-primary">
                검색
              </button>
            </form>

            <select
              className="am-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              aria-label="회원 필터"
            >
              <option value="all">전체 회원</option>
              <option value="verified">인증된 화타펫</option>
              <option value="unverified">일반 회원</option>
              <option value="marketing">마케팅 동의</option>
              <option value="social">소셜 로그인</option>
              <option value="blocked">차단 계정</option>
            </select>

            <select
              className="am-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              aria-label="정렬 기준"
            >
              <option value="newest">최신 가입순</option>
              <option value="lastLogin">최근 로그인순</option>
            </select>

            <button
              type="button"
              disabled={sendingEmail}
              onClick={() => handleSendEmailAction({ mode: 'resend_unmailed' })}
              className="am-btn"
            >
              미발송 회원 웰컴메일 일괄 발송
            </button>
          </div>

          <div className="am-split">
            <div className="am-table-wrap">
              {loading ? (
                <div style={{ padding: '48px', textAlign: 'center' }}>회원 정보를 불러오는 중입니다...</div>
              ) : items.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center' }}>조건에 맞는 회원이 없습니다.</div>
              ) : (
                <table className="am-table">
                  <thead>
                    <tr>
                      <th>회원</th>
                      <th>가입방식</th>
                      <th>동의</th>
                      <th>화타펫 등급</th>
                      <th>웰컴메일</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((m) => (
                      <tr
                        key={m.id}
                        className={selectedId === m.id ? 'is-selected' : ''}
                        onClick={() => setSelectedId(m.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <div style={{ fontWeight: 700 }}>
                            {m.name || '미기재'} {m.isOwner && <span className="am-chip am-chip-ok">소유자</span>}
                            {m.isBlocked && <span className="am-chip am-chip-danger">차단됨</span>}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--am-muted)' }}>{m.email}</div>
                          {m.phone && <div style={{ fontSize: '12px' }}>{m.phone}</div>}
                        </td>
                        <td>
                          {m.providers.length > 0 ? m.providers.join(', ') : '이메일'}
                        </td>
                        <td>
                          <div>필수: {m.agreedPrivacy ? '동의' : '미기록'}</div>
                          <div>홍보: {m.agreedMarketing ? '동의' : '거부'}</div>
                        </td>
                        <td>
                          {m.isVerifiedNonInsured ? (
                            <span className="am-chip am-chip-warn">
                              인증 화타펫 ({m.chartNo || '승인'})
                            </span>
                          ) : (
                            <span className="am-chip">일반</span>
                          )}
                        </td>
                        <td>
                          {m.welcomeEmailSentAt
                            ? new Date(m.welcomeEmailSentAt).toLocaleDateString('ko-KR')
                            : '미발송'}
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedId(m.id)}
                            className="am-btn"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                          >
                            상세
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <aside className="am-detail-box" aria-label="선택 회원 관리">
              {selectedMember ? (
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800 }}>
                    {selectedMember.name || '회원'} 상세 관리
                  </h2>
                  <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'var(--am-muted)' }}>
                    {selectedMember.email} {selectedMember.handle ? `(${selectedMember.handle})` : ''}
                  </p>

                  <div className="am-field">
                    <label className="am-field-label" htmlFor="am-chart-no">원내 차트번호</label>
                    <input
                      id="am-chart-no"
                      className="am-input"
                      style={{ width: '100%' }}
                      value={editChartNo}
                      onChange={(e) => setEditChartNo(e.target.value)}
                      placeholder="예: WS-202611"
                    />
                  </div>

                  <div className="am-field">
                    <label className="am-field-label" htmlFor="am-tx-type">비보험 진료 항목</label>
                    <select
                      id="am-tx-type"
                      className="am-select"
                      style={{ width: '100%' }}
                      value={editTreatment}
                      onChange={(e) => setEditTreatment(e.target.value)}
                    >
                      {TREATMENT_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="am-field">
                    <label className="am-field-label" htmlFor="am-admin-memo">원장님 메모</label>
                    <textarea
                      id="am-admin-memo"
                      className="am-textarea"
                      value={editMemo}
                      onChange={(e) => setEditMemo(e.target.value)}
                      placeholder="상담 이력, 주의사항 등 내부 메모..."
                    />
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '14px' }}>
                    <input
                      type="checkbox"
                      checked={editMarketing}
                      onChange={(e) => setEditMarketing(e.target.checked)}
                    />
                    <span>마케팅 및 시즌 프로모션 이메일 수신 동의</span>
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {!selectedMember.isVerifiedNonInsured ? (
                      <button
                        type="button"
                        disabled={savingMember}
                        onClick={() =>
                          handlePatchMember(
                            selectedMember.id,
                            {
                              isVerifiedNonInsured: true,
                              chartNo: editChartNo,
                              verifiedTreatment: editTreatment,
                              adminMemo: editMemo,
                              agreedMarketing: editMarketing,
                              sendVerificationEmail: true,
                            },
                            `${selectedMember.name || selectedMember.email} 회원을 인증된 화타펫으로 승인했습니다.`
                          )
                        }
                        className="am-btn am-btn-gold"
                      >
                        인증된 화타펫 승인 (비보험 정회원)
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={savingMember}
                        onClick={() =>
                          handlePatchMember(
                            selectedMember.id,
                            {
                              isVerifiedNonInsured: false,
                              adminMemo: editMemo,
                              agreedMarketing: editMarketing,
                            },
                            '인증된 화타펫 상태를 해제했습니다.'
                          )
                        }
                        className="am-btn"
                      >
                        화타펫 인증 해제
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={savingMember}
                      onClick={() =>
                        handlePatchMember(
                          selectedMember.id,
                          {
                            chartNo: editChartNo,
                            verifiedTreatment: editTreatment,
                            adminMemo: editMemo,
                            agreedMarketing: editMarketing,
                          },
                          '회원 메모 및 정보를 저장했습니다.'
                        )
                      }
                      className="am-btn am-btn-primary"
                    >
                      변경사항 저장
                    </button>

                    <button
                      type="button"
                      disabled={sendingEmail}
                      onClick={() =>
                        handleSendEmailAction({
                          mode: 'single',
                          userId: selectedMember.id,
                          campaignSlug: activeSlug,
                        })
                      }
                      className="am-btn am-btn-green"
                    >
                      현재 시즌 웰컴/스케일링 메일 발송
                    </button>

                    {!selectedMember.isOwner && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button
                          type="button"
                          disabled={savingMember}
                          onClick={() =>
                            handlePatchMember(
                              selectedMember.id,
                              { isBlocked: !selectedMember.isBlocked },
                              selectedMember.isBlocked ? '차단을 해제했습니다.' : '계정을 차단했습니다.'
                            )
                          }
                          className="am-btn"
                          style={{ flex: 1 }}
                        >
                          {selectedMember.isBlocked ? '차단 해제' : '계정 차단'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(selectedMember)}
                          className="am-btn am-btn-danger"
                          style={{ flex: 1 }}
                        >
                          회원 삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--am-muted)', fontSize: '14px' }}>
                  왼쪽 표에서 회원을 선택하면 비보험 진료 화타펫 승인, 차트번호 등록, 개별 이메일 발송을 바로 실행할 수 있습니다.
                </div>
              )}
            </aside>
          </div>
        </section>
      )}

      {activeTab === 'emails' && (
        <section className="am-panel">
          <div className="am-split">
            <div>
              <h2 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 800 }}>
                시즌별 자동 웰컴 및 프로모션 이메일 템플릿
              </h2>

              <div className="am-filter-row">
                <select
                  className="am-select"
                  value={selectedSlug}
                  onChange={(e) => {
                    const next = campaigns.find((c) => c.slug === e.target.value) || null;
                    setSelectedSlug(e.target.value);
                    setCampForm(next);
                  }}
                >
                  {campaigns.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title} ({c.startMonth}월~{c.endMonth}월){c.slug === activeSlug ? ' [현재 활성]' : ''}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={sendingEmail}
                  onClick={() =>
                    handleSendEmailAction({
                      mode: 'broadcast_marketing',
                      campaignSlug: selectedSlug,
                    })
                  }
                  className="am-btn am-btn-green"
                >
                  마케팅 동의 회원 전체 발송
                </button>
              </div>

              {campForm && (
                <form onSubmit={handleSaveCampaign}>
                  <div className="am-field">
                    <label className="am-field-label" htmlFor="camp-title">캠페인명</label>
                    <input
                      id="camp-title"
                      className="am-input"
                      style={{ width: '100%' }}
                      value={campForm.title}
                      onChange={(e) => setCampForm({ ...campForm, title: e.target.value })}
                    />
                  </div>
                  <div className="am-field">
                    <label className="am-field-label" htmlFor="camp-subject">이메일 제목</label>
                    <input
                      id="camp-subject"
                      className="am-input"
                      style={{ width: '100%' }}
                      value={campForm.subject}
                      onChange={(e) => setCampForm({ ...campForm, subject: e.target.value })}
                    />
                  </div>
                  <div className="am-field">
                    <label className="am-field-label" htmlFor="camp-headline">상단 헤드라인</label>
                    <input
                      id="camp-headline"
                      className="am-input"
                      style={{ width: '100%' }}
                      value={campForm.headline}
                      onChange={(e) => setCampForm({ ...campForm, headline: e.target.value })}
                    />
                  </div>
                  <div className="am-field">
                    <label className="am-field-label" htmlFor="camp-body">본문 HTML</label>
                    <textarea
                      id="camp-body"
                      className="am-textarea"
                      style={{ minHeight: '170px' }}
                      value={campForm.bodyHtml}
                      onChange={(e) => setCampForm({ ...campForm, bodyHtml: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="am-field">
                      <label className="am-field-label" htmlFor="camp-cta-label">버튼 문구</label>
                      <input
                        id="camp-cta-label"
                        className="am-input"
                        style={{ width: '100%' }}
                        value={campForm.ctaLabel}
                        onChange={(e) => setCampForm({ ...campForm, ctaLabel: e.target.value })}
                      />
                    </div>
                    <div className="am-field">
                      <label className="am-field-label" htmlFor="camp-cta-url">버튼 링크</label>
                      <input
                        id="camp-cta-url"
                        className="am-input"
                        style={{ width: '100%' }}
                        value={campForm.ctaUrl}
                        onChange={(e) => setCampForm({ ...campForm, ctaUrl: e.target.value })}
                      />
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '14px' }}>
                    <input
                      type="checkbox"
                      checked={campForm.isActiveOverride}
                      onChange={(e) => setCampForm({ ...campForm, isActiveOverride: e.target.checked })}
                    />
                    <span>월 자동 매칭 대신 이 캠페인을 최우선 고정 활성화</span>
                  </label>
                  <button type="submit" className="am-btn am-btn-primary">
                    캠페인 템플릿 저장
                  </button>
                </form>
              )}
            </div>

            <div>
              <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 800 }}>실시간 미리보기 및 테스트 발송</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="email"
                  className="am-input"
                  style={{ flex: 1 }}
                  value={testEmailTo}
                  onChange={(e) => setTestEmailTo(e.target.value)}
                  placeholder="테스트 수신 이메일"
                />
                <button
                  type="button"
                  disabled={sendingEmail}
                  onClick={() =>
                    handleSendEmailAction({
                      mode: 'test',
                      testTo: testEmailTo,
                      campaignSlug: selectedSlug,
                    })
                  }
                  className="am-btn am-btn-gold"
                >
                  테스트 발송
                </button>
              </div>
              <iframe
                title="시즌 이메일 미리보기"
                sandbox=""
                srcDoc={previewHtml}
                className="am-preview-frame"
              />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 800 }}>최근 이메일 발송 로그 (30건)</h3>
            <div className="am-table-wrap">
              <table className="am-table">
                <thead>
                  <tr>
                    <th>발송시각</th>
                    <th>수신자</th>
                    <th>종류</th>
                    <th>제목</th>
                    <th>경로</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {emailLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: 'var(--am-muted)' }}>
                        아직 발송 기록이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    emailLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{new Date(log.createdAt).toLocaleString('ko-KR')}</td>
                        <td>{log.recipientEmail}</td>
                        <td>{log.kind}</td>
                        <td>{log.subject}</td>
                        <td>{log.provider}</td>
                        <td>
                          <span
                            className={`am-chip ${
                              log.status === 'SENT'
                                ? 'am-chip-ok'
                                : log.status === 'SKIPPED_NO_CONFIG'
                                  ? 'am-chip-warn'
                                  : 'am-chip-danger'
                            }`}
                          >
                            {log.status}
                          </span>
                          {log.errorMessage && (
                            <div style={{ fontSize: '11px', color: 'var(--am-red)', marginTop: '3px' }}>
                              {log.errorMessage}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'codes' && (
        <section className="am-panel">
          <div className="am-split">
            <div>
              <h2 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 800 }}>
                원내 비보험 진료 인증코드 발급 (데스크용)
              </h2>
              <form onSubmit={handleIssueCode}>
                <div className="am-field">
                  <label className="am-field-label" htmlFor="code-patient">환자 성함 (선택)</label>
                  <input
                    id="code-patient"
                    className="am-input"
                    style={{ width: '100%' }}
                    value={newCodePatient}
                    onChange={(e) => setNewCodePatient(e.target.value)}
                    placeholder="예: 김하얀"
                  />
                </div>
                <div className="am-field">
                  <label className="am-field-label" htmlFor="code-chart">차트번호 (선택)</label>
                  <input
                    id="code-chart"
                    className="am-input"
                    style={{ width: '100%' }}
                    value={newCodeChart}
                    onChange={(e) => setNewCodeChart(e.target.value)}
                    placeholder="예: WS-202611"
                  />
                </div>
                <div className="am-field">
                  <label className="am-field-label" htmlFor="code-tx">비보험 진료 항목</label>
                  <select
                    id="code-tx"
                    className="am-select"
                    style={{ width: '100%' }}
                    value={newCodeTreatment}
                    onChange={(e) => setNewCodeTreatment(e.target.value)}
                  >
                    {TREATMENT_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="am-field">
                  <label className="am-field-label" htmlFor="code-uses">사용 가능 횟수</label>
                  <input
                    id="code-uses"
                    type="number"
                    min={1}
                    max={50}
                    className="am-input"
                    value={newCodeMaxUses}
                    onChange={(e) => setNewCodeMaxUses(Number(e.target.value || 1))}
                  />
                </div>
                <button type="submit" className="am-btn am-btn-gold">
                  인증코드 생성하기
                </button>
              </form>

              {lastIssuedGuide && (
                <div style={{ marginTop: '16px' }}>
                  <label className="am-field-label">환자 전달용 안내 문구 (카톡/문자 복사)</label>
                  <textarea readOnly className="am-textarea" style={{ minHeight: '140px' }} value={lastIssuedGuide} />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(lastIssuedGuide);
                      setNotice('안내 문구를 클립보드에 복사했습니다.');
                    }}
                    className="am-btn am-btn-primary"
                    style={{ marginTop: '8px' }}
                  >
                    안내 문구 복사
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 800 }}>발급된 인증코드 목록</h3>
              <div className="am-table-wrap">
                <table className="am-table">
                  <thead>
                    <tr>
                      <th>코드</th>
                      <th>환자/진료</th>
                      <th>사용</th>
                      <th>만료</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codes.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--am-muted)' }}>
                          발급된 인증코드가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      codes.map((c) => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 800 }}>{c.code}</td>
                          <td>
                            <div>{c.patientName || '미지정'} {c.chartNo ? `(${c.chartNo})` : ''}</div>
                            <div style={{ fontSize: '11px', color: 'var(--am-muted)' }}>{c.treatmentType}</div>
                          </td>
                          <td>
                            {c.usedCount} / {c.maxUses}
                          </td>
                          <td>{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('ko-KR') : '무기한'}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleDeleteCode(c.id)}
                              className="am-btn am-btn-danger"
                              style={{ padding: '4px 8px', fontSize: '12px' }}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
