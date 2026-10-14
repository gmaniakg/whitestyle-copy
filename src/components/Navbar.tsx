'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';

/* ─── SVG 국기 (외부 CDN 의존 없음, 확실한 컬러) ─── */
const KoreanFlag = () => (
  <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" width="36" height="24" style={{ borderRadius: '50%', display:'block' }}>
    <rect width="900" height="600" fill="#fff"/>
    <circle cx="450" cy="300" r="180" fill="#CD2E3A"/>
    <path d="M450 120 A180 180 0 0 1 450 480 A90 90 0 0 0 450 300 A90 90 0 0 1 450 120Z" fill="#003478"/>
    <g transform="translate(150,100) rotate(-45,0,0)">
      <rect x="-60" y="-10" width="120" height="20" fill="#000"/>
      <rect x="-60" y="-45" width="120" height="20" fill="#000"/>
      <rect x="-60" y="15" width="120" height="20" fill="#000"/>
    </g>
    <g transform="translate(750,500) rotate(-45,0,0)">
      <rect x="-60" y="-10" width="50" height="20" fill="#000"/>
      <rect x="10" y="-10" width="50" height="20" fill="#000"/>
      <rect x="-60" y="-45" width="50" height="20" fill="#000"/>
      <rect x="10" y="-45" width="50" height="20" fill="#000"/>
      <rect x="-60" y="15" width="50" height="20" fill="#000"/>
      <rect x="10" y="15" width="50" height="20" fill="#000"/>
    </g>
  </svg>
);

const JapaneseFlag = () => (
  <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" width="36" height="24" style={{ borderRadius: '50%', display:'block' }}>
    <rect width="900" height="600" fill="#fff"/>
    <circle cx="450" cy="300" r="180" fill="#BC002D"/>
  </svg>
);

