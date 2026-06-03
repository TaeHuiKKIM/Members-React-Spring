'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Question {
  id?: number;
  title: string;
  content: string;
  author: string;
  password?: string;
  status?: string;
  createdAt?: string;
}

export default function QnaPage() {
  const t = useTranslations('Header');
  const [isWriting, setIsWriting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Form State
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Anti-Spam Captcha State
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');

  const fetchQuestions = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/questions');
      if (res.ok) {
        const data = await res.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (isWriting) {
      setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
      setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
      setCaptchaInput('');
    }
  }, [isWriting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captchaNum1 + captchaNum2) {
      alert('스팸 방지 퀴즈의 정답이 올바르지 않습니다.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author, password })
      });

      if (res.ok) {
        alert('상담글이 성공적으로 등록되었습니다.');
        setIsWriting(false);
        setTitle('');
        setContent('');
        setAuthor('');
        setPassword('');
        fetchQuestions(); // Refresh list
      } else {
        alert('등록에 실패했습니다. 서버를 확인해주세요.');
      }
    } catch (error) {
      console.error('Error posting question:', error);
      alert('서버와의 통신 오류가 발생했습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 text-center">온라인 상담 (Q&A)</h1>
        <p className="text-gray-500 text-center mb-12 text-lg">
          궁금한 점이 있으신가요? 회원가입 없이 간편하게 질문을 남겨주시면,<br className="hidden md:block"/> 
          멤버스 성형외과의 전문 의료진이 직접 24시간 내에 답변해 드립니다.
        </p>

        {/* Q&A Board */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-sm text-gray-700">
                <th className="p-4 font-semibold w-16 text-center">번호</th>
                <th className="p-4 font-semibold">제목</th>
                <th className="p-4 font-semibold w-24 text-center">작성자</th>
                <th className="p-4 font-semibold w-24 text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">등록된 상담글이 없습니다.</td>
                </tr>
              ) : (
                questions.map((q, idx) => (
                  <React.Fragment key={q.id}>
                    <tr onClick={() => setExpandedId(expandedId === q.id ? null : q.id)} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="p-4 text-center text-gray-500">{questions.length - idx}</td>
                      <td className="p-4 font-medium flex items-center space-x-2">
                        <span>{q.title}</span>
                      </td>
                      <td className="p-4 text-center text-gray-500 text-sm">
                        {q.author.length > 1 ? q.author.substring(0, 1) + '*' + q.author.substring(2) : q.author}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${q.status === '답변완료' ? 'bg-[var(--premium-gold)]/10 text-[var(--premium-gold)] border border-[#A38758]/20' : 'bg-gray-100 text-gray-600'}`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                    {expandedId === q.id && (
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <td colSpan={4} className="p-6">
                          <div className="space-y-4">
                            <div>
                              <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded mb-2">질문</span>
                              <p className="text-gray-800 whitespace-pre-wrap">{q.content}</p>
                            </div>
                            {q.answer && (
                              <div className="bg-white p-4 rounded-xl border border-gray-200 mt-4">
                                <span className="inline-block px-2 py-1 bg-[var(--premium-gold)]/10 text-[var(--premium-gold)] text-xs font-bold rounded mb-2">병원 답변</span>
                                <p className="text-gray-800 whitespace-pre-wrap">{q.answer}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={() => setIsWriting(!isWriting)}
            className="bg-[var(--foreground)] text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors shadow-md"
          >
            {isWriting ? '취소하기' : '상담글 작성하기'}
          </button>
        </div>

        {/* Question Writing Form */}
        {isWriting && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">새 상담글 작성</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">작성자명</label>
                  <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="홍길동" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호 (글 확인용)</label>
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="숫자 4자리" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">제목</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="문의하실 내용을 간단히 적어주세요" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상담 내용</label>
                <textarea required rows={6} value={content} onChange={e => setContent(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="자세한 증상이나 궁금한 점을 남겨주시면 정확한 상담이 가능합니다."></textarea>
              </div>
              
              {/* Anti-Spam Captcha Section */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-bold text-[var(--foreground)] mb-2">
                  스팸 방지 퀴즈 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm">
                    {captchaNum1} + {captchaNum2} = ?
                  </span>
                  <input 
                    required 
                    type="number" 
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="flex-1 max-w-[150px] border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#A38758] outline-none font-bold" 
                    placeholder="정답 입력" 
                  />
                  <span className="text-sm text-gray-500">자동 등록을 방지하기 위해 정답을 입력해주세요.</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[var(--premium-gold)] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#a08a73] transition-colors shadow-md">
                  등록하기
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
