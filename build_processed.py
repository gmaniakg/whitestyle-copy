import re, json

with open('e:/antigravity/whitestyle-copy/live_clean.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Replace the hero slider (box_module_Custom_455503_wrap)
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
print(f"Hero slider replaced.")

# 2. Add popup suppressor and video style to <head>
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

# 3. Rewrite relative URLs:
def replace_src(match):
    path = match.group(1)
    if path.startswith('/videos/'):
        return f'src="{path}"'
    return f'src="https://whitestyle.com{path}"'

new_html = re.sub(r'src=["\'](/[^"\']+)["\']', replace_src, new_html)

def replace_href(match):
    path = match.group(1)
    if path.startswith('/videos/') or path.startswith('/llms.txt') or path.startswith('/sitemap.xml') or path.startswith('/robots.txt'):
        return f'href="{path}"'
    if path.startswith('/#') or path == '/':
        return f'href="{path}"'
    return f'href="https://whitestyle.com{path}"'

new_html = re.sub(r'href=["\'](/[^"\']+)["\']', replace_href, new_html)

def replace_css_url(match):
    quote = match.group(1)
    path = match.group(2)
    if path.startswith('http') or path.startswith('data:') or path.startswith('//') or path.startswith('/videos/'):
        return match.group(0)
    return f"url({quote}https://whitestyle.com{path}{quote})"

new_html = re.sub(r'url\((["\']?)(/[^)]+?)(["\']?)\)', replace_css_url, new_html)

for p in ['e:/antigravity/whitestyle-copy/processed_page.html', 
          'e:/antigravity/whitestyle-copy/public/processed_page.html',
          'e:/antigravity/whitestyle-copy/public/index.html']:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(new_html)

print("Saved all HTML targets successfully! Size:", len(new_html))
