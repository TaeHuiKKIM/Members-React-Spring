import {useTranslations} from 'next-intl';
import HeroBanner from '@/components/HeroBanner';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export default function HomePage() {
  const t = useTranslations('Index');
  
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <HeroBanner />
      
      {/* Before & After Section */}
      <section className="py-32" style={{ backgroundColor: 'var(--premium-surface)' }}>
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4 inline-block">
            <span className="text-[#b39b82] text-xs font-semibold tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">눈부신 변화의 시작</h2>
          <p className="text-[#7A7A7A] max-w-2xl mx-auto mb-20 font-light leading-relaxed">
            멤버스 성형외과와 함께한 고객님들의 리얼 후기를 확인해보세요.<br />
            좌우로 드래그하여 수술 전후를 비교할 수 있습니다.
          </p>
          
          <div className="premium-shadow rounded-2xl overflow-hidden max-w-5xl mx-auto">
            <BeforeAfterSlider 
              beforeImage="/assets/images/before_eye_v5.png"
              afterImage="/assets/images/after_eye_v5.png"
              beforeAlt="눈 성형 전"
              afterAlt="눈 성형 후"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
