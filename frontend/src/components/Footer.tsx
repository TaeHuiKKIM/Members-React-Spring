'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const pathname = usePathname();

  if (pathname.includes('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#1A1814] text-[#A3A09A] py-20 text-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#2C2922] pb-16 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-2xl font-light tracking-[0.2em] mb-6">MEMBERS</h2>
            <p className="leading-relaxed whitespace-pre-wrap font-light">
              {t('description')}
            </p>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-6 tracking-widest text-xs uppercase">{t('contact')}</h3>
            <ul className="space-y-4">
              <li>
                <span className="block text-xs text-[#A38758] mb-1 font-medium">{t('reservation')}</span>
                <span className="text-xl text-white font-light tracking-wider">02-543-4411</span>
              </li>
              <li>
                <span className="block text-xs text-[#A38758] mb-1 font-medium">{t('kakao')}</span>
                <a href="https://pf.kakao.com/_RHxepG" target="_blank" rel="noopener noreferrer" className="font-light hover:text-[#A38758] transition-colors">
                  @멤버스성형외과
                </a>
              </li>
              <li><span className="block text-xs text-[#A38758] mb-1 font-medium">{t('address_label')}</span><span className="font-light">{t('address')}</span></li>
            </ul>
          </div>
          
          {/* Hours */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-6 tracking-widest text-xs uppercase">{t('hours')}</h3>
            <ul className="space-y-4 font-light">
              <li className="flex justify-between border-b border-[#2C2922] pb-2"><span>{t('weekday')}</span> <span>AM 10:00 - PM 07:00</span></li>
              <li className="flex justify-between border-b border-[#2C2922] pb-2"><span>{t('friday')}</span> <span>AM 10:00 - PM 09:00</span></li>
              <li className="flex justify-between border-b border-[#2C2922] pb-2"><span>{t('saturday')}</span> <span>AM 10:00 - PM 04:00</span></li>
              <li className="text-xs text-[#A38758] mt-4 font-medium">{t('sunday')}</li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-6 tracking-widest text-xs uppercase">{t('quick')}</h3>
            <ul className="space-y-3 font-light">
              <li><Link href="/about" className="hover:text-[#A38758] transition-colors">병원소개</Link></li>
              <li><Link href="/eye" className="hover:text-[#A38758] transition-colors">눈 성형</Link></li>
              <li><Link href="/nose" className="hover:text-[#A38758] transition-colors">코 성형</Link></li>
              <li><Link href="/qna" className="hover:text-[#A38758] transition-colors">온라인 상담</Link></li>
              <li>
                <a href="https://pf.kakao.com/_RHxepG" target="_blank" rel="noopener noreferrer" className="hover:text-[#A38758] transition-colors">
                  카카오톡 상담
                </a>
              </li>
              <li><Link href="/reservation" className="hover:text-[#A38758] transition-colors">예약하기</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-xs text-[#7A756C] font-light mt-8">
          <div className="space-y-1 mb-4 md:mb-0">
            <p>멤버스성형외과의원 | 서울특별시 강남구 가로수길74 운소빌딩 5층</p>
            <p>대표 천지훈 | 홈페이지관리책임자 김태희 | 사업자등록번호 211-09-47613</p>
            <p>전화 02-543-4411 | 팩스 02-543-4441</p>
          </div>
          <p className="tracking-wider">&copy; 2024 Members Clinic, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
