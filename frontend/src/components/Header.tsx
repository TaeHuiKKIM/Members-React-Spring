'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if current page is Home
  const isHome = pathname === '/' || pathname === '/ko' || pathname === '/en' || pathname === '/zh' || pathname === '/ja';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 관리자 페이지에서는 글로벌 헤더를 숨깁니다 (레이아웃 겹침 방지)
  // 훅의 실행 순서를 보장하기 위해 useEffect 이후에 배치합니다.
  if (pathname.includes('/admin')) {
    return null;
  }

  // Determine header styling based on page and scroll state
  const isDarkText = !isHome || isScrolled;
  const headerBgClass = isScrolled ? 'glass-effect' : 'bg-transparent';
  const headerTextClass = isDarkText ? 'text-gray-900' : 'text-white';
  const logoTextClass = isDarkText ? 'text-gray-900' : 'text-white';

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent ${headerBgClass} ${headerTextClass}`}>
        <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
          {/* Logo */}
          <Link href="/" className={`text-2xl font-light tracking-[0.2em] transition-colors ${logoTextClass}`}>
            MEMBERS
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 font-medium items-center">
            <Link href="/about" className="hover:text-[#A38758] transition-colors text-sm tracking-wide">{t('about')}</Link>
            <Link href="/eye" className="hover:text-[#A38758] transition-colors text-sm tracking-wide">{t('eye')}</Link>
            <Link href="/nose" className="hover:text-[#A38758] transition-colors text-sm tracking-wide">{t('nose')}</Link>
            <Link href="/lifting" className="hover:text-[#A38758] transition-colors text-sm tracking-wide">{t('lifting')}</Link>
            
            <div className="flex items-center space-x-6 ml-4 pl-6 border-l border-gray-300">
              <Link href="/qna" className="hover:text-[#A38758] transition-colors text-sm tracking-wide">{t('qna')}</Link>
              <a href="https://pf.kakao.com/_RHxepG" target="_blank" rel="noopener noreferrer" className="text-[#A38758] hover:text-[#8A7047] transition-colors text-sm tracking-wide flex items-center gap-1 font-semibold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-5.523 0-10 3.582-10 8 0 2.825 1.77 5.3 4.5 6.74-.23 1.58-.8 3.25-.8 3.25s-.08.2.06.27c.14.07.31.02.31.02s2.15-.35 3.9-1.22c.65.1 1.33.15 2.03.15 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/></svg>
                {t('chat')}
              </a>
              <Link href="/reservation" className="bg-[#A38758] hover:bg-[#8A7047] text-white px-5 py-2.5 rounded-sm transition-colors text-sm tracking-wider font-semibold">
                {t('reservation')}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 ${headerTextClass}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full pt-24 px-8 pb-10 overflow-y-auto">
          <nav className="flex flex-col space-y-6 text-2xl font-light tracking-wide text-gray-900 flex-1">
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>{t('about')}</Link>
            <Link href="/eye" onClick={() => setIsMobileMenuOpen(false)}>{t('eye')}</Link>
            <Link href="/nose" onClick={() => setIsMobileMenuOpen(false)}>{t('nose')}</Link>
            <Link href="/lifting" onClick={() => setIsMobileMenuOpen(false)}>{t('lifting')}</Link>
            
            <hr className="border-[var(--premium-border)] my-2" />
            
            <Link href="/qna" onClick={() => setIsMobileMenuOpen(false)}>{t('qna')}</Link>
            <a href="https://pf.kakao.com/_RHxepG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--premium-gold)]" onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-5.523 0-10 3.582-10 8 0 2.825 1.77 5.3 4.5 6.74-.23 1.58-.8 3.25-.8 3.25s-.08.2.06.27c.14.07.31.02.31.02s2.15-.35 3.9-1.22c.65.1 1.33.15 2.03.15 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/></svg>
              {t('chat')}
            </a>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 text-lg">{t('login')}</Link>
          </nav>
          
          <div className="space-y-6 mt-8">
            <Link href="/reservation" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-hover)] text-white font-medium tracking-wider py-4 rounded-sm transition-colors">
              {t('reservation')}
            </Link>
            <div className="flex justify-center space-x-6 text-[var(--premium-text-light)] text-sm tracking-widest font-light">
              <Link href="/" locale="ko" onClick={() => setIsMobileMenuOpen(false)}>KR</Link>
              <Link href="/" locale="en" onClick={() => setIsMobileMenuOpen(false)}>EN</Link>
              <Link href="/" locale="ja" onClick={() => setIsMobileMenuOpen(false)}>JP</Link>
              <Link href="/" locale="zh" onClick={() => setIsMobileMenuOpen(false)}>CN</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
