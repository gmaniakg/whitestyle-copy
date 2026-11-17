'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: '이메일(또는 관리자 아이디)과 비밀번호가 올바르지 않습니다.',
  OAuthAccountNotLinked:
    '이미 다른 방식으로 등록된 이메일입니다. 이메일/아이디 로그인 또는 기존 연동 계정을 이용해 주세요.',
  AccessDenied: '관리자 접근 권한이 없는 계정입니다.',
  OAuthSignin: '소셜 로그인 연결에 실패했습니다. 이메일 로그인 또는 Google 로그인을 이용해 주세요.',
  OAuthCallback: '소셜 로그인 인증 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
  Default: '로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
};

function sanitizeCallbackUrl(raw: string | null): string {
  if (!raw) return '/admin/consultations';
  const trimmed = raw.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }
  return '/admin/consultations';
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('/admin/consultations');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [providers, setProviders] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCallbackUrl(sanitizeCallbackUrl(params.get('callbackUrl')));
    const err = params.get('error');
    if (err) {
      setErrorMsg(ERROR_MESSAGES[err] || ERROR_MESSAGES.Default);
    }

    getProviders()
      .then((res) => {
        if (res) setProviders(res as Record<string, unknown>);
      })
      .catch(() => {});
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setSubmitting(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setErrorMsg(
          ERROR_MESSAGES[result.error] || '이메일(또는 아이디) 또는 비밀번호가 올바르지 않습니다.'
        );
        setSubmitting(false);
        return;
      }

      window.location.href = result?.url || callbackUrl;
    } catch {
      setErrorMsg('로그인 요청 중 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      setSubmitting(false);
    }
  };

  const handleSocialLogin = (providerId: 'google' | 'kakao' | 'naver', label: string) => {
    setErrorMsg('');
    setInfoMsg('');
    if (!providers[providerId]) {
      setInfoMsg(
        `${label} 간편로그인은 현재 채널 연동 점검 중입니다. 위의 이메일·관리자 아이디 또는 Google 로그인을 이용해 주세요.`
      );
      return;
    }
    signIn(providerId, { callbackUrl });
  };

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{ wordBreak: 'keep-all' }}
    >
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-slate-100">
        <div>
          <h2 className="mt-1 text-center text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            로그인
          </h2>
          <p className="mt-3 text-center text-base text-slate-500">
            이메일(관리자 아이디) 또는 Google 계정으로 로그인하세요.
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

        {/* 이메일 / 관리자 아이디 로그인 폼 */}
        <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              이메일 또는 관리자 아이디
            </label>
            <input
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="whitestyle3@naver.com 또는 whitedent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">비밀번호</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#1b439c] hover:bg-[#15347a] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b439c] transition-all shadow-md mt-2"
          >
            {submitting ? '로그인 확인 중...' : '이메일로 로그인'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500 font-medium">또는 소셜 로그인</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google', 'Google')}
            className="w-full flex items-center justify-center px-6 py-3.5 border-2 border-slate-200 text-base font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google 로그인
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('kakao', '카카오톡')}
            className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-black bg-[#FEE500] hover:bg-[#FEE500]/90 transition-all shadow-sm"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-5.52 0-10 3.532-10 7.886 0 2.827 1.83 5.305 4.605 6.643l-1.196 4.385c-.104.381.334.66.657.426l5.068-3.393c.285.027.575.041.866.041 5.52 0 10-3.532 10-7.886C22 6.532 17.52 3 12 3z" />
            </svg>
            카카오톡 로그인
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('naver', '네이버')}
            className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-[#03C75A] hover:bg-[#03C75A]/90 transition-all shadow-sm"
          >
            <span className="text-xl font-black mr-3 leading-none">N</span>
            네이버 로그인
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
          <Link href="/consult" className="text-sm font-medium text-slate-500 hover:text-[#1b439c]">
            상담 안내 보기
          </Link>
          <Link href="/register" className="text-sm font-bold text-[#1b439c] hover:text-[#15347a]">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
