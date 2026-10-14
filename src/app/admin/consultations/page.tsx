'use client';

import React, { useState, useEffect } from 'react';

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

export default function AdminConsultationsPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/consult?status=${statusFilter}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const exportCsv = () => {
    if (items.length === 0) {
      alert('다운로드할 상담 내역이 없습니다.');
      return;
    }
    const headers = ['접수일시', '성명', '연락처', '진료과목', '상태', '접수경로', '메모'];
    const rows = items.map(item => [
      new Date(item.createdAt).toLocaleString('ko-KR'),
      item.name,
      item.phone,
      item.treatment,
      item.status,
      item.source,
      `"${(item.memo || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `화이트스타일치과_상담접수목록_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>대기중</span>;
      case 'CONTACTED':
        return <span style={{ background: '#fef9c3', color: '#a16207', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>연락완료</span>;
      case 'RESERVED':
        return <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>예약확정</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>{status}</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            WhiteStyle Dental Clinic Admin
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '4px 0 0 0' }}>
            환자 상담 및 예약 접수 관리 대시보드
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchLeads}
            style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', color: '#334155' }}
          >
            🔄 새로고침
          </button>
          <button
            onClick={exportCsv}
            style={{ padding: '10px 20px', background: '#059669', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(5,150,105,0.25)' }}
          >
            📥 엑셀(CSV) 다운로드
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>총 상담 접수건</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>{items.length}건</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 600 }}>상담 대기 (미응대)</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#dc2626', marginTop: '6px' }}>
            {items.filter(i => i.status === 'PENDING').length}건
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '13px', color: '#059669', fontWeight: 600 }}>예약 확정</div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#059669', marginTop: '6px' }}>
            {items.filter(i => i.status === 'RESERVED').length}건
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            placeholder="환자 성명 또는 연락처 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
            검색
          </button>
        </form>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'PENDING', 'CONTACTED', 'RESERVED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                border: statusFilter === st ? '2px solid #2563eb' : '1px solid #cbd5e1',
                background: statusFilter === st ? '#eff6ff' : '#fff',
                color: statusFilter === st ? '#2563eb' : '#475569',
              }}
            >
              {st === 'ALL' ? '전체보기' : st === 'PENDING' ? '대기중' : st === 'CONTACTED' ? '연락완료' : '예약확정'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>데이터 불러오는 중...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>접수된 상담 내역이 없습니다.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>접수일시</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>환자 성명</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>연락처</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>진료과목</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>진행상태</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700 }}>접수경로</th>
                  <th style={{ padding: '16px 20px', fontWeight: 700, textAlign: 'center' }}>빠른연결</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '16px 20px', color: '#64748b', fontSize: '13px' }}>
                      {new Date(item.createdAt).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 800, color: '#0f172a' }}>{item.name}</td>
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#2563eb' }}>{item.phone}</td>
                    <td style={{ padding: '16px 20px', color: '#334155' }}>{item.treatment}</td>
                    <td style={{ padding: '16px 20px' }}>{statusBadge(item.status)}</td>
                    <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '12px' }}>{item.source}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <a
                        href={`tel:${item.phone.replace(/[^\d]/g, '')}`}
                        style={{ display: 'inline-block', padding: '6px 14px', background: '#2563eb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}
                      >
                        📞 전화하기
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
