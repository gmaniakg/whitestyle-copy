import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '화타펫 구강 상담 Q&A 라운지 | 강남역 화이트스타일치과의원',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 화타펫 실시간 공개 단톡방 Q&A 아카이브. 턱관절, 치아교정, 최소삭제 라미네이트, 치아미백 고민과 닥터 화타의 임상 답변을 확인하세요.',
  alternates: { canonical: 'https://whitestyle.com/ai-pet/lounge' },
  openGraph: {
    title: '화타펫 구강 상담 Q&A 라운지 | 화이트스타일치과의원',
    description:
      '강남 직장인 턱관절, 치아교정, 라미네이트 및 미백 공개 단톡방 Q&A와 33년 전통 3인 원장단 자문 답변.',
    url: 'https://whitestyle.com/ai-pet/lounge',
    type: 'website',
    locale: 'ko_KR',
  },
};

interface LoungeMessage {
  id: string;
  sender: string;
  text: string;
  isCracked: boolean;
  avatarSpecies: string;
  avatarEar: string;
  avatarCostume: string;
  avatarBg: string;
  isBot: boolean;
  createdAt: Date;
}

interface LoungeRoom {
  roomId: string;
  roomName: string;
  description: string;
  topic: string;
  memberCount: number;
  messages: LoungeMessage[];
}

const BG_COLOR_MAP: Record<string, string> = {
  cream: '#faf3e3',
  mint: '#dff3ee',
  peach: '#fce5dc',
  sky: '#e1f0fa',
  lavender: '#ece6fa',
  gold: '#f9e498',
};

const FALLBACK_ROOMS: LoungeRoom[] = [
  {
    roomId: 'room_jaw_stretch',
    roomName: '강남 직장인 턱관절 & 이갈이 탈출방',
    description: '모니터 볼 때 무의식적 이악물기(TCH) 교정 및 턱근육 이완 팁 공유방',
    topic: '턱관절 통증, 개구장애, 이갈이, 이악물기',
    memberCount: 142,
    messages: [
      {
        id: 'fallback-1',
        sender: '개발자김씨',
        text: '컴퓨터하다 보면 나도 모르게 어금니 꽉 물고 있어서 퇴근할 때 턱이 뻐근해요 ㅜㅜ 다들 어떻게 푸시나요?',
        isCracked: false,
        avatarSpecies: 'dog',
        avatarEar: 'fox',
        avatarCostume: 'coder',
        avatarBg: 'sky',
        isBot: false,
        createdAt: new Date(),
      },
      {
        id: 'fallback-2',
        sender: '닥터 화타 (화이트스타일치과)',
        text: '전형적인 TCH(이악물기 습관)입니다. 평소 윗니와 아랫니 사이에 2~3mm의 틈을 두고 "N(은~)" 발음을 유지해 보세요. 통증이 심할 땐 강남역 화이트스타일치과(1577-7287)에서 3D 정밀 진단을 권장합니다.',
        isCracked: false,
        avatarSpecies: 'dog',
        avatarEar: 'round',
        avatarCostume: 'doctor',
        avatarBg: 'gold',
        isBot: true,
        createdAt: new Date(),
      },
    ],
  },
  {
    roomId: 'room_ortho_talk',
    roomName: '치아교정 1~2년차 현실 고민방',
    description: '유지장치, 발치 및 비발치, 투명교정 후기 및 실시간 임상 Q&A',
    topic: '치아교정, 클리피씨, 인비절라인, 유지장치',
    memberCount: 98,
    messages: [
      {
        id: 'fallback-3',
        sender: '교정6개월차',
        text: '월치료 다녀온 지 3일짼데 딱딱한 거 언제부터 먹을 수 있나요? @화타',
        isCracked: false,
        avatarSpecies: 'dino',
        avatarEar: 'perk',
        avatarCostume: 'none',
        avatarBg: 'mint',
        isBot: false,
        createdAt: new Date(),
      },
      {
        id: 'fallback-4',
        sender: '닥터 화타 (화이트스타일치과)',
        text: '교정학 박사 김준헌 병원장님의 33년 임상 조언: 와이어 교체 후 3~4일이 치아이동 압력이 가장 높으며, 5일차부터 서서히 완화됩니다. 미지근한 연두부나 계란찜을 드시고 찬물 가글이 도움이 됩니다.',
        isCracked: false,
        avatarSpecies: 'dog',
        avatarEar: 'round',
        avatarCostume: 'doctor',
        avatarBg: 'gold',
        isBot: true,
        createdAt: new Date(),
      },
    ],
  },
  {
    roomId: 'room_aesthetic_smile',
    roomName: '최소삭제 라미네이트 & 미백 솔직방',
    description: '자연치아 보존 세라믹 라미네이트 후기 및 치아미백 관리 노하우',
    topic: '라미네이트, 치아미백, 심미보철, 앞니',
    memberCount: 85,
    messages: [
      {
        id: 'fallback-5',
        sender: '스마일러',
        text: '앞니 벌어진 거 라미네이트 하고 싶은데 치아 많이 깎을까 봐 무서워요. 치아미백이랑 같이 해도 되나요? @화타',
        isCracked: true,
        avatarSpecies: 'dog',
        avatarEar: 'fold',
        avatarCostume: 'beret',
        avatarBg: 'lavender',
        isBot: false,
        createdAt: new Date(),
      },
      {
        id: 'fallback-6',
        sender: '닥터 화타 (화이트스타일치과)',
        text: '강남역 화이트스타일치과의원은 자연치아 보존을 최우선으로 삼아 0.1~0.3mm 최소삭제 또는 무삭제 세라믹 라미네이트를 원칙으로 합니다. 미백 후 밝기에 맞춰 세라믹 색상을 디자인하면 더욱 자연스럽습니다.',
        isCracked: false,
        avatarSpecies: 'dog',
        avatarEar: 'round',
        avatarCostume: 'doctor',
        avatarBg: 'gold',
        isBot: true,
        createdAt: new Date(),
      },
    ],
  },
];

