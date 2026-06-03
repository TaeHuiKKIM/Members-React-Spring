'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 pt-24 pb-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold tracking-tighter text-[var(--foreground)] mb-8 text-center">회원가입</h1>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Form Fields */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">이름</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="실명을 입력해주세요" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">이메일 (아이디)</label>
            <div className="flex space-x-2">
              <input type="email" className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="example@email.com" />
              <button type="button" className="bg-gray-100 text-gray-700 font-semibold px-4 rounded-lg hover:bg-gray-200">중복확인</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호</label>
            <input type="password" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="영문, 숫자, 특수문자 조합 8자 이상" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">휴대폰 번호</label>
            <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gray-900 outline-none" placeholder="010-1234-5678" />
          </div>

          {/* Terms Agreement */}
          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-start space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
              <input type="checkbox" className="mt-1 rounded text-[var(--foreground)] focus:ring-0" />
              <span className="text-sm text-gray-600">
                <span className="font-bold text-[var(--foreground)]">[필수]</span> 서비스 이용약관 및 개인정보 수집·이용에 동의합니다.
              </span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
              <input type="checkbox" className="mt-1 rounded text-[var(--foreground)] focus:ring-0" />
              <span className="text-sm text-gray-600">
                <span className="text-gray-500">[선택]</span> 이벤트 및 혜택 알림 수신에 동의합니다.
              </span>
            </label>
          </div>

          <button type="submit" className="w-full bg-[var(--foreground)] text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors mt-6">
            가입하기
          </button>
        </form>
      </div>
    </main>
  );
}
