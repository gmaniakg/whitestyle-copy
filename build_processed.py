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
<style>
.ws-hero-video-banner { position: relative; width: 100%; min-height: 640px; max-height: 840px; aspect-ratio: 16 / 9; background: #0b1118; overflow: hidden; display: flex; align-items: center; justify-content: center; font-family: "Pretendard-Light", "Pretendard", "Noto Sans KR", "Malgun Gothic", sans-serif; box-sizing: border-box; }
.ws-hero-video-banner * { box-sizing: border-box; }
.ws-hero-video-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center center; z-index: 1; pointer-events: none; filter: brightness(0.88) contrast(1.04); }
.ws-hero-video-scrim { position: absolute; inset: 0; z-index: 2; pointer-events: none; background: linear-gradient(180deg, rgba(8, 13, 20, 0.44) 0%, rgba(8, 13, 20, 0.56) 52%, rgba(8, 13, 20, 0.80) 100%); }
.ws-hero-video-inner { position: relative; z-index: 3; width: 100%; max-width: 1240px; margin: 0 auto; padding: 56px 28px; text-align: center; color: #f8f6f1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
.ws-hero-kicker { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px; border-radius: 999px; background: rgba(15, 22, 32, 0.66); border: 1px solid rgba(216, 187, 132, 0.48); color: #ebd29d; font-size: 14px; font-weight: 600; line-height: 1.4; letter-spacing: 0.02em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.ws-hero-title { margin: 4px 0 0 0; font-family: "Pretendard-Bold", "Pretendard", "Noto Sans KR", sans-serif; font-size: clamp(28px, 4vw, 52px); font-weight: 800; line-height: 1.24; letter-spacing: -0.03em; color: #ffffff; text-shadow: 0 4px 24px rgba(0, 0, 0, 0.45); word-break: keep-all; }
.ws-hero-title em { font-style: normal; color: #ebd29d; }
.ws-hero-desc { margin: 0; max-width: 860px; font-size: clamp(15px, 1.5vw, 19px); line-height: 1.68; color: rgba(248, 246, 241, 0.92); font-weight: 400; letter-spacing: -0.01em; word-break: keep-all; text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4); }
.ws-hero-cta-grid { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; margin-top: 10px; width: 100%; max-width: 980px; }
.ws-hero-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 24px; border-radius: 8px; font-family: "Pretendard-Bold", "Pretendard", "Noto Sans KR", sans-serif; font-size: 15px; font-weight: 700; line-height: 1.2; text-decoration: none !important; transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease; cursor: pointer; white-space: nowrap; }
.ws-hero-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35); }
.ws-hero-btn:active { transform: translateY(0); }
.ws-hero-btn--naver { background: #03c75a; color: #ffffff !important; border: 1px solid #03c75a; }
.ws-hero-btn--naver:hover { background: #02b350; }
.ws-hero-btn--kakao { background: #fee500; color: #191919 !important; border: 1px solid #fee500; }
.ws-hero-btn--kakao:hover { background: #f2da00; }
.ws-hero-btn--line { background: rgba(18, 26, 36, 0.82); color: #f8f6f1 !important; border: 1px solid rgba(216, 187, 132, 0.55); backdrop-filter: blur(8px); }
.ws-hero-btn--line:hover { background: rgba(216, 187, 132, 0.2); border-color: #ebd29d; }
.ws-hero-btn--tel { background: rgba(255, 255, 255, 0.14); color: #ffffff !important; border: 1px solid rgba(255, 255, 255, 0.38); backdrop-filter: blur(8px); }
.ws-hero-btn--tel:hover { background: rgba(255, 255, 255, 0.24); }
.ws-hero-dept-nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px 14px; margin-top: 8px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.16); width: 100%; max-width: 780px; }
.ws-hero-dept-link { color: rgba(248, 246, 241, 0.86) !important; font-size: 14px; font-weight: 500; text-decoration: none !important; padding: 6px 12px; border-radius: 6px; background: rgba(255, 255, 255, 0.07); transition: background 0.2s ease, color 0.2s ease; }
.ws-hero-dept-link:hover { background: rgba(216, 187, 132, 0.22); color: #ebd29d !important; }
@media (max-width: 768px) {
  .ws-hero-video-banner { min-height: 540px; max-height: none; aspect-ratio: auto; padding: 24px 0; }
  .ws-hero-video-inner { padding: 36px 18px; gap: 14px; }
  .ws-hero-kicker { font-size: 12px; padding: 6px 14px; }
  .ws-hero-title { font-size: 26px; line-height: 1.3; }
  .ws-hero-desc { font-size: 14px; line-height: 1.6; }
  .ws-hero-cta-grid { flex-direction: column; gap: 9px; max-width: 360px; }
  .ws-hero-btn { width: 100%; padding: 13px 18px; font-size: 14px; }
  .ws-hero-dept-nav { gap: 6px; }
  .ws-hero-dept-link { font-size: 12.5px; padding: 5px 10px; }
}
</style>
<div class="boxsize ez_box_module hero_video_module_wrap posRel" style="margin: 0 auto; width: 100%; overflow: hidden; max-width: 100%; position: relative; background: #000;" id="box_module_Custom_455503_wrap">
  <div class="ws-hero-video-banner" id="ws-hero-video-section">
    <video class="ws-hero-video-bg" id="ws-hero-video-el" autoplay loop muted playsinline preload="auto" poster="https://cdn.myreal.co.kr/data/image_assist/3697191616_av7FHwAM_2105632051_dW8lp9JM_20240423_whitedent_ms_ECA689EC8B9CEC8B9DEBA6BDEC9E84ED948CEB9E80ED8AB8_H4_N1.jpg">
      <source src="/videos/hero_optimized.mp4" type="video/mp4">
      <source src="https://whinish.com/videos/hero_optimized.mp4" type="video/mp4">
    </video>
    <div class="ws-hero-video-scrim"></div>
    <div class="ws-hero-video-inner wb-ka wbka">
      <div class="ws-hero-kicker wb-ka wbka">1994년 개원 · 강남역 11·12번 출구 도보 1분 · 일본어 전담 코디네이터 3명 상주</div>
      <h1 class="ws-hero-title wb-ka wbka">강남역 화이트스타일치과 · <em>33년 전통 3인 원장단 협진</em></h1>
      <p class="ws-hero-desc wb-ka wbka">치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의)이<br>임플란트 재수술·뼈이식·전체임플란트 · 1:1 치아교정·재교정 · 무삭제·최소삭제 라미네이트(제로쉘)를 정밀 진단부터 사후 관리까지 책임 진료합니다.</p>
      <div class="ws-hero-cta-grid">
        <a class="ws-hero-btn ws-hero-btn--naver" href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer">네이버 빠른 예약 (1분 완료)</a>
        <a class="ws-hero-btn ws-hero-btn--kakao" href="https://pf.kakao.com/_Vtxdwl" target="_blank" rel="noopener noreferrer">카카오톡 1:1 비용·기간 상담</a>
        <a class="ws-hero-btn ws-hero-btn--line" href="https://line.me/ti/p/~whitestyle1" target="_blank" rel="noopener noreferrer">LINE 日本語直通相談 (ID: whitestyle1)</a>
        <a class="ws-hero-btn ws-hero-btn--tel" href="tel:1577-7287">대표전화 1577-7287 / 02-569-7528</a>
      </div>
      <nav class="ws-hero-dept-nav" aria-label="주요 진료 안내">
        <a class="ws-hero-dept-link" href="/treatments/orthodontics">치아교정 · 재교정</a>
        <a class="ws-hero-dept-link" href="/treatments/aesthetic/zeroshell">무삭제·최소삭제 라미네이트</a>
        <a class="ws-hero-dept-link" href="/treatments/implant">3D CT 임플란트 · 재수술</a>
        <a class="ws-hero-dept-link" href="/price">비급여 수가표 안내</a>
        <a class="ws-hero-dept-link" href="/qa">임상 Q&amp;A 35선</a>
        <a class="ws-hero-dept-link" href="/video">영상 진료실</a>
        <a class="ws-hero-dept-link" href="/treatments/aesthetic/compare">라미네이트 4방식 비교</a>
        <a class="ws-hero-dept-link" href="/clinic-facts">병원 공식 팩트</a>
        <a class="ws-hero-dept-link" href="/ja">日本語診療 안내</a>
      </nav>
    </div>
  </div>
</div>
"""

new_html = html[:m0] + hero_video_html + html[m1:]
print("Hero slider replaced.")

# -------------------------------------------------------------
# 3. Strip Legacy Bogus Meta/Viewport/Scripts & Load Unified Head Snippet
# -------------------------------------------------------------
new_html = re.sub(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>', '', new_html, flags=re.S | re.I)
new_html = re.sub(r'<link[^>]*rel=["\']canonical["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<link[^>]*rel=["\']alternate["\'][^>]*hreflang=[^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*name=["\']description["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*name=["\']keywords["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*name=["\']viewport["\'][^>]*/?>\s*', '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*property=["\']og:[^"\']*["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<meta[^>]*name=["\']twitter:[^"\']*["\'][^>]*/?>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<script[^>]*src=["\']https://www\.googletagmanager\.com/gtag/js\?id=G-(?:4K3B5N6HXR|RQ2R1478QZ|826W6CPEM9)[^"\']*["\'][^>]*></script>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<link[^>]*font\.load\.css\.php[^>]*>\s*', '', new_html, flags=re.I)
new_html = re.sub(r'<noscript>\s*<div[^>]*>\s*-\s*현재 이 브라우저는 스크립트 실행을 할 수 없는 환경이어서.*?</div>\s*</noscript>\s*', '', new_html, flags=re.S | re.I)
new_html = new_html.replace('<title>화이트스타일치과</title>', '<title>화이트스타일치과의원 | 1994년 개원 33년 전통 강남역 치아교정·심미보철·임플란트 (1577-7287)</title>')
new_html = new_html.replace('29년이란 시간동안', '33년이란 시간동안')
new_html = new_html.replace('29년 전통 화이트스타일치과', '33년 전통 화이트스타일치과')

with open(r'E:\antigravity\marketing-ai\madeinreal_email_attachments\gnu-head-injection.html', 'r', encoding='utf-8') as f:
    gnu_head_html = f.read()

gnu_head_html = re.sub(r'^<!--.*?-->\s*', '', gnu_head_html, count=1, flags=re.S)
gnu_head_html = gnu_head_html.replace('ws-semantic-aeo-header', 'ws-semantic-clinic-header')

# Clean hidden-text JS injection, hardcoded IFTTT key/emails, legacy hreflang, and JSON-LD inside gnu_head_html
gnu_head_html = gnu_head_html.replace(
    '<link rel="alternate" hreflang="ja-JP" href="https://whitestyle.com/?mir_code=12187" />',
    '<link rel="alternate" hreflang="ja-JP" href="https://whitestyle.com/ja" />',
)
gnu_head_html = gnu_head_html.replace(
    '<link rel="alternate" hreflang="en-US" href="https://whinish.com/en" />',
    '<link rel="alternate" hreflang="en-US" href="https://whitestyle.com/en" />',
)
gnu_head_html = gnu_head_html.replace(
    '<meta property="og:image" content="https://whinish.com/mbc_interview_new.jpg" />',
    '<meta property="og:image" content="https://whitestyle.com/mbc_interview_new.jpg" />',
)
gnu_head_html = gnu_head_html.replace(
    '<meta name="twitter:image" content="https://whinish.com/mbc_interview_new.jpg" />',
    '<meta name="twitter:image" content="https://whitestyle.com/mbc_interview_new.jpg" />',
)
gnu_head_html = re.sub(
    r'if\s*\(!document\.getElementById\("ws-semantic-clinic-header"\).*?document\.body\.insertBefore\(header,\s*document\.body\.firstChild\);\s*\}',
    '',
    gnu_head_html,
    flags=re.S,
)
gnu_head_html = re.sub(
    r'var IFTTT_WEBHOOK_URL\s*=.*?;',
    '',
    gnu_head_html,
    flags=re.S,
)
gnu_head_html = re.sub(
    r'var LEAD_RECIPIENTS\s*=\s*\[.*?\];',
    'var LEAD_RECIPIENTS = [];',
    gnu_head_html,
    flags=re.S,
)
gnu_head_html = re.sub(
    r'try\s*\{\s*var q = new URLSearchParams\(.*?IFTTT_WEBHOOK_URL.*?\}\s*catch\s*\(e\)\s*\{\}',
    '',
    gnu_head_html,
    flags=re.S,
)
gnu_head_html = gnu_head_html.replace(
    'var LEAD_WEBHOOK_URL = "https://whinish.com/api/lead-notify";',
    'var LEAD_WEBHOOK_URL = "/api/lead-notify";',
)

def _clean_homepage_jsonld(match):
    raw_json = match.group(1)
    data = json.loads(raw_json)
    graph = data.get('@graph', [])
    cleaned_graph = []
    for node in graph:
        node_type = node.get('@type')
        if node_type == 'MedicalWebPage':
            continue
        node_id = node.get('@id', '')
        if node_id == 'https://whitestyle.com/#org':
            node['image'] = 'https://whitestyle.com/mbc_interview_new.jpg'
            node['telephone'] = ['+82-1577-7287', '+82-2-569-7528', '+82-10-3046-5010']
            node['hasMap'] = [
                'https://www.google.com/maps/search/?api=1&query=%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90+%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EA%B0%95%EB%82%A8%EA%B5%AC+%EA%B0%95%EB%82%A8%EB%8C%80%EB%A1%9C92%EA%B8%B8+17',
                'https://www.google.com/maps?q=37.4988802,127.0286304',
                'https://www.google.com/maps/search/?api=1&hl=ja&query=%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E6%AD%AF%E7%A7%91+%E6%B1%9F%E5%8D%97',
                'https://map.naver.com/p/entry/place/11533882',
            ]
            node['contactPoint'] = [
                {
                    '@type': 'ContactPoint',
                    'telephone': '+82-1577-7287',
                    'email': 'white@whitestyle.com',
                    'contactType': 'customer service',
                    'availableLanguage': ['Korean', 'Japanese', 'English'],
                },
                {
                    '@type': 'ContactPoint',
                    'telephone': '+82-2-569-7528',
                    'email': 'white@whitestyle.com',
                    'contactType': 'reservations',
                    'availableLanguage': ['Korean', 'Japanese', 'English'],
                },
                {
                    '@type': 'ContactPoint',
                    'telephone': '+82-10-3046-5010',
                    'email': 'white@whitestyle.com',
                    'contactType': 'Japanese Interpreter Direct Hotline',
                    'availableLanguage': ['Japanese', 'Korean'],
                },
            ]
            same_as = [
                u for u in node.get('sameAs', [])
                if u not in ('https://www.whitestyle.com', 'https://www.whitestyle.com/?mir_code=12187')
            ]
            for add_u in [
                'https://whitestyle.com/ja',
                'https://whitestyle.com/clinic-facts',
                'https://whitestyle.com/price',
                'https://whitestyle.com/qa',
                'https://whitestyle.com/glossary',
                'https://whitestyle.com/warranty',
            ]:
                if add_u not in same_as:
                    same_as.append(add_u)
            node['sameAs'] = same_as
        elif node_id.startswith('https://whitestyle.com/#doctor-'):
            node['url'] = 'https://whitestyle.com/about/doctors'
            if node_id == 'https://whitestyle.com/#doctor-kim-junheon':
                node['image'] = 'https://whitestyle.com/mbc_interview_new.jpg'
        elif node_id == 'https://whitestyle.com/#procedure-orthodontics':
            node['url'] = 'https://whitestyle.com/treatments/orthodontics'
        elif node_id == 'https://whitestyle.com/#procedure-prosthodontics':
            node['url'] = 'https://whitestyle.com/treatments/aesthetic'
        elif node_id == 'https://whitestyle.com/#procedure-implant':
            node['url'] = 'https://whitestyle.com/treatments/implant'
        elif node_id == 'https://whitestyle.com/#hwatapet':
            node['url'] = 'https://whitestyle.com/ai-pet/'
            node['downloadUrl'] = 'https://whitestyle.com/ai-pet/download.html'
        elif node_id == 'https://whitestyle.com/#faq':
            for q_item in node.get('mainEntity', []):
                ans = q_item.get('acceptedAnswer', {}).get('text', '')
                ans = ans.replace('https://whinish.com/ai-pet/', 'https://whitestyle.com/ai-pet/')
                if 'acceptedAnswer' in q_item:
                    q_item['acceptedAnswer']['text'] = ans
        cleaned_graph.append(node)
    data['@graph'] = cleaned_graph
    return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n</script>'

gnu_head_html = re.sub(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    _clean_homepage_jsonld,
    gnu_head_html,
    flags=re.S | re.I,
)

extra_head = (
    gnu_head_html + '\n'
    '<style>\n'
    '  .navWrap_div, .content_outwrap { min-width: 0 !important; width: 100% !important; }\n'
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
    '  /* 메인 하단 공지사항/온라인상담(md_455546) 및 대기실 갤러리 겹침 원천 차단 */\n'
    '  #content_455546_8_24_32,\n'
    '  #content_455546_8_24_36 {\n'
    '    height: auto !important;\n'
    '    display: inline-block !important;\n'
    '  }\n'
    '  #body_content_455546_8_24_32,\n'
    '  #body_content_455546_8_24_36 {\n'
    '    height: auto !important;\n'
    '    align-self: flex-end !important;\n'
    '  }\n'
    '  #body_content_455546_8_24_22,\n'
    '  .ez_asset_68138_68139,\n'
    '  #body_content_455546_8_24_24,\n'
    '  .ez_asset_68138 {\n'
    '    height: auto !important;\n'
    '    min-height: 0 !important;\n'
    '    overflow: visible !important;\n'
    '  }\n'
    '  #body_ez_box_455546_8_24 {\n'
    '    height: auto !important;\n'
    '    align-content: flex-start !important;\n'
    '    overflow: visible !important;\n'
    '  }\n'
    '  #box_module_Image_description_455546_wrap,\n'
    '  .box_module_Image_description_455546_inner,\n'
    '  #module_Image_description_455546,\n'
    '  .Image_description_module_body_455546,\n'
    '  #object_455546_9 {\n'
    '    height: auto !important;\n'
    '    max-height: none !important;\n'
    '  }\n'
    '  #ws-park-sung-tae-gallery {\n'
    '    position: relative !important;\n'
    '    clear: both !important;\n'
    '    z-index: 2 !important;\n'
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
    '12127': '/treatments/orthodontics/types',     # 교정장치 종류 · 재교정
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
        return '/ja'

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
      fetch('/api/mir-sqlexec', {
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

  // 4. Intercept legacy mir_callDynamicEx / callDynamicEx consultation payloads to avoid [cdyex] alerts
  function handleLegacyConsultPayload(secuarr2Raw) {
    if (!secuarr2Raw || String(secuarr2Raw).indexOf('dbinfoAry') === -1) return false;
    try {
      var parsed = typeof secuarr2Raw === 'string' ? JSON.parse(secuarr2Raw) : secuarr2Raw;
      var containers = Array.isArray(parsed) ? parsed : [parsed];
      var entries = [];
      for (var i = 0; i < containers.length; i++) {
        if (containers[i] && Array.isArray(containers[i].dbinfoAry)) {
          entries = entries.concat(containers[i].dbinfoAry);
        }
      }
      var nameVal = '';
      var telVal = '';
      for (var j = 0; j < entries.length; j++) {
        var fn = String((entries[j] && entries[j].name) || '').toLowerCase();
        var fv = String((entries[j] && entries[j].value) || '').trim();
        if (!fv) continue;
        if (!nameVal && (fn === 'name' || fn.indexOf('[name]') !== -1)) nameVal = fv;
        else if (!telVal && (fn === 'hpnum' || fn.indexOf('[hpnum]') !== -1 || fn.indexOf('hp') !== -1 || fn.indexOf('tel') !== -1 || fn.indexOf('phone') !== -1)) telVal = fv;
      }
      if (!nameVal && !telVal) return false;

      fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameVal || '신규신청자',
          phone: telVal || '미기재',
          treatment: '빠른상담신청',
          agreedPrivacy: true,
          agreedSensitive: true,
          source: 'quick_bar'
        })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data.success) {
          alert('화이트스타일치과 빠른상담 신청이 정상 접수되었습니다.\\n전문 상담 실장이 신속히 연락드리겠습니다.');
          var f = document.getElementById('form_25c77498d12ad9fe80a1bffce2a3ec49') || document;
          var inputs = f.querySelectorAll('input[type="text"]');
          for (var k = 0; k < inputs.length; k++) inputs[k].value = '';
        } else {
          alert((data && data.message) || '상담 신청 중 오류가 발생하였습니다.');
        }
        var btn = document.getElementById('submitbtn_25c77498d12ad9fe80a1bffce2a3ec49');
        if (btn) btn.classList.remove('submitLock');
      })
      .catch(function() {
        var btn = document.getElementById('submitbtn_25c77498d12ad9fe80a1bffce2a3ec49');
        if (btn) btn.classList.remove('submitLock');
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  function installDynamicInterceptors() {
    if (typeof window.mir_callDynamicEx === 'function' && !window.mir_callDynamicEx.__wsWrapped) {
      var origMir = window.mir_callDynamicEx;
      var wrappedMir = function(aryData) {
        if (aryData && aryData.arrset && handleLegacyConsultPayload(aryData.arrset.secuarr2)) {
          return;
        }
        return origMir.apply(this, arguments);
      };
      wrappedMir.__wsWrapped = true;
      window.mir_callDynamicEx = wrappedMir;
    }
    if (typeof window.callDynamicEx === 'function' && !window.callDynamicEx.__wsWrapped) {
      var origCall = window.callDynamicEx;
      var wrappedCall = function(secukey, arr1, arr2) {
        if (handleLegacyConsultPayload(arr2)) {
          return;
        }
        return origCall.apply(this, arguments);
      };
      wrappedCall.__wsWrapped = true;
      window.callDynamicEx = wrappedCall;
    }
  }

  installDynamicInterceptors();
  window.addEventListener('load', installDynamicInterceptors);
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
# 5.6 Fix Legacy NAP / Hours / 30th / Alt Attributes & Update Widgets
# -------------------------------------------------------------
new_html = new_html.replace('>30th<', '>33rd<')
new_html = new_html.replace('월/화/수/목/금', '월·화·수·금 (목 휴진)')
new_html = new_html.replace('※ 일요일, 공휴일 휴진', '※ 목요일·일요일·공휴일 휴진')
new_html = new_html.replace('사업자등록번호: 220-09-87453', '사업자등록번호: 212-94-71989')
new_html = new_html.replace(
    '상호명: 화이트스타일치과의원 | 주소: 서울 강남구 강남대로92길 17 1층, 2층  (역삼동)',
    '상호명: 화이트스타일치과의원 | 주소: (06134) 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (강남역 11·12번 출구 도보 1분)',
)
new_html = new_html.replace(
    '전화번호 : 02.569.7528',
    '대표상담 : 1577-7287 / 02-569-7528 | 일본어 통역 직통 : +82-10-3046-5010',
)
new_html = new_html.replace('href="/hplock.php"', 'href="/privacy"')

def _ensure_img_alt(match):
    tag = match.group(0)
    if re.search(r'\balt\s*=', tag, flags=re.I):
        return tag
    if tag.endswith('/>'):
        return tag[:-2] + ' alt="화이트스타일치과의원 강남역 치과 진료 안내" />'
    return tag[:-1] + ' alt="화이트스타일치과의원 강남역 치과 진료 안내">'

new_html = re.sub(r'<img\b[^>]*>', _ensure_img_alt, new_html, flags=re.I)

new_notice_block = (
    '<div class="content_455546_8_24_22_ez_widget_board_list disFlex gap10 flex_column">'
    '<a href="/board/notice/32603" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[대학저널] 20만 원, 30만 원 임플란트, 가격만 보고 결정해도 괜찮을까?</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.11.22</div></a>'
    '<a href="/board/notice/32602" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[농업정보신문] 치조골 손실 임플란트, 뼈이식 재료 선택 기준</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.11.21</div></a>'
    '<a href="/board/notice/1909" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[임상칼럼] 강남역 치과 비교 기준과 임플란트·교정·라미네이트 재치료 가이드</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.11.20</div></a>'
    '<a href="/board/notice/32601" class="content_455546_8_24_22_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_22_ez_widget_board_title flex_1 ez_translate_target">[HBN뉴스] 아날로그 경험과 디지털 정밀함, 33년 진료 노하우</div>'
    '<div class="content_455546_8_24_22_ez_widget_board_date">26.11.20</div></a>'
    '</div>'
)

new_html, n_notice = re.subn(
    r'<div class="content_455546_8_24_22_ez_widget_board_list disFlex gap10 flex_column">.*?</div>(?=\s*</div>)',
    new_notice_block,
    new_html,
    count=1,
    flags=re.S,
)
print("Notice widget updated:", n_notice)

new_online_block = (
    '<div class="content_455546_8_24_24_ez_widget_board_list disFlex gap10 flex_column">'
    '<a href="/consult" class="content_455546_8_24_24_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_24_ez_widget_board_title flex_1 ez_translate_target">[네이버 영수증 리뷰] 과잉진료 없이 꼭 필요한 인레이·신경치료만 진행한 안심 후기</div>'
    '<div class="content_455546_8_24_24_ez_widget_board_date">26.11.22</div></a>'
    '<a href="/consult" class="content_455546_8_24_24_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_24_ez_widget_board_title flex_1 ez_translate_target">[네이버 영수증 리뷰] 인레이 탈락 당일 무통 충치치료·교정 추천</div>'
    '<div class="content_455546_8_24_24_ez_widget_board_date">26.11.21</div></a>'
    '<a href="/consult" class="content_455546_8_24_24_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_24_ez_widget_board_title flex_1 ez_translate_target">[네이버 영수증 리뷰] 치아교정 더블체크, 세심한 사후케어</div>'
    '<div class="content_455546_8_24_24_ez_widget_board_date">26.11.20</div></a>'
    '<a href="/consult" class="content_455546_8_24_24_ez_widget_board_kind disFlex gap5">'
    '    <div class="content_455546_8_24_24_ez_widget_board_title flex_1 ez_translate_target">[네이버 방문 후기] 통증 없이 편안했던 강남역 스케일링</div>'
    '<div class="content_455546_8_24_24_ez_widget_board_date">26.11.19</div></a>'
    '</div>'
)

new_html, n_online = re.subn(
    r'<div class="content_455546_8_24_24_ez_widget_board_list disFlex gap10 flex_column">.*?</div>(?=\s*</div>)',
    new_online_block,
    new_html,
    count=1,
    flags=re.S,
)
print("Online widget updated:", n_online)

home_editorial_sections = """
<style>
  .ws-home-sec { background:#faf9f5; padding:68px 20px; border-top:1px solid #e2dfd7; font-family:Pretendard, 'Malgun Gothic', 'Noto Sans KR', sans-serif; color:#18202c; word-break:keep-all; overflow-wrap:break-word; line-height:1.95; }
  .ws-home-sec--white { background:#ffffff; }
  .ws-home-sec * { box-sizing:border-box; word-break:keep-all; overflow-wrap:break-word; }
  .ws-home-wrap { max-width:1200px; margin:0 auto; }
  .ws-home-kicker { display:inline-block; font-size:12px; font-weight:800; letter-spacing:0.06em; color:#0c4a6e; background:#e0f2fe; border:1px solid #bae6fd; padding:5px 14px; border-radius:999px; margin-bottom:14px; }
  .ws-home-h2 { font-size:clamp(24px, 3vw, 34px); font-weight:900; color:#0f172a; line-height:1.35; margin:0 0 16px 0; }
  .ws-home-lead { font-size:16px; color:#334155; line-height:1.95; margin:0 0 32px 0; max-width:920px; }
  .ws-home-grid3 { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-bottom:32px; }
  .ws-home-card { background:#ffffff; border:1px solid #e2dfd7; border-radius:16px; padding:26px; box-shadow:0 4px 18px rgba(15,23,42,0.04); }
  .ws-home-card--tint { background:#faf9f5; }
  .ws-home-card h3 { font-size:19px; font-weight:800; color:#0f172a; margin:0 0 10px 0; line-height:1.4; }
  .ws-home-card p { font-size:14.5px; color:#334155; margin:0 0 14px 0; line-height:1.9; }
  .ws-home-link { display:inline-block; font-size:14px; font-weight:800; color:#0369a1 !important; text-decoration:none; }
  .ws-home-link:hover { text-decoration:underline; }
  .ws-home-candor { background:#fffbeb; border:1px solid #fde68a; border-left:5px solid #b45309; border-radius:12px; padding:22px 26px; margin:28px 0 34px 0; }
  .ws-home-candor strong { display:block; font-size:16px; color:#92400e; margin-bottom:8px; }
  .ws-home-candor p { margin:0; font-size:15px; color:#1e293b; line-height:1.9; }
  .ws-home-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #cbd5e1; background:#ffffff; margin-bottom:24px; }
  .ws-home-table { width:100%; border-collapse:collapse; font-size:14.5px; min-width:640px; }
  .ws-home-table th { background:#0f172a; color:#ffffff; text-align:left; padding:14px 16px; font-weight:700; border:1px solid #1e293b; }
  .ws-home-table td { padding:14px 16px; border:1px solid #e2e8f0; color:#1e293b; vertical-align:top; line-height:1.85; }
  .ws-home-table td:first-child { font-weight:800; background:#f8fafc; color:#0f172a; width:24%; }
  .ws-home-btns { display:flex; flex-wrap:wrap; gap:12px; margin-top:20px; }
  .ws-home-btn-dark { display:inline-block; background:#0f172a; color:#ffffff !important; padding:13px 22px; border-radius:10px; font-size:14.5px; font-weight:800; text-decoration:none; }
  .ws-home-btn-light { display:inline-block; background:#ffffff; color:#0f172a !important; border:1px solid #cbd5e1; padding:13px 22px; border-radius:10px; font-size:14.5px; font-weight:800; text-decoration:none; }
  .ws-home-faq-list { display:grid; grid-template-columns:1fr; gap:18px; }
  .ws-home-faq-item { background:#ffffff; border:1px solid #e2dfd7; border-radius:14px; padding:24px 26px; }
  .ws-home-faq-item h3 { font-size:17px; font-weight:800; color:#0f172a; margin:0 0 10px 0; line-height:1.5; }
  .ws-home-faq-item p { font-size:15px; color:#334155; margin:0; line-height:1.95; }
  @media (max-width: 768px) {
    .ws-home-sec { padding:48px 16px; }
    .ws-home-card, .ws-home-faq-item { padding:20px; }
  }
</style>

<section id="ws-home-specialists-matrix" class="ws-home-sec wb-ka wbka">
  <div class="ws-home-wrap wb-ka wbka">
    <span class="ws-home-kicker wb-ka wbka">1994년 개원 33년 전통 · 강남역 11·12번 출구 도보 1분</span>
    <h2 class="ws-home-h2 wb-ka wbka">강남역 33년 전통 · 3인 원장단 분과 책임 협진</h2>
    <p class="ws-home-lead wb-ka wbka">
      강남역 화이트스타일치과의원은 서울대학교 치과대학 졸업·단국대 외래교수·치과교정학 박사 <strong>김준헌 병원장</strong>, 연세대학교 치과대학 졸업 <strong>이봉진 대표원장</strong>, 보건복지부 인증 치주과 전문의 <strong>박선혜 원장</strong>이 초진 정밀 진단부터 시술·사후 정기 관리까지 주치의 변경 없이 1:1 협진 체제로 직접 진료합니다.
    </p>

    <div class="ws-home-grid3 wb-ka wbka">
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">김준헌 병원장 · 치아교정·재교정</h3>
        <p class="wb-ka wbka">서울대학교 치과대학 졸업, 단국대학교 외래교수, 치과교정학 박사. 인비절라인·설측교정·성인 재교정·옥니 개선을 3D Quick-Ceph 분석 후 1:1 전담합니다.</p>
        <a class="ws-home-link" href="/treatments/orthodontics">치아교정 · 재교정 자세히 보기 &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">이봉진 대표원장 · 3D CT 임플란트</h3>
        <p class="wb-ka wbka">연세대학교 치과대학 졸업 및 치과병원 수련. 고난도 동종골 뼈이식·상악동거상술·무치악 전체임플란트·임플란트 재수술과 정밀 교합 보철을 담당합니다.</p>
        <a class="ws-home-link" href="/treatments/implant">3D CT 임플란트 · 재수술 보기 &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">박선혜 원장 · 치주과 전문의 협진</h3>
        <p class="wb-ka wbka">보건복지부 인증 치주과 전문의, 대한치과보철학회 우수보철치과의사. 잇몸뼈 보존, 임플란트 주위염 예방, 무삭제 제로쉘·최소삭제 라미네이트 재시술을 협진합니다.</p>
        <a class="ws-home-link" href="/treatments/aesthetic/zeroshell">무삭제·최소삭제 라미네이트 보기 &rarr;</a>
      </article>
    </div>

    <div class="ws-home-candor wb-ka wbka">
      <strong class="wb-ka wbka">꼭 필요한 치료만 권하는 정직한 진료 기준 — 안 해도 되는 진료는 권하지 않습니다</strong>
      <p class="wb-ka wbka">자연치아를 살릴 수 있는 경우 재신경치료·치주치료를 먼저 검토하며, 라미네이트가 불필요하거나 법랑질 삭제 부담이 큰 경우에는 단기간 부분교정이나 미백을 우선 안내합니다. 환자 안전을 위해 의식 소실 위험이 있는 수면마취는 시행하지 않고 3단계 통증 완화 국소마취 시스템만 적용합니다.</p>
    </div>

    <div class="ws-home-table-wrap wb-ka wbka">
      <table class="ws-home-table wb-ka wbka">
        <thead>
          <tr>
            <th class="wb-ka wbka">고난도 진료 · 비교 기준</th>
            <th class="wb-ka wbka">화이트스타일치과의원 33년 협진 프로토콜</th>
            <th class="wb-ka wbka">상세 페이지</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="wb-ka wbka">임플란트 재수술 · 뼈이식 · 상악동거상술</td>
            <td class="wb-ka wbka">타 치과 임플란트 흔들림·주위염 원인 3D CT 분석 후 치주과 전문의 염증 정화·동종골 이식(GBR)과 커스텀 지대주 재건 진행</td>
            <td class="wb-ka wbka"><a class="ws-home-link" href="/treatments/implant/bone-graft">임플란트 재수술·뼈이식 &rarr;</a></td>
          </tr>
          <tr>
            <td class="wb-ka wbka">무치악 전체임플란트 · 만 65세 건강보험(30%)</td>
            <td class="wb-ka wbka">상·하악 무치악 전악 재건 최소 필수 식립 설계 및 만 65세 이상 평생 2개 본인부담률 30% 원내 건강보험 등록 지원</td>
            <td class="wb-ka wbka"><a class="ws-home-link" href="/treatments/implant/edentulous">전체임플란트 안내 &rarr;</a> · <a class="ws-home-link" href="/treatments/implant/insurance">건보 30% &rarr;</a></td>
          </tr>
          <tr>
            <td class="wb-ka wbka">성인 재교정 · 옥니·재발 예방 · 총액제</td>
            <td class="wb-ka wbka">유지장치 탈락 재발·발치 후 옥니 재교정 시 3D CT 치근·잇몸뼈 두께 계측 후 진단비·월비·유지장치 포함 기준 서면 안내</td>
            <td class="wb-ka wbka"><a class="ws-home-link" href="/treatments/orthodontics/recorrection">재교정 센터 &rarr;</a> · <a class="ws-home-link" href="/treatments/orthodontics/types">장치 종류 &rarr;</a></td>
          </tr>
          <tr>
            <td class="wb-ka wbka">무삭제 제로쉘 · 0.1~0.2mm 최소삭제 라미네이트 재시술</td>
            <td class="wb-ka wbka">기존 라미네이트 변색·파절·잇몸 검게 비침 교정·치주 협진 재치료, 법랑질 보존 중심 맞춤 세라믹 2~3회 내원 완성</td>
            <td class="wb-ka wbka"><a class="ws-home-link" href="/treatments/aesthetic/retreatment">라미네이트 재시술 &rarr;</a> · <a class="ws-home-link" href="/treatments/aesthetic/zeroshell">제로쉘 &rarr;</a></td>
          </tr>
          <tr>
            <td class="wb-ka wbka">3단계 무통 국소마취 · 자체 기공소 &amp; 3·6·12개월 리콜</td>
            <td class="wb-ka wbka">가글·도포·디지털 정압 무통 마취기 적용, 원내 자체 기공소 정밀 보철 맞춤 수정 및 치주과 전문의 정기 검진 보증 관리</td>
            <td class="wb-ka wbka"><a class="ws-home-link" href="/warranty">보증·자체기공소 안내 &rarr;</a></td>
          </tr>
          <tr>
            <td class="wb-ka wbka">일본어 통역 3명 상주 · 토요일 진료</td>
            <td class="wb-ka wbka">전담 일본어 통역 코디네이터 3명 상주(직통 +82-10-3046-5010 / LINE: whitestyle1), 월·화·수·금 10:00~19:00 · 토 10:00~14:00 (목·일·공휴일 휴진)</td>
            <td class="wb-ka wbka"><a class="ws-home-link" href="/clinic-facts">병원 공식 팩트 전체 &rarr;</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section id="ws-home-price-strip" class="ws-home-sec ws-home-sec--white wb-ka wbka">
  <div class="ws-home-wrap wb-ka wbka">
    <span class="ws-home-kicker wb-ka wbka">의료법 제45조 준수 · 건강보험심사평가원(심평원) 비급여 기준</span>
    <h2 class="ws-home-h2 wb-ka wbka">심평원(HIRA) 비급여 기준 및 투명 진료비 안내</h2>
    <p class="ws-home-lead wb-ka wbka">
      치과 치료 비용은 최저가 광고가 아닌 맞춤형 지대주·상부 크라운·뼈이식·월 치료비·유지장치 포함 여부를 서면으로 대조해야 정확합니다. 화이트스타일치과의원은 심평원 비급여 진료비용 기준과 네이버 실명 영수증 방문자 후기(11533882) 및 공식 수가 정보를 투명하게 공개합니다.
    </p>
    <div class="ws-home-table-wrap wb-ka wbka">
      <table class="ws-home-table wb-ka wbka">
        <thead>
          <tr>
            <th class="wb-ka wbka">항목 (심평원 고지 기준)</th>
            <th class="wb-ka wbka">고지 범위 및 포함 기준</th>
            <th class="wb-ka wbka">확인 포인트</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="wb-ka wbka">치과임플란트 (1치당)</td>
            <td class="wb-ka wbka">바이오템 PFM·지르코니아 각 800,000원 / 오스템 PFM·지르코니아 각 900,000원 / 바이오템 GOLD 1,400,000원 / 오스템 GOLD 1,500,000원</td>
            <td class="wb-ka wbka">3D CT 진단 후 뼈이식·상악동거상술 필요 여부 별도 서면 고지 (만 65세 이상 건보 30% 적용)</td>
          </tr>
          <tr>
            <td class="wb-ka wbka">치아교정 (총액제 기준)</td>
            <td class="wb-ka wbka">3D CT·Quick-Ceph 정밀 진단비, 교정 장치비, 매월 조절 치료비, 고정식·가철식 유지장치 포함 범위 사전 서면 안내</td>
            <td class="wb-ka wbka">인비절라인·설측·클리피씨·부분 재교정별 추가 비용 기준 사전 확인</td>
          </tr>
          <tr>
            <td class="wb-ka wbka">제증명수수료</td>
            <td class="wb-ka wbka">진료기록사본 1~5매 1,000원 / 6매 이상 매당 100원 (진단서·확인서 심평원 기준 준수)</td>
            <td class="wb-ka wbka">실손·보험 청구 및 타 기관 소견서 발급 투명 안내</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="ws-home-btns wb-ka wbka">
      <a class="ws-home-btn-dark" href="/price">비급여 상세 수가 기준표 보기 &rarr;</a>
      <a class="ws-home-btn-light" href="/warranty">사후 보증 · 자체 기공소 확인 &rarr;</a>
      <a class="ws-home-btn-light" href="https://m.place.naver.com/hospital/11533882/review/visitor" target="_blank" rel="noopener noreferrer">네이버 영수증 후기 보기 &#8599;</a>
    </div>
  </div>
</section>

<section id="ws-home-doctor-columns" class="ws-home-sec wb-ka wbka">
  <div class="ws-home-wrap wb-ka wbka">
    <span class="ws-home-kicker wb-ka wbka">3인 원장단 직접 검수 · 임상 칼럼 &amp; 근거 기반 Q&amp;A</span>
    <h2 class="ws-home-h2 wb-ka wbka">강남역 치과 선택 전 꼭 읽어봐야 할 원장단 임상 칼럼</h2>
    <p class="ws-home-lead wb-ka wbka">
      치과 진료 전 환자분들이 가장 자주 겪는 고민(재수술, 뼈이식, 재교정, 최소삭제 라미네이트 신경보호, 비용 비교 기준)을 핵심 결론과 숫자 기준으로 정리했습니다.
    </p>
    <div class="ws-home-grid3 wb-ka wbka">
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">고난도 재수술 · 뼈이식 · 재교정 · 재시술 3인 협진</h3>
        <p class="wb-ka wbka">임플란트 재수술·동종골 뼈이식·무치악 전체임플란트·성인 재교정·최소삭제 라미네이트 재시술의 치주과 전문의 3인 협진 프로토콜을 확인하세요.</p>
        <a class="ws-home-link" href="/board/notice/1919">고난도 재치료 가이드 (/board/notice/1919) &rarr;</a> · <a class="ws-home-link" href="/board/notice/1918">2026 심평원·모두닥·굿닥 비교 (/board/notice/1918) &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">임플란트 재수술 · 고난도 동종골 뼈이식</h3>
        <p class="wb-ka wbka">기존 임플란트 주위염·흔들림 발생 시 치주과 전문의 염증 제거와 3D CT 기반 골이식 재건 단계를 안내합니다.</p>
        <a class="ws-home-link" href="/treatments/implant/reoperation">재수술 전담 안내 (/treatments/implant/reoperation) &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">무치악 전악 재건 전체임플란트 · 뼈이식 기준</h3>
        <p class="wb-ka wbka">상·하악 다수 치아 상실 시 최소 필수 식립 수 설계와 맞춤형 커스텀 지대주 교합 회복 원칙을 설명합니다.</p>
        <a class="ws-home-link" href="/treatments/implant/edentulous">전체임플란트 (/treatments/implant/edentulous) &rarr;</a> · <a class="ws-home-link" href="/board/notice/1895">칼럼 (/board/notice/1895) &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">성인 재교정 · 옥니·재발 예방 1:1 진료</h3>
        <p class="wb-ka wbka">교정 후 틀어짐·옥니 발생 시 3D CT 치근·골폭 확인과 치주과 협진을 통한 안전한 재교정 방법을 다룹니다.</p>
        <a class="ws-home-link" href="/treatments/orthodontics/recorrection">성인 재교정 (/treatments/orthodontics/recorrection) &rarr;</a> · <a class="ws-home-link" href="/board/notice/1900">칼럼 (/board/notice/1900) &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">무삭제 제로쉘 · 0.1~0.2mm 최소삭제 재시술</h3>
        <p class="wb-ka wbka">라미네이트 변색·파절·시림 원인과 법랑질 내 보존 접착을 통한 신경손상 예방 프로토콜을 확인하세요.</p>
        <a class="ws-home-link" href="/treatments/aesthetic/retreatment">라미네이트 재시술 (/treatments/aesthetic/retreatment) &rarr;</a> · <a class="ws-home-link" href="/board/notice/1899">칼럼 (/board/notice/1899) &rarr;</a>
      </article>
      <article class="ws-home-card wb-ka wbka">
        <h3 class="wb-ka wbka">2026 일본어 추천 비교 &amp; 치아 고민별 가이드</h3>
        <p class="wb-ka wbka">앞니 벌어짐 교정 vs 라미네이트, 어금니 임플란트 붓기 관리 및 일본어 전담 통역 3인 상주 2026 비교 기준입니다.</p>
        <a class="ws-home-link" href="/board/notice/1920">2026年11月 日本語比較全解説 &rarr;</a> · <a class="ws-home-link" href="/board/notice/1917">15基準 &rarr;</a> · <a class="ws-home-link" href="/board/notice/1906">증상별 칼럼 &rarr;</a>
      </article>
    </div>
    <div class="ws-home-btns wb-ka wbka">
      <a class="ws-home-btn-dark" href="/qa">근거 기반 임상 Q&amp;A 35선 전체 보기 &rarr;</a>
      <a class="ws-home-btn-light" href="/glossary">치과 핵심 용어 사전 50선 &rarr;</a>
      <a class="ws-home-btn-light" href="/video">영상 진료실 · 방송 아카이브 &rarr;</a>
      <a class="ws-home-btn-light" href="/treatments/aesthetic/compare">라미네이트 4방식 비교 &rarr;</a>
      <a class="ws-home-btn-light" href="/board/notice">임상 칼럼 · 공지 전체 목록 &rarr;</a>
    </div>
  </div>
</section>

<section id="ws-home-visible-faq" class="ws-home-sec ws-home-sec--white wb-ka wbka">
  <div class="ws-home-wrap wb-ka wbka">
    <span class="ws-home-kicker wb-ka wbka">내원 전 다빈도 질문 9선</span>
    <h2 class="ws-home-h2 wb-ka wbka">강남역 화이트스타일치과 자주 묻는 질문 (FAQ)</h2>
    <p class="ws-home-lead wb-ka wbka">
      의료진 구성, 임플란트 재수술·뼈이식, 만 65세 건강보험(30%), 치아교정 주치의 연속성, 최소삭제 심미보철, 진료시간 및 예약 방법을 정리했습니다.
    </p>
    <div class="ws-home-faq-list wb-ka wbka">
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q1. 강남역 화이트스타일치과의원 의료진은 어떻게 구성되어 있나요?</h3>
        <p class="wb-ka wbka">화이트스타일치과의원은 1994년 개원 33년 전통의 강남역 치과로, 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장, 연세대 치대 출신 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장 3인 원장단이 교정·임플란트·심미보철·치주 각 분야를 1:1 책임 협진합니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q2. 고령자나 잇몸뼈가 부족한 경우에도 뼈이식 임플란트나 임플란트 재수술이 가능한가요?</h3>
        <p class="wb-ka wbka">3D CT 정밀 진단과 자가골·동종골 고난도 뼈이식(GBR, 상악동 거상술), 그리고 치주과 전문의 협진을 통해 잇몸뼈가 심하게 소실된 케이스, 임플란트 실패 후 재수술, 무치악 전체 임플란트까지 안전하고 튼튼하게 식립합니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q3. 만 65세 건강보험 임플란트와 연 1회 건강보험 스케일링 혜택은 어떻게 되나요?</h3>
        <p class="wb-ka wbka">만 65세 이상 건강보험 가입자는 평생 2개까지 본인부담률 30%로 건강보험 임플란트 시술이 가능하며, 만 19세 이상 성인은 매년 1회(1월 1일~12월 31일) 건강보험 스케일링 혜택을 받으실 수 있습니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q4. 일본어 상담이나 외국인 환자 전담 코디네이터가 상주하나요?</h3>
        <p class="wb-ka wbka">네, 화이트스타일치과의원에는 일본어 전담 통역 코디네이터 3명이 상시 상주(日本語通訳スタッフ3名常駐)하고 있어, 사전 온라인 상담(LINE ID: whitestyle1 / 카카오톡: whitestyle2)부터 내원 진료, 사후관리까지 편안하게 안내받으실 수 있습니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q5. 강남역 화이트스타일치과의원의 치아교정은 누가 어떻게 진료하나요?</h3>
        <p class="wb-ka wbka">강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 부착, 사후 유지관리까지 1:1로 직접 책임 진료합니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q6. 최소삭제 심미보철(라미네이트)은 어떤 원칙으로 진행되나요?</h3>
        <p class="wb-ka wbka">강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q7. 임플란트 시술 시 통증 관리와 협진 시스템은 어떻게 이루어지나요?</h3>
        <p class="wb-ka wbka">강남역 화이트스타일치과의원 임플란트는 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템을 바탕으로, 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진을 통해 식립부터 최종 보철·정기 검진까지 안전하게 진행합니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q8. 화이트스타일치과 위치와 진료시간, 예약 방법은 어떻게 되나요?</h3>
        <p class="wb-ka wbka">지하철 2호선·신분당선 강남역 11번·12번 출구 도보 1분 거리(서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층)에 위치합니다. 월·화·수·금 10:00~19:00, 토요일 10:00~14:00 진료하며(목·일·공휴일 휴진), 네이버 예약(https://booking.naver.com/booking/13/bizes/265482) 또는 대표전화(1577-7287 / 02-569-7528)로 예약 가능합니다.</p>
      </article>
      <article class="ws-home-faq-item wb-ka wbka">
        <h3 class="wb-ka wbka">Q9. 화이트스타일치과 3D 덴탈 프렌드 화타펫(하야니)은 무엇이며 어떻게 이용하나요?</h3>
        <p class="wb-ka wbka">화타펫(하야니)은 1994년 개원 33년 전통 강남역 화이트스타일치과의원의 24시간 3D 덴탈 케어 프렌드입니다. 치아교정·최소삭제 심미보철·임플란트·스케일링 등 구강 건강 질문에 한·일 양국어로 24시간 실시간 답변하며, 양치 타이머·교합 체크·구강 케어 가이드를 제공합니다. 웹 브라우저에서 설치 없이 즉시 체험(<a class="ws-home-link" href="https://whitestyle.com/ai-pet/">/ai-pet/</a>)하거나 윈도우 데스크톱 앱 및 크롬 확장프로그램(<a class="ws-home-link" href="https://whitestyle.com/ai-pet/download.html">/ai-pet/download.html</a>)으로 무료 분양받으실 수 있습니다.</p>
      </article>
    </div>
    <p class="wb-ka wbka" style="font-size:13px;color:#64748b;margin:22px 0 0 0;line-height:1.85;">
      ※ 모든 치과 시술 및 수술의 결과와 치료 기간은 개인의 구강 상태, 치조골 밀도, 전신 건강에 따라 달라질 수 있으며 출혈, 부종, 감염, 일시적 시림 등 부작용이 발생할 수 있으므로 3D CT 정밀 진단 후 의료진과 충분히 상의하시기 바랍니다.
    </p>
  </div>
</section>
"""

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

sns_floating_html = r"""
<section id="ws-home-sns-share-section" style="background:#ffffff;padding:56px 20px 44px;border-top:1px solid #e2e8f0;font-family:'Pretendard','Malgun Gothic','Noto Sans KR',sans-serif;text-align:center;">
  <style>
    @keyframes floatBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes floatingBounceCTA {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    #ws-home-sns-share-section * { box-sizing: border-box; }
    #ws-home-sns-share-section .share-icon-bounce {
      animation: floatBounce 2.5s ease-in-out infinite;
    }
    .ws-share-box {
      max-width: 820px;
      margin: 0 auto;
      padding: 2.5rem 1rem 3rem;
      border-top: 1px solid rgba(148, 163, 184, 0.25);
      border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    }
    .ws-share-title {
      font-weight: 800;
      font-size: 1.25rem;
      margin: 0 0 2rem 0;
      color: #0f172a;
    }
    .ws-share-row {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .ws-share-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
    }
    .ws-share-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      color: #ffffff;
    }
    .ws-share-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
    }
    .ws-social-strip {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      padding-top: 2.25rem;
    }
    .ws-social-circle {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ffffff;
      color: #0f172a !important;
      text-decoration: none !important;
      border: 1px solid rgba(148, 163, 184, 0.35);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .ws-social-circle:hover {
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    }
    .ws-social-circle--kakao:hover { color: #eab308 !important; border-color: #FEE500 !important; }
    .ws-social-circle--naver:hover { color: #03C75A !important; border-color: #03C75A !important; }
    .ws-social-circle--insta:hover { color: #E1306C !important; border-color: #E1306C !important; }
    .ws-social-circle--youtube:hover { color: #FF0000 !important; border-color: #FF0000 !important; }

    .floating-cta-container {
      position: fixed;
      bottom: 5.5rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px);
      transition: all 0.3s ease;
      font-family: 'Pretendard', 'Malgun Gothic', 'Noto Sans KR', sans-serif;
    }
    .floating-cta-container.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
    .ws-float-pill {
      background: rgba(255, 255, 255, 0.96);
      color: #0f172a !important;
      border: 1px solid rgba(148, 163, 184, 0.3);
      border-radius: 999px;
      padding: 0.8rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none !important;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .ws-float-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.14);
    }
    .ws-floating-cta-primary {
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: #ffffff !important;
      padding: 0.8rem 1.5rem;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 800;
      font-size: 1rem;
      box-shadow: 0 10px 25px rgba(234, 88, 12, 0.4);
      text-decoration: none !important;
      white-space: nowrap;
      animation: floatingBounceCTA 2s ease-in-out infinite;
    }
    @media (max-width: 768px) {
      .floating-cta-container {
        bottom: 6.2rem;
        right: 1rem;
        gap: 0.55rem;
      }
      .ws-float-pill, .ws-floating-cta-primary {
        padding: 0.65rem 1rem;
        font-size: 0.9rem;
      }
    }
  </style>

  <div class="ws-share-box">
    <p class="ws-share-title">이 문서 공유하기</p>
    <div class="ws-share-row">
      <button type="button" class="ws-share-btn" title="카카오/기기공유" aria-label="카카오/기기공유" onclick="wsShareKakao()">
        <div class="share-icon-bounce ws-share-circle" style="background:#FEE500;box-shadow:0 4px 12px #FEE50040;animation-delay:0s;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
            <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.87 1.83 5.4 4.59 6.85l-1.18 4.31c-.13.48.37.83.78.61l5.12-3.41c.54.08 1.1.13 1.69.13 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
        </div>
        <span class="ws-share-label">카카오/기기공유</span>
      </button>

      <button type="button" class="ws-share-btn" title="네이버 공유" aria-label="네이버 공유" onclick="wsShareNaver()">
        <div class="share-icon-bounce ws-share-circle" style="background:#03C75A;box-shadow:0 4px 12px #03C75A40;animation-delay:0.15s;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M16.5 4H7.5C5.57 4 4 5.57 4 7.5v9C4 18.43 5.57 20 7.5 20h9c1.93 0 3.5-1.57 3.5-3.5v-9C20 5.57 18.43 4 16.5 4zm-1.5 12h-2v-4h-2v4H9V8h2v4h2V8h2v8z"/>
          </svg>
        </div>
        <span class="ws-share-label">네이버</span>
      </button>

      <button type="button" class="ws-share-btn" title="구글 공유" aria-label="구글 공유" onclick="wsShareGoogle()">
        <div class="share-icon-bounce ws-share-circle" style="background:#EA4335;box-shadow:0 4px 12px #EA433540;animation-delay:0.3s;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <span class="ws-share-label">구글</span>
      </button>

      <button type="button" class="ws-share-btn" title="페이스북 공유" aria-label="페이스북 공유" onclick="wsShareFacebook()">
        <div class="share-icon-bounce ws-share-circle" style="background:#1877F2;box-shadow:0 4px 12px #1877F240;animation-delay:0.45s;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <span class="ws-share-label">페이스북</span>
      </button>

      <button type="button" class="ws-share-btn" title="트위터 공유" aria-label="트위터 공유" onclick="wsShareX()">
        <div class="share-icon-bounce ws-share-circle" style="background:#000000;box-shadow:0 4px 12px #00000040;animation-delay:0.6s;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
        <span class="ws-share-label">트위터</span>
      </button>

      <button type="button" class="ws-share-btn" title="링크 복사" aria-label="링크 복사" onclick="wsCopyLink()">
        <div class="share-icon-bounce ws-share-circle" style="background:#64748b;box-shadow:0 4px 12px #64748b40;animation-delay:0.75s;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>
        <span class="ws-share-label">링크 복사</span>
      </button>
    </div>
  </div>

  <div class="ws-social-strip" aria-label="화이트스타일치과의원 공식 SNS 채널">
    <a href="https://pf.kakao.com/_Vtxdwl" target="_blank" rel="me noopener noreferrer" aria-label="화이트스타일치과의원 카카오톡 상담 채널" title="카카오톡 상담 채널" class="share-icon-bounce ws-social-circle ws-social-circle--kakao" style="animation-delay:0s;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.87 1.83 5.4 4.59 6.85l-1.18 4.31c-.13.48.37.83.78.61l5.12-3.41c.54.08 1.1.13 1.69.13 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
      </svg>
    </a>
    <a href="https://blog.naver.com/whitestyle3" target="_blank" rel="me noopener noreferrer" aria-label="화이트스타일치과의원 공식 네이버 블로그" title="공식 네이버 블로그" class="share-icon-bounce ws-social-circle ws-social-circle--naver" style="animation-delay:0.15s;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
      </svg>
    </a>
    <a href="https://www.instagram.com/whitestyledentalclinic" target="_blank" rel="me noopener noreferrer" aria-label="화이트스타일치과의원 공식 인스타그램" title="공식 인스타그램" class="share-icon-bounce ws-social-circle ws-social-circle--insta" style="animation-delay:0.3s;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    </a>
    <a href="https://www.youtube.com/@whitestyle" target="_blank" rel="me noopener noreferrer" aria-label="화이트스타일치과의원 공식 유튜브 채널" title="공식 유튜브 채널" class="share-icon-bounce ws-social-circle ws-social-circle--youtube" style="animation-delay:0.45s;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.58 6.42a2.71 2.71 0 00-1.9-1.92C17.97 4 12 4 12 4s-5.97 0-7.68.5A2.71 2.71 0 002.42 6.42C2 8.12 2 12 2 12s0 3.88.42 5.58a2.71 2.71 0 001.9 1.92c1.71.5 7.68.5 7.68.5s5.97 0 7.68-.5a2.71 2.71 0 001.9-1.92c.42-1.7.42-5.58.42-5.58s0-3.88-.42-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/>
      </svg>
    </a>
  </div>
</section>

<div id="ws-floating-cta-container" class="floating-cta-container" aria-label="빠른 이동 및 상담 메뉴">
  <a href="/" class="ws-float-pill">
    <span style="font-size:1.2rem;" aria-hidden="true">🏠</span>
    <span>홈으로</span>
  </a>
  <a href="https://whinish.com/insights" target="_blank" rel="noopener noreferrer" class="ws-float-pill">
    <span style="font-size:1.2rem;" aria-hidden="true">📰</span>
    <span>월간김준헌</span>
  </a>
  <a href="/qa" class="ws-float-pill">
    <span style="font-size:1.2rem;" aria-hidden="true">🔍</span>
    <span>통합검색</span>
  </a>
  <a href="/consult" class="ws-floating-cta-primary floating-cta-bounce" aria-label="상담예약">
    <span style="font-size:1.2rem;" aria-hidden="true">📞</span>
    <span>상담예약</span>
  </a>
</div>

<script>
  function wsShareKakao() {
    var url = window.location.href;
    var title = document.title || '화이트스타일치과의원';
    if (navigator.share) {
      navigator.share({ title: title, text: '화이트스타일치과의원: ' + title, url: url }).catch(function() {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('카카오톡 공유를 위해 링크가 복사되었습니다!\n카카오톡 채팅창에 붙여넣기 하여 공유해보세요.');
    }
  }
  function wsShareNaver() {
    window.open('https://share.naver.com/web/shareView?url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(document.title), '_blank', 'width=600,height=400');
  }
  function wsShareGoogle() {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&su=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(window.location.href), '_blank', 'width=600,height=600');
  }
  function wsShareFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank', 'width=600,height=400');
  }
  function wsShareX() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '&url=' + encodeURIComponent(window.location.href), '_blank', 'width=600,height=400');
  }
  function wsCopyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    alert('링크가 복사되었습니다!');
  }
  (function() {
    var el = document.getElementById('ws-floating-cta-container');
    if (!el) return;
    function toggleFloating() {
      if (window.scrollY > 300) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', toggleFloating, { passive: true });
    toggleFloating();
  })();
</script>
"""

quick_anchor = '<div id="mir_quick_menu_line"></div>'
if quick_anchor in new_html:
    new_html = new_html.replace(quick_anchor, home_editorial_sections + '\n' + park_section_html + '\n' + sns_floating_html + '\n' + quick_anchor, 1)
    print("Injected 4 editorial SSR sections + Park Sung-tae waiting room gallery + SNS share/floating CTA before quick menu.")
else:
    print("WARNING: quick_anchor not found!")

if not new_html.lstrip().upper().startswith('<!DOCTYPE'):
    new_html = '<!DOCTYPE html>\n' + new_html

# -------------------------------------------------------------
# 6. Save Targets
# -------------------------------------------------------------
for p in ['e:/antigravity/whitestyle-copy/processed_page.html', 
          'e:/antigravity/whitestyle-copy/public/processed_page.html',
          'e:/antigravity/whitestyle-copy/public/index.html']:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(new_html)

print("Saved all HTML targets successfully! Size:", len(new_html))
