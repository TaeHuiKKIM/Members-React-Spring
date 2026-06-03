'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  status: string;
  answer?: string;
  createdAt: string;
}

export default function AdminQnaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQ, setSelectedQ] = useState<Question | null>(null);
  const [answerInput, setAnswerInput] = useState('');

  const fetchQuestions = () => {
    fetch('http://localhost:8080/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSelect = (q: Question) => {
    setSelectedQ(q);
    setAnswerInput(q.answer || '');
  };

  const submitAnswer = async () => {
    if (!selectedQ) return;
    if (!answerInput.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch(`http://localhost:8080/api/questions/${selectedQ.id}/answer`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'X-Admin-Token': token
        },
        body: JSON.stringify({ answer: answerInput })
      });
      if (res.ok) {
        alert('답변이 등록되었습니다.');
        setSelectedQ(null);
        fetchQuestions();
      } else if (res.status === 401) {
        alert('관리자 인증이 만료되었습니다. 다시 로그인해주세요.');
      } else {
        alert('등록 실패');
      }
    } catch (error) {
      console.error(error);
      alert('오류 발생');
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] space-x-6">
      {/* List Panel */}
      <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">상담 목록</h2>
        </div>
        <div className="overflow-y-auto flex-1 p-2">
          {questions.map(q => (
            <div 
              key={q.id} 
              onClick={() => handleSelect(q)}
              className={`p-4 border-b border-gray-50 cursor-pointer rounded-lg mb-1 transition-colors ${selectedQ?.id === q.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 text-xs font-bold rounded ${q.status === '답변완료' ? 'bg-[#A38758]/10 text-[#A38758]' : 'bg-red-100 text-red-600'}`}>
                  {q.status}
                </span>
                <span className="text-xs text-gray-400">{new Date(q.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="font-bold text-gray-900 truncate">{q.title}</h3>
              <p className="text-sm text-gray-500 mt-1">작성자: {q.author}</p>
            </div>
          ))}
          {questions.length === 0 && (
            <div className="p-8 text-center text-gray-400">등록된 상담글이 없습니다.</div>
          )}
        </div>
      </div>

      {/* Detail & Reply Panel */}
      <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        {selectedQ ? (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedQ.title}</h2>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>작성자: {selectedQ.author}</span>
                <span>{new Date(selectedQ.createdAt).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
              <h3 className="text-sm font-bold text-gray-700 mb-2">문의 내용</h3>
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedQ.content}</p>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#A38758] mr-2"></span>
                  답변 작성
                </h3>
                <textarea 
                  rows={6} 
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#A38758] outline-none resize-none"
                  placeholder="고객에게 전달할 답변을 입력하세요."
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={submitAnswer}
                    className="bg-gray-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    답변 등록하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            <p>좌측 목록에서 상담글을 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
