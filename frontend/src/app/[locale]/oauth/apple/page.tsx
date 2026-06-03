'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AppleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // Send code to backend
      fetch('http://localhost:8080/api/auth/apple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          alert(`환영합니다, ${data.user.nickname}님! (Apple 로그인)`);
          router.push('/ko');
        } else {
          alert('Apple 로그인 실패');
          router.push('/ko/login');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Apple 로그인 처리 중 오류 발생');
        router.push('/ko/login');
      });
    } else {
      alert('Apple 인증 코드가 없습니다.');
      router.push('/ko/login');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Apple 인증 처리중...</h2>
        <p className="text-gray-500">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}

export default function AppleCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AppleCallbackContent />
    </Suspense>
  );
}
