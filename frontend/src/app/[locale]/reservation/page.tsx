'use client';

import { useState } from 'react';

export default function ReservationPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', procedure: '눈' });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">빠른 상담 예약</h1>
          <p className="text-gray-500 text-center mb-8">원하시는 날짜와 시술을 선택하시면 담당자가 빠르게 연락드립니다.</p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="010-1234-5678" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">관심 시술</label>
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>눈 성형</option>
                  <option>코 성형</option>
                  <option>리프팅/안티에이징</option>
                  <option>쁘띠 (보톡스/필러)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">희망 날짜</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {/* Kakao Login Integration Placeholder */}
            <div className="pt-4 flex flex-col space-y-4">
              <button type="button" className="w-full bg-[#FEE500] text-black font-bold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#F4DC00] transition-colors">
                <svg viewBox="0 0 32 32" className="w-6 h-6"><path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.44 5.44c-.16.48.4.8.8.56l6.24-4.24c.4.08.88.08 1.28.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z" fill="#000"/></svg>
                <span>카카오로 1초 만에 간편 예약하기</span>
              </button>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                일반 예약 접수
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
