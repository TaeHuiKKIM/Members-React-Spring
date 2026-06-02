'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Index');
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지 이벤트 (스티키 헤더 효과)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 border-b border-transparent ${isScrolled ? 'bg-white shadow-md text-gray-900 border-gray-100' : 'bg-transparent text-gray-900 md:text-white'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          MEMBERS
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-10 font-medium">
          <Link href="/about" className="hover:text-blue-500 transition-colors">병원소개</Link>
          <Link href="/eye" className="hover:text-blue-500 transition-colors">눈성형</Link>
          <Link href="/nose" className="hover:text-blue-500 transition-colors">코성형</Link>
          <Link href="/lifting" className="hover:text-blue-500 transition-colors">리프팅</Link>
          <Link href="/qna" className="hover:text-blue-500 transition-colors">온라인상담</Link>
        </nav>

        {/* Right Action Menu & i18n */}
        <div className="flex items-center space-x-6">
          <Link href="/reservation" className={`hidden lg:block px-5 py-2 rounded-full font-bold transition-all ${isScrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-gray-100'}`}>
            빠른 예약
          </Link>
          
          <div className="text-sm font-semibold flex space-x-2">
            <Link href="/" locale="ko" className="hover:text-blue-500">KR</Link>
            <span>|</span>
            <Link href="/" locale="en" className="hover:text-blue-500">EN</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
