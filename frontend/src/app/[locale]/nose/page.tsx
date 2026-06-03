'use client';

import { useTranslations } from 'next-intl';

export default function NoseSurgeryPage() {
  const t = useTranslations('Nose');

  return (
    <main className="min-h-screen pt-32 pb-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {t('title')} <span className="text-[#A38758] font-light">| 3D Custom Rhinoplasty</span>
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
          <div className="order-2 md:order-1 space-y-12">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[#A38758] uppercase mb-3">{t('tag1')}</h3>
              <h4 className="text-2xl font-light mb-4 text-gray-900">{t('title1')}</h4>
              <p className="text-[#7A7A7A] leading-relaxed font-light">
                {t('desc1')}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[#A38758] uppercase mb-3">{t('tag2')}</h3>
              <h4 className="text-2xl font-light mb-4 text-gray-900">{t('title2')}</h4>
              <p className="text-[#7A7A7A] leading-relaxed font-light">
                {t('desc2')}
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden premium-shadow relative group">
            <img src="/assets/images/content/model_nose_v5.png" alt="Nose Surgery" className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </div>
    </main>
  );
}
