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
# 3. Add Schema & Head Injections
# -------------------------------------------------------------
enhanced_schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": "https://whitestyle.com/#dentist",
      "name": "화이트스타일치과의원 (WhiteStyle Dental Clinic)",
      "alternateName": ["강남 화이트스타일치과", "WhiteStyle Dental", "WHINISH Dental Clinic"],
      "url": "https://whitestyle.com",
      "logo": "https://whitestyle.com/images/병원-로고.png",
      "image": "https://whitestyle.com/images/og-image.jpg",
      "description": "강남역 11번·12번 출구 도보 2분(143m), 30년 전통 6만 환자가 선택한 서울대 치의학 박사 김준헌 대표원장 직진료. 고난도 뼈이식 임플란트, 무삭제 라미네이트(휘니쉬), 인비절라인 치아교정, 원데이 치아미백.",
      "telephone": "02-569-7528",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "강남대로 92길 17 대승빌딩 1,2층",
        "addressLocality": "강남구",
        "addressRegion": "서울특별시",
        "postalCode": "06129",
        "addressCountry": "KR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.4994,
        "longitude": 127.0276
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+82-2-569-7528",
          "contactType": "customer service",
          "availableLanguage": ["Korean", "Japanese", "English"]
        }
      ],
      "medicalSpecialty": [
        "http://en.wikipedia.org/wiki/Orthodontics",
        "http://en.wikipedia.org/wiki/Cosmetic_dentistry",
        "http://en.wikipedia.org/wiki/Dental_implant",
        "http://en.wikipedia.org/wiki/Prosthodontics"
      ],
      "founder": {
        "@id": "https://whitestyle.com/#doctor"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "62000",
        "bestRating": "5"
      },
      "sameAs": [
        "https://www.whinish.com",
        "https://map.naver.com/v5/search/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC",
        "https://pf.kakao.com/_Vtxdwl",
        "https://booking.naver.com/booking/13/bizes/265482",
        "https://youtu.be/PioB4UzBSLY"
      ]
    },
    {
      "@type": "Physician",
      "@id": "https://whitestyle.com/#doctor",
      "name": "김준헌",
      "jobTitle": "화이트스타일치과의원 병원장 / 치의학 박사",
      "worksFor": {
        "@id": "https://whitestyle.com/#dentist"
      },
      "alumniOf": [
        "서울대학교 치과대학",
        "단국대학교 대학원 치의학박사 (치과교정학)"
      ],
      "description": "35년 임상경력, 60,000명 이상의 환자를 성공적으로 치료한 치과교정학 및 임플란트 권위자. MBC 뉴스데스크 메인 방송 출연 및 기획재정부 장관상 수상.",
      "award": [
        "기획재정부 장관상",
        "국민건강보험공단 구강검진 최고 S등급",
        "모범납세자상"
      ],
      "sameAs": "https://www.whinish.com"
    },
    {
      "@type": "FAQPage",
      "@id": "https://whitestyle.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "강남역 화이트스타일치과의 주요 전문 진료 분야는 무엇인가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "화이트스타일치과는 35년 경력의 서울대 출신 김준헌 대표원장이 직접 진료하며, 고난도 뼈이식 임플란트, 무삭제 라미네이트(휘니쉬 WHINISH), 인비절라인 치아교정, 원데이 전문가 치아미백, 턱관절 치료를 중점 진료합니다."
          }
        },
        {
          "@type": "Question",
          "name": "치아를 깎지 않는 무삭제 라미네이트(휘니쉬) 시술이 가능한가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "네, 자연치아를 거의 삭제하지 않거나 0.1~0.2mm 초극미세 수준으로 다듬어 치아 손상과 시림 부작용 없이 영구적이고 자연스러운 미소를 완성하는 특화 라미네이트 시술을 진행합니다."
          }
        },
        {
          "@type": "Question",
          "name": "고령자나 잇몸뼈가 부족한 경우에도 임플란트가 가능한가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "3D CT 정밀 진단과 자가골/동종골 뼈이식 테크닉을 결합하여, 잇몸뼈가 심하게 소실된 고난도 케이스나 무치악 전악 임플란트도 안전하게 식립 가능합니다."
          }
        },
        {
          "@type": "Question",
          "name": "치과 위치와 주차 지원은 어떻게 되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "2호선·신분당선 강남역 11번 또는 12번 출구에서 도보 2분(143m) 거리 대승빌딩 1,2층에 위치하며, 내원 환자분들을 위한 무료 주차(비전타워 주차장)를 전액 지원합니다."
          }
        }
      ]
    }
  ]
}

