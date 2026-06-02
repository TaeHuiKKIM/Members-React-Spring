import {useTranslations} from 'next-intl';
import HeroBanner from '@/components/HeroBanner';

export default function HomePage() {
  const t = useTranslations('Index');
  
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <HeroBanner />
      
      {/* 
        This is where other sections like "Before & After", 
        "Our Doctors", "Quick QnA", etc. will go.
      */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          다국어 라우팅 및 최신 프론트엔드 인프라가 적용된 메인 페이지입니다.
        </p>
      </section>
    </main>
  );
}
