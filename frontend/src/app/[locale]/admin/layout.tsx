'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as string || 'ko';
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname.includes('/login');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !isLoginPage) {
      router.push(`/${locale}/admin/login`);
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [pathname, isLoginPage, router, locale]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  // 로그인 페이지일 경우 사이드바 없이 자식 컴포넌트만 렌더링
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--foreground)] text-white flex flex-col pt-8 pb-4">
        <div className="px-6 mb-10">
          <h2 className="text-2xl font-bold tracking-widest text-[var(--premium-gold)]">ADMIN</h2>
          <p className="text-xs text-gray-400 mt-2">Members Clinic</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href={`/${locale}/admin`} className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            대시보드 홈
          </Link>
          <Link href={`/${locale}/admin/qna`} className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-gray-300">
            온라인 상담 관리
          </Link>
          <Link href={`/${locale}/admin/reservations`} className="block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-gray-300">
            예약 관리
          </Link>
        </nav>
        
        <div className="px-6 flex flex-col space-y-4">
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              router.push(`/${locale}/admin/login`);
            }}
            className="text-sm text-left text-gray-400 hover:text-white transition-colors"
          >
            로그아웃
          </button>
          <Link href={`/${locale}`} className="block text-sm text-gray-400 hover:text-white transition-colors">
            ← 웹사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