const MENUS = {
  about: {
    title: '병원소개',
    mainHref: '/about',
    items: [
      { name: '대표원장 인사말', href: '/about/greeting' },
      { name: '의료진소개', href: '/about/doctors' },
      { name: '병원둘러보기', href: '/about/tour' },
      { name: '진료시간/오시는길', href: '/about/location' },
    ]
  },
  implant: {
    title: '임플란트',
    mainHref: '/treatments/implant',
    items: [
      { name: '임플란트 치료시스템', href: '/treatments/implant' },
      { name: '뼈이식 임플란트', href: '/treatments/implant/bone-graft' },
      { name: '무치악 임플란트', href: '/treatments/implant/edentulous' },
      { name: '임플란트 보험', href: '/treatments/implant/insurance' },
    ]
  },
  ortho: {
    title: '치아교정시스템',
    mainHref: '/treatments/orthodontics',
    items: [
      { name: '치아교정시스템', href: '/treatments/orthodontics' },
      { name: '교정장치 종류', href: '/treatments/orthodontics/types' },
    ]
  },
  general: {
    title: '일반진료',
    mainHref: '/treatments/general',
    items: [
      { name: '보존치료시스템', href: '/treatments/general' },
      { name: '충치치료', href: '/treatments/general/caries' },
      { name: '신경치료', href: '/treatments/general/endo' },
      { name: '스케일링', href: '/treatments/general/scaling' },
      { name: '사랑니', href: '/treatments/general/wisdom-tooth' },
    ]
  },
  aesthetic: {
    title: '심미치료',
    mainHref: '/treatments/aesthetic',
    items: [
      { name: '심미치료 메인', href: '/treatments/aesthetic' },
      { name: '이지화이트', href: '/treatments/aesthetic/easy-white' },
      { name: '제로쉘', href: '/treatments/aesthetic/zeroshell' },
    ]
  },
  community: {
    title: '커뮤니티/후기',
    mainHref: '/board/review',
    items: [
      { name: '공지사항', href: '/board/notice' },
      { name: '고객감동', href: '/board/report' },
      { name: '자필후기', href: '/board/review' },
      { name: '화스스타', href: '/board/withstar' },
    ]
  }
};

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const { data: session } = useSession();

  const toggleMobileCategory = (key: string) => {
    setExpandedMobileCategory(expandedMobileCategory === key ? null : key);
  };

  return (
    <header className="w-full flex flex-col bg-white shadow-sm relative z-50 sticky top-0">

      {/* ── TOP HEADER BAR ── */}
      <div className="w-full px-4 sm:px-8 xl:px-24 mx-auto border-b border-slate-100">
        <div className="flex flex-row justify-between items-center py-3 lg:py-5 relative">

          {/* Left: Contact icons & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://pf.kakao.com/_xkxkTdM" target="_blank" rel="noopener noreferrer" title="카카오톡 상담"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fce000] flex items-center justify-center text-[#3c1e1e] hover:bg-[#ebd000] transition-all shadow-sm">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4C6.477 4 2 7.502 2 11.823c0 2.766 1.776 5.176 4.464 6.551-.15.525-.49 1.745-.51 1.834-.057.234.075.234.165.176.07-.046 2.052-1.328 2.871-1.874a11.848 11.848 0 0 0 2.99.388c5.523 0 10-3.502 10-7.823S17.523 4 12 4z"/>
              </svg>
            </a>
            <a href="https://youtu.be/PioB4UzBSLY?si=y3Ih4LtxQ_4S5A" target="_blank" rel="noopener noreferrer" title="유튜브"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e52d27] flex items-center justify-center text-white hover:bg-[#cc2622] transition-all shadow-sm">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.582 6.186a2.684 2.684 0 00-1.884-1.897C18.035 3.84 12 3.84 12 3.84s-6.035 0-7.698.449a2.684 2.684 0 00-1.884 1.897C1.969 7.86 1.969 12 1.969 12s0 4.14.449 5.814a2.684 2.684 0 001.884 1.897c1.663.449 7.698.449 7.698.449s6.035 0 7.698-.449a2.684 2.684 0 001.884-1.897C22.031 16.14 22.031 12 22.031 12s0-4.14-.449-5.814zM9.99 15.48V8.52L16.03 12l-6.04 3.48z" />
              </svg>
            </a>
            
            {/* Language Switch */}
            <div className="flex items-center gap-2 ml-1 sm:ml-2">
              <Link href="/" className="flex items-center gap-1 group" title="한국어">
                <span className="border border-slate-200 rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-white group-hover:border-blue-400 transition-all">
                  <KoreanFlag />
                </span>
              </Link>
              <Link href="/about/japan-landing" className="flex items-center gap-1 group" title="日本語">
                <span className="border border-slate-200 rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-white group-hover:border-red-400 transition-all">
                  <JapaneseFlag />
                </span>
              </Link>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2">
            <img src="/images/병원-로고.png" alt="화이트스타일치과" className="h-[48px] sm:h-[65px] lg:h-[80px] w-auto object-contain" />
          </Link>

          {/* Right: Auth + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            
            {/* Desktop Auth (Desktop only >= 1024px) */}
            <div className="desktop-auth hidden lg:flex items-center gap-3">
              {session ? (
                <>
                  <span className="text-[15px] font-bold text-slate-700 flex items-center">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs font-black">
                      {session.user?.name?.[0] || 'U'}
                    </span>
                    {session.user?.name}님
                  </span>
                  <button onClick={() => signOut()}
                    className="px-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-red-500 hover:text-red-500 transition-colors bg-white shadow-sm">
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login"
                    className="px-5 py-2 border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-[#1b439c] hover:text-[#1b439c] transition-colors bg-white shadow-sm">
                    로그인
                  </Link>
                  <Link href="/register"
                    className="px-5 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-[#1b439c] transition-colors shadow-sm">
                    회원가입
                  </Link>
                </>
              )}
            </div>

            {/* Mobile/Tablet Hamburger Button (< 1024px) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-hamburger lg:hidden w-11 h-11 rounded-xl bg-slate-100 hover:bg-blue-50 flex flex-col items-center justify-center transition-colors border border-slate-200"
              aria-label="메뉴 열기"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-slate-800 rounded-full transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 bg-slate-800 rounded-full transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-slate-800 rounded-full transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ── DESKTOP HORIZONTAL BLUE NAV BAR (>= 1024px) ── */}
      <div className="desktop-navbar hidden lg:block w-full bg-gradient-to-r from-[#3b5998] via-[#4d70b8] to-[#3b5998] shadow-md">
        <nav className="w-full px-8 xl:px-24 mx-auto">
          <ul className="flex justify-between items-center h-[70px] xl:h-[85px]">
            {Object.entries(MENUS).map(([key, menu]) => (
              <li
                key={key}
                className="relative h-full flex items-center group cursor-pointer"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={menu.mainHref}
                  className="text-white/95 group-hover:text-white font-extrabold text-[19px] xl:text-[22px] tracking-wider h-full flex items-center transition-colors whitespace-nowrap">
                  {menu.title}
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] bg-white rounded-2xl shadow-2xl border border-blue-100 p-3 overflow-hidden z-50"
                    >
                      {menu.items.map((item, idx) => (
                        <Link key={idx} href={item.href} className="block px-6 py-3.5 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-[#1b439c] rounded-xl transition-colors text-center">
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
            
            {/* 온라인상담 단독 메뉴 */}
            <li className="relative h-full flex items-center">
              <Link href="/consult" className="text-white font-extrabold text-[19px] xl:text-[22px] tracking-wider h-full flex items-center hover:text-blue-100 transition-colors whitespace-nowrap">
                온라인상담
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* ── MOBILE ELEGANT VERTICAL DRAWER (< 1024px) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-40"
            />

            {/* Mobile Vertical Drawer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white border-b-2 border-blue-600 shadow-2xl relative z-50 max-h-[85vh] flex flex-col"
            >
              {/* Drawer User Banner */}
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                {session ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                        {session.user?.name?.[0] || 'U'}
                      </span>
                      <div>
                        <p className="font-bold text-base text-white">{session.user?.name}님 환영합니다</p>
                        <p className="text-xs text-slate-400">{session.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { signOut(); setMobileOpen(false); }}
                      className="px-4 py-2 bg-red-600/90 text-white rounded-lg text-xs font-bold hover:bg-red-700"
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 w-full">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center py-3 bg-blue-600 text-white rounded-xl text-base font-bold hover:bg-blue-700 transition-colors shadow-md"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center py-3 bg-slate-800 border border-slate-700 text-white rounded-xl text-base font-bold hover:bg-slate-700 transition-colors"
                    >
                      회원가입
                    </Link>
                  </div>
                )}
              </div>

              {/* Vertical Menu Categories */}
              <div className="overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
                {Object.entries(MENUS).map(([key, menu]) => {
                  const isExpanded = expandedMobileCategory === key;
                  return (
                    <div key={key} className="pt-3 first:pt-0">
                      <button
                        onClick={() => toggleMobileCategory(key)}
                        className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-blue-50 text-left transition-colors"
                      >
                        <span className="text-xl font-black text-slate-800">{menu.title}</span>
                        <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pr-2 pt-2 space-y-1"
                          >
                            {menu.items.map((sub, idx) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-3 px-4 rounded-xl text-base font-bold text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                              >
                                • {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* 온라인상담 단독 */}
                <div className="pt-3">
                  <Link
                    href="/consult"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-3 rounded-xl text-xl font-black text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    온라인상담 신청
                  </Link>
                </div>
              </div>

              {/* Drawer Footer Contact */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-around gap-2 text-center">
                <a href="tel:1577-7287" className="flex-1 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-700 shadow-sm flex items-center justify-center gap-2">
                  📞 전화상담
                </a>
                <a href="https://pf.kakao.com/_xkxkTdM" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#fce000] rounded-xl text-sm font-bold text-[#3c1e1e] shadow-sm flex items-center justify-center gap-2">
                  💬 카카오톡 상담
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
