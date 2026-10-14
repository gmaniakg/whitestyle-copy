'use client';

import React from 'react';
import Link from 'next/link';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from '@/components/animations/FadeIn';

export default function JapaneseLandingPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-100 selection:text-rose-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1b439c] via-[#2453be] to-[#1b439c] text-white py-24 md:py-36 px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Subtle glass background glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-rose-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          
          <FadeIn direction="down">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm md:text-base font-bold mb-8 shadow-sm break-keep">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping shrink-0" />
              <span>韓国・江南駅 徒歩2分 | 日本人来院数 14,800人突破</span>
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8 break-keep">
              <span className="inline-block">あなたの理想の笑顔を</span><br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-amber-200 to-white">
                <span className="inline-block">韓国・江南</span>{' '}
                <span className="inline-block">ホワイトスタイル歯科</span>
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mb-12 leading-relaxed font-medium break-keep">
              <span className="inline-block">ソウル大学校出身・臨床30年の専門医による</span><span className="inline-block">高品質歯科治療。</span><br className="hidden sm:block" />
              <span className="inline-block">専任の日本語通訳が常駐し、</span><span className="inline-block">カウンセリングからアフターケアまで</span><span className="inline-block">安心サポート。</span>
            </p>
          </FadeIn>

          {/* Quick Contact CTA Buttons */}
          <FadeIn direction="up" delay={0.3} className="flex flex-col sm:flex-row gap-5 w-full max-w-lg mb-16">
            <a
              href="https://line.me/ti/p/~whitestyle1" 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 py-5 px-8 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-green-900/30 flex items-center justify-center gap-3 transform hover:-translate-y-1 transition-all"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 5.82 2 10.53c0 4.2 3.56 7.72 8.35 8.42.33.07.77.21.88.49.1.25.07.64.03.9-.06.39-.28 1.41-.31 1.71-.05.47.22.92.74.5.42-.34 4.54-3.07 6.2-5.25C19.78 15.02 22 13.01 22 10.53 22 5.82 17.52 2 12 2z" />
              </svg>
              LINE無料相談
            </a>

            <a
              href="https://pf.kakao.com/_xkxkTdM" 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 py-5 px-8 bg-[#FEE500] hover:bg-[#ebd300] text-[#3c1e1e] font-extrabold text-lg rounded-2xl shadow-xl shadow-yellow-900/20 flex items-center justify-center gap-3 transform hover:-translate-y-1 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-[#3c1e1e] text-[#FEE500] flex items-center justify-center font-black text-sm">K</span>
              カカオトーク相談
            </a>
          </FadeIn>

          {/* Stats Counter Grid */}
          <FadeInStaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { label: '日本人患者来院数', value: '14,800人+' },
              { label: '院長 臨床経験', value: '30年' },
              { label: '専任日本語通訳', value: '3名常駐' },
              { label: '月治療費・維持費', value: '0円' },
            ].map((stat, idx) => (
              <FadeInStaggerItem key={idx} className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-5 text-center">
                <div className="text-3xl lg:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs lg:text-sm text-blue-200 font-bold">{stat.label}</div>
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>

        </div>
      </section>

      {/* 2. WHY CHOOSE WHITE STYLE (ホワイトスタイル歯科が選ばれる5つの理由) */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-20">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3 block">Features & Strengths</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight break-keep">
            <span className="inline-block">ホワイトスタイル歯科が選ばれる</span> <span className="text-blue-600 inline-block">5つの理由</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-xl mb-6">01</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 break-keep">専任日本語通訳スタッフ常駐</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
              受付・レントゲン撮影・診療・アフターケアまで医療通訳スタッフがマンツーマンでサポート。韓国語が話せなくても安心して治療を受けられます。
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl mb-6">02</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 break-keep">ソウル大出身・臨床30年</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
              ソウル大学校歯科大学出身、歯医学博士キム・ジュンホン代表院長がすべてのカウンセリングと執刀を直接担当します。
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xl mb-6">03</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 break-keep">渡韓スケジュールに最適化</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
              インプラント最短3〜4回来院、歯列矯正は2〜3ヶ月に1回の通院プログラムを完備。日本在住の患者様に最適な診療プランをご提案。
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xl mb-6">04</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 break-keep">月管理費・維持装置費 0円</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
              追加費用が発生しない明確で透明な定額治療費体系。診断料・月管理費・維持装置費用まで全額含まれており、安心して治療を始められます。
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-xl mb-6">05</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 break-keep">100% 純正ジルコニア補綴使用</h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base break-keep">
              変色や破損リスクの高い金属補綴物(PFM)は一切使用せず、天然歯に近い美しさと最高の耐久性を誇る高級オールジルコニアを採用。
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAJOR TREATMENTS (主要診療メニュー) */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3 block">Treatments Menu</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">診療プログラム案内</h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Implant Card */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full mb-4 inline-block">人気No.1</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">プレミアム インプラント</h3>
                <p className="text-blue-600 font-extrabold text-3xl mb-6">99万ウォン〜 <span className="text-xs font-bold text-slate-500">(ジルコニア補綴込み)</span></p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-200 pt-6">
                  <li className="flex items-center gap-2">✓ ソウル大出身院長による直接執刀</li>
                  <li className="flex items-center gap-2">✓ 最高級ジルコニアクラウン標準装備</li>
                  <li className="flex items-center gap-2">✓ 3D CT精密デジタル診断込み</li>
                  <li className="flex items-center gap-2">✓ 最小3〜4回来院で完了</li>
                </ul>
              </div>
              <Link href="/treatments/implant" className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl text-center transition-colors">
                インプラント詳細を見る
              </Link>
            </div>

            {/* Orthodontics Card */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full mb-4 inline-block">追加費用0円</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">審美 歯列矯正</h3>
                <p className="text-emerald-600 font-extrabold text-3xl mb-6">追加料金なし <span className="text-xs font-bold text-slate-500">(月管理費無料)</span></p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-200 pt-6">
                  <li className="flex items-center gap-2">✓ セラミック / セルフライゲーション / 透明矯正</li>
                  <li className="flex items-center gap-2">✓ 月管理費・維持装置代・診断費無料</li>
                  <li className="flex items-center gap-2">✓ 2〜3ヶ月に1回の渡韓通院プラン</li>
                  <li className="flex items-center gap-2">✓ 3Dシミュレーションで予測可能</li>
                </ul>
              </div>
              <Link href="/treatments/orthodontics" className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl text-center transition-colors">
                歯列矯正詳細を見る
              </Link>
            </div>

            {/* EasyWhite & Cosmetic */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs rounded-full mb-4 inline-block">即日完了</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">EasyWhite 1-Day審美美白</h3>
                <p className="text-amber-600 font-extrabold text-3xl mb-6">短時間施術 <span className="text-xs font-bold text-slate-500">(1日完了)</span></p>
                <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-200 pt-6">
                  <li className="flex items-center gap-2">✓ 歯を削らない無削審美ラミネート</li>
                  <li className="flex items-center gap-2">✓ プラズマ・LEDトリプル美白照射</li>
                  <li className="flex items-center gap-2">✓ 歯にしみにくく自然で高いホワイトニング効果</li>
                  <li className="flex items-center gap-2">✓ 帰国当日の施術も可能</li>
                </ul>
              </div>
              <Link href="/treatments/aesthetic" className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl text-center transition-colors">
                審美治療詳細を見る
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CLINIC DIRECTOR PROFILE (院長紹介) */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 md:p-14 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-blue-100/10 border-4 border-white/20 overflow-hidden shrink-0 flex items-center justify-center shadow-2xl">
            <svg className="w-32 h-32 text-blue-200/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="px-4 py-1 rounded-full bg-blue-500/30 text-blue-300 font-bold text-xs mb-4 inline-block">代表院長</span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">キム・ジュンホン (金準憲) 院長</h2>
            <p className="text-blue-200 text-sm md:text-base font-medium mb-6">ソウル大学校 歯科大学卒業 | 歯医学博士 | 臨床経験30年 (60,000臨床実績)</p>
            
            <ul className="space-y-2 text-sm text-slate-300 leading-relaxed font-normal">
              <li>・ ソウル大学校 歯科大学 卒業</li>
              <li>・ 檀國大学校 大学院 歯医学博士 取得</li>
              <li>・ スウェーデン Gothenburg University 口腔外科 研修</li>
              <li>・ 大韓歯科矯正学会 認定医 / 口腔顎顔面外科学会 会員</li>
              <li>・ 韓国健康保険公団評価 最高ランク (S等級) 獲得</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5. LOCATION & ACCESS (アクセス・診療案内) */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-3 block">Access & Info</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">アクセス・診療時間</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            <div className="space-y-6 text-slate-700">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  📍 住所 (所在地)
                </h3>
                <p className="text-sm leading-relaxed">
                  ソウル特別市江南区江南大路92ギル17 デスンビル 1階・2階<br />
                  <span className="text-xs text-slate-500 font-bold">(地下鉄2号線・新盆唐線「江南駅」11番・12番出口より徒歩2分)</span>
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  ⏰ 診療時間
                </h3>
                <ul className="text-sm space-y-1.5">
                  <li>・ 平日 (Mon-Fri): 10:00 ~ 19:00</li>
                  <li>・ 土曜日 (Sat): 10:00 ~ 14:00</li>
                  <li className="text-rose-600 font-bold">・ 日曜日・韓国の祝日: 休診</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  💬 日本語お問合せ窓口
                </h3>
                <p className="text-sm font-bold text-slate-900">LINE ID: <span className="text-emerald-600">whitestyle1</span></p>
                <p className="text-sm font-bold text-slate-900">KakaoTalk ID: <span className="text-yellow-700">whitestyle2</span></p>
              </div>
            </div>

            {/* Map Preview Box */}
            <div className="h-full min-h-[350px] bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden flex flex-col items-center justify-center p-8 text-center relative shadow-inner">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">江南駅 (Gangnam Stn.) 11・12番出口</h4>
              <p className="text-slate-600 text-sm mb-6">KB国民銀行の角を曲がって徒歩2分</p>
              <a 
                href="/about/location" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
              >
                詳細な地図・道順を見る
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