schema_str = json.dumps(enhanced_schema, ensure_ascii=False, indent=2)

extra_head = (
    '<link rel="llms-txt" href="/llms.txt" title="LLMs Summary for AI Agents" />\n'
    '<script type="application/ld+json">\n' + schema_str + '\n</script>\n'
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

head_idx = new_html.find('</head>')
new_html = new_html[:head_idx] + extra_head + new_html[head_idx:]

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
}

BOARD_MAP = {
    'notice': '/board/notice',
    'report': '/board/report',
    'review': '/board/review',
    'withstar': '/board/withstar',
    'online': '/consult',                         # 온라인상담
}

FALLBACK_DOMAIN = 'https://whitestyle.com'

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
        if parsed.netloc and parsed.netloc not in ('whitestyle.com', 'www.whitestyle.com'):
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
            if wr_id and bo_table != 'online':
                return f"{base_route}/{wr_id}"
            return base_route
        if bo_table == 'open_price':
            return f"{FALLBACK_DOMAIN}/bbs/board.php?bo_table=open_price"

    # 5. 이용약관 및 개인정보보호
    if 'privacy' in qs or path == '/privacy':
        return f"{FALLBACK_DOMAIN}{path}?{query}" if query else f"{FALLBACK_DOMAIN}{path}"

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
    if path.startswith(('/videos/', 'http://', 'https://', '//', 'data:')):
        return f'src={quote}{path}{quote}'
    return f'src={quote}{FALLBACK_DOMAIN}{path}{quote}'

new_html = re.sub(r'(?<=\s)src=(["\'])(/[^"\']*?)\1', replace_tag_src, new_html)

# (5) CSS url() 치환
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
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.65); backdrop-filter:blur(6px); z-index:99999999; display:flex; align-items:center; justify-content:center; padding:16px; font-family:-apple-system, BlinkMacSystemFont, "Pretendard", sans-serif;';
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

  // Intercept Privacy Button clicks in capturing phase (runs before legacy jQuery)
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

    // Toggle agree checkbox when clicking label or icon
    if (target.matches('label[for="agree_pb"]') || target.matches('.chkbtn')) {
      var chk = document.getElementById('agree_pb');
      if (chk) {
        chk.checked = !chk.checked;
        var icon = document.querySelector('.chkbtn');
        if (icon) {
          icon.textContent = chk.checked ? 'check_circle' : 'radio_button_unchecked';
          icon.style.color = chk.checked ? '#3b82f6' : '#ffffff';
        }
      }
    }
  }, true);

  // 3. Intercept Quick Consultation Submission in capturing phase
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('#submitbtn_25c77498d12ad9fe80a1bffce2a3ec49') || e.target.closest('.dbsubmitbtn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Check agreement
    var agreeChk = document.getElementById('agree_pb');
    if (agreeChk && !agreeChk.checked) {
      alert('개인정보 수집 및 이용에 동의해 주셔야 상담 신청이 가능합니다.');
      agreeChk.focus();
      return false;
    }

    // Find inputs in form container
    var container = document.getElementById('form_25c77498d12ad9fe80a1bffce2a3ec49') || document.body;
    var nameInput = container.querySelector('input[name*="name"]') || container.querySelector('input[placeholder*="성함"]') || container.querySelector('input[type="text"]');
    var telInput = container.querySelector('input[name*="tel"]') || container.querySelector('input[placeholder*="연락처"]');

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
            secuarr2: JSON.stringify([{ dbinfoAry: [{ name: 'name', value: nameVal }, { name: 'tel', value: telVal }] }])
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
# 6. Save Targets
# -------------------------------------------------------------
for p in ['e:/antigravity/whitestyle-copy/processed_page.html', 
          'e:/antigravity/whitestyle-copy/public/processed_page.html',
          'e:/antigravity/whitestyle-copy/public/index.html']:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(new_html)

print("Saved all HTML targets successfully! Size:", len(new_html))
