'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoginPage() {
  const t = useTranslations('Header');
  const [isAgreed, setIsAgreed] = useState(false);

  // 현재 로케일 파악 (ko, en, ja, zh)
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'ko';

  // Auth Constants
  const KAKAO_CLIENT_ID = "YOUR_KAKAO_CLIENT_ID";
  const KAKAO_REDIRECT_URI = `http://localhost:3000/${locale}/oauth/kakao`;
  
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
  const GOOGLE_REDIRECT_URI = `http://localhost:3000/${locale}/oauth/google`;
  
  const APPLE_CLIENT_ID = "YOUR_APPLE_CLIENT_ID";
  const APPLE_REDIRECT_URI = `http://localhost:3000/${locale}/oauth/apple`;

  const handleLogin = (provider: string) => {
    if (!isAgreed) {
      alert("이용약관 및 개인정보 처리에 동의해주셔야 로그인이 가능합니다.");
      return;
    }

    if (provider === 'KAKAO') {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    } else if (provider === 'GOOGLE') {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
    } else if (provider === 'APPLE') {
      window.location.href = `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${APPLE_REDIRECT_URI}&response_type=code&response_mode=form_post`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Members Clinic</h1>
          <p className="text-gray-500 mb-8 text-sm">프리미엄 뷰티 메디컬 그룹 멤버스</p>
        </div>

        {/* Consent Checkbox */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-gray-900 rounded focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700 leading-relaxed font-medium">
              [필수] 멤버스 성형외과의 이용약관 및 개인정보(의료 건강정보 포함) 수집·이용에 동의합니다.
            </span>
          </label>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('KAKAO')}
            className={`w-full bg-[#FEE500] hover:bg-[#F4DC00] text-[#000000] font-bold py-4 px-4 rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-sm ${!isAgreed && 'opacity-60 grayscale'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C6.477 3 2 6.536 2 10.895C2 13.712 3.86 16.183 6.643 17.525C6.444 18.252 5.565 21.285 5.513 21.467C5.437 21.737 5.717 21.849 5.922 21.713C6.208 21.523 9.479 19.349 10.519 18.66C11.002 18.749 11.496 18.795 12 18.795C17.523 18.795 22 15.259 22 10.895C22 6.536 17.523 3 12 3Z" fill="#000000"/>
            </svg>
            <span>카카오톡으로 시작하기</span>
          </button>
          
          <button 
            onClick={() => handleLogin('GOOGLE')}
            className={`w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold py-4 px-4 rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-sm ${!isAgreed && 'opacity-60 grayscale'}`}
          >
            <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span>Google로 시작하기</span>
          </button>

          <button 
            onClick={() => handleLogin('APPLE')}
            className={`w-full bg-black hover:bg-gray-900 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-sm ${!isAgreed && 'opacity-60 grayscale'}`}
          >
            <svg width="24" height="24" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span>Apple로 시작하기</span>
          </button>
        </div>
      </div>
    </main>
  );
}
