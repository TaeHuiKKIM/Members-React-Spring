import {useTranslations} from 'next-intl';
import HeroBanner from '@/components/HeroBanner';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export default function HomePage() {
  const t = useTranslations('Index');
  
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <HeroBanner />
      
      {/* Before & After Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">눈부신 변화의 시작</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16">
            멤버스 성형외과와 함께한 고객님들의 리얼 후기를 확인해보세요. 좌우로 드래그하여 수술 전후를 비교할 수 있습니다.
          </p>
          
          <BeforeAfterSlider 
            beforeImage="/assets/images/slideshow/slideShow_eyeshort.jpg"
            afterImage="/assets/images/slideshow/slideShow_eyelong.jpg"
            beforeAlt="눈 성형 전"
            afterAlt="눈 성형 후"
          />
        </div>
      </section>
    </main>
  );
}
