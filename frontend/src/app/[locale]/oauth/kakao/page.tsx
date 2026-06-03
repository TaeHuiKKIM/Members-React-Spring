'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('카카오 로그인 연동 중입니다...');

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // Send the authorization code to our Spring Boot backend
      fetch('http://localhost:8080/api/auth/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          setStatus('로그인 성공! 홈으로 이동합니다.');
          // TODO: Save token to localStorage or context
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('userName', data.user.nickname);
          
          setTimeout(() => {
            router.push('/');
          }, 1500);
        } else {
          setStatus('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        console.error('Kakao login error:', error);
        setStatus('서버와의 통신 오류가 발생했습니다.');
      });
    } else {
      setStatus('유효하지 않은 접근입니다.');
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-sm w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A38758] mx-auto mb-6"></div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Kakao Login</h2>
        <p className="text-gray-500 text-sm">{status}</p>
      </div>
    </main>
  );
}
