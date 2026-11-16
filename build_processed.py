import re
import json
import html as html_lib
from urllib.parse import urlparse, parse_qs

# -------------------------------------------------------------
# 1. Read Original HTML
# -------------------------------------------------------------
with open('e:/antigravity/whitestyle-copy/live_clean.html', 'r', encoding='utf-8') as f:
    html = f.read()

# -------------------------------------------------------------
# 2. Hero Video Replacement
# -------------------------------------------------------------
m0 = html.find('<div class="boxsize ez_box_module box_module_Custom_455503_wrap')
m1 = html.find('<style class="sg_style">', m0)

if m0 == -1 or m1 == -1:
    print(f"Error: m0={m0}, m1={m1}")
    exit(1)

hero_video_html = """
<div class="boxsize ez_box_module hero_video_module_wrap posRel" style="margin: 0 auto; width: 100%; overflow: hidden; max-width: 100%; position: relative; background: #000;" id="box_module_Custom_455503_wrap">
  <div style="width: 100%; max-width: 100%; margin: 0 auto; position: relative;">
    <video 
      src="/videos/hero_optimized.mp4" 
      autoplay 
      loop 
      muted 
      playsinline 
      preload="auto"
      style="width: 100%; height: auto; max-height: 820px; object-fit: cover; display: block; margin: 0 auto;"
    ></video>
  </div>
</div>
"""

new_html = html[:m0] + hero_video_html + html[m1:]
print("Hero slider replaced.")

