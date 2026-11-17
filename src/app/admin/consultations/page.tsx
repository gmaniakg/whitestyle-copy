'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Consultation {
  id: string;
  name: string;
  phone: string;
  treatment: string;
  memo: string;
  source: string;
  status: 'PENDING' | 'CONTACTED' | 'RESERVED' | 'CANCELLED';
  createdAt: string;
}

const SOURCE_LABELS: Record<string, string> = {
  online: '온라인상담 (online)',
  feedback: '빠른상담신청 (feedback)',
  reserve: '온라인예약 (reserve)',
  doc_counsel: '의료진상담 (doc_counsel)',
  quick_bar: '하단 빠른상담',
  legacy_form: '기존 상담 폼',
};

const STATUS_OPTIONS: Array<{
  value: Consultation['status'];
  label: string;
  bg: string;
  color: string;
}> = [
  { value: 'PENDING', label: '대기중', bg: '#fef2f2', color: '#dc2626' },
  { value: 'CONTACTED', label: '연락완료', bg: '#fef9c3', color: '#a16207' },
  { value: 'RESERVED', label: '예약확정', bg: '#ecfdf5', color: '#059669' },
];

export default function AdminConsultationsPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Consultation | null>(null);
  const [targetWrId, setTargetWrId] = useState('');
  const [targetBoTable, setTargetBoTable] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTargetWrId(params.get('wr_id') || '');
    setTargetBoTable((params.get('bo_table') || '').toLowerCase());
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/consult?status=${statusFilter}&search=${encodeURIComponent(search)}&limit=200`
      );
      if (res.status === 401 || res.status === 403) {
        const callbackTarget = encodeURIComponent(
          `${window.location.pathname}${window.location.search}`
        );
        window.location.href = `/login?callbackUrl=${callbackTarget}`;
        return;
      }
      const data = await res.json();
      if (data.success) {
        const loaded: Consultation[] = data.items || [];
        setItems(loaded);

        const params = new URLSearchParams(window.location.search);
        const wrId = params.get('wr_id') || '';
        const boTable = (params.get('bo_table') || '').toLowerCase();

        if (wrId) {
          const matched =
            loaded.find(
              (item) =>
                (boTable && item.id === `${boTable}_${wrId}`) ||
                item.id.endsWith(`_${wrId}`) ||
                item.id === wrId ||
                (item.memo && item.memo.includes(`wr_id=${wrId}`))
            ) || null;
          if (matched) {
            setSelectedItem(matched);
          }
        } else if (selectedItem) {
          const refreshed = loaded.find((i) => i.id === selectedItem.id) || null;
          setSelectedItem(refreshed);
        }
      }
    } catch (err) {
      console.error('Failed to fetch consultations:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleStatusChange = async (id: string, nextStatus: Consultation['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/consult', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.status === 401 || res.status === 403) {
        const callbackTarget = encodeURIComponent(
          `${window.location.pathname}${window.location.search}`
        );
        window.location.href = `/login?callbackUrl=${callbackTarget}`;
        return;
      }
      const data = await res.json();
      if (data.success && data.item) {
        setItems((prev) => prev.map((it) => (it.id === id ? data.item : it)));
        setSelectedItem((prev) => (prev && prev.id === id ? data.item : prev));
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCsv = () => {
    if (items.length === 0) {
      alert('다운로드할 상담 내역이 없습니다.');
      return;
    }
    const headers = ['접수일시', '성명', '연락처', '진료과목', '상태', '접수경로', '메모'];
    const rows = items.map((item) => [
      new Date(item.createdAt).toLocaleString('ko-KR'),
      item.name,
      item.phone,
      item.treatment,
      item.status,
      item.source,
      `"${(item.memo || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `화이트스타일치과_상담접수목록_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span
            style={{
              background: '#fef2f2',
              color: '#dc2626',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            대기중
          </span>
        );
      case 'CONTACTED':
        return (
          <span
            style={{
              background: '#fef9c3',
              color: '#a16207',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            연락완료
          </span>
        );
      case 'RESERVED':
        return (
          <span
            style={{
              background: '#ecfdf5',
              color: '#059669',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            예약확정
          </span>
        );
      default:
        return (
          <span
            style={{
              background: '#f1f5f9',
              color: '#64748b',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {status}
          </span>
        );
    }
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px 64px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif',
        wordBreak: 'keep-all',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#1b439c',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            WhiteStyle Dental Clinic Admin
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
            환자 상담 및 예약 접수 관리 대시보드
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={fetchLeads}
            style={{
              padding: '10px 18px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '14px',
              color: '#334155',
            }}
          >
            새로고침
          </button>
          <button
            onClick={exportCsv}
            style={{
              padding: '10px 20px',
              background: '#059669',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(5,150,105,0.2)',
            }}
          >
            엑셀(CSV) 다운로드
          </button>
        </div>
      </div>

      {/* Selected Consultation Detail Panel */}
      {selectedItem ? (
        <div
          style={{
            background: '#ffffff',
            border: '2px solid #1b439c',
            borderRadius: '18px',
            padding: '24px',
            marginBottom: '28px',
            boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span
                  style={{
                    background: '#eff6ff',
                    color: '#1b439c',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 800,
                  }}
                >
                  상담 게시글 원문 상세 보기
                </span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                  {SOURCE_LABELS[selectedItem.source] || selectedItem.source} · {selectedItem.id}
                </span>
                {statusBadge(selectedItem.status)}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.45 }}>
                {selectedItem.treatment || '상담 문의'}
              </h2>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                padding: '6px 14px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              상세 닫기
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '18px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>고객 성함</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                {selectedItem.name}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>연락처</div>
              <div style={{ marginTop: '2px' }}>
                <a
                  href={`tel:${selectedItem.phone.replace(/[^\d]/g, '')}`}
                  style={{ fontSize: '16px', fontWeight: 800, color: '#1b439c', textDecoration: 'none' }}
                >
                  {selectedItem.phone}
                </a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>접수 일시</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155', marginTop: '4px' }}>
                {new Date(selectedItem.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#fcfcfd',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '18px 20px',
              fontSize: '15px',
              lineHeight: 1.85,
              color: '#1e293b',
              whiteSpace: 'pre-wrap',
              marginBottom: '18px',
              maxHeight: '420px',
              overflowY: 'auto',
            }}
          >
            {selectedItem.memo || '등록된 상세 본문 내용이 없습니다.'}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginRight: '4px' }}>
              진행 상태 변경:
            </span>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                disabled={updatingId === selectedItem.id}
                onClick={() => handleStatusChange(selectedItem.id, opt.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border:
                    selectedItem.status === opt.value
                      ? `2px solid ${opt.color}`
                      : '1px solid #cbd5e1',
                  background: selectedItem.status === opt.value ? opt.bg : '#fff',
                  color: selectedItem.status === opt.value ? opt.color : '#475569',
                }}
              >
                {opt.label}
              </button>
            ))}
            <a
              href={`tel:${selectedItem.phone.replace(/[^\d]/g, '')}`}
              style={{
                marginLeft: 'auto',
                display: 'inline-block',
                padding: '9px 18px',
                background: '#1b439c',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              바로 전화 걸기
            </a>
          </div>
        </div>
      ) : targetWrId && !loading ? (
        <div
          style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#92400e',
          }}
        >
          요청하신 글번호(<code>{targetBoTable ? `${targetBoTable}_` : ''}{targetWrId}</code>)를 아래 목록에서 확인하거나 검색해 주세요.
        </div>
      ) : null}

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>총 상담 접수건</div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
            {items.length}건
          </div>
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 600 }}>상담 대기 (미응대)</div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#dc2626', marginTop: '6px' }}>
            {items.filter((i) => i.status === 'PENDING').length}건
          </div>
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '13px', color: '#059669', fontWeight: 600 }}>예약 확정</div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#059669', marginTop: '6px' }}>
            {items.filter((i) => i.status === 'RESERVED').length}건
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
          background: '#f8fafc',
          padding: '16px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
        }}
      >
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '260px' }}>
          <input
            type="text"
            placeholder="환자 성명, 연락처, 제목 또는 글번호 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            검색
          </button>
        </form>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'PENDING', 'CONTACTED', 'RESERVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                border: statusFilter === st ? '2px solid #1b439c' : '1px solid #cbd5e1',
                background: statusFilter === st ? '#eff6ff' : '#fff',
                color: statusFilter === st ? '#1b439c' : '#475569',
              }}
            >
              {st === 'ALL' ? '전체보기' : st === 'PENDING' ? '대기중' : st === 'CONTACTED' ? '연락완료' : '예약확정'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        }}
      >
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
            데이터 불러오는 중...
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
            접수된 상담 내역이 없습니다.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>접수일시</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>환자 성명</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>연락처</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>상담 제목 / 진료과목</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>진행상태</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700 }}>접수경로</th>
                  <th style={{ padding: '14px 16px', fontWeight: 700, textAlign: 'center' }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: isSelected ? '#eff6ff' : idx % 2 === 0 ? '#fff' : '#fafafa',
                        cursor: 'pointer',
                      }}
                    >
                      <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        {new Date(item.createdAt).toLocaleString('ko-KR', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </td>
                      <td
                        style={{ padding: '14px 16px', fontWeight: 700, color: '#1b439c', whiteSpace: 'nowrap' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={`tel:${item.phone.replace(/[^\d]/g, '')}`}
                          style={{ color: '#1b439c', textDecoration: 'none' }}
                        >
                          {item.phone}
                        </a>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#334155', minWidth: '220px' }}>
                        {item.treatment}
                      </td>
                      <td style={{ padding: '14px 16px' }}>{statusBadge(item.status)}</td>
                      <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '12px', whiteSpace: 'nowrap' }}>
                        {item.source}
                      </td>
                      <td
                        style={{ padding: '14px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{
                            padding: '6px 12px',
                            background: '#0f172a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '12px',
                            cursor: 'pointer',
                            marginRight: '6px',
                          }}
                        >
                          원문 보기
                        </button>
                        <a
                          href={`tel:${item.phone.replace(/[^\d]/g, '')}`}
                          style={{
                            display: 'inline-block',
                            padding: '6px 12px',
                            background: '#1b439c',
                            color: '#fff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '12px',
                          }}
                        >
                          전화
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
