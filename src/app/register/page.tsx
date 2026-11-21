'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';

function sanitizeCallbackUrl(raw: string | null): string {
  if (!raw) return '/';
  const trimmed = raw.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }
  return '/';
}

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState('/');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [providers, setProviders] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(sanitizeCallbackUrl(params.get('callbackUrl')));
    getProviders()
      .then((res) => {
        if (res) setProviders(res as Record<string, unknown>);
      })
      .catch(() => {});
  }, []);

  const allAgreed = agreedPrivacy && agreedMarketing;
  const handleToggleAll = (checked: boolean) => {
    setAgreedPrivacy(checked);
    setAgreedMarketing(checked);
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!agreedPrivacy) {
      setErrorMsg('서비스 이용약관 및 개인정보 수집·이용에 동의해 주셔야 회원가입이 가능합니다.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('비밀번호는 8자 이상으로 입력해 주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
          agreedPrivacy,
          agreedMarketing,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || data.error || '회원가입에 실패했습니다.');
        setSubmitting(false);
        return;
      }

      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setInfoMsg('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      } else {
        window.location.href = result?.url || callbackUrl;
      }
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      setSubmitting(false);
    }
  };

  const handleSocialRegister = async (providerId: 'kakao' | 'naver' | 'google', label: string) => {
    setErrorMsg('');
    setInfoMsg('');

    if (!providers[providerId]) {
      setInfoMsg(
        `${label} 간편가입은 현재 채널 연동 점검 중입니다. 위의 이메일 회원가입 또는 Google 계정 가입을 이용해 주세요.`
      );
      return;
    }

    if (!agreedPrivacy) {
      setErrorMsg('소셜 회원가입 전 아래 (필수) 서비스 이용약관 및 개인정보 수집·이용에 동의해 주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const consentRes = await fetch('/api/register/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agreedPrivacy: true,
          agreedMarketing,
          phone: phone.trim(),
        }),
      });
      if (!consentRes.ok) {
        const d = await consentRes.json().catch(() => ({}));
        setErrorMsg(d.message || '동의 정보 저장에 실패했습니다.');
        setSubmitting(false);
        return;
      }
      await signIn(providerId, { callbackUrl });
    } catch {
      setErrorMsg('소셜 회원가입 연결 중 오류가 발생했습니다.');
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-slate-100">
        <div>
          <h2 className="mt-1 text-center text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            회원가입
          </h2>
          <p className="mt-3 text-center text-base text-slate-500">
            whitestyle.com 회원 가입 후 화타펫 실시간 소통과 병원 안내 혜택을 이용해 보세요.
          </p>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700 leading-relaxed"
          >
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div
            role="status"
            className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm font-medium text-amber-800 leading-relaxed"
          >
            {infoMsg}
          </div>
        )}

        {/* 약관 및 마케팅·홍보 수신 동의 (이메일/소셜 공용) */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3 text-sm text-slate-700">
          <label className="flex items-center gap-2.5 cursor-pointer font-bold text-slate-900 pb-2 border-b border-slate-200">
            <input
              type="checkbox"
              checked={allAgreed}
              onChange={(e) => handleToggleAll(e.target.checked)}
              className="w-5 h-5 shrink-0 accent-[#1b439c]"
            />
            <span>약관 및 혜택 안내 전체 동의하기</span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-0.5 w-4 h-4 shrink-0 accent-[#1b439c]"
            />
            <span className="leading-snug text-xs sm:text-sm">
              <strong className="text-red-600">(필수)</strong> 서비스 이용약관 및{' '}
              <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#1b439c]">
                개인정보 수집·이용 방침
              </Link>
              에 동의합니다.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedMarketing}
              onChange={(e) => setAgreedMarketing(e.target.checked)}
              className="mt-0.5 w-4 h-4 shrink-0 accent-[#1b439c]"
            />
            <span className="leading-snug text-xs sm:text-sm">
              <strong className="text-slate-600">(선택)</strong> 병원 안내·마케팅 및 홍보 정보 수신 동의 (이메일·문자·알림톡)
              <span className="block text-[11px] text-slate-500 mt-1">
                수능 수험생 혜택, 비급여 진료 프로그램, 정기검진 안내를 받아보실 수 있으며, 동의하지 않아도 회원가입 및 서비스 이용에는 제한이 없습니다.
              </span>
            </span>
          </label>
        </div>

        {/* 이메일 가입 폼 */}
        <form onSubmit={handleEmailRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">이름 또는 닉네임 (선택)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="예: 김하얀"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">비밀번호 (8자 이상)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="8자 이상 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              휴대폰 번호 (선택 — 수험생 혜택·정기검진 안내 수신용)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, '').slice(0, 20))}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="010-0000-0000"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#1b439c] hover:bg-[#15347a] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b439c] transition-all shadow-md mt-2"
          >
            {submitting ? '가입 처리 중...' : '이메일로 가입하기'}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500 font-medium">또는 소셜 가입</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSocialRegister('google', 'Google')}
            className="w-full flex items-center justify-center px-6 py-3.5 border-2 border-slate-200 text-base font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-60 transition-all shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google 계정 가입
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSocialRegister('kakao', '카카오톡')}
            className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-black bg-[#FEE500] hover:bg-[#FEE500]/90 disabled:opacity-60 transition-all shadow-sm"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-5.52 0-10 3.532-10 7.886 0 2.827 1.83 5.305 4.605 6.643l-1.196 4.385c-.104.381.334.66.657.426l5.068-3.393c.285.027.575.041.866.041 5.52 0 10-3.532 10-7.886C22 6.532 17.52 3 12 3z" />
            </svg>
            카카오톡 가입
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSocialRegister('naver', '네이버')}
            className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-[#03C75A] hover:bg-[#03C75A]/90 disabled:opacity-60 transition-all shadow-sm"
          >
            <span className="text-xl font-black mr-3 leading-none">N</span>
            네이버 가입
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center">
          <span className="text-sm text-slate-500 mr-2">이미 계정이 있으신가요?</span>
          <Link
            href={callbackUrl !== '/' ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : '/login'}
            className="text-sm font-bold text-[#1b439c] hover:text-[#15347a]"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
