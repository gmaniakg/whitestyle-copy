import type { Metadata } from 'next';

export type Lang = 'ko' | 'ja' | 'en';
export type PageKey = 'home' | 'press' | 'awards' | 'career';

export const SITE = 'https://whitestyle.com';

const PATH: Record<PageKey, string> = {
  home: '',
  press: '/press',
  awards: '/awards',
  career: '/career',
};

const OG_LOCALE: Record<Lang, string> = { ko: 'ko_KR', ja: 'ja_JP', en: 'en_US' };
const HREFLANG: Record<Lang, string> = { ko: 'ko-KR', ja: 'ja-JP', en: 'en-US' };

const COPY: Record<PageKey, Record<Lang, { title: string; description: string }>> = {
  home: {
    ko: {
      title: '강남역 화이트스타일치과의원 공식 백서 | 1994년 개원 33년 전통 · 김준헌·이봉진·박선혜 3인 원장단 협진',
      description:
        '강남역 11·12번 출구 도보 1분, 1994년 개원 33년 전통 화이트스타일치과의원 공식 백서. 서울대 치대·치과교정학 박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 책임 협진, 일본어 전담 코디네이터 3명 상주. 대표상담 1577-7287 / 02-569-7528.',
    },
    ja: {
      title: 'ホワイトスタイル歯科医院 公式ホワイトブック | 江南駅12番出口・1994年開院33年伝統・3名院長協診・日本語通訳3名常駐',
      description:
        'Yahoo! JAPAN韓国歯科部門3年連続第1位、コネスト口コミ125件。江南駅12番出口すぐ、ソウル大学歯学部卒・歯学博士 金俊憲院長（33年臨床、62,000症例以上）の歯科矯正・ホワイトニング・ラミネート・インプラント専門クリニック公式ホワイトブック。',
    },
    en: {
      title: 'WhiteStyle Dental Clinic (ホワイトスタイル歯科医院) | Gangnam Seoul Orthodontics & Implants · Est. 1994',
      description:
        'WhiteStyle Dental Clinic (화이트스타일치과의원 / ホワイトスタイル歯科医院), Gangnam Station Exit 11 & 12, Seoul. Founded 1994 (33 years). Led by Dr. Jun-Heon Kim (SNU DDS, Ph.D. in Orthodontics), Dr. Bong-Jin Lee & Dr. Seon-Hye Park (Periodontist). 3 Japanese coordinators (+82-10-3046-5010), 125+ Konest reviews, #1 Yahoo Japan.',
    },
  },
  press: {
    ko: {
      title: '언론보도 & 전문 칼럼 아카이브 | 김준헌 원장 백서',
      description: '매일경제, 중앙일보, MBC 등 150여 편에 달하는 김준헌 원장의 언론보도·전문 칼럼 아카이브입니다.',
    },
    ja: {
      title: 'メディア掲載・専門コラム アーカイブ | 金俊憲院長 ホワイトブック',
      description: 'MBCニュースデスク、中央日報など、金俊憲院長の150本以上のメディア掲載・専門コラムのアーカイブです。',
    },
    en: {
      title: 'Press & Expert Columns Archive | Dr. Jun-Heon Kim White Book',
      description: 'Archive of 150+ press features and expert dental columns by Dr. Jun-Heon Kim, including MBC News Desk and national dailies.',
    },
  },
  awards: {
    ko: {
      title: '수상경력 & 인증 | 김준헌 원장 백서',
      description: '기획재정부 장관 표창, 모범납세자, ISO 9001/14001, NICE 기술평가 등 김준헌 원장과 화이트스타일치과의 수상·인증 기록입니다.',
    },
    ja: {
      title: '受賞歴・認証 | 金俊憲院長 ホワイトブック',
      description: '企画財政部長官表彰、模範納税者、ISO 9001/14001、NICE技術評価など、金俊憲院長とホワイトスタイル歯科の受賞・認証記録です。',
    },
    en: {
      title: 'Awards & Certifications | Dr. Jun-Heon Kim White Book',
      description: 'Awards and certifications of Dr. Jun-Heon Kim and WhiteStyle Dental Clinic, including the Minister of Economy and Finance commendation, ISO 9001/14001 and NICE ratings.',
    },
  },
  career: {
    ko: {
      title: '33년 경력 타임라인 | 김준헌 원장 백서',
      description: '서울대학교 치과대학 졸업부터 단국대 치과교정학 박사, 33년 임상 경력과 학술·봉사 활동까지 김준헌 원장의 약력 타임라인입니다.',
    },
    ja: {
      title: '33年の経歴タイムライン | 金俊憲院長 ホワイトブック',
      description: 'ソウル大学歯学部卒業から檀国大学歯科矯正学博士、33年の臨床経験、学術・ボランティア活動まで、金俊憲院長の経歴タイムラインです。',
    },
    en: {
      title: '33-Year Career Timeline | Dr. Jun-Heon Kim White Book',
      description: 'Career timeline of Dr. Jun-Heon Kim: SNU School of Dentistry, Ph.D. in Orthodontics at Dankook University, 33 years of clinical practice, academic and volunteer work.',
    },
  },
};

/** Absolute URL of a page in a given language (WhiteBook ko at /whitebook, ja at /whitebook/ja, en at /en). */
export function pageUrl(page: PageKey, lang: Lang): string {
  if (page === 'home') {
    if (lang === 'ko') return `${SITE}/whitebook`;
    if (lang === 'ja') return `${SITE}/whitebook/ja`;
    return `${SITE}/en`;
  }
  const path = PATH[page];
  if (lang === 'ko') return `${SITE}${path}`;
  return `${SITE}/${lang}${path}`;
}

/** Pages with real ja/en translations. Everything else is Korean-only (no hreflang). */
export const TRANSLATED: PageKey[] = ['home'];

/** Per-page metadata: self canonical (+ hreflang set and x-default=ko for translated pages). */
export function pageMetadata(page: PageKey, lang: Lang): Metadata {
  const { title, description } = COPY[page][lang];
  const url = pageUrl(page, lang);
  const translated = TRANSLATED.includes(page);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(translated
        ? {
            languages: {
              [HREFLANG.ko]: pageUrl(page, 'ko'),
              [HREFLANG.ja]: pageUrl(page, 'ja'),
              [HREFLANG.en]: pageUrl(page, 'en'),
              'x-default': pageUrl(page, 'ko'),
            },
          }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: lang === 'ko' ? '화이트스타일치과 백서' : lang === 'ja' ? 'ホワイトスタイル歯科 ホワイトブック' : 'WhiteStyle Dental White Book',
      locale: OG_LOCALE[lang],
      alternateLocale: (['ko', 'ja', 'en'] as Lang[]).filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      type: 'website',
      images: [{ url: `${SITE}/mbc_interview_new.jpg`, width: 1200, height: 630, alt: 'WhiteStyle Dental Clinic' }],
    },
  };
}

export const ALL_PAGES: PageKey[] = ['home', 'press', 'awards', 'career'];
