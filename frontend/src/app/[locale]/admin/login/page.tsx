'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234!') {
      localStorage.setItem('adminToken', password);
      router.push('/ko/admin');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--foreground)] flex items-center justify-center py-20 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">ADMIN LOGIN</h1>
        <p className="text-gray-500 mb-8 text-sm">멤버스 성형외과 관리자 대시보드</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="마스터 비밀번호 입력" 
              className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-[#A38758] outline-none text-center font-bold tracking-widest"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[var(--foreground)] hover:bg-gray-800 text-white font-bold py-4 px-4 rounded-xl transition-colors shadow-sm"
          >
            관리자 접속
          </button>
        </form>
        
        <p className="mt-8 text-xs text-gray-400">
          인가되지 않은 사용자의 접근은 관련 법령에 의해 처벌받을 수 있습니다.
        </p>
      </div>
    </main>
  );
}
