'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', { 
      email, 
      password, 
      redirect: false 
    });

    if (result?.error) {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-[2rem] shadow-2xl border border-slate-100">
        <div>
          <h2 className="mt-2 text-center text-4xl font-extrabold text-slate-900 tracking-tight">
            로그인
          </h2>
          <p className="mt-4 text-center text-lg text-slate-500">
            이메일이나 소셜 계정으로 로그인하세요.
          </p>
        </div>

        {/* 이메일 로그인 폼 */}
        <form onSubmit={handleEmailLogin} className="space-y-5 mt-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 border border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 border border-slate-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#1b439c] focus:border-transparent transition-colors"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-xl font-bold rounded-xl text-white bg-[#1b439c] hover:bg-[#15347a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b439c] transition-all shadow-md transform hover:-translate-y-1 mt-4"
          >
            이메일로 로그인
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500 font-medium">또는 소셜 로그인</span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-black bg-[#FEE500] hover:bg-[#FEE500]/90 transition-all shadow-sm transform hover:-translate-y-1"
          >
            <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-5.52 0-10 3.532-10 7.886 0 2.827 1.83 5.305 4.605 6.643l-1.196 4.385c-.104.381.334.66.657.426l5.068-3.393c.285.027.575.041.866.041 5.52 0 10-3.532 10-7.886C22 6.532 17.52 3 12 3z" />
            </svg>
            카카오톡 로그인
          </button>
          
          <button
            onClick={() => signIn('naver', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#03C75A] hover:bg-[#03C75A]/90 transition-all shadow-sm transform hover:-translate-y-1"
          >
            <span className="text-2xl font-black mr-4 leading-none">N</span>
            네이버 로그인
          </button>

          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-lg font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google 로그인
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link href="#" className="text-sm font-medium text-slate-500 hover:text-[#1b439c]">비밀번호 찾기</Link>
          <Link href="/register" className="text-sm font-bold text-[#1b439c] hover:text-[#15347a]">회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}