function ChatterAvatar({ msg }: { msg: LoungeMessage }) {
  const bg = BG_COLOR_MAP[msg.avatarBg] || BG_COLOR_MAP.cream;
  const isDogPlain = msg.avatarSpecies === 'dog' && (!msg.avatarCostume || msg.avatarCostume === 'none');
  const isDogCostume = msg.avatarSpecies === 'dog' && msg.avatarCostume && msg.avatarCostume !== 'none';

  return (
    <div
      className="relative shrink-0 rounded-full overflow-hidden border-2"
      style={{
        width: 44,
        height: 44,
        backgroundColor: bg,
        borderColor: msg.isBot ? '#8f391b' : '#241812',
      }}
      aria-hidden="true"
    >
      {isDogPlain && (
        <>
          <img
            src="/ai-pet/assets3d/hwata_3d_idle.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
          <img
            src={`/ai-pet/assets3d/hwata_3d_ear_${msg.avatarEar || 'perk'}.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />
        </>
      )}
      {isDogCostume && (
        <img
          src={`/ai-pet/assets3d/hwata_3d_costume_${msg.avatarCostume}.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {!isDogPlain && !isDogCostume && (
        <img
          src={`/ai-pet/assets3d/hwata_3d_species_${msg.avatarSpecies || 'dog'}.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
    </div>
  );
}

export default async function HwataLoungePage() {
  let rooms: LoungeRoom[] = [];
  try {
    const dbRooms = await prisma.hwataRoom.findMany({
      where: { isPublic: true },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
      take: 10,
      select: {
        roomId: true,
        roomName: true,
        description: true,
        topic: true,
        memberCount: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 15,
          select: {
            id: true,
            sender: true,
            text: true,
            isCracked: true,
            avatarSpecies: true,
            avatarEar: true,
            avatarCostume: true,
            avatarBg: true,
            isBot: true,
            createdAt: true,
          },
        },
      },
    });
    rooms = dbRooms.map((r) => ({
      ...r,
      messages: [...r.messages].reverse(),
    }));
  } catch (err) {
    console.warn('[lounge] DB fallback:', err);
  }

  if (rooms.length === 0) {
    rooms = FALLBACK_ROOMS;
  }

  const forumPosts = rooms.map((r) => {
    const firstUser = r.messages.find((m) => !m.isBot);
    const botAnswers = r.messages.filter((m) => m.isBot);
    return {
      '@type': 'DiscussionForumPosting',
      headline: r.roomName,
      description: r.description,
      url: `https://whitestyle.com/ai-pet?room=${encodeURIComponent(r.roomId)}#community`,
      author: {
        '@type': 'Person',
        name: firstUser?.sender || '화타펫 참여자',
      },
      datePublished: (firstUser?.createdAt || new Date()).toISOString(),
      text: firstUser?.text || r.description,
      commentCount: r.messages.length,
      comment: botAnswers.slice(0, 3).map((b) => ({
        '@type': 'Comment',
        text: b.text,
        dateCreated: b.createdAt.toISOString(),
        author: {
          '@type': 'Organization',
          name: '화이트스타일치과의원 닥터 화타',
        },
      })),
    };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Dentist', 'MedicalClinic'],
        '@id': 'https://whitestyle.com/#dentist',
        name: '화이트스타일치과의원',
        foundingDate: '1994',
        url: 'https://whitestyle.com',
        telephone: ['+82-1577-7287', '+82-2-569-7528', '+82-10-3046-5010'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '강남대로92길 17 (역삼동 819-10) 대승빌딩 B1, 1, 2층',
          addressLocality: '강남구',
          addressRegion: '서울특별시',
          postalCode: '06134',
          addressCountry: 'KR',
        },
      },
      ...forumPosts,
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '화타펫 단톡방에 참여하고 친구 5명 초대 시 치아미백 1회 무료 혜택을 받으려면 어떻게 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '화타펫 단톡방(https://whitestyle.com/ai-pet)에서 차트번호를 입력하거나 바로 입장해 친구 초대 링크를 복사한 뒤, 친구 5명이 합류하면 치아미백 1회 무료 쿠폰 코드가 즉시 발급됩니다.',
            },
          },
          {
            '@type': 'Question',
            name: '강남역 화이트스타일치과의원 진료 예약은 어떻게 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '강남역 11번, 12번 출구 도보 1분 대승빌딩에 위치한 화이트스타일치과의원은 네이버 빠른 예약(https://booking.naver.com/booking/13/bizes/265482) 또는 대표전화 1577-7287, 02-569-7528로 바로 예약하실 수 있습니다.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div
      className="max-w-5xl mx-auto px-5 py-16 text-slate-900 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.85 }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10 pb-8 border-b-2 border-slate-200">
        <p className="text-sm font-bold text-amber-800 mb-2">
          1994년 개원 33년 전통 · 강남역 11번, 12번 출구 도보 1분 화이트스타일치과의원
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
          화타펫 실시간 구강 고민 Q&amp;A 라운지
        </h1>
        <p className="text-base text-slate-700 mb-6">
          화타펫 공개 단톡방에서 실제 사용자들이 나눈 턱관절, 치아교정, 라미네이트, 치아미백 고민과
          3인 원장단 자문 기반 닥터 화타의 실시간 답변을 한눈에 모아볼 수 있습니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/ai-pet#community"
            className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-white bg-amber-800 hover:bg-amber-900 transition"
          >
            화타펫 단톡방 참여 &amp; 아바타 꾸미기
          </a>
          <a
            href="https://booking.naver.com/booking/13/bizes/265482"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition"
          >
            네이버 빠른 예약 (1분 완료)
          </a>
          <a
            href="tel:1577-7287"
            className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-slate-900 bg-slate-100 border border-slate-300 hover:bg-slate-200 transition"
          >
            대표전화 1577-7287 / 02-569-7528
          </a>
        </div>
      </header>

      <div className="space-y-10">
        {rooms.map((room) => (
          <section
            key={room.roomId}
            className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">{room.roomName}</h2>
                <p className="text-sm text-slate-600 mt-1">{room.description}</p>
              </div>
              <a
                href={`/ai-pet?room=${encodeURIComponent(room.roomId)}#community`}
                className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-slate-900 hover:bg-slate-800"
              >
                이 단톡방에 참여하기
              </a>
            </div>

            <div className="space-y-4">
              {room.messages.map((m) => (
                <article
                  key={m.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                    m.isBot
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <ChatterAvatar msg={m} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{m.sender}</span>
                      {m.isCracked && !m.isBot && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-300 text-slate-950">
                          VIP 정회원
                        </span>
                      )}
                      {m.isBot && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-800 text-white">
                          닥터 화타
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-800 whitespace-pre-line">{m.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 pt-8 border-t-2 border-slate-200">
        <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-600 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-950">
              친구 5명 초대 시 치아미백 1회 무료 혜택을 받아보세요
            </h2>
            <p className="text-sm text-emerald-900 mt-1">
              차트번호만 입력하면 1초 만에 프라이빗 친구 단톡방 개설과 초대 링크 공유가 가능합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/ai-pet#community"
              className="px-5 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800"
            >
              화타펫 단톡방 열기
            </a>
            <Link
              href="/qa"
              className="px-5 py-3 rounded-xl font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-100"
            >
              임상 Q&amp;A 더보기
            </Link>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-6">
          서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 화이트스타일치과의원 (우편번호 06134) /
          김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 협진 /
          대표전화 1577-7287, 02-569-7528 / 일본어 통역 직통 +82-10-3046-5010
        </p>
      </footer>
    </div>
  );
}
