import { NextRequest, NextResponse } from 'next/server';
import { createConsultation } from '@/lib/consultation-db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let node = '';
    let mode = '';
    let secuarrsetRaw = '';
    let secuarr2Raw = '';

    if (contentType.includes('application/json')) {
      const json = await req.json();
      node = json.node || '';
      mode = json.mode || '';
      secuarrsetRaw = typeof json.secuarrset === 'string' ? json.secuarrset : JSON.stringify(json.arrset || {});
      secuarr2Raw = json.secuarr2 || '';
    } else {
      const formData = await req.formData();
      node = (formData.get('node') as string) || '';
      mode = (formData.get('mode') as string) || '';
      secuarrsetRaw = (formData.get('secuarrset') as string) || '';
      secuarr2Raw = (formData.get('secuarr2') as string) || '';
    }

    // ─── 1. Case: Privacy Policy Popup (node === 'popup_center') ───
    if (node === 'popup_center' || node.includes('popup')) {
      const privacyHtml = `
<div id="pvd_pop_dk_7c6cd7aad784d5de28325d4473907b02_document_wrap" style="position:fixed; left:0; top:0; width:100%; height:100%; z-index:999999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px); padding:20px;">
  <div style="background:#ffffff; width:100%; max-width:680px; border-radius:18px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); overflow:hidden; display:flex; flex-direction:column; max-height:85vh; font-family:-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;">
    <div style="padding:22px 28px; background:#0f172a; color:#ffffff; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b;">
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:20px;">🛡️</span>
        <h3 style="margin:0; font-size:18px; font-weight:800; letter-spacing:-0.02em; color:#ffffff;">화이트스타일치과의원 개인정보취급방침</h3>
      </div>
      <button type="button" onclick="$('#pvd_pop_dk_7c6cd7aad784d5de28325d4473907b02_document_wrap').remove();" style="background:transparent; border:none; color:#94a3b8; font-size:26px; cursor:pointer; line-height:1; padding:4px 8px; border-radius:8px;">&times;</button>
    </div>
    <div style="padding:28px; overflow-y:auto; line-height:1.75; font-size:14px; color:#334155;">
      <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#0f172a;">1. 개인정보의 수집 항목 및 방법</h4>
      <p style="margin:0 0 16px 0; color:#475569;">화이트스타일치과의원은 원활한 진료 상담 및 예약을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br>
      - 수집항목: 성명, 연락처(휴대전화번호), 관심 진료항목, 상담내용, 접속 IP<br>
      - 수집방법: 홈페이지 빠른상담 신청 및 온라인 예약/상담 접수</p>

      <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#0f172a;">2. 개인정보의 수집 및 이용 목적</h4>
      <p style="margin:0 0 16px 0; color:#475569;">- 고객 맞춤형 1:1 진료 상담 및 예약 일정 안내<br>
      - 상담 결과 및 예약 안내 문자(SMS/알림톡) 발송<br>
      - 고객 문의 및 불편사항 응대</p>

      <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#0f172a;">3. 개인정보의 보유 및 이용 기간</h4>
      <p style="margin:0 0 16px 0; color:#475569;">원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.<br>
      - 보유기간: 상담 및 진료 서비스 제공 완료 시까지<br>
      - 단, 의료법 및 관계 법령에 따라 보존 의무가 있는 경우 해당 법정 기간 동안 안전하게 보관합니다.</p>

      <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#0f172a;">4. 개인정보의 파기 절차 및 방법</h4>
      <p style="margin:0 0 16px 0; color:#475569;">전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하여 파기합니다.</p>

      <h4 style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#0f172a;">5. 이용자의 권리 및 문의</h4>
      <p style="margin:0; color:#475569;">이용자는 언제든지 등록된 개인정보의 열람, 정정 및 삭제를 요청할 수 있으며, 병원 대표번호(02-569-7528)로 문의하시면 즉시 처리해 드립니다.</p>
    </div>
    <div style="padding:16px 28px; background:#f8fafc; border-top:1px solid #e2e8f0; display:flex; justify-content:flex-end; gap:12px;">
      <button type="button" onclick="$('#pvd_pop_dk_7c6cd7aad784d5de28325d4473907b02_document_wrap').remove(); $('#agree_pb').prop('checked', true);" style="background:#2563eb; color:#ffffff; border:none; padding:12px 28px; border-radius:10px; font-size:15px; font-weight:700; cursor:pointer; box-shadow:0 4px 12px rgba(37,99,235,0.3);">
        동의 및 확인 완료
      </button>
    </div>
  </div>
</div>
`;
      return new NextResponse(privacyHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // ─── 2. Case: Consultation Submission (node === 'mir_processing') ───
    if (node === 'mir_processing' || mode.includes('save')) {
      let patientName = '';
      let patientPhone = '';
      let treatment = '빠른상담신청';

      // Parse payload
      try {
        let arrset: any = null;
        if (secuarrsetRaw) {
          try {
            arrset = JSON.parse(secuarrsetRaw);
          } catch (e) {}
        }

        const dbinfoStr = arrset?.secuarr2 || secuarr2Raw;
        if (dbinfoStr) {
          const parsedDb = typeof dbinfoStr === 'string' ? JSON.parse(dbinfoStr) : dbinfoStr;
          const items = Array.isArray(parsedDb) ? parsedDb[0]?.dbinfoAry || parsedDb : [];
          for (const item of items) {
            const key = String(item.name || '').toLowerCase();
            const val = String(item.value || '').trim();
            if (key.includes('name')) patientName = val;
            if (key.includes('tel') || key.includes('phone')) patientPhone = val;
            if (key.includes('subject') || key.includes('treat')) treatment = val;
          }
        }
      } catch (err) {
        console.warn('[sqlexec] parse error:', err);
      }

      // If name/phone extracted, save to DB
      if (patientName || patientPhone) {
        await createConsultation({
          name: patientName || '익명 고객',
          phone: patientPhone || '연락처 미입력',
          treatment,
          source: 'legacy_form',
          agreedPrivacy: true,
        });
      }

      const scriptResponse = `
<script>
  alert('화이트스타일치과 빠른상담 신청이 정상적으로 접수되었습니다.\\n전문 상담 실장이 신속하게 연락드리겠습니다.');
  $('.submitLock').removeClass('submitLock');
  $('#form_25c77498d12ad9fe80a1bffce2a3ec49 input[type="text"]').val('');
</script>
`;
      return new NextResponse(scriptResponse, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // ─── 3. Default: Fallback 200 OK ───
    return new NextResponse(
      JSON.stringify({ result: 'ok', code: 200, data: {} }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  } catch (err: any) {
    console.error('[_mir.do.sqlexec.php handler error]:', err);
    return new NextResponse(
      JSON.stringify({ result: 'ok', code: 200 }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
}

export async function GET() {
  return new NextResponse(
    JSON.stringify({ result: 'ok', code: 200, status: 'active' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  );
}