# -------------------------------------------------------------
# 3. Strip Legacy Bogus JSON-LD / Meta & Load Unified Head Snippet
# -------------------------------------------------------------
new_html = re.sub(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>', '', new_html, flags=re.S | re.I)
new_html = re.sub(r'<link[^>]*rel=["\']canonical["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*property=["\']og:[^"\']*["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*name=["\']twitter:[^"\']*["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = new_html.replace('<title>화이트스타일치과</title>', '<title>화이트스타일치과의원 | 1994년 개원 33년 전통 강남역 치아교정·심미보철·임플란트 (1577-7287)</title>')
new_html = new_html.replace('29년이란 시간동안', '33년이란 시간동안')
new_html = new_html.replace('29년 전통 화이트스타일치과', '33년 전통 화이트스타일치과')

with open(r'E:\antigravity\marketing-ai\madeinreal_email_attachments\gnu-head-injection.html', 'r', encoding='utf-8') as f:
    gnu_head_html = f.read()

gnu_head_html = re.sub(r'^<!--.*?-->\s*', '', gnu_head_html, count=1, flags=re.S)
gnu_head_html = gnu_head_html.replace('ws-semantic-aeo-header', 'ws-semantic-clinic-header')

extra_head = (
    gnu_head_html + '\n'
    '<style>\n'
    '  .hd_pops, #top_popup, div[id^="hd_pops_"], .modal-backdrop, #pop_layer {\n'
    '    display: none !important;\n'
    '  }\n'
    '  #hero_video_module_wrap {\n'
    '    width: 100%;\n'
    '    background: #000;\n'
    '  }\n'
    '  #hero_video_module_wrap video {\n'
    '    width: 100%;\n'
    '    height: auto;\n'
    '    display: block;\n'
    '  }\n'
    '</style>\n'
)

# -------------------------------------------------------------
# 4. Accurate Next.js URL Mapping Configuration
# -------------------------------------------------------------
MIR_CODE_MAP = {
    '12117': '/about/greeting',                    # 대표원장 인사말 / 병원소개
    '12118': '/about/doctors',                     # 의료진소개
    '12119': '/about/tour',                        # 병원둘러보기
    '12120': '/about/location',                    # 진료시간 / 오시는길
    '12121': '/treatments/implant',                # 임플란트
    '12122': '/treatments/implant/bone-graft',     # 뼈이식 임플란트
    '12123': '/treatments/implant/edentulous',     # 무치악 임플란트
    '12125': '/treatments/implant/insurance',      # 임플란트 보험
    '12126': '/treatments/orthodontics',          # 치아교정시스템
    '12127': '/treatments/orthodontics',          # 교정장치 종류 (필요시 /treatments/orthodontics/types)
    '12128': '/treatments/general',               # 일반진료 / 보존치료시스템
    '12129': '/treatments/general/caries',        # 충치치료
    '12130': '/treatments/general/endo',          # 신경치료
    '12131': '/treatments/general/scaling',       # 스케일링
    '12132': '/treatments/general/wisdom-tooth',  # 사랑니
    '12133': '/treatments/aesthetic/zeroshell',   # 제로쉘 심미보철 / 심미치료
    '12134': '/treatments/aesthetic/easy-white',  # 이지화이트 (치아미백)
    '12187': '/ja',                                # 일본어 공식 페이지
}

BOARD_MAP = {
    'notice': '/board/notice',
    'column': '/board/notice',
    'report': '/board/notice',
    'review': '/board/notice',
    'withstar': '/board/notice',
    'online': '/consult',                         # 온라인상담
    'doc_counsel': '/consult',                    # 온라인상담
}

FALLBACK_DOMAIN = ''

def map_url_to_nextjs(raw_url: str) -> str:
    """
    원본 그누보드 파라미터 및 상대경로를 Next.js 내부 라우트로 변환.
    내부 라우트가 없는 경우 원본 백엔드 도메인으로 안전하게 fallback.
    """
    if not raw_url:
        return raw_url
    
    url = raw_url.strip()

    # 정적 리소스, 프로토콜 및 앵커링크 보존
    if url.startswith(('/videos/', '/llms.txt', '/sitemap.xml', '/robots.txt', '/fonts/', '/images/')):
        return url
    if url.startswith(('tel:', 'mailto:', 'javascript:', '#')):
        return url
    if url in ('/', ''):
        return '/'

    # 프로토콜 오타 교정 (https:/// -> https://)
    url = re.sub(r'^(https?:)/+', r'\1//', url)

    # URL 파싱
    if url.startswith(('http://', 'https://')):
        parsed = urlparse(url)
        # 외부 타사 도메인 유지 (예: kakao, youtube 등)
        if parsed.netloc and parsed.netloc not in ('whitestyle.com', 'www.whitestyle.com', 'whitestyle.com:443', 'www.whitestyle.com:443'):
            return url
        path = parsed.path
        query = parsed.query
    else:
        parsed = urlparse(url)
        path = parsed.path
        query = parsed.query

    qs = parse_qs(query)

    # 1. mir_code 매핑
    if 'mir_code' in qs:
        code = qs['mir_code'][0]
        if code in MIR_CODE_MAP:
            return MIR_CODE_MAP[code]
        return f"{FALLBACK_DOMAIN}{path}?{query}" if query else f"{FALLBACK_DOMAIN}{path}"

    # 2. 일본어 랜딩
    if qs.get('ld', [''])[0].lower() == 'japanese':
        return '/about/japan-landing'

    # 3. 로그인 / 회원가입
    if path.startswith('/bbs/login.php'):
        return '/login'
    if path.startswith('/bbs/register.php'):
        return '/register'

    # 4. 게시판
    if path.startswith('/bbs/board.php'):
        bo_table = qs.get('bo_table', [''])[0]
        wr_id = qs.get('wr_id', [''])[0]
        if bo_table in BOARD_MAP:
            base_route = BOARD_MAP[bo_table]
            if wr_id and bo_table in ('notice', 'column'):
                return f"{base_route}/{wr_id}"
            return base_route
        if bo_table == 'open_price':
            return '/price'

    # 5. 이용약관 및 개인정보보호
    if 'privacy' in qs or path == '/privacy':
        return '/privacy'

    # 6. 미구현 PHP 엔드포인트 fallback
    if path.endswith('.php'):
        return f"{FALLBACK_DOMAIN}{path}?{query}" if query else f"{FALLBACK_DOMAIN}{path}"

    # 7. 기타 상대경로
    if path.startswith('/'):
        return f"{FALLBACK_DOMAIN}{path}"

    return url

# -------------------------------------------------------------
# 5. Safe Regex Replacements (No Collision with onclick!)
# -------------------------------------------------------------

# (1) HTML 태그 내 href 속성 치환
# (?<=\s) 룩비하인드를 사용하여 앞에 공백이 있는 HTML 속성만 선택.
# location.href= 는 앞에 온점(.)이 있으므로 절대로 매칭되지 않음!
def replace_tag_href(match):
    attr_name = match.group(1) # 'href'
    quote = match.group(2)     # ' or "
    url = match.group(3)
    new_url = map_url_to_nextjs(url)
    return f'{attr_name}={quote}{new_url}{quote}'

new_html = re.sub(r'(?<=\s)(href)=(["\'])(.*?)\2', replace_tag_href, new_html)

# (2) 자바스크립트 location.href 치환
# 내부 따옴표 스타일(' 또는 ")을 엄격히 보존하여 HTML onclick 속성 파괴 방지
def replace_js_location_href(match):
    prefix = match.group(1) # "location.href="
    quote = match.group(2)  # ' or "
    url = match.group(3)
    new_url = map_url_to_nextjs(url)
    return f'{prefix}{quote}{new_url}{quote}'

new_html = re.sub(r'(location\.href\s*=\s*)(["\'])(.*?)\2', replace_js_location_href, new_html)

# (3) 자바스크립트 window.open 치환
def replace_js_window_open(match):
    quote = match.group(1)
    url = match.group(2)
    new_url = map_url_to_nextjs(url)
    return f'window.open({quote}{new_url}{quote}'

new_html = re.sub(r'window\.open\((["\'])(.*?)\1', replace_js_window_open, new_html)

# (4) HTML 태그 내 src 속성 치환 (앞에 공백이 오는 속성만)
def replace_tag_src(match):
    quote = match.group(1)
    path = match.group(2)
    path = re.sub(r'^https?://(?:www\.)?whitestyle\.com(?::443)?', '', path)
    return f'src={quote}{path}{quote}'

new_html = re.sub(r'(?<=\s)src=(["\'])((?:/|https?://(?:www\.)?whitestyle\.com(?::443)?/)[^"\']*?)\1', replace_tag_src, new_html)

# (5) Unified Head Injection (injected after URL rewrites so canonical/hreflang stay intact)
head_idx = new_html.find('</head>')
if head_idx != -1:
    new_html = new_html[:head_idx] + '\n' + extra_head + new_html[head_idx:]
# -------------------------------------------------------------
# 5.1 Inject Modern Backend Client Adapter Script
# -------------------------------------------------------------
modern_adapter_script = """
<script id="whitestyle-modern-backend-adapter">
(function() {
  // 1. Phone number auto-hyphenation
  document.addEventListener('input', function(e) {
    var target = e.target;
    if (target && (
      (target.name && target.name.indexOf('tel') !== -1) || 
      (target.placeholder && target.placeholder.indexOf('연락처') !== -1) ||
      (target.className && target.className.indexOf('tel') !== -1)
    )) {
      var val = target.value.replace(/[^0-9]/g, '');
      if (val.length < 4) {
        target.value = val;
      } else if (val.length < 8) {
        target.value = val.substring(0, 3) + '-' + val.substring(3);
      } else if (val.length < 11) {
        target.value = val.substring(0, 3) + '-' + val.substring(3, 7) + '-' + val.substring(7);
      } else {
        target.value = val.substring(0, 3) + '-' + val.substring(3, 7) + '-' + val.substring(7, 11);
      }
    }
  });

  // 2. Modern Privacy Policy Modal
  function showModernPrivacyModal() {
    var existing = document.getElementById('whitestyle-privacy-modal-overlay');
    if (existing) { existing.remove(); }

    var modal = document.createElement('div');
    modal.id = 'whitestyle-privacy-modal-overlay';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.65); backdrop-filter:blur(6px); z-index:1000000000; display:flex; align-items:center; justify-content:center; padding:16px; font-family:-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif;';
    modal.innerHTML = `
      <div style="background:#ffffff; width:100%; max-width:680px; max-height:85vh; border-radius:20px; box-shadow:0 25px 60px rgba(0,0,0,0.35); overflow:hidden; display:flex; flex-direction:column;">
        <div style="padding:22px 28px; background:#0f172a; color:#ffffff; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:22px;">🛡️</span>
            <h3 style="margin:0; font-size:18px; font-weight:800; color:#ffffff; letter-spacing:-0.02em;">화이트스타일치과의원 개인정보취급방침</h3>
          </div>
          <button id="close-privacy-btn" type="button" style="background:transparent; border:none; color:#94a3b8; font-size:28px; cursor:pointer; line-height:1; padding:0 8px;">&times;</button>
        </div>
        <div style="padding:28px; overflow-y:auto; line-height:1.75; font-size:14px; color:#334155; flex:1;">
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
          <p style="margin:0; color:#475569;">이용자는 언제든지 등록된 본인의 개인정보 열람, 정정 및 삭제를 요청할 수 있으며, 병원 대표번호(02-569-7528)로 문의하시면 즉시 조치하겠습니다.</p>
        </div>
        <div style="padding:18px 28px; background:#f8fafc; border-top:1px solid #e2e8f0; display:flex; justify-content:flex-end; gap:12px;">
          <button id="agree-privacy-btn" type="button" style="background:#2563eb; color:#ffffff; border:none; padding:12px 28px; border-radius:10px; font-size:15px; font-weight:700; cursor:pointer; box-shadow:0 4px 14px rgba(37,99,235,0.35);">
            동의 및 확인 완료
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    var closeModal = function() {
      modal.remove();
    };

    document.getElementById('close-privacy-btn').addEventListener('click', closeModal);
    document.getElementById('agree-privacy-btn').addEventListener('click', function() {
      var chk = document.getElementById('agree_pb');
      if (chk) {
        chk.checked = true;
        var icon = document.querySelector('.chkbtn');
        if (icon) {
          icon.textContent = 'check_circle';
          icon.style.color = '#3b82f6';
        }
      }
      closeModal();
    });

    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // 2.1 Floating bar styling fix to prevent background text bleed-through and z-index overlap
  var styleTag = document.createElement('style');
  styleTag.textContent = `
    .layout_bottom_q_wrap, .layout_bottom_q_container, #25c77498d12ad9fe80a1bffce2a3ec49 {
      position: relative !important;
      z-index: 999999999 !important;
    }
    #container_25c77498d12ad9fe80a1bffce2a3ec49 {
      position: fixed !important;
      left: 0px !important;
      bottom: 0px !important;
      width: 100% !important;
      z-index: 999999999 !important;
      background-color: rgba(30, 41, 59, 0.98) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      box-shadow: 0 -4px 25px rgba(0, 0, 0, 0.45) !important;
      border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
      pointer-events: auto !important;
    }
    #wrap_25c77498d12ad9fe80a1bffce2a3ec49 {
      position: relative !important;
      z-index: 999999999 !important;
      pointer-events: auto !important;
    }
    #form_25c77498d12ad9fe80a1bffce2a3ec49 input[type="text"] {
      background-color: #ffffff !important;
      color: #0f172a !important;
      font-weight: 600 !important;
      border-radius: 8px !important;
      border: 1px solid #cbd5e1 !important;
      padding: 8px 12px !important;
      pointer-events: auto !important;
      position: relative !important;
      z-index: 999999999 !important;
    }
    #get_db_pva {
      cursor: pointer !important;
      user-select: none !important;
      pointer-events: auto !important;
      position: relative !important;
      z-index: 999999999 !important;
    }
    #get_db_pva span.chkbtn {
      transition: all 0.2s ease !important;
    }
    #submitbtn_25c77498d12ad9fe80a1bffce2a3ec49 {
      cursor: pointer !important;
      pointer-events: auto !important;
      position: relative !important;
      z-index: 999999999 !important;
    }
  `;
  document.head.appendChild(styleTag);

  // Initialize agreement checkbox to checked by default
  function initAgreeState() {
    var chk = document.getElementById('agree_pb');
    var icon = document.querySelector('#get_db_pva .chkbtn');
    if (chk && icon) {
      chk.checked = true;
      icon.textContent = 'check_circle';
      icon.style.color = '#ff557a';
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgreeState);
  } else {
    initAgreeState();
  }

  // Intercept Privacy Button clicks & Agreement Checkbox clicks in capturing phase
  document.addEventListener('click', function(e) {
    var target = e.target;
    var privacyBtn = target.closest('#documentcall_privacy') || target.closest('a[href*="privacy"]');
    if (privacyBtn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showModernPrivacyModal();
      return false;
    }

    // Toggle agree checkbox when clicking anywhere inside #get_db_pva
    var pvaTarget = target.closest('#get_db_pva');
    if (pvaTarget) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var chk = document.getElementById('agree_pb');
      var icon = pvaTarget.querySelector('.chkbtn');
      if (chk) {
        chk.checked = !chk.checked;
        if (icon) {
          icon.textContent = chk.checked ? 'check_circle' : 'radio_button_unchecked';
          icon.style.color = chk.checked ? '#ff557a' : '#ffffff';
        }
      }
      return false;
    }
  }, true);

  // 3. Intercept Quick Consultation Submission in capturing phase
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('#submitbtn_25c77498d12ad9fe80a1bffce2a3ec49') || e.target.closest('.dbsubmitbtn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Find inputs in form container
    var container = document.getElementById('form_25c77498d12ad9fe80a1bffce2a3ec49') || document.body;
    var nameInput = container.querySelector('input[name*="name"]') || container.querySelector('input[placeholder*="이름"]') || container.querySelector('input[type="text"]');
    var telInput = container.querySelector('input[name*="hp"]') || container.querySelector('input[name*="tel"]') || container.querySelector('input[placeholder*="연락처"]');

    var nameVal = nameInput ? nameInput.value.trim() : '';
    var telVal = telInput ? telInput.value.trim() : '';

    if (!nameVal) {
      alert('성함(이름)을 입력해 주세요.');
      if (nameInput) nameInput.focus();
      return false;
    }

    if (!telVal || telVal.replace(/[^0-9]/g, '').length < 8) {
      alert('연락처(휴대폰 번호)를 정확히 입력해 주세요.');
      if (telInput) telInput.focus();
      return false;
    }

    // Check agreement
    var agreeChk = document.getElementById('agree_pb');
    if (agreeChk && !agreeChk.checked) {
      if (confirm('화이트스타일치과 빠른 상담 신청을 위해 개인정보 수집 및 이용에 동의하시겠습니까?')) {
        agreeChk.checked = true;
        var icon = document.querySelector('#get_db_pva .chkbtn');
        if (icon) {
          icon.textContent = 'check_circle';
          icon.style.color = '#ff557a';
        }
      } else {
        return false;
      }
    }

    // Submit loading state
    var originalText = btn.innerHTML;
    btn.innerHTML = '<span class="submittext fs1_2rem fcWhite nxgl1_B">접수 중...</span>';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    // Submit to modern API
    fetch('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameVal,
        phone: telVal,
        treatment: '빠른상담신청',
        agreedPrivacy: true,
        agreedSensitive: true,
        source: 'quick_bar'
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      btn.innerHTML = originalText;
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';

      if (data.success) {
        alert('화이트스타일치과 빠른상담 신청이 정상 접수되었습니다.\\n전문 상담 실장이 신속히 연락드리겠습니다.');
        if (nameInput) nameInput.value = '';
        if (telInput) telInput.value = '';
      } else {
        alert(data.message || '상담 신청 중 오류가 발생하였습니다.');
      }
    })
    .catch(function(err) {
      console.error('Submission error:', err);
      // Fallback to legacy compatibility endpoint
      fetch('/_mir.do.sqlexec.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          node: 'mir_processing',
          mode: 'save_append',
          arrset: {
            secuarr2: JSON.stringify([{ dbinfoAry: [{ name: 'name', value: nameVal }, { name: 'hpnum', value: telVal }] }])
          }
        })
      }).then(function() {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
        alert('화이트스타일치과 빠른상담 신청이 정상 접수되었습니다.\\n전문 상담 실장이 신속히 연락드리겠습니다.');
        if (nameInput) nameInput.value = '';
        if (telInput) telInput.value = '';
      });
    });

    return false;
  }, true);
})();
</script>
"""

if '</body>' in new_html:
    new_html = new_html.replace('</body>', modern_adapter_script + '\n</body>')
else:
    new_html += modern_adapter_script

# -------------------------------------------------------------
# 5.5 Sanitize '후기' -> '문의' for public compliance (Medical Law)
# -------------------------------------------------------------
new_html = new_html.replace('커뮤니티/후기', '커뮤니티/문의')
new_html = new_html.replace('자필후기', '자필문의')
new_html = new_html.replace('"최근 후기"', '"최근 문의"')
new_html = new_html.replace('기분 좋은 후기', '기분 좋은 말씀')
new_html = new_html.replace('따뜻한 후기', '따뜻한 말씀')
new_html = new_html.replace('정성스러운 후기', '정성스러운 말씀')
new_html = new_html.replace('후기를 남겨주셔서', '의견을 남겨주셔서')

# -------------------------------------------------------------
# 5.6 Inject Latest Notice (#32596) in Main Notice Widget & Add Park Sung-tae Waiting Room Art Gallery Section
# -------------------------------------------------------------
old_notice_block = (
    '<div class="content_455546_8_24_22_ez_widget_board_list disFlex gap10 flex_column">'
    '<a href="/board/notice/32557" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5" '
    'onclick="ga(\'send\', \'event\', \'whitestyle.com/bbs/board.php?bo_table=notice&amp;wr_id=32557\', \'뉴이지 게시판 위젯 클릭\', \'\');">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[공지] 비급여 수가표</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.10.14</div></a>'
    '<a href="/bbs/board.php?bo_table=notice&amp;wr_id=32143" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5" '
    'onclick="ga(\'send\', \'event\', \'whitestyle.com/bbs/board.php?bo_table=notice&amp;wr_id=32143\', \'뉴이지 게시판 위젯 클릭\', \'\');">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">나의 치아건강을 지켜라!! 알파버전이 출시!</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">25.12.28</div></a>'
)

new_notice_block = (
    '<div class="content_455546_8_24_22_ez_widget_board_list disFlex gap10 flex_column">'
    '<a href="/board/notice/32596" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[공지] 박성태 화백 기증 철망 회화 전시 및 구입 문의</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.11.16</div></a>'
    '<a href="/board/notice/32595" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[언론보도] 구강건강 치료 확대와 정기검진 중요성 강조</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.11.15</div></a>'
    '<a href="/board/notice/32557" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[공지] 비급여 수가표</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.10.14</div></a>'
)

if old_notice_block in new_html:
    new_html = new_html.replace(old_notice_block, new_notice_block, 1)
    print("Updated main notice widget with 32596 & 32595.")

park_section_html = """
<section id="ws-park-sung-tae-gallery" style="background:#f8fafc;padding:72px 20px;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;font-family:'Pretendard','Malgun Gothic',sans-serif;word-break:keep-all;overflow-wrap:break-word;">
  <style>
    #ws-park-sung-tae-gallery * { box-sizing: border-box; word-break: keep-all; overflow-wrap: break-word; }
    .ws-pst-wrap { max-width: 1200px; margin: 0 auto; }
    .ws-pst-card { background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:40px 36px; box-shadow:0 12px 32px rgba(15,23,42,0.06); }
    .ws-pst-grid { display:flex; flex-wrap:wrap; gap:36px; align-items:center; }
    .ws-pst-left { flex:1 1 520px; min-width:280px; }
    .ws-pst-right { flex:1 1 440px; min-width:280px; display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; }
    .ws-pst-badge { display:inline-block; background:#eff6ff; color:#1d4ed8; border:1px solid #dbeafe; border-radius:999px; padding:6px 14px; font-size:12px; font-weight:800; letter-spacing:0.08em; margin-bottom:16px; }
    .ws-pst-title { font-size:32px; font-weight:900; color:#0f172a; line-height:1.35; margin:0 0 18px 0; }
    .ws-pst-lead { font-size:16px; color:#334155; line-height:1.95; margin:0 0 18px 0; }
    .ws-pst-notice { background:#fffbeb; border:1px solid #fcd34d; border-left:4px solid #b45309; border-radius:14px; padding:18px 20px; margin:20px 0 24px 0; }
    .ws-pst-notice-head { font-size:13px; font-weight:800; color:#92400e; margin-bottom:6px; }
    .ws-pst-notice-body { font-size:15px; font-weight:700; color:#1e293b; line-height:1.85; margin:0; }
    .ws-pst-btns { display:flex; flex-wrap:wrap; gap:12px; }
    .ws-pst-btn-primary { display:inline-block; background:#0f294a; color:#ffffff !important; padding:13px 22px; border-radius:12px; font-size:14px; font-weight:800; text-decoration:none; }
    .ws-pst-btn-secondary { display:inline-block; background:#f1f5f9; color:#0f172a !important; border:1px solid #cbd5e1; padding:13px 22px; border-radius:12px; font-size:14px; font-weight:800; text-decoration:none; }
    .ws-pst-imgbox { border-radius:16px; overflow:hidden; aspect-ratio:4/3; background:#e2e8f0; border:1px solid #e2e8f0; }
    .ws-pst-imgbox.wide { grid-column: span 2; aspect-ratio:16/9; }
    .ws-pst-imgbox img { width:100%; height:100%; object-fit:cover; display:block; }
    @media (max-width: 768px) {
      .ws-pst-card { padding:26px 20px; }
      .ws-pst-title { font-size:24px; }
    }
  </style>
  <div class="ws-pst-wrap">
    <div class="ws-pst-card">
      <div class="ws-pst-grid">
        <div class="ws-pst-left">
          <span class="ws-pst-badge">ART IN CLINIC · 박성태 화백 기증 대기실 갤러리</span>
          <h2 class="ws-pst-title">
            20년이 넘도록 편하게 쓰신 임플란트 인연,<br>
            <span style="color:#1d4ed8;">박성태 화백이 꾸며 준 화이트스타일치과 대기실</span>
          </h2>
          <p class="ws-pst-lead">
            대한민국 설치미술과 철망 회화의 거장 <strong>박성태 화백</strong>께서는 화이트스타일치과의원에서 식립받으신 임플란트를
            <strong>20년이 넘도록 내 치아처럼 너무나 편안하게 잘 사용하고 계신 것에 대한 깊은 감사와 신뢰</strong>로,
            대표작 〈천마도〉와 〈행차도〉의 초기 원형인 말(馬) 연작 세 폭을 본원 대기실에 직접 기증해 주셨습니다.
          </p>
          <div class="ws-pst-notice">
            <div class="ws-pst-notice-head">작품 소유권 및 구입 문의 공식 공지</div>
            <p class="ws-pst-notice-body">
              대기실에 전시된 박성태 화백의 작품은 <strong>화이트스타일치과 소유</strong>입니다.<br>
              작품 구입을 원하시는 분께서는 화이트스타일치과(대표전화 1577-7287 / 02-569-7528)로 문의해 주시기 바랍니다.
            </p>
          </div>
          <div class="ws-pst-btns">
            <a href="/about/tour" class="ws-pst-btn-primary">대기실 갤러리 13점 전체 보기 &rarr;</a>
            <a href="/board/notice/32596" class="ws-pst-btn-secondary">[공지] 기증 스토리 및 구입 문의 안내 &rarr;</a>
          </div>
        </div>
        <div class="ws-pst-right">
          <div class="ws-pst-imgbox wide">
            <img src="/images/park-sung-tae/KakaoTalk_20260512_163602653.jpg" alt="화이트스타일치과 대기실 박성태 화백 기증 철망 회화 전경" loading="lazy" />
          </div>
          <div class="ws-pst-imgbox">
            <img src="/images/park-sung-tae/KakaoTalk_20260512_163602653_01.jpg" alt="박성태 화백 철망 회화 말 연작 세부" loading="lazy" />
          </div>
          <div class="ws-pst-imgbox">
            <img src="/images/park-sung-tae/KakaoTalk_20260512_163602653_07.jpg" alt="박성태 화백과 김준헌 병원장 작품 설치 및 기증 현장" loading="lazy" />
          </div>
          <div class="ws-pst-imgbox">
            <img src="/images/park-sung-tae/KakaoTalk_20260512_163602653_08.jpg" alt="박성태 화백 기증 작품 인도 장면" loading="lazy" />
          </div>
          <div class="ws-pst-imgbox">
            <img src="/images/park-sung-tae/KakaoTalk_20260512_163602653_12.jpg" alt="화이트스타일치과 진료실 복도 전시 전경" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
"""

quick_anchor = '<div id="mir_quick_menu_line"></div>'
if quick_anchor in new_html:
    new_html = new_html.replace(quick_anchor, park_section_html + '\n' + quick_anchor, 1)
    print("Injected Park Sung-tae waiting room gallery section before quick menu.")
else:
    print("WARNING: quick_anchor not found!")

# -------------------------------------------------------------
# 6. Save Targets
# -------------------------------------------------------------
for p in ['e:/antigravity/whitestyle-copy/processed_page.html', 
          'e:/antigravity/whitestyle-copy/public/processed_page.html',
          'e:/antigravity/whitestyle-copy/public/index.html']:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(new_html)

print("Saved all HTML targets successfully! Size:", len(new_html))
