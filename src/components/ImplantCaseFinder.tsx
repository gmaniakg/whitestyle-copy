'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = {
  q1: {
    text: "현재 멀쩡한 자연 치아가\n단 하나라도 남아 있습니까?",
    yes: "q2",
    no: "case1"
  },
  q2: {
    text: "임플란트를 심어야 할 위치가\n'앞니' 부분입니까?",
    yes: "case2",
    no: "q3"
  },
  q3: {
    text: "잇몸뼈(치조골)의 두께나 높이가\n7mm 이상 충분히 존재합니까?",
    subtext: "(치과에서 뼈가 충분하다는 이야기를 들으셨나요?)",
    yes: "case3",
    no: "q4"
  },
  q4: {
    text: "잔존 잇몸뼈가 임플란트를 심었을 때\n흔들리지 않을 정도(약 3~4mm 이상)는 됩니까?",
    yes: "case4",
    no: "case5"
  }
} as const;

const results = {
  case1: {
    title: "전악 임플란트 (무치악/풀마우스)",
    desc: "치아가 없는 상태에서 다수의 임플란트를 식립하여 전체 교합을 회복하는 전악 임플란트 케이스 유형입니다.",
    tags: ["#무치악", "#전악재건", "#틀니대체"]
  },
  case2: {
    title: "심미 앞니 임플란트",
    desc: "잇몸 라인, 주변 치아와의 조화 등 심미적 요소를 함께 고려하는 앞니 임플란트 케이스 유형입니다. 결과는 개인의 구강 상태에 따라 다를 수 있습니다.",
    tags: ["#앞니", "#심미보철"]
  },
  case3: {
    title: "일반 / 즉시 식립 임플란트",
    desc: "잇몸뼈 상태가 충분한 경우 발치 후 즉시 식립을 고려할 수 있는 케이스 유형입니다. 즉시 식립·임시치아 가능 여부와 기간은 진단 결과에 따라 달라집니다.",
    tags: ["#즉시식립", "#임시치아"]

  },
  case4: {
    title: "동시 식립 GBR (뼈이식)",
    desc: "잇몸뼈가 다소 부족하지만 초기 고정을 얻을 수 있어, 뼈이식술(GBR)과 임플란트 식립을 하루에 동시에 진행한 케이스입니다.",
    tags: ["#뼈이식", "#동시식립", "#GBR"]
  },
  case5: {
    title: "지연 식립 GBR (뼈이식)",
    desc: "잇몸뼈의 소실이 큰 경우, 먼저 뼈이식술을 진행하고 뼈가 안정되는 기간(개인차 있음, 통상 3~6개월)을 기다린 뒤 임플란트를 식립하는 케이스 유형입니다. 실제 치료 계획은 진단 후 개인별로 달라질 수 있습니다.",
    tags: ["#뼈이식", "#지연식립"]
  }
} as const;

type NodeId = keyof typeof questions | keyof typeof results;

export default function ImplantCaseFinder() {
  const [currentNode, setCurrentNode] = useState<NodeId>('q1');
  const [history, setHistory] = useState<NodeId[]>([]);
  
  // Kakao Form State
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedSensitive, setAgreedSensitive] = useState(false);
  const [agreedMarketing, setAgreedMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isResult = currentNode.startsWith('case');
  const qData = !isResult ? questions[currentNode as keyof typeof questions] : null;
  const rData = isResult ? results[currentNode as keyof typeof results] : null;

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (!qData) return;
    setHistory([...history, currentNode]);
    setCurrentNode(qData[answer]);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentNode(prev);
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrentNode('q1');
    setShowForm(false);
    setSuccess(false);
    setPhone('');
    setAgreedPrivacy(false);
    setAgreedSensitive(false);
    setAgreedMarketing(false);
  };

  const handleKakaoSubmit = async () => {
    if (!phone) return alert('전화번호를 입력해주세요.');
    if (!agreedPrivacy) return alert('개인정보 수집·이용 동의(필수)가 필요합니다.');
    if (!agreedSensitive) return alert('민감정보(건강정보) 처리 동의(필수)가 필요합니다.');
    
    setLoading(true);
    try {
      const res = await fetch('/api/kakao/send-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          resultTitle: rData?.title,
          resultDesc: rData?.desc,
          agreedPrivacy,
          agreedSensitive,
          agreedMarketing
        })
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        alert('접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (e) {
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-8 md:p-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold tracking-widest uppercase mb-3 border border-blue-200">
            Interactive Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">나에게 맞는 임플란트 케이스 찾기</h2>
          <p className="text-slate-500 mt-3 font-medium">몇 가지 간단한 질문으로 나의 구강 상태와 가장 비슷한 임상 사례를 확인해보세요.</p>
        </div>

        <div className="min-h-[300px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            {!isResult && qData ? (
              <motion.div
                key={currentNode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto text-center"
              >
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 mb-8 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    질문 {currentNode.replace('q', '')} / 4
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug whitespace-pre-line mt-2">
                    {qData.text}
                  </h3>
                  {'subtext' in qData && qData.subtext && (
                    <p className="text-slate-400 mt-4 text-sm md:text-base font-medium">{qData.subtext}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer('yes')}
                    className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-xl font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    네 (Yes)
                  </button>
                  <button
                    onClick={() => handleAnswer('no')}
                    className="group relative w-full flex justify-center py-5 px-4 border border-slate-200 text-xl font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
                  >
                    아니오 (No)
                  </button>
                </div>
              </motion.div>
            ) : rData ? (
              <motion.div
                key={currentNode}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="w-full max-w-2xl mx-auto text-center bg-white p-10 rounded-[2rem] shadow-xl border border-blue-50 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">당신에게 맞는 임상 사례는</h3>
                <h4 className="text-3xl font-extrabold text-slate-900 mb-6">{rData.title}</h4>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  {rData.desc}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {rData.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      let targetId = 'clinical-cases';
                      if (currentNode === 'case1') targetId = 'case-전악재건_ful_mouth';
                      if (currentNode === 'case2') targetId = 'case-발치후즉시식립_상악전치';
                      if (currentNode === 'case3') targetId = 'case-즉시_식립즉시_부하';
                      if (currentNode === 'case4') targetId = 'case-자가골이식-동시_식립';
                      if (currentNode === 'case5') targetId = 'case-자가골이식-지연식립';
                      
                      const el = document.getElementById(targetId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else {
                        document.getElementById('clinical-cases')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="py-4 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shadow-md"
                  >
                    아래 갤러리에서 해당 실제 사례 보기
                  </button>
                  <button 
                    onClick={handleRestart}
                    className="py-4 px-8 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors"
                  >
                    다시 하기
                  </button>
                </div>

                {/* Kakao Form Area */}
                <div className="mt-10 border-t border-slate-100 pt-8">
                  {!showForm && !success ? (
                    <button 
                      onClick={() => setShowForm(true)}
                      className="w-full py-5 px-6 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-3 text-lg"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 3c-5.523 0-10 3.52-10 7.864 0 2.827 1.947 5.305 4.908 6.643-.376 1.348-1.42 5.127-1.455 5.385-.044.321.118.324.25.234.103-.07 1.637-1.127 3.59-2.525 1.554.407 3.2.627 4.907.627 5.523 0 10-3.52 10-7.864C22 6.52 17.523 3 12 3z"/></svg>
                      결과를 카카오톡으로 받아보기
                    </button>
                  ) : success ? (
                    <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-200">
                      <h5 className="font-bold text-lg mb-2 flex items-center justify-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        접수되었습니다
                      </h5>
                      <p className="text-sm">상담 담당자가 확인 후 입력하신 번호로 연락드리겠습니다.</p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left animate-in fade-in slide-in-from-top-4 duration-300">
                      <h5 className="font-bold text-slate-800 mb-4">상담 결과 접수</h5>

                      
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">휴대폰 번호 (숫자만 입력)</label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="01012345678"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="mb-6 space-y-3 text-sm text-slate-600">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" checked={agreedPrivacy} onChange={(e) => setAgreedPrivacy(e.target.checked)} className="mt-0.5 w-5 h-5 shrink-0" />
                          <span className="leading-tight">(필수) 개인정보 수집·이용 동의: 연락처를 상담 접수 및 회신 목적으로 수집·이용합니다. 보유기간 등 자세한 내용은 <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">개인정보처리방침</a>을 확인해 주세요.</span>
                        </label>
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" checked={agreedSensitive} onChange={(e) => setAgreedSensitive(e.target.checked)} className="mt-0.5 w-5 h-5 shrink-0" />
                          <span className="leading-tight">(필수) 민감정보(건강정보) 처리 동의: 선택하신 구강 상태 관련 응답이 상담 결과 안내에 포함되어 처리됩니다.</span>
                        </label>
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" checked={agreedMarketing} onChange={(e) => setAgreedMarketing(e.target.checked)} className="mt-0.5 w-5 h-5 shrink-0" />
                          <span className="leading-tight">(선택) 병원 안내·마케팅 정보 수신 동의: 동의하지 않아도 상담 접수에는 영향이 없습니다.</span>
                        </label>
                      </div>


                      <div className="flex gap-3">
                        <button 
                          onClick={() => setShowForm(false)}
                          className="flex-1 py-3 px-4 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          취소
                        </button>
                        <button 
                          onClick={handleKakaoSubmit}
                          disabled={loading}
                          className="flex-[2] py-3 px-4 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-[#191919] border-t-transparent rounded-full animate-spin"></div>
                          ) : '카톡으로 결과 전송'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Back Button */}
        {history.length > 0 && !isResult && (
          <div className="absolute top-0 left-0">
            <button 
              onClick={handleBack}
              className="flex items-center text-slate-400 hover:text-slate-600 font-medium transition-colors p-2"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              이전 질문
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
